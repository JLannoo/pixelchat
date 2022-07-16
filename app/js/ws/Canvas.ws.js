const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('clear');
});

socket.on('pixels', (data) => {
    console.log(data);
    drawPixels(data);
});

socket.on("pixel", (data) => {
    drawPixel(data);
});

socket.on("clear", () => {
    clearCanvas();
});

function sendPixel(pixel){
    socket.emit('pixel', pixel);
}