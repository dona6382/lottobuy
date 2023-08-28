import { query } from '../../server/db/query';
import { executeQuery } from '../../server/db/executeQuery';
import * as crypto from '../../lib/crypto';

async function insertUser(userId: string, userPw: string): Promise<void> {
    try {
        const passwordCrypto = crypto.encrypt(userPw);

        await executeQuery(query.INSERT_USER_INFO, [userId, passwordCrypto]);

        console.log('User inserted successfully');
    } catch (error) {
        console.error('Error in insertUser:', error);
    }
}

async function getUser(userId: string): Promise<{ userId: string; userPassword?: string }> {
    try {
        const userInfo = await executeQuery(query.GET_USER_INFO, [userId]);
        if (userInfo.length !== 0) {
            const userPasswordCrypto = userInfo[0].password;
            const userPassword = crypto.decrypt(userPasswordCrypto);
            return {
                userId,
                userPassword,
            };
        } else {
            return {
                userId,
            };
        }
    } catch (error) {
        console.error('Error in getUser:', error);
    }
}

getUser('kim63826382');

export { insertUser, getUser };
