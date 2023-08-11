// 1. 신규 유저 정보 insert(with telegram)
// 2. 기존 유저 확인 및 정보 들고오기

// 비밀번호를 복호화해서 동행복권 사이트에 로그인 하여야 하기때문에 {양방향 암호화}

const {query} = require('../../server/db/query');
const {executeQuery} = require('../../server/db/executeQuery');
const crypto = require('../../lib/crypto');

async function dbConnectTest(){
    const listGet = await executeQuery(query.SELECT_NOW);
};

async function insertUser(){
    try {
        const userId = 'testId';
        const userPassword = 'testPw';
        const passwordCrypto = crypto.encrypt(userPassword);

        await executeQuery(query.INSERT_USER_INFO, [userId, passwordCrypto]);

        console.log('User inserted successfully');
    } catch (error) {
        console.error('Error in insertUser:', error);
    }
}


async function getUser(){
    try {
        const userInfo = await executeQuery(query.GET_USER_INFO);
        const userId = userInfo[0].identification;
        const userPasswordCrypto = userInfo[0].password;

        const userPassword = crypto.decrypt(userPasswordCrypto);
        return {
            userId,
            userPassword
        };
    } catch (error) {
        console.error("Error in getUser:", error);
        throw error; // 에러를 상위로 전파하여 처리할 수 있도록 합니다.
    }
}


// const sd = getUser();
// console.log(sd);

module.exports = {insertUser, getUser};