const crypto = require('crypto'); // 암호화 모듈 선언

// 암호화 AES256
function AES_encrypt(data, key) {
    const iv = Buffer.alloc(16,0); // 16비트
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptedText = cipher.update(data, 'utf8', 'base64');
    encryptedText += cipher.final('base64');
    return encryptedText;
}

// 복호화 AES256
function AES_decrypt(data, key) {
    const iv = Buffer.alloc(16,0); // 16비트
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decryptedText = decipher.update(data, 'base64', 'utf8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
}

module.exports = { AES_encrypt, AES_decrypt}



