import express from "express";
import path from "path";
const app = express();

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
export const io = new Server(server);

import { emitMessage } from "./ws/Chat.ws";
import { clearCanvas, emitPixels, receivePixel } from "./ws/Canvas.ws";

app.use("/", express.static(path.join(__dirname, "../app")));

io.on("connection", (socket) => {
	console.log("a user connected");

	// send message to newly connected user
	emitPixels(socket);
	
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});

	socket.on("message" , emitMessage);
	socket.on("pixel", receivePixel);
	socket.on("clear", clearCanvas);
});

server.listen(3000, () => {
	console.log("listening on http://localhost:3000");
});