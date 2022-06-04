import  seedrandom from "seedrandom";
//import global from "global";
const ALPHABET_INDEX = {
    0:'A',
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
}
const LETTER_COUNT: number = 26;
const SEED_RANGE = 256;
const LEFT_LETTER_POSITION = 0;
const RIGHT_LETTER_POSITION= 1;

function mod(a: number, n: number) {
    return ((a % n ) + n ) % n
}
 

function randIntBetween(min: number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
};


export default class Rotor {
    id: number;
    offset: number;
    letterMapping: Array<Array<number>>;
    size: number;
    randomSeed: string;

    constructor(id: number, offset: number = 0) {
        this.id = id;
        this.offset = offset;
        this.letterMapping = [[]];
        this.size = LETTER_COUNT;
        this.randomSeed = id.toString();
        this.letterMapping = this.createLetterIndexMap(this.randomSeed);
    };

    
    /**
     * 
     * @param randomSeed Dictates consistent, random mapping between letters
     * @returns a LETTER_COUNT*2 array of letter index pairings for rotor IO.
     */
    createLetterIndexMap(randomSeed: string): Array<Array<number>> {
        const inputLetterIndexes = [...Object.keys(ALPHABET_INDEX)];
        let availableOutputs: Array<string> = [...Object.keys(ALPHABET_INDEX)];
        
        let inputIndex: number;
        let letterMapping: Array<Array<number>> =[[]]
        let alreadyChosenIndexes: Array<number> = [];
        
        for (inputIndex = 0; inputIndex < LETTER_COUNT; inputIndex++) {   
            let outputIndex = selectIndexPair(inputIndex, availableOutputs) ;
            let letterPair: Array<number> = [inputIndex,outputIndex];
            letterMapping[inputIndex] = letterPair;

            alreadyChosenIndexes.push(outputIndex);
            delete availableOutputs[outputIndex];
        };
        return letterMapping;

        
        function selectIndexPair(inputIndex: number, availableOutputs: Array<string>) {
            let availableOutputCount = availableOutputs.length;  // !!! Can improve the way this is written, Something something set difference between all letters and those chosen.
            let outputIndex;

            // Ensure no outputIndex duplicates.
            let max = availableOutputCount - 1;
            let min = 0;
            do { 
                outputIndex = randIntBetween(min, max);
            } while(
                alreadyChosenIndexes.includes(outputIndex) 
                || inputIndex === outputIndex
            );
            return outputIndex;
        };
    };

    
    stepRotor() { 
        this.offset = (this.offset + 1) % LETTER_COUNT;  // !!! Possible off by 1 error here.
    };

    
    /**
     * @desc Calculates the position in space where a signal should be output based on where it was input.
     * After  
     * @param inputPosition Position here refers to the location in space where a signal moves through,
     *                      If the input letter is A and htere is an offset of 2 then the signal travels through position 2.
     *                      By contrast index referes to the position within the alphabet.
     *
     * @returns 
     */
    propogateSignal(inputPosition: number) {
        // The calculation here is Pos_out = ((Indx_in + offset) % 26 + dIndx ) % 26 
        let inputIndex: number = mod(inputPosition - this.offset,LETTER_COUNT);
        let letterPair: Array<number> = this.letterMapping[inputIndex];
        let indexDelta: number = letterPair[LEFT_LETTER_POSITION] - letterPair[RIGHT_LETTER_POSITION];

        let outputPosition: number = mod(
                                        mod(inputPosition, LETTER_COUNT) + indexDelta 
                                        , LETTER_COUNT
                                        );     // !!! This is potentially wrong. Should write some tests to assert this is correct.
        return outputPosition;
    };
};

