export const COMMANDS = {
    HELLO: 'hello',
    BUY: 'buy',
    HELP: 'help',
    NEW_USER: 'new',
    VIEW: 'view'
} as const;

export const BUYMODE = {
    MANUAL: 'manual',
    AUTO: 'auto',
} as const;

export const VIEWMODE = {
    BALANCE: 'balance', // 잔액
    RESULT: 'result',   // 당첨 결과
    LIST: 'list',       // 이번주 선택한 목록
} as const;
