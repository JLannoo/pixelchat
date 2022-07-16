let canvas;

const CANVAS_SIZE = 500;
const PIXEL_AMOUNT = 25;
const PIXEL_SIZE = CANVAS_SIZE / PIXEL_AMOUNT;

function setup(){
    canvas = createCanvas(CANVAS_SIZE , CANVAS_SIZE);
    noStroke();
    background(0);
}

function draw(){
    drawPixels();
    noLoop();
}

/**
 * @typedef {Object} Pixel
 * @property {number} x
 * @property {number} y
 * @property {string} color
 * @property {string} username
 * 
 * 
 * Draws a pixel on the canvas
 * @param {Pixel} pixel 
 */
function drawPixel(pixel){
    fill(pixel.color);
    rect(pixel.x * PIXEL_SIZE, pixel.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    redraw();
}

/**
 * Draws all pixels on the canvas
 * @param {Pixel[]} pixels 
 */
function drawPixels(pixels){
    try {
        for(const pixel of pixels){
            fill(pixel.color);
            rect(pixel.x * PIXEL_SIZE, pixel.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Clears the canvas
 */
function clearCanvas(){
    background(0);
    redraw();
}

/**
 * Monitors mouse presses
 */
function mousePressed(){
    if(mouseX < 0 || mouseX > CANVAS_SIZE || mouseY < 0 || mouseY > CANVAS_SIZE){
        return;
    }

    const username = document.querySelector('#username').value;

    if(!username) {
        alert("Fill all fields");
    }

    const x = Math.floor(mouseX / PIXEL_SIZE);
    const y = Math.floor(mouseY / PIXEL_SIZE);
    const color = "red";

    const pixel = {x, y, color, username};

    sendPixel(pixel);
}