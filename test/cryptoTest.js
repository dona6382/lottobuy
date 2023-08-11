const crypto = require('crypto');

const password = 'qpmz0192';
const password2 = '2910zmpq';

const secretKey = 'lottbuyprojectsamplekeneedbyte32';

// 암호화 함수
function encrypt(text) {
    const iv = crypto.randomBytes(16); // Generate a random IV for each encryption
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted; // Prepend IV to the encrypted text
}

// 복호화 함수
function decrypt(encryptedText) {
    const iv = Buffer.from(encryptedText.slice(0, 32), 'hex'); // Extract IV from the encrypted text
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText.slice(32), 'hex', 'utf8'); // Slice IV from the encrypted text
    decrypted += decipher.final('utf8');
    return decrypted;
}

const doEncrypt = encrypt(password);
console.log(doEncrypt);
const doDecrypt = decrypt(doEncrypt);
console.log(doDecrypt);

const doEncrypt1 = encrypt(password2);
console.log(doEncrypt1);
const doDecrypt1 = decrypt(doEncrypt1);
console.log(doDecrypt1);

const passwordCryptTest = '54637f85748856b1544d7a07427125d4';
const doDecryptTest = decrypt(passwordCryptTest);
console.log(doDecryptTest);
