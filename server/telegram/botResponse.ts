import TelegramBot from 'node-telegram-bot-api';
import { handleMessage } from './responseHandler';

const token = process.env.TELEGRAM_BOT_TOKEN || '6217714890:AAHMlqq4lYAn76us-Lwl6R4xvFVsZdEVmTU';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!text) {
        // Handle the case where msg.text is undefined or falsy
        return;
    }

    const slashContain = text.charAt(0);

    if (slashContain === '/') {
        const commandMessage = text.slice(1);
        await handleMessage(chatId, commandMessage);
    } else {
        const slashNotContain = '명령어는 항상 슬래시 (/)로 시작해야 합니다. /help 명령어를 입력해 보세요.';
        await sendResponse(chatId, slashNotContain);
    }
});

async function sendResponse(chatId: number| null, sendMessage: string) {
    try {
        if(chatId !== null){
            await bot.sendMessage(chatId, sendMessage);
        }
    } catch (error: any) {
        console.error(`Error sending message: ${error.message}`);
    }
}

export { sendResponse };
