"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error401 = exports.error400 = exports.error404 = exports.error500 = void 0;
const error500 = (description) => {
    const error = {
        msg: "Internal server error",
        status: 500,
        description,
    };
    return error;
};
exports.error500 = error500;
const error404 = (description) => {
    const error = {
        msg: "Element not found",
        status: 404,
        description,
    };
    return error;
};
exports.error404 = error404;
const error400 = (description) => {
    const error = {
        msg: "Invalid data",
        status: 400,
        description,
    };
    return error;
};
exports.error400 = error400;
const error401 = (description) => {
    const error = {
        msg: "401 - Unauthorized / Authorization Expired",
        status: 400,
        description,
    };
    return error;
};
exports.error401 = error401;
