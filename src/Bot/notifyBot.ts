import { Telegraf, Markup } from "telegraf";
import dotenv from "dotenv";

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN as string);


export function jobUI(job:any) {
  const description =
    job.content.length > 150
      ? job.content.slice(0, 150) + "..."
      : job.content;

  return {
    text: `
<b>${job.title}</b>

${description}

<i>${job.pubDate}</i>
`,
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([
      Markup.button.url("Apply Job", job.link)
    ])
  };
}


