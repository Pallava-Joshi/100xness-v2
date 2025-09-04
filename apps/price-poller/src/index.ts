import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";
dotenv.config();
const ws = new WebSocket(process.env.WEBSOCKET_URL);
