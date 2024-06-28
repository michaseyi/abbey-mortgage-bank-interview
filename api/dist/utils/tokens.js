"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
function generateToken(length) {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        token += digits[randomIndex];
    }
    return token;
}
//# sourceMappingURL=tokens.js.map