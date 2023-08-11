
// crypto_test.js
const aes = require('./aes_crypto');

// 암복호화 KEY
const key = 'Qsj23missdaxX2BjyskV6bs#adada6ds'; // 32비트

// 암복호화 테스트
let plainText = '내 이름은 홍길동';
let encryptedText = aes.AES_encrypt(plainText, key);
let decryptedText = aes.AES_decrypt(encryptedText, key);

console.log('텍스트 : ', plainText);
console.log('암호화 : ', encryptedText);
console.log('복호화 : ', decryptedText);
