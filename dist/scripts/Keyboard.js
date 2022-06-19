"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function KeyBoardKey(prop) {
    let colour = prop.isPressed ? "red" : "white";
    console.log("KeyBoardKey called");
    const handleKeyPress = (char) => {
        console.log("Key pressed: ", char);
    };
    console.log("Prop.char: ", prop.char);
    return (react_1.default.createElement("td", { key: prop.char, "background-color": colour, onClick: () => handleKeyPress(prop.char) },
        react_1.default.createElement("p", null, prop.char)));
}
function KeyBoardRow(prop) {
    return react_1.default.createElement("tr", null,
        " ",
        prop.chars.map((char) => KeyBoardKey({ char: char })));
}
function KeyBoard(prop) {
    return (react_1.default.createElement("table", null,
        react_1.default.createElement("tbody", null, prop.rows.map((rowChars) => KeyBoardRow({ chars: rowChars })))));
}
exports.default = KeyBoard;
// @ts-ignore
// const root = ReactDOM.createRoot(document.getElementById("root"));
//ReactDOM.render(<KeyBoardKey char="A" />, document.getElementById("container"));
