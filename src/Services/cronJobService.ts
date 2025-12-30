import cron from "node-cron";
import filterJobService from "./filterJobService.js"

/**
 * Schedule job to run every 5 minutes
 */
export function startCronJob() {
  cron.schedule("*/5 * * * *", async () => {
    console.log("Running job filter service...", new Date().toISOString());
    try {
      await filterJobService();
      console.log("Job filter service completed successfully.");
    } catch (err) {
      console.error("Error running job filter service:", err);
    }
  });
}

export default startCronJob