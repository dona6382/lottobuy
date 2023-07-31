const crypto = require('crypto');


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

module.exports = {encrypt, decrypt};