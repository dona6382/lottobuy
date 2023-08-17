const TelegramBot = require('node-telegram-bot-api');
const lottoPage = require('../puppeteer/lottePage');

// const token = process.env.TELEGRAM_BOT_TOKEN;
const token = '6217714890:AAHMlqq4lYAn76us-Lwl6R4xvFVsZdEVmTU'

const bot = new TelegramBot(token, {polling: true});

const COMMANDS = {
    HELLO: 'hello',
    BUY: 'buy',
    HELP: 'help'
};

bot.on('message', async (msg) => {
    await handleMessage(msg);
});

async function handleMessage(msg) {
    const chatId = msg.chat.id;
    const text = msg.text;

    let sendMessage = '';

    if (text.includes(COMMANDS.BUY)) {
        sendMessage = await lottoBuyFlow(text);
    } else if (text === COMMANDS.HELP) {
        sendMessage = 'Help Message';
    } else {
        sendMessage = '일치하는 명령어가 없습니다.';
    }
    await sendResponse(chatId, sendMessage);
}

async function sendResponse(chatId, message) {
    const sendMessage = await bot.sendMessage(chatId, message);
}

async function lottoBuyFlow(text){
    const extractNumber = extractFromText(text);

    const extractNumberType = typeof extractNumber;

    if(extractNumberType === 'number'){
        console.log(`${extractNumber}개 구매요청`);
        const message = '[END]buy flow';
        return message;
    }else {
        const unValidMessage = 'buy number(max <= 5) 형식에 맞춰주세요';
        return unValidMessage;
    }
}

function extractFromText(inputText) {
    const words = inputText.split(' ');

    if (words.length >= 2) {
        const extractedNumber = parseInt(words[1]);
        return extractedNumber;
    } else {
        return null;
    }
}