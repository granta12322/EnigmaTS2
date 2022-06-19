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
    return (react_1.default.createElement("div", { "background-color": colour, onClick: () => handleKeyPress(prop.char) },
        react_1.default.createElement("p", null, prop.char)));
}
exports.KeyBoardKey = KeyBoardKey;
;
// @ts-ignore
const root = react_dom_1.default.createRoot(document.getElementById("root"));
root.render(react_1.default.createElement(KeyBoardKey, { isPressed: false, char: "A" }));
