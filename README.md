# JobHuntBot

JobHuntBot fetches remote tech job listings from multiple RSS feeds and sends them to a Telegram bot. Users can register and set keyword filters to receive only relevant jobs.

## RSS Feeds

- [We Work Remotely - Programming Jobs](https://weworkremotely.com/categories/remote-programming-jobs.rss)  
- [Remote OK](https://remoteok.com/remote-jobs.rss)  
- [Remotive](https://remotive.com/feed)  
- [WorkAnywhere - Developer Jobs](https://workanywhere.pro/rss/developer.xml)  

## How it works

1. **User Registration**  
   - Users register with the Telegram bot.  
   - Set up a filter with keywords (e.g., `React`, `Node`, `TypeScript`).  

2. **Job Fetching**  
   - The bot fetches jobs from all RSS feeds.  
   - Cleans job content and removes HTML.  

3. **Filtering & Sending**  
   - Filters jobs based on each user's keywords.  
   - Sends matching jobs to the user's Telegram account.  

## Tech Stack

- Node.js + TypeScript  
- MongoDB (to store users, filters, and jobs)  
- RSS Parser + Cheerio (fetch & clean job content)  
- Telegram Bot API  

