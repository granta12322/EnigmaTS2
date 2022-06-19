const UTF_OFFSET = 64;


/**
 * Returns the position of a character in the alphabet
 * @param inputChar 
 * @returns 
 */
export function charToPosition(inputChar: string): number {
    return inputChar.charCodeAt(0) - UTF_OFFSET;
}

/**
 * Returns the character at a position in the alphabet
 * @param inputPosition 
 * @returns 
 */
export function positionToChar(inputPosition: number): string {
    return String.fromCharCode(inputPosition + UTF_OFFSET);
}
