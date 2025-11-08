"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTError = void 0;
const isTError = (obj) => {
    return typeof obj === "object" && obj.msg;
};
exports.isTError = isTError;
