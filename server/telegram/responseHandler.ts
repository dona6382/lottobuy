import { BUYMODE, COMMANDS } from "../commandVariable";
import { getUser, insertUser } from "../user/user";
import {pageOpen} from '../puppeteer/lottePage';

import { sendResponse } from "./botResponse";

async function handleMessage(chatId: number, text: string): Promise<void> {
    let sendMessage = '';

    // TODO: 기능 추가
    // 잔액 조회, 당첨 결과 확인, 이번주 선택한 목록 보기 등

    if (text === COMMANDS.HELP) {
        sendMessage = '/help \n도움 메시지\n' +
            '/buy 구매방법 아이디 구매수량(max 5) \n해당 아이디에 구매\n' +
            '/new 아이디 비밀번호 \n신규 계정 추가\n';
    } else if (text.includes(COMMANDS.BUY)) {
        const extractBuyList = await extractBuySplit(text);

        if (extractBuyList) {
            await lottoBuyFlow(extractBuyList);
        }
    } else if (text.includes(COMMANDS.NEW_USER)) {
        const extractNewUserList = await extractNewUserSplit(text);

        if (extractNewUserList) {
            await insertUserFlow(extractNewUserList);
        }
    } else {
        sendMessage = '일치하는 명령어가 없습니다. \n /help 명령어를 입력해 보세요';
    }
    if (sendMessage !== '') {
        await sendResponse(chatId, sendMessage);
    }
}

async function lottoBuyFlow(extractBuyList: string[]): Promise<void> {
    const buyRequest = extractBuyList[1];
    const userId = extractBuyList[2];
    const buyAmount = extractBuyList[3];
    const buyAmountType = parseInt(buyAmount);

    async function sendErrorMessage(errorMessage: string): Promise<void> {
        await sendResponse(null, errorMessage);
    }

    switch (buyRequest) {
        case BUYMODE.AUTO:
            const getUserInfo = await getUser(userId);
            const getUserPw = getUserInfo.userPassword;

            if (!getUserPw) {
                await sendErrorMessage('[USER NAME ERROR] 해당하는 계정이 없습니다.');
                return;
            }

            if (isNaN(buyAmountType)) {
                await sendErrorMessage('[BUY AMOUNT ERROR] 구매 요청 수량이 숫자가 아닙니다.');
            } else if (buyAmountType > 5) {
                await sendErrorMessage('[BUY AMOUNT ERROR] 구매 요청 수량이 5보다 큽니다.');
            } else {
                console.log(`${buyAmount}개 구매요청`);
                // TODO
                const resultMessage = await pageOpen(getUserInfo, buyAmount, BUYMODE.AUTO);

                await sendErrorMessage(resultMessage);
                await sendErrorMessage('[END] buy flow');
            }
            break;

        default:
            await sendErrorMessage('[BUY MODE ERROR] 구매 방법을 확인해주시기 바랍니다.');
            break;
    }
}

async function extractBuySplit(text: string): Promise<string[] | undefined> {
    const textSplitResult = textSplit(text);

    if (textSplitResult.length === 4) {
        return textSplitResult;
    } else {
        const unValidMessage = '/buy mode id number(max <= 5) 형식에 맞춰주세요';
        await sendResponse(null, unValidMessage);
    }
}

async function extractNewUserSplit(text: string): Promise<string[] | undefined> {
    const textSplitResult = textSplit(text);

    if (textSplitResult.length === 3) {
        return textSplitResult;
    } else {
        const unValidMessage = '/new id pw 형식에 맞춰주세요';
        await sendResponse(null, unValidMessage);
    }
}

async function insertUserFlow(extractNewUserList: string[]): Promise<void> {
    const userId = extractNewUserList[1];
    const userPw = extractNewUserList[2];

    const getUserInfo = await getUser(userId);
    const getUserPw = getUserInfo.userPassword;

    if (!getUserPw) {
        // DB에 없는 경우 추가
        const insertUserResult = await insertUser(userId, userPw);
        console.log(`${userId} 계정 추가 완료`);
    } else {
        console.log(`${userId} 이미 등록된 계정입니다.`);
    }
}

function textSplit(text: string): string[] {
    const outPutText = text.split(' ');

    return outPutText;
}

export { handleMessage };
