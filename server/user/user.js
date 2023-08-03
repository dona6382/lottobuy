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
    const userId = 'testId';
    const userPassword = 'testPw';
    const passwordCrypto = crypto.encrypt(userPassword);

    const inertUserId = await executeQuery(query.INSERT_USER_INFO, [id, passwordCrypto]);
    //결과 전달추가
};


async function getUser(){
    // const listGet = await executeQuery(query.SELECT_NOW);
    const userInfo = await executeQuery(query.GET_USER_INFO);
    const userId = await userInfo[0].identification;
    const userPasswordCrypto = await userInfo[0].password;

    const userPassword = crypto.decrypt(userPasswordCrypto);
    await console.log(userId);
    await console.log(userPasswordCrypto);
    await console.log(userPassword);
};

const sd = getUser();
console.log(sd);