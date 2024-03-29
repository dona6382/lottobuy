import {getUser, insertUser} from "../user/user";

import {BUYMODE, VIEWMODE} from "../commandVariable";

import {textSplit} from "../../lib/util";
import {sendResponse} from "../telegram/botResponse";
import {pageOpen} from "../puppeteer/lottePage";

async function extractViewSplit(chatId:number, text: string): Promise<string[] | undefined> {
    const textSplitResult = textSplit(text);

    if (textSplitResult.length === 3) {
        return textSplitResult;
    } else {
        const unValidMessage = '/view mode id 형식에 맞춰주세요';
        await sendResponse(chatId, unValidMessage);
    }
}


async function viewFlow(chatId: number, extractViewList: string[]): Promise<void> {
    const viewRequest = extractViewList[1];

    const userId = extractViewList[2];

    const getUserInfo = await getUser(userId);

    async function sendErrorMessage(errorMessage: string): Promise<void> {
        await sendResponse(chatId, errorMessage);
    }

    switch (viewRequest){
        case VIEWMODE.BALANCE:
            const resultMessage = await pageOpen(getUserInfo, "0", "view", VIEWMODE.BALANCE);
            await sendErrorMessage(resultMessage);
            await sendErrorMessage('[END] view flow');
            break;
        case VIEWMODE.RESULT:

            break;

        case VIEWMODE.LIST:

            break;

        default:
            await sendErrorMessage('[VIEW MODE ERROR] 조회 방법을 확인해주시기 바랍니다.');
            break;
    }

}


export {viewFlow, extractViewSplit};