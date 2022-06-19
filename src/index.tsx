import Rotor from './scripts/Rotor';
import RotorArray from './scripts/RotorArray'
import ReactDOM from 'react-dom';
import React from 'react';
import { KeyBoardKey } from './scripts/Keyboard';



let roter_1 = new Rotor(1);

let rotorArray = new RotorArray([1,2,3],[0,1,2])

let testString = 'alexandergrantisprettyfuckinggreat'

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<KeyBoardKey isPressed = {false} char = "A"/>);

for(let input of testString) {

    console.log("--------------------------");
    console.log(rotorArray.propogateWholeSignal(input));
    };



