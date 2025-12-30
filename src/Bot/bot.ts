import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { registerBot } from "./registerBot.js";
import { startCronJob } from "../Services/cronJobService.js";
import connectDB from "../Config/dbConfig.js";

dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN as string;

export const bot = new Telegraf(BOT_TOKEN);

const startBot = async () => {
  try {
    // Connect to DB first
    await connectDB();

    registerBot();

    startCronJob();

    // Launch bot
    await bot.launch();
    console.log("Telegram bot started");

    // Graceful shutdown
    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
  } catch (err) {
    console.error("Failed to start bot:", err);
  }
};

startBot();
