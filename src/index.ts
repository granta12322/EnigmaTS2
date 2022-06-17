import Rotor from './scripts/Rotor';
import RotorArray from './scripts/RotorArray'
let roter_1 = new Rotor(1);

let rotorArray = new RotorArray([1,2,3],[0,1,2])

let testString = 'alexandergrantisprettyfuckinggreat'

for(let input of testString) {

    console.log("--------------------------");
    console.log(rotorArray.propogateWholeSignal(input));
    };



