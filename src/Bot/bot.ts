import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { registerBot } from "./registerBot.js";

dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN as string;
// Create a single bot instance
export const bot = new Telegraf(BOT_TOKEN || "8105619565:AAGQzbP8IAcP3kotyq3HcigUZ-lsQ3ZYeQI");

registerBot();

// Launch the bot
bot.launch()
  .then(() => console.log("Telegram bot started"))
  .catch(console.error);

// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
