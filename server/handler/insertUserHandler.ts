import {getUser, insertUser} from "../user/user";

import {textSplit} from "../../lib/util";
import {sendResponse} from "../telegram/botResponse";


async function extractNewUserSplit(chatId: number, text: string): Promise<string[] | undefined> {
    const textSplitResult = textSplit(text);

    if (textSplitResult.length === 3) {
        return textSplitResult;
    } else {
        const unValidMessage = '/new id pw 형식에 맞춰주세요';
        await sendResponse(chatId, unValidMessage);
    }
}

async function insertUserFlow(chatId: number, extractNewUserList: string[]): Promise<void> {
    const userId = extractNewUserList[1];
    const userPw = extractNewUserList[2];

    const getUserInfo = await getUser(userId);
    const getUserPw = getUserInfo.userPassword;

    if (!getUserPw) {
        const insertUserResult = await insertUser(userId, userPw);
        await sendResponse(chatId, '계정 추가 성공');
    } else {
        await sendResponse(chatId, `이미 등록된 계정입니다.`);
    }
}


export {insertUserFlow, extractNewUserSplit};