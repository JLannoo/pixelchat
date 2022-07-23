import express from "express";
import path from "path";
const app = express();

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
export const io = new Server(server);

import { emitMessage , emitWelcome } from "./ws/Chat.ws";
import { clearCanvas, emitPixels, receivePixel } from "./ws/Canvas.ws";

app.use("/", express.static(path.join(__dirname, "../app")));

import { serveHeatMap } from "./heatmap";
app.get("/heatmap", (req, res) => {
	serveHeatMap(req, res);
});

io.on("connection", (socket) => {
	// send message to newly connected user
	emitPixels(socket);
	
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});

	socket.on("welcome" , emitWelcome);
	socket.on("message" , emitMessage);
	socket.on("pixel", receivePixel);
	socket.on("clear", clearCanvas);
});

const URL = process.env.RAILWAY_ENVIRONMENT === "production" ? `https://${process.env.RAILWAY_STATIC_URL}` : "http://localhost";
const PORT = process.env.RAILWAY_ENVIRONMENT === "production" ? process.env.PORT : 3000;

server.listen(PORT, () => {
	console.log(`listening on port ${URL}:${PORT}`);
});