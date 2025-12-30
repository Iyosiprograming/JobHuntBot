import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { registerBot } from "./registerBot.js";

dotenv.config();

// Create a single bot instance
export const bot = new Telegraf(process.env.BOT_TOKEN as string);

registerBot();

// Launch the bot
bot.launch()
  .then(() => console.log("Telegram bot started"))
  .catch(console.error);

// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
