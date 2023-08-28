const crypto = require('lib/crypto');


const secretKey = 'lottbuyprojectsamplekeneedbyte32';


// 암호화 함수
function encrypt(text) {
    const iv = Buffer.alloc(16,0); // 16비트
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encryptedText = cipher.update(text, 'utf8', 'base64');
    encryptedText += cipher.final('base64');
    return encryptedText;
}

// 복호화 함수
function decrypt(encryptedText) {
    const iv = Buffer.alloc(16,0); // 16비트
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    let decryptedText = decipher.update(encryptedText, 'base64', 'utf8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
}

module.exports = {encrypt, decrypt};