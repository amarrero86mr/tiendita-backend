"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VISITORS_ROUTER = void 0;
const express_1 = require("express");
const visitors_controller_1 = require("../constrollers/visitors.controller");
exports.VISITORS_ROUTER = (0, express_1.Router)();
// Register
exports.VISITORS_ROUTER.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield (0, visitors_controller_1.postVisitor)(data);
    if (result.status) {
        const err = result;
        return res.status(err.status).json(err);
    }
    res.status(201).json(result);
}));
// Login
exports.VISITORS_ROUTER.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = req.body;
    const result = yield (0, visitors_controller_1.loginVisitor)(credentials);
    if (result.status) {
        const err = result;
        return res.status(err.status).json(err);
    }
    res.status(200).json(result);
}));
