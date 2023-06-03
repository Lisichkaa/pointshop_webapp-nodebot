const express = require('express');
const cors = require('cors');

const { Telegraf } = require("telegraf");
const { message } = require('telegraf/filters');
const TOKEN = "6165869458:AAGDyfd9C7VAIPKvNxEuOccq8adzJWjXzqE";
const bot = new Telegraf(TOKEN);

const web_link = "https://tiny-cobbler-781dee.netlify.app/";

const app = express();
app.use(express.json());
app.use(cors());

bot.start((ctx) =>
  ctx.reply("Lisichka Shop!))))", {
    reply_markup: {
      inline_keyboard: [[{ text: "shop", web_app: { url: web_link } }]],
    },
  })
);

bot.on(message, async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  await msg.sendMessage("[eq")
});

bot.launch();

app.post("/web-data", (req, res) => {
  
  const {queryId} = req.body;
  try {
    bot.answerWebAppQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Успешная покупка',
      input_message_content: {
      message_text: "Поздравляю с покупкой очков"
    },
  });
  return res.status(200).json({});
  } catch (e) {
    return res.status(500).json({})
  }
})

const PORT = 4000;
app.listen(PORT, () => console.log('server started on PORT ' + PORT))