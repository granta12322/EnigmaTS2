"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rotor_1 = __importDefault(require("./Rotor"));
const react_1 = __importDefault(require("react"));
const HelperFunctions_1 = require("./HelperFunctions");
const leftLetterPosition = 0;
const rightLetterPosition = 1;
class RotorArray {
    constructor(rotorNumbers, rotorStartOffsets) {
        this.render = () => {
            return (react_1.default.createElement("div", null, this.rotors.map((rotor) => rotor.render())));
        };
        this.id = rotorNumbers.toString();
        this.rotorStartOffsets = rotorStartOffsets;
        this.rotors = this.buildRotorArray(rotorNumbers, rotorStartOffsets);
        this.reflector = new Rotor_1.default(-1);
    }
    ;
    /**
     *
     * @param rotorNumbers An Array dictating the order of rotor numbers used
     * @param rotorStartOffsets An Array dictating the initial offset of each rotor
     * @returns An array of rotors as dictated by the parameters
     */
    buildRotorArray(rotorNumbers, rotorStartOffsets) {
        let rotors = [];
        for (let rotorIndex = 0; rotorIndex < rotorNumbers.length; rotorIndex++) {
            let rotorNumber = rotorNumbers[rotorIndex];
            let rotorStartOffset = rotorStartOffsets[rotorIndex];
            rotors.push(new Rotor_1.default(rotorNumber, rotorStartOffset));
        }
        ;
        return rotors;
    }
    ;
    describeRotors() {
        let state = [];
        for (const [index, rotor] of this.rotors.entries()) {
            state.push({
                "Rotor Index": index,
                "Rotor ID": rotor.id,
                "Rotor Offset": rotor.offset
            });
        }
        return state;
    }
    ;
    resetRotorArray() {
        for (const [i, rotor] of this.rotors.entries()) {
            rotor.offset = this.rotorStartOffsets[i];
        }
        ;
    }
    ;
    /**
     * @desc When a rotor makes one full rotation the next rotor's offset is incremented
     * by one. The first rotor is rotated after every key stroke.
     */
    stepRotors() {
        for (let rotor of this.rotors) {
            rotor.stepRotor();
            if (rotor.offset != 0)
                break; // Rotate next rotor only when start of preceeding is reached.
        }
        ;
    }
    ;
    /**
     *
     * @param inputPosition the position of the signal moving into the rotor
     * @param isFirstPass Whether it is the first or reflected signal path. Determines behaviour of signal propogation
     * within single rotor.
     * @returns
     */
    propogateRotorSignals(inputPosition, isFirstPass) {
        // !!! Throw custom exception
        //if inputLetter.length() != 1 raise incorrectInputLength
        let signalPosition = inputPosition; // the first ring of inputs never changes, A always 0, B always 1 e.t.c.
        let rotorIndex = 0;
        //console.log("Rotor Assembly Input: ", signalPosition);
        for (let rotor of this.rotors) {
            signalPosition = rotor.propogateSignal(signalPosition, isFirstPass);
            //console.log("Result at rotor " + rotorIndex +": " + signalPosition) // !!! To remove
            rotorIndex++;
        }
        ;
        return signalPosition;
    }
    ;
    /**
     * @desc The rotors inputs and outputs form a consecutive circuit traveling a forward and backward pass via a reflector, with the exact path (and therefore output),
     * changing each time a letter is pressed. After the signal is propogated forwards and back step Rotors is called
     * to rotate the first rotor. This is handled by {@link stepRotors}
     * @param inputIndex The index refers to the position in the alphabet of a character.
     *
    */
    propogateWholeSignal(inputChar) {
        let inputPosition = (0, HelperFunctions_1.charToPosition)(inputChar); // the first ring of inputs never changes, A always 0, B always 1 e.t.c.
        let positionAfterFirstPass = this.propogateRotorSignals(inputPosition, true);
        let positionAfterReflector = this.reflector.propogateSignal(positionAfterFirstPass, true);
        let positionAfterSecondPass = this.propogateRotorSignals(positionAfterReflector, false);
        this.stepRotors();
        let state = this.describeRotors();
        let outputChar = (0, HelperFunctions_1.positionToChar)(positionAfterSecondPass);
        let output = {
            "input": inputChar,
            "output": outputChar,
            "endState": state
        };
        return output;
    }
    ;
}
exports.default = RotorArray;
;
