import Rotor from './Rotor';

const leftLetterPosition = 0;
const rightLetterPosition = 1;
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


export default class RotorArray {
    id: String;
    rotors: Array<Rotor>;
    rotorStartOffsets: Array<number>;
    reflector: Rotor;

    constructor(rotorNumbers: Array<number>, rotorStartOffsets: Array<number>) {
        this.id = rotorNumbers.toString();
        this.rotorStartOffsets = rotorStartOffsets;
        this.rotors = this.buildRotorArray(rotorNumbers, rotorStartOffsets); 
        this.reflector = new Rotor(-1);
    };

    
    /**
     * 
     * @param rotorNumbers An Array dictating the order of rotor numbers used
     * @param rotorStartOffsets An Array dictating the initial offset of each rotor
     * @returns An array of rotors as dictated by the parameters
     */
    buildRotorArray(rotorNumbers: Array<number>, rotorStartOffsets: Array<number>) {
        let rotors: Array<Rotor> = [];
        
        for(let rotorIndex = 0; rotorIndex < rotorNumbers.length; rotorIndex++) {
            let rotorNumber = rotorNumbers[rotorIndex]
            let rotorStartOffset = rotorStartOffsets[rotorIndex]
            rotors.push(new Rotor(rotorNumber,rotorStartOffset));
        };
        return rotors;
    };

    describe(): Array<object>  {
        let state: Array<object> = [];
        for(const [index, rotor] of this.rotors.entries()) {
            state.push({
                "Rotor Position": index,
                "Rotor ID": rotor.id,
                "Rotor Offset": rotor.offset
            })
        }

        return state;
    }

    resetRotorArray(): void {
        for(const [i,rotor] of this.rotors.entries()) {
            rotor.offset = this.rotorStartOffsets[i]
        }
    }

    
    /**
     * @desc When a rotor makes one full rotation the next rotor's offset is incremented
     * by one. The first rotor is rotated after every key stroke.
     */
    stepRotors() {
        for (let rotor of this.rotors) {
            rotor.stepRotor();
            if (rotor.offset != 0) break;  // Rotate next rotor only when start of preceeding is reached.
        };
    };

    
    /**
     * 
     * @param inputPosition the position of the signal moving into the rotor
     * @param isFirstPass Whether it is the first or reflected signal path. Determines behaviour of signal propogation
     * within single rotor.
     * @returns 
     */
    propogateRotorSignals(inputPosition: number, isFirstPass: boolean ) {
        // !!! Throw custom exception
        //if inputLetter.length() != 1 raise incorrectInputLength
     
        let signalPosition: number = inputPosition; // the first ring of inputs never changes, A always 0, B always 1 e.t.c.

        let rotorIndex = 0;
        //console.log("Rotor Assembly Input: ", signalPosition);
        for (let rotor of this.rotors) {
            signalPosition = rotor.propogateSignal(signalPosition, isFirstPass)

            //console.log("Result at rotor " + rotorIndex +": " + signalPosition) // !!! To remove
            rotorIndex ++;
        };
        
        return signalPosition;
    };   

    /**
     * @desc The rotors inputs and outputs form a consecutive circuit traveling a forward and backward pass via a reflector, with the exact path (and therefore output),
     * changing each time a letter is pressed. After the signal is propogated forwards and back step Rotors is called
     * to rotate the first rotor. This is handled by {@link stepRotors}
     * @param inputIndex The index refers to the position in the alphabet of a character.
     *                   
    */
    propogateWholeSignal(inputChar: string):object {
        
        
        let inputPosition: number = charToUTF(inputChar) // the first ring of inputs never changes, A always 0, B always 1 e.t.c.
        
        let positionAfterFirstPass: number  = this.propogateRotorSignals(inputPosition, true);
        let positionAfterReflector: number  = this.reflector.propogateSignal(positionAfterFirstPass, true);
        let positionAfterSecondPass: number = this.propogateRotorSignals(positionAfterReflector, false);
        
        this.stepRotors();
        let state: object = this.describe();
        
        let outputChar = UTFToChar(positionAfterSecondPass);
        let output = {
            "input": inputChar,
            "output": outputChar,
            "endState": state
        };
        return output
    };


};

const UTF_OFFSET = 64;
function charToUTF(inputLetter: string): number {
    return inputLetter.charCodeAt(0) - UTF_OFFSET;
}

function UTFToChar(inputCode: number): string {
    return String.fromCharCode(inputCode + UTF_OFFSET);
}

