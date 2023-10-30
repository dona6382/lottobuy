import {getUser, insertUser} from "../user/user";

import {textSplit} from "../../lib/util";

async function viewBuyList(extractNewUserList: string[]): Promise<void> {
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


export {viewBuyList};