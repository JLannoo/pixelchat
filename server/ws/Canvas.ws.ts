import type { PixelMessage } from "../../types";
import type { Socket } from "socket.io";

import { io } from "../server";

import fs from "fs";
import path from "path";

const PIXELS_PATH = path.join(__dirname, "../storage/pixels.json");

export function receivePixel(pixel: PixelMessage){
    console.log(`New pixel from ${pixel.username}: (${pixel.x}, ${pixel.y})`);

    const pixels = JSON.parse(fs.readFileSync(PIXELS_PATH, "utf8"));
    pixels.push(pixel);
    fs.writeFileSync(PIXELS_PATH, JSON.stringify(pixels));

    io.emit("pixel", pixel);
}

export function emitPixels(socket: Socket){
    const pixels = JSON.parse(fs.readFileSync(PIXELS_PATH, "utf8"));
    socket.emit("pixels", pixels);
}

export function clearCanvas(){
    fs.writeFileSync(PIXELS_PATH, "[]");
    io.emit("clear");
}