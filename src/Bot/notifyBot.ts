import { Markup } from "telegraf";

export function jobUI(job: any) {
  const description =
    job.content && job.content.length > 180
      ? job.content.slice(0, 180) + "…"
      : job.content || "No description available.";

  return {
    text: `
💼 <b>${job.title}</b>

📝 ${description}

📅 <i>${job.pubDate || "Date not available"}</i>
`,
    parse_mode: "HTML",
    // Make sure reply_markup is the raw object
    reply_markup: Markup.inlineKeyboard([
      Markup.button.url("🚀 Apply Now", job.link)
    ]).reply_markup // <-- key part
  };
}
