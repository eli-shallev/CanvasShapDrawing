'use srtict'

function onInit() {
    setDefaultValues()
    addListeners()
    resizeCanvas()
    renderCanvas()
}

function renderCanvas(){
    onClear()
}

function resizeCanvas() {
    const fillColor = getCtx().fillStyle
    const strokeColor = getCtx().strokeStyle
    const elContainer = document.querySelector('.canvas-container')
    getElCanvas().width = elContainer.offsetWidth
    getElCanvas().height = elContainer.offsetHeight
    getCtx().fillStyle = fillColor
    getCtx().strokeStyle = strokeColor
}

function onChangeShap(shap){
    setCurrShap(shap)
}

function onChangeStroke(color) {
    getCtx().strokeStyle = color
}

function onChangeFill(color) {
    getCtx().fillStyle = color
}

function onClear(){
    const fillColor = getCtx().fillStyle
    var style=window.getComputedStyle(getElCanvas(),"");
    var bgColor=style.getPropertyValue("background-color");
    getCtx().fillStyle = bgColor
    getCtx().fillRect(0,0,getElCanvas().width,getElCanvas().height)
    getCtx().fillStyle = fillColor
}

function onDown(ev) {
    setDrawing(true)
    if(!getLastPos()) setLastPos(getEvPos(ev))
    if(!getLastTime()) setLastTime(Date.now())
}

function onMove(ev) {
    if (!getDrawing()) return
    const time = Date.now()
    const pos = getEvPos(ev)
    const speed = getMouseSpeed(time,pos)
    const size = speed*30
    setLastTime(time)
    setLastPos(pos)


    switch (getCurrShap()) {
        case 'rec':
            getCtx().lineWidth = '6'
            getCtx().strokeRect(pos.x-size/2, pos.y-size/2, size, size)
            getCtx().fillRect(pos.x-size/2, pos.y-size/2, size, size)
            break;
        case 'cir':
            getCtx().beginPath()
            getCtx().lineWidth = '6'
            getCtx().arc(pos.x, pos.y, size/2, 0, 2 * Math.PI)
            getCtx().stroke()
            getCtx().fill()
            break;
        case 'tri':
            getCtx().beginPath()
            getCtx().lineWidth = '6'
            getCtx().moveTo(pos.x,pos.y-size/2)
            getCtx().lineTo(pos.x+size/2,pos.y+size)
            getCtx().lineTo(pos.x-size/2,pos.y+size)
            getCtx().closePath()
            getCtx().stroke()
            getCtx().fill()
            break;
        default:
            break;
    }


}

function onUp() {
    setDrawing(false)
}

function onUploadImg() {
    const imgDataUrl = getElCanvas().toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

