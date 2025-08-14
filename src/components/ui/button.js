"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// Componente Button
var Button = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'default' : _b, children = _a.children, props = __rest(_a, ["variant", "children"]);
    // Classe CSS com base no tipo de variante
    var className = variant === 'ghost'
        ? 'bg-transparent border border-slate-300 hover:bg-slate-200 dark:border-slate-600 dark:hover:bg-slate-700'
        : 'bg-indigo-600 text-white hover:bg-indigo-700';
    return ((0, jsx_runtime_1.jsx)("button", __assign({ className: "py-2 px-4 rounded ".concat(className) }, props, { children: children })));
};
exports.Button = Button;
