const TelegramBot = require('node-telegram-bot-api');
const lottoPage = require('../puppeteer/lottePage');
const {insertUser, getUser} = require("../user/user");


// const token = process.env.TELEGRAM_BOT_TOKEN;
const token = '6217714890:AAHMlqq4lYAn76us-Lwl6R4xvFVsZdEVmTU'

const bot = new TelegramBot(token, {polling: true});

let chatId = '';

const COMMANDS = {
    HELLO: 'hello',
    BUY: 'buy',
    HELP: 'help',
    NEW_USER: 'new',
};

const BUYMODE = {
    AUTO: 'auto',
};

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

async function handleMessage(text) {
    let sendMessage = '';

    if(text === COMMANDS.HELP){
        sendMessage = '/help \n도움메시지\n' +
                      '/buy 구매방법 아이디 구매수량(max 5) \n해당 아이디에 구매\n' +
                      '/new 아이디 비밀번호 \n신규 계정 추가\n'
        ;
    } else if (text.includes(COMMANDS.BUY)) {
        const extractBuyList = await extractBuySplit(text);

        if(extractBuyList){
            await lottoBuyFlow(extractBuyList);
        }
    } else if (text.includes(COMMANDS.NEW_USER)) {
        const extractNewUserList = await extractNewUserSplit(text);

        if(extractNewUserList){
            await insertUserFlow(extractNewUserList);
        }
    } else {
        sendMessage = '일치하는 명령어가 없습니다. \n /help 명령어를 입력해 보세요';
    }
    if(sendMessage !== ''){
        await sendResponse(sendMessage);
    }
}

async function sendResponse(message) {
    await bot.sendMessage(chatId, message);
}

async function lottoBuyFlow(extractBuyList){
    const buyRequest = extractBuyList[1];
    const userId = extractBuyList[2];
    const buyAmount = extractBuyList[3];
    const buyAmountType = parseInt(buyAmount);

    switch (buyRequest){
        case BUYMODE.AUTO:
            const getUserInfo = await getUser(userId);
            const getUserPw = getUserInfo.userPassword;

            if(!getUserPw){
                const message = '[USER NAME ERROR] 해당하는 계정이 없습니다.';
                await sendResponse(message);
                return;
            }

            if(buyAmountType){
                if(buyAmount > 5){
                    const message = '[BUY AMOUNT ERROR] 구매 요청 수량이 5보다 큽니다.';
                    await sendResponse(message);
                }else{
                    console.log(`${buyAmount}개 구매요청`);

                    // TODO
                    // await lottoPage.pageOpen(uesrId, extractNumber);

                    const message = '[END]buy flow';
                    await sendResponse(message);
                }
            }else{
                const message = '[BUY AMOUNT ERROR] 구매 요청 수량이 숫자가 아닙니다';
                await sendResponse(message);
            }
            break;

        default:
            const message = '[BUY MODE ERROR] 구매 방법을 확인해주시기 바랍니다.';
            await sendResponse(message);
            return;
    };
}

async function extractBuySplit(text){
    const textSplitResult = textSplit(text);

    if(textSplitResult.length === 4){
        return textSplitResult;
    }else{
        const unValidMessage = '/buy mode id number(max <= 5) 형식에 맞춰주세요';
        await sendResponse(unValidMessage);
    }
}

async function extractNewUserSplit(text){
    const textSplitResult = textSplit(text);

    if(textSplitResult.length === 3){
        return textSplitResult;
    }else{
        const unValidMessage = '/new id pw 형식에 맞춰주세요';
        await sendResponse(unValidMessage);
    }
}

async function insertUserFlow(extractNewUserList){
    const userId = extractNewUserList[1];
    const userPw = extractNewUserList[2];

    const getUserInfo = await getUser(userId);
    const getUserPw = getUserInfo.userPassword;

    if(!getUserPw){ // DB에 없는경우에 추가
        const insertUserResult = await insertUser(userId, userPw);
        console.log(`${userId} 계정 추가 완료`);
    }else{
        console.log(`${userId} 이미 등록된 계정입니다.`);
    }
}

function textSplit(text) {
    const outPutText = text.split(' ');

    return outPutText;
}