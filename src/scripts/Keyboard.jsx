import React from 'react';

function KeyBoardKey(prop) {
  let colour = prop.isPressed ? "red" : "white";
  console.log("KeyBoardKey called");
  const handleKeyPress = (char) => {
    console.log("Key pressed: ", char);
  };
  console.log("Prop.char: ", prop.char);
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
  return <tr> {prop.chars.map((char) => KeyBoardKey({ char: char }))}</tr>;
}

export default function KeyBoard(prop) {
  return (
    <table>
      <tbody>
        {prop.rows.map((rowChars) => KeyBoardRow({ chars: rowChars }))}
      </tbody>
    </table>
  );
}

// @ts-ignore

// const root = ReactDOM.createRoot(document.getElementById("root"));

//ReactDOM.render(<KeyBoardKey char="A" />, document.getElementById("container"));


