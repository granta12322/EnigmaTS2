import Rotor from './scripts/Rotor';
import RotorArray from './scripts/RotorArray'
import ReactDOM from 'react-dom';
import React from 'react';
import KeyBoard  from './scripts/Keyboard';



let roter_1 = new Rotor(1);

let rotorArray = new RotorArray([1,2,3],[0,1,2])

let testString = 'alexandergrantisprettyfuckinggreat'

// @ts-ignore
ReactDOM.render(
    <KeyBoard
      rows={[
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"]
      ]}
    />,
    document.getElementById("container")
  );


for(let input of testString) {

    console.log("--------------------------");
    console.log(rotorArray.propogateWholeSignal(input));
    };


   