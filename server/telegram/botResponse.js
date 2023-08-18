const TelegramBot = require('node-telegram-bot-api');

const {handleMessage} = require("./responseHandler");


// const token = process.env.TELEGRAM_BOT_TOKEN;
const token = '6217714890:AAHMlqq4lYAn76us-Lwl6R4xvFVsZdEVmTU'

const bot = new TelegramBot(token, {polling: true});

let chatId = '';


bot.on('message', async (msg) => {
    chatId = msg.chat.id;
    const text = msg.text;

    const slashContain = text.charAt(0);

    if(slashContain === '/'){
        const commandMessage = text.slice(1);
        await handleMessage(commandMessage);
    }else{
        const slashNotContain = '\/로 시작하는 명령어가 아닙니다. \n /help 명령어를 입력해 보세요';
        await sendResponse(slashNotContain);
    }
});

async function sendResponse(message) {
    await bot.sendMessage(chatId, message);
}

module.exports = {sendResponse};
