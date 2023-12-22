import {getUser, insertUser} from "../user/user";
import {sendResponse} from "../telegram/botResponse";
import {BUYMODE} from "../commandVariable";
import {pageOpen} from "../puppeteer/lottePage";

import {textSplit} from "../../lib/util";

async function extractBuySplit(chatId:number, text: string): Promise<string[] | undefined> {
    const textSplitResult = textSplit(text);

    if (textSplitResult.length === 4) {
        return textSplitResult;
    } else {
        const unValidMessage = '/buy mode id number(max <= 5) 형식에 맞춰주세요';
        await sendResponse(chatId, unValidMessage);
    }
}

async function lottoBuyFlow(chatId: number, extractBuyList: string[]): Promise<void> {
    const buyRequest = extractBuyList[1];
    const userId = extractBuyList[2];
    const buyAmount = extractBuyList[3];
    const buyAmountType = parseInt(buyAmount);

    async function sendErrorMessage(errorMessage: string): Promise<void> {
        await sendResponse(chatId, errorMessage);
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
                const resultMessage = await pageOpen(getUserInfo, buyAmount, "buy", BUYMODE.AUTO);

                await sendErrorMessage(resultMessage);
                await sendErrorMessage('[END] buy flow');
            }
            break;

        default:
            await sendErrorMessage('[BUY MODE ERROR] 구매 방법을 확인해주시기 바랍니다.');
            break;
    }
}




export {lottoBuyFlow, extractBuySplit};