import fetchJobs from "./fetchJobService.js";
import Job from "../Models/jobModel.js";
import User from "../Models/userModel.js";
import { jobUI } from "../Bot/notifyBot.js";
import { bot } from "../Bot/bot.js"

const filterJobService = async () => {
  const jobs: any = await fetchJobs();
  const users = await User.find({});

  if (users.length === 0) return;

  for (const job of jobs) {
    const existingJob = await Job.findOne({ link: job.link });
    if (existingJob) continue;

    for (const user of users) {
      const userFilters = user.filter || [];
      const jobContent = (job.title + " " + (job.content || "")).toLowerCase();

      const matches = userFilters.some(f =>
        jobContent.includes(f.toLowerCase())
      );

      if (!matches) continue;

      // Save job
      await new Job({
        title: job.title,
        link: job.link,
        pubDate: job.pubDate,
        content: job.content
      }).save();

      // ✅ SEND TELEGRAM MESSAGE
      const msg = jobUI(job);

      await bot.telegram.sendMessage(user.tgId, msg.text, {
        parse_mode: msg.parse_mode as any,
        reply_markup: msg.reply_markup as any// this is now a plain JS object Telegram understands
      });



    }
  }
};

export default filterJobService;
