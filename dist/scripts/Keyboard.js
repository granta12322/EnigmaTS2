"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyBoardKey = void 0;
const react_dom_1 = __importDefault(require("react-dom"));
const react_1 = __importDefault(require("react"));
// @ts-ignore
function KeyBoardKey(prop) {
    let colour = prop.isPressed ? "red" : "white";
    const handleKeyPress = (char) => {
        console.log("Key pressed: ", char);
    };
    console.log(prop.char);
    return (react_1.default.createElement("td", { key: prop.char, "background-color": colour, onClick: () => handleKeyPress(prop.char) },
        react_1.default.createElement("p", null, prop.char)));
}
exports.KeyBoardKey = KeyBoardKey;
function KeyBoardRow(prop) {
    return (react_1.default.createElement("tr", { key: prop.rowIndex }, prop.chars.map((char) => KeyBoardKey(char))));
}
function KeyBoard(prop) {
    return (react_1.default.createElement("table", null,
        react_1.default.createElement("tbody", null, prop.charRows.map((row, index) => KeyBoardRow({ chars: row, rowIndex: index })))));
}
// @ts-ignore
const root = react_dom_1.default.createRoot(document.getElementById("root"));
root.render(react_1.default.createElement(KeyBoardKey, { isPressed: false, char: "A" }));
