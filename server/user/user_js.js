
const {query} = require('../db/query');
const {executeQuery} = require('../db/executeQuery');
const crypto = require('../../lib/crypto');



async function insertUser(userId, userPw){
    try {
        const passwordCrypto = crypto.encrypt(userPw);

        await executeQuery(query.INSERT_USER_INFO, [userId, passwordCrypto]);

        console.log('User inserted successfully');
    } catch (error) {
        console.error('Error in insertUser:', error);
    }
}


async function getUser(userId){
    try {
        const userInfo = await executeQuery(query.GET_USER_INFO, userId);
        if(userInfo.length !== 0){
            const userPasswordCrypto = userInfo[0].password;
            const userPassword = crypto.decrypt(userPasswordCrypto);
            return {
                userId,
                userPassword
            };
        }else{
            return {
                userId
            }
        }
    } catch (error) {
        console.error("Error in getUser:", error);
    }
}

getUser(kim63826382);

module.exports = {insertUser, getUser};