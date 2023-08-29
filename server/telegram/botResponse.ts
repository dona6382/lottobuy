import TelegramBot from 'node-telegram-bot-api';

import { handleMessage } from './responseHandler';

// const token = process.env.TELEGRAM_BOT_TOKEN;
const token = '6217714890:AAHMlqq4lYAn76us-Lwl6R4xvFVsZdEVmTU';

const bot = new TelegramBot(token, { polling: true });

let chatId: number | string = '';

bot.on('message', async (msg) => {
    chatId = msg.chat.id;
    const text = msg.text;

    if (text) { // Check if text is defined
        const slashContain = text.charAt(0);

        if (slashContain && slashContain === '/') {
            const commandMessage = text.slice(1);
            await handleMessage(commandMessage);
        } else {
            const slashNotContain = '\/로 시작하는 명령어가 아닙니다. \n /help 명령어를 입력해 보세요';
            await sendResponse(slashNotContain);
        }
    } else {
        // Handle the case where msg.text is undefined or falsy
        // You can choose to ignore it or handle it differently
    }
});


async function sendResponse(message: string) {
    await bot.sendMessage(chatId, message);
}

export { sendResponse };
