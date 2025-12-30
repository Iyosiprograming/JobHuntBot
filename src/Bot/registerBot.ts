// registerBot.ts
import { bot } from "./bot.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.API_URL || "http://localhost:5000/api/user/create";

export function registerBot() {
  // /start handler
  bot.start(async (ctx) => {
    try {
      const tgId = ctx.from?.id;
      const tgUsername = ctx.from?.username || "";

      if (!tgId) return;

      // Call your API using Axios
      const response = await axios.post(API_URL, { tgId, tgUsername });
      const data = response.data;

      if (data.success) {
        await ctx.reply(`Welcome ${tgUsername || "User"}! You have been registered.`);
      } else {
        await ctx.reply(`Welcome back ${tgUsername || "User"}! You are already registered.`);
      }

      // Show help after registration
      await ctx.reply(
        "Use /help to see how to set your filters and get job notifications."
      );
    } catch (err) {
      console.error("Error in /start handler:", err);
      await ctx.reply("An error occurred while registering you.");
    }
  });

  // /help handler
  bot.help(async (ctx) => {
    await ctx.reply(
      "Here’s how to use the Job Hunter Bot:\n\n" +
      "1. Use /start to register.\n" +
      "2. Set your filters (keywords) in the app or API.\n" +
      "3. Receive job notifications automatically.\n" +
      "4. Click the 'Apply Job' button in messages to apply."
    );
  });
}
