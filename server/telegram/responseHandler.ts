import { BUYMODE, COMMANDS } from "../commandVariable";

import { sendResponse } from "./botResponse";
import {viewFlow, extractViewSplit} from "../handler/viewHandler";
import {lottoBuyFlow, extractBuySplit} from "../handler/buyHandler";
import {insertUserFlow, extractNewUserSplit} from "../handler/insertUserHandler";

async function handleMessage(chatId: number, text: string): Promise<void> {
    let sendMessage = '';

    if (text === COMMANDS.HELP) {
        sendMessage = '/help \n도움 메시지\n' +
            '/buy 구매방법 아이디 구매수량(max 5) \n해당 아이디에 구매\n' +
            '/new 아이디 비밀번호 \n신규 계정 추가\n';
    } else if (text.includes(COMMANDS.BUY)) {
        const extractBuyList = await extractBuySplit(chatId, text);

        if (extractBuyList) {
            await lottoBuyFlow(chatId, extractBuyList);
        }
    } else if (text.includes(COMMANDS.NEW_USER)) {
        const extractNewUserList = await extractNewUserSplit(chatId, text);

        if (extractNewUserList) {
            await insertUserFlow(extractNewUserList);
        }
    } else if (text.includes(COMMANDS.VIEW)) {  // 각종 조회 (잔액, 당첨 결과 확인, 이번주 선택한 목록)
        const extractViewList = await extractViewSplit(chatId, text);

        if (extractViewList) {
            await viewFlow(chatId, extractViewList);
        }
    } else {
        sendMessage = '일치하는 명령어가 없습니다. \n /help 명령어를 입력해 보세요';
    }
    if (sendMessage !== '') {
        await sendResponse(chatId, sendMessage);
    }
}

export { handleMessage };
