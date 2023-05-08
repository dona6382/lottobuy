const TelegramBot = require('node-telegram-bot-api');

// 봇 토큰을 설정합니다.
const token = '6217714890:AAHMlqq4lYAn76us-Lwl6R4xvFVsZdEVmTU';

// TelegramBot 객체를 생성합니다.
const bot = new TelegramBot(token, {polling: true});

// 봇이 메시지를 받았을 때 동작할 코드를 작성합니다.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // "hello"라는 메시지를 받으면 "world"라는 메시지를 보냅니다.
    if (text === 'hello') {
        bot.sendMessage(chatId, 'world!!');
    }
});
