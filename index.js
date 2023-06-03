const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = "6165869458:AAGDyfd9C7VAIPKvNxEuOccq8adzJWjXzqE";
const webAppUrl = "https://tiny-cobbler-781dee.netlify.app/";

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    await bot.sendMessage(chatId, 'hello')
    if(text === '/start') {
        await bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'click', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }
  });

app.post('/web-data', async (req, res) => {
    const {queryId} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))