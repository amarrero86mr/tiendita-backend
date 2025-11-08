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
exports.SUPPLIERS_ROUTER = void 0;
const express_1 = require("express");
//importa las funciones en controllers
const supplier_controller_1 = require("../Controllers/supplier.controller");
const resolver_util_1 = require("../utils/resolver.util");
exports.SUPPLIERS_ROUTER = (0, express_1.Router)();
// Devuelve todos los suppliers
exports.SUPPLIERS_ROUTER.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, supplier_controller_1.getAllSuppliers)());
}));
// Devuelve un supplier por id
exports.SUPPLIERS_ROUTER.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, supplier_controller_1.getSupplierById)(req.params.id));
}));
// Añade un supplier a la base de datos
exports.SUPPLIERS_ROUTER.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, supplier_controller_1.postSupplier)(req.body));
}));
// Edita un supplier ya presente en la base de datos
exports.SUPPLIERS_ROUTER.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, supplier_controller_1.putSupplier)(req.params.id, req.body));
}));
// Elimina un supplier de la base de datos
exports.SUPPLIERS_ROUTER.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, supplier_controller_1.deleteSupplier)(req.params.id));
}));
