'use strict'
let gElCanvas
let gCtx
let gDrawing
let gCurrShap
let gLastPos
let gLastTime

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function setDefaultValues(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.strokeStyle = '#ff7f50'
    gCtx.fillStyle = '#ffffff'
    document.querySelector('.stroke-btn').value = '#a52a2a'
    document.querySelector('.fill-btn').value = '#ffffff'
    gDrawing = false
    gCurrShap = 'rec'
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()

    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function getCtx(){
    return gCtx
}

function getElCanvas(){
    return gElCanvas
}

function setCurrShap(shap){
    gCurrShap = shap
}

function getCurrShap(){
    return gCurrShap
}

function setLastPos(pos){
    gLastPos = pos
}

function getLastPos(){
    return gLastPos
}

function setLastTime(time){
    gLastTime = time
}

function getLastTime(){
    return gLastTime
}

function setDrawing(state){
    gDrawing = state
}

function getDrawing(){
    return gDrawing
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        console.log('ev:', ev)
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function getMouseSpeed(now,pos){
    const dis = Math.sqrt(Math.pow(gLastPos.x-pos.x,2)+Math.pow(gLastPos.y-pos.y,2))
    const time = now-gLastTime
    const speed = dis/time
    return speed
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = (event) => {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
    }

    reader.readAsDataURL(ev.target.files[0])

}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

