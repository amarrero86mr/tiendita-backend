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
exports.TYPE_TRANSACTION_ROUTER = void 0;
const express_1 = require("express");
const resolver_util_1 = require("../utils/resolver.util");
const type_transaction_controller_1 = require("../constrollers/type_transaction.controller");
exports.TYPE_TRANSACTION_ROUTER = (0, express_1.Router)();
exports.TYPE_TRANSACTION_ROUTER.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, type_transaction_controller_1.getAllTypeTransactions)());
}));
exports.TYPE_TRANSACTION_ROUTER.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, type_transaction_controller_1.getTypeTransactionById)(req.params.id));
}));
