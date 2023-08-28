import * as crypto from 'crypto';

const secretKey: string = 'lottbuyprojectsamplekeneedbyte32';

// 암호화 함수
function encrypt(text: string): string {
    const iv: Buffer = Buffer.alloc(16, 0); // 16바이트
    const cipher: crypto.Cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encryptedText: string = cipher.update(text, 'utf8', 'base64');
    encryptedText += cipher.final('base64');
    return encryptedText;
}

// 복호화 함수
function decrypt(encryptedText: string): string {
    const iv: Buffer = Buffer.alloc(16, 0); // 16바이트
    const decipher: crypto.Decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    let decryptedText: string = decipher.update(encryptedText, 'base64', 'utf8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
}

export { encrypt, decrypt };
