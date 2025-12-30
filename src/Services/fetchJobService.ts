import Parser from "rss-parser";
import * as cheerio from "cheerio";

const parser = new Parser();
const jobArray = [];
// List of feeds
const FEED_URLS = [
    "https://weworkremotely.com/categories/remote-programming-jobs.rss",
    "https://remoteok.com/remote-jobs.rss",
    "https://weworkremotely.com/remote-jobs.rss",
    "https://www.workanywhere.pro/rss/developer.xml"
];

async function fetchJobs() {
    for (const url of FEED_URLS) {
        console.log(`Fetching jobs from: ${url}\n`);

        let feed;
        try {
            feed = await parser.parseURL(url);
        } catch (err: any) {
            // Log error but continue
            console.error(`⚠ Failed to fetch ${url}:`, err.message || err);
            continue; // skip to next feed immediately
        }

        feed.items.forEach(job => {
            const $ = cheerio.load(job.content || job.description || "");
            const cleanText = $.text().replace(/\s+/g, ' ').trim();
            console.log("Job fetching working");

            jobArray.push({
                title: job.title,
                link: job.link,
                pubDate: job.pubDate,
                content: cleanText
            })
        });

    }
}

export default fetchJobs
