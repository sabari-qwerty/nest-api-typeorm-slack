require('dotenv').config();

export const SlackConfig = {
  channel: process.env.SLACK_CHANNEL,
  token: process.env.SLACK_TOKEN,
  botName: process.env.SLACK_BOTNAME,
  icon: process.env.SLACK_ICON,
  url: process.env.SLACK_URL,
};
