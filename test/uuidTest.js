const { v4: uuidv4 } = require('uuid');

// 랜덤 UUID 생성 및 출력
const randomUUID = uuidv4();
console.log('Random UUID:', randomUUID);

// 고정된 UUID 생성 및 출력
const fixedUUID = '550e8400-e29b-41d4-a716-446655440000'; // 원하는 UUID 값을 넣으세요
console.log('Fixed UUID:', fixedUUID);
