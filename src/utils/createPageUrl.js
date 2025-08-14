"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPageUrl = void 0;
// src/utils/createPageUrl.ts
var createPageUrl = function (pageName) {
    return "/".concat(pageName.toLowerCase());
};
exports.createPageUrl = createPageUrl;
