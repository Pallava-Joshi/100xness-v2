import WebSocket from "ws";
import "dotenv/config";
import { redisClient } from "@repo/redis/client";

const url = process.env.WEBSOCKET_URL || "";

redisClient.on("connect", () => {
  console.log("connected to redis");
});

redisClient.on("error", (err: any) => {
  console.log("error connecting to redis", err);
});

const ws = new WebSocket(url);
ws.on("error", console.error);

ws.on("open", function open() {
  const subscribeMessage = {
    method: "SUBSCRIBE",
    params: ["bookTicker.BTC_USDC"],
    id: 1,
  };
  ws.send(JSON.stringify(subscribeMessage));
  console.log("sent", subscribeMessage);
});

ws.on("message", async function message(data) {
  const parsedData = JSON.parse(data.toString());
  // console.log(parsedData.data);
  const asset = parsedData.data.s;
  const bestBid = parseFloat(parsedData.data.b);
  const price_updates = {
    asset: asset,
    price: Math.round(bestBid * 1e6),
    decimal: 6,
  };
  console.log(price_updates);
  try {
    await redisClient.xadd(
      "price_update_stream",
      "*",
      "data",
      JSON.stringify({ price_updates: price_updates })
    );
  } catch (e) {
    console.log(e);
  }
});
