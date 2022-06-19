import ReactDOM from 'react-dom';
import React from 'react';


// @ts-ignore
export function KeyBoardKey(prop) {
    let colour = prop.isPressed ? "red" : "white";

    const handleKeyPress = (char: string) => {
        console.log("Key pressed: ", char)
    };

    return ( 
    <div background-color = {colour} onClick = {() => handleKeyPress(prop.char)}>
        <p>{prop.char}</p>
    </div> 
    );
};

// @ts-ignore

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<KeyBoardKey isPressed = {false} char = "A"/> );