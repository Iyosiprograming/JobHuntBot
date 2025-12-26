import { fetchJobService } from "./fetchJobService.js";
import User from "../Models/userModel.js";
import Job from "../Models/jobModel.js";

export const filterJobService = async () => {
  try {
    const jobs = await fetchJobService();
    const users = await User.find({});

    for (const job of jobs) {
      if (!job.url) continue; 

      await Job.updateOne(
        { sourceUrl: job.url },
        {
          title: job.title,
          company: job.company,
          tags: job.tags,
          location: job.location,
          salary: job.salary,
          applyUrl: job.applyUrl,
          sourceUrl: job.url,
          description: job.description,
          publishedAt: job.date
        },
        { upsert: true }
      );

      // Match job to users
      for (const user of users) {
        const { title, tags, location } = user.filter || {};

        const titleMatch = title
          ? job.title.toLowerCase().includes(title.toLowerCase())
          : true;

        const tagMatch = tags?.length
          ? tags.some(tag =>
              job.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
            )
          : true;

        const locationMatch = location
          ? job.location.toLowerCase().includes(location.toLowerCase())
          : true;

        if (titleMatch && tagMatch && locationMatch) {
          console.log(`Matched "${job.title}" for user ${user.telegramId}`);
          // sendTelegramMessage(...)
        }
      }
    }
  } catch (error) {
    console.error("Error filtering jobs:", error);
    throw error;
  }
};

