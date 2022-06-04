"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import global from "global";
const ALPHABET_INDEX = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J',
    10: 'K',
    11: 'L',
    12: 'M',
    13: 'N',
    14: 'O',
    15: 'P',
    16: 'Q',
    17: 'R',
    18: 'S',
    19: 'T',
    20: 'U',
    21: 'V',
    22: 'W',
    23: 'X',
    24: 'Y',
    25: 'Z',
};
const LETTER_COUNT = 26;
const SEED_RANGE = 256;
const LEFT_LETTER_POSITION = 0;
const RIGHT_LETTER_POSITION = 1;
function mod(a, n) {
    return ((a % n) + n) % n;
}
class Rotor {
    constructor(id, offset = 0) {
        this.id = id;
        this.offset = offset;
        this.letterMapping = [[]];
        this.size = LETTER_COUNT;
        this.randomSeed = id.toString();
        this.letterMapping = this.createLetterIndexMap(this.randomSeed);
    }
    ;
    /**
     *
     * @param randomSeed Dictates consistent, random mapping between letters
     * @returns a LETTER_COUNT*2 array of letter index pairings for rotor IO.
     */
    createLetterIndexMap(randomSeed) {
        const inputLetterIndexes = [...Object.keys(ALPHABET_INDEX)];
        let availableOutputs = [...Object.keys(ALPHABET_INDEX)];
        let inputIndex = 0;
        let letterMapping = [[]];
        let min = 0;
        let max;
        let alreadyChosenIndexes = [];
        for (inputIndex; inputIndex < LETTER_COUNT; inputIndex++) {
            let availableOutputCount = availableOutputs.length;
            let floatToIntFactor = availableOutputCount / SEED_RANGE;
            let outputIndex;
            max = availableOutputCount - 1;
            // ensure no duplicate indexes.
            do {
                outputIndex = Math.floor(Math.random() * (max - min + 1) + min);
            } while (alreadyChosenIndexes.includes(outputIndex) || inputIndex === outputIndex);
            alreadyChosenIndexes.push(outputIndex);
            delete availableOutputs[outputIndex];
            let letterPair = [inputIndex, outputIndex];
            letterMapping[inputIndex] = letterPair;
        }
        //console.log(letterMapping);
        return letterMapping;
    }
    stepRotor() {
        this.offset = (this.offset + 1) % LETTER_COUNT; // !!! Possible off by 1 error here.
    }
    ;
    propogateSignal(inputPosition) {
        //console.log('----------------------------------');
        let inputIndex = mod(inputPosition - this.offset, LETTER_COUNT);
        //console.log(`InputPosition: `, inputPosition);
        //console.log('Offset: ', this.offset);
        //console.log(`InputIndex: `, inputIndex);
        let letterPair = this.letterMapping[inputIndex];
        //console.log(letterPair);
        let indexDelta = letterPair[LEFT_LETTER_POSITION] - letterPair[RIGHT_LETTER_POSITION];
        //console.log(`letterPair: `, letterPair);
        //console.log(`indexDelta: `, indexDelta);
        let intermediary = mod(inputPosition, LETTER_COUNT) + indexDelta;
        //console.log(`Intermediary: `, intermediary);
        let outputPosition = mod(intermediary, LETTER_COUNT); // !!! This is potentially wrong. Should write some tests to assert this is correct.
        //console.log(`OutputPosition: `, outputPosition);
        this.stepRotor();
        return outputPosition;
    }
    ;
}
exports.default = Rotor;
;
