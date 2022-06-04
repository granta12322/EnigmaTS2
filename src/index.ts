import Rotor from './scripts/Rotor';
import RotorArray from './scripts/RotorArray'
let roter_1 = new Rotor(1);

let rotorArray = new RotorArray([1,2,3],[0,1,2])


for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 10; j++) {
        let input = i;
        console.log("--------------------------");
        console.log("Input: ", input);
        let output = rotorArray.propogateRotorSignals(input)
        console.log("Output: ", output);
    }
} 
