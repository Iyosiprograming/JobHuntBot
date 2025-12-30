import fetchJobs from "./fetchJobService.js";
import Job from "../Models/jobModel.js";
import User from "../Models/userModel.js";

const filterJobService = async () => {
  //  Fetch jobs from RSS feeds
  const jobs: any = await fetchJobs(); 

  // 2️ Get all users
  const users = await User.find({});
  if (users.length === 0) {
    console.log("No user found");
    return;
  }

  // Loop through jobs
  for (const job of jobs) {
    // Check if job already exists
    const existingJob = await Job.findOne({ link: job.link });
    if (existingJob) {
      console.log(`Job already exists: ${job.title}`);
      continue;
    }

    // 4️ Loop through users and check filters
    for (const user of users) {
      const userFilters = user.filter || []; // array of keywords
      const jobContent = (job.title + " " + (job.content || job.description || "")).toLowerCase();

      // If any filter matches
      const matches = userFilters.some(f => jobContent.includes(f.toLowerCase()));

      if (matches) {
        console.log(`Job matches user ${user.tgUsername}: ${job.title} -> ${job.link}`);

        // Save job to database
        const newJob = new Job({
          title: job.title,
          link: job.link,
          pubDate: job.pubDate,
          content: job.content
        });
        await newJob.save();

        // Optionally: send Telegram message to user
      }
    }
  }
};

export default filterJobService;
