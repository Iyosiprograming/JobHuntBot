import axios from "axios";
import { htmlToText } from "html-to-text";
import he from "he";

const URL = "https://remoteok.com/api";
const jobArray = [];

/* Clean HTML job descriptions */
function cleanDescription(rawHtml = "") {
  const decoded = he.decode(rawHtml);

  const text = htmlToText(decoded, {
    wordwrap: false,
    selectors: [{ selector: "a", options: { ignoreHref: true } }]
  });

  return text
    .replace(/Please mention the word.*$/gis, "")
    .replace(/#RMTU.*$/gis, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* Normalize RemoteOK job */
function normalizeJob(job) {
  if (!job.url) return null; // skip jobs without URL

  return {
    company: job.company || "Unknown",
    title: job.position || "No title",
    tags: job.tags || [],
    location: job.location || "Remote",
    salary:
      job.salary_min && job.salary_max
        ? `$${job.salary_min} - $${job.salary_max}`
        : "Not specified",
    applyUrl: job.apply_url || job.url,
    url: job.url,
    date: job.date || new Date().toISOString(),
    description: cleanDescription(job.description)
  };
}

/* Fetch jobs */
export const fetchJobService = async () => {
  try {
    const { data } = await axios.get(URL);

    // Remove metadata row + normalize, filter out invalid jobs
    const jobs = data
      .slice(1)
      .map(normalizeJob)
      .filter(job => job !== null);

    console.log(`Fetched ${jobs.length} jobs`);
    jobArray.push(...jobs);

    return jobs;
  } catch (error) {
    console.error("Error fetching job data:", error.message);
    throw error;
  }
};
