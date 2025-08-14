"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Card = function (_a) {
    var children = _a.children, className = _a.className;
    return ((0, jsx_runtime_1.jsx)("div", { className: "border rounded-lg shadow-md p-4 ".concat(className), children: children }));
};
exports.Card = Card;
