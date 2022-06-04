"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rotor_1 = __importDefault(require("./scripts/Rotor"));
const RotorArray_1 = __importDefault(require("./scripts/RotorArray"));
let roter_1 = new Rotor_1.default(1);
let rotorArray = new RotorArray_1.default([1, 2, 3], [0, 1, 2]);
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 10; j++) {
        let input = i;
        console.log("--------------------------");
        console.log("Input: ", input);
        let output = rotorArray.propogateRotorSignals(input);
        console.log("Output: ", output);
    }
}
