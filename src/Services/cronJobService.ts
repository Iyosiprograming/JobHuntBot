import cron from "node-cron";
import filterJobService from "./filterJobService.js";

// run every 8 am in the moarning
export function startCronJob() {
  cron.schedule("0 8 * * *", async () => { 
    console.log("Running job filter service...", new Date().toISOString());
    try {
      await filterJobService();
      console.log("Job filter service completed successfully.");
    } catch (err) {
      console.error("Error running job filter service:", err);
    }
  });
}

export default startCronJob;
