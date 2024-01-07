import Bot from "node-telegram-bot-api";
import { TOKEN, ADMIN_ID, NODE_ENV } from "./config/app.config";
import * as process from "process";

try {
  if (!TOKEN) throw new Error("TOKEN is null or undefined");
  if (!ADMIN_ID) throw new Error("ADMIN_ID is null or undefined");
  if (NODE_ENV === 'development' && !process.argv[2]) throw new Error('ngrok url is not define')

  const bot = new Bot(TOKEN, { polling: true });

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Ниже появится кнопка "Заказать"', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Заказать",
              web_app: { url: process.argv[2] },
            },
          ],
        ],
      },
    });
  });

  bot.onText(/\/send_admin (.+)/, (_, match) => {
    const commandText = match?.[1];

    if (commandText) {
      bot.sendMessage(ADMIN_ID, commandText);
    } else {
      throw new Error("commandText is empty");
    }
  });
} catch (error) {
  console.error(error);
}
