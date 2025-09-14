import Redis from "ioredis";

const redisHost: string = process.env.REDIS_HOST || "localhost";
const redisPort: number = parseInt(process.env.REDIS_PORT!) || 6379;

export const redisClient = new Redis({
  host: redisHost,
  port: redisPort,
});
console.log(redisClient);
