const crypto = require('crypto');


const password = 'qpmz0192'
const password2 = '2910zmpq'

const secretKey = 'lottbuyprojectsamplekeneedbyte32';
const iv = crypto.randomBytes(16); // 16바이트 크기의 무작위 초기화 벡터 생성


// 암호화 함수
function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// 복호화 함수
function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const doEncrypt = encrypt(password)
console.log(doEncrypt); // dzzmUb9NevZXKjSIZiZbHQ
const doDecrypt = decrypt(doEncrypt);
console.log(doDecrypt); // qpmz0192

const doEncrypt1 = encrypt(password2)
console.log(doEncrypt1); // vPwzzznk4gezbixB1Fr9wA
const doDecrypt1 = decrypt(doEncrypt1);
console.log(doDecrypt1); // 2910zmpq

const passwordCryptTest = '54637f85748856b1544d7a07427125d4';

const doDecryptTest = decrypt(passwordCryptTest);
console.log(doDecryptTest);