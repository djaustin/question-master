import redis from "redis";

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
});

client.on("error", function (error) {
  console.log(error);
});

export const redisClient = client;
