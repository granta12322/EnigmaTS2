import ReactDOM from 'react-dom';
import React from 'react';


// @ts-ignore
export function KeyBoardKey(prop) {
    let colour = prop.isPressed ? "red" : "white";
  
    const handleKeyPress = (char) => {
      console.log("Key pressed: ", char);
    };
    console.log(prop.char);
    return (
      <td
        key={prop.char}
        background-color={colour}
        onClick={() => handleKeyPress(prop.char)}
      >
        <p>{prop.char}</p>
      </td>
    );
  }
  
  function KeyBoardRow(prop) {
    return (
      <tr key={prop.rowIndex}>{prop.chars.map((char) => KeyBoardKey(char))}</tr>
    );
  }
  
  function KeyBoard(prop) {
    return (
      <table>
        <tbody>
          {prop.charRows.map((row, index) =>
            KeyBoardRow({ chars: row, rowIndex: index })
          )}
        </tbody>
      </table>
    );
  }
  
// @ts-ignore

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<KeyBoardKey isPressed = {false} char = "A"/> );