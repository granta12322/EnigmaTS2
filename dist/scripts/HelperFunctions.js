"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionToChar = exports.charToPosition = void 0;
const UTF_OFFSET = 64;
/**
 * Returns the position of a character in the alphabet
 * @param inputChar
 * @returns
 */
function charToPosition(inputChar) {
    return inputChar.charCodeAt(0) - UTF_OFFSET;
}
exports.charToPosition = charToPosition;
/**
 * Returns the character at a position in the alphabet
 * @param inputPosition
 * @returns
 */
function positionToChar(inputPosition) {
    return String.fromCharCode(inputPosition + UTF_OFFSET);
}
exports.positionToChar = positionToChar;
