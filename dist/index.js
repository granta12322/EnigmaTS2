"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rotor_1 = __importDefault(require("./scripts/Rotor"));
const RotorArray_1 = __importDefault(require("./scripts/RotorArray"));
let roter_1 = new Rotor_1.default(1);
let rotorArray = new RotorArray_1.default([1, 2, 3], [0, 1, 2]);
let testString = 'alexandergrantisprettyfuckinggreat';
for (let input of testString) {
    console.log("--------------------------");
    console.log(rotorArray.propogateWholeSignal(input));
}
;
