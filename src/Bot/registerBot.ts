import { bot } from "./bot.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.API_URL 

export function registerBot() {
  // /start handler
  bot.start(async (ctx) => {
    try {
      const tgId = String(ctx.from?.id);
      const tgUsername = ctx.from?.username || "";

      if (!tgId) return;

      const response = await axios.post(`${API_URL}/create`, { tgId, tgUsername });
      const data = response.data;

      if (data.success) {
        await ctx.reply(`Welcome ${tgUsername || "User"}! You have been registered.`);
      } else {
        await ctx.reply(`Welcome back ${tgUsername || "User"}! You are already registered.`);
      }

      await ctx.reply("Use /help to see how to set your filters and get job notifications.");
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
      "2. Set your filters using /setfilter keyword1, keyword2\n" +
      "3. Receive job notifications automatically.\n" +
      "4. Click the 'Apply Job' button in messages to apply."
    );
  });

  // /setfilter handler
  bot.command("setfilter", async (ctx) => {
    try {
      const tgId = String(ctx.from?.id);
      if (!tgId) return;

      const messageText = ctx.message?.text || "";
      const filterText = messageText.replace("/setfilter", "").trim();

      if (!filterText) {
        return ctx.reply("Please provide keywords separated by commas. Example:\n/setfilter nodejs, react, typescript");
      }

      const filterArray = filterText.split(",").map(f => f.trim()).filter(f => f);

      if (!filterArray.length) {
        return ctx.reply("You must provide at least one keyword.");
      }

      const response = await axios.post(`${API_URL}/updateFilter`, { tgId, filter: filterArray });
      const data = response.data;

      if (data.success) {
        await ctx.reply(`Your filters have been updated: ${filterArray.join(", ")}`);
      } else {
        await ctx.reply("Failed to update filters. Please try again.");
      }
    } catch (err) {
      console.error("Error updating filters:", err);
      await ctx.reply("An error occurred while updating your filters.");
    }
  });
}
