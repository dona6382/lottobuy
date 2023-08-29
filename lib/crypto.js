"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
var crypto = require("crypto");
var secretKey = 'lottbuyprojectsamplekeneedbyte32';
// 암호화 함수
function encrypt(text) {
    var iv = Buffer.alloc(16, 0); // 16바이트
    var cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    var encryptedText = cipher.update(text, 'utf8', 'base64');
    encryptedText += cipher.final('base64');
    return encryptedText;
}
exports.encrypt = encrypt;
// 복호화 함수
function decrypt(encryptedText) {
    var iv = Buffer.alloc(16, 0); // 16바이트
    var decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    var decryptedText = decipher.update(encryptedText, 'base64', 'utf8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
}
exports.decrypt = decrypt;
