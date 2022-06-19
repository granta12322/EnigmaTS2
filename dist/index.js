"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rotor_1 = __importDefault(require("./scripts/Rotor"));
const RotorArray_1 = __importDefault(require("./scripts/RotorArray"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_1 = __importDefault(require("react"));
const Keyboard_1 = require("./scripts/Keyboard");
let roter_1 = new Rotor_1.default(1);
let rotorArray = new RotorArray_1.default([1, 2, 3], [0, 1, 2]);
let testString = 'alexandergrantisprettyfuckinggreat';
// @ts-ignore
const root = react_dom_1.default.createRoot(document.getElementById("root"));
root.render(react_1.default.createElement(Keyboard_1.KeyBoardKey, { isPressed: false, char: "A" }));
for (let input of testString) {
    console.log("--------------------------");
    console.log(rotorArray.propogateWholeSignal(input));
}
;
