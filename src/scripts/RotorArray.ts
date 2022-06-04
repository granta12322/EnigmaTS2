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

    constructor(rotorNumbers: Array<number>, rotorStartOffsets: Array<number>) {
        this.id = rotorNumbers.toString();
        this.rotorStartOffsets = rotorStartOffsets;
        this.rotors = this.buildRotorArray(rotorNumbers, rotorStartOffsets); 
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
     * @desc The rotors inputs and outputs form a consecutive circuit, with the exact path (and therefore output),
     * changing each time a letter is pressed. After the signal is propogated forwards and back step Rotors is called
     * to rotate the first rotor. This is handled by {@link stepRotors}
     * @param inputIndex The index refers to the position in the alphabet of a character.
     *                   
    */
    propogateRotorSignals(inputIndex: number) {
        let inputPosition: number = inputIndex // the first ring of inputs never changes, A always 0, B always 1 e.t.c.
        let signalPosition: number = inputPosition;

        let rotorIndex = 0;
        for (let rotor of this.rotors) {
            signalPosition = rotor.propogateSignal(signalPosition)

            console.log("Result at rotor " + rotorIndex +": " + signalPosition) // !!! To remove
            rotorIndex ++;
        };
        this.stepRotors();
        return signalPosition;
    };   
};