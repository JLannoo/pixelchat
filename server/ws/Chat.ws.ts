import { ChatMessage } from "../../types";
import { io } from "../server";

export function emitMessage(msg: ChatMessage){
    console.log(`New message from ${msg.username}: ${msg.message}`);
    io.emit("message", msg);
}