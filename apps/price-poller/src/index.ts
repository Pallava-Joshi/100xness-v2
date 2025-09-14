import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.WEBSOCKET_URL || "";

const ws = new WebSocket(url);
ws.on("error", console.error);

ws.on("open", function open() {
  const payload = {
    method: "SUBSCRIBE",
    params: ["depth.SOL_USDC"],
  };

  ws.send(JSON.stringify(payload));
});

ws.on("message", function message(data) {
  console.log("received: %s", data);
});
