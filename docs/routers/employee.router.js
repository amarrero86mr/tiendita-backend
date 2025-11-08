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
exports.EMPLOYEES_ROUTER = void 0;
const express_1 = require("express");
const resolver_util_1 = require("../utils/resolver.util");
const employee_controller_1 = require("../constrollers/employee.controller");
exports.EMPLOYEES_ROUTER = (0, express_1.Router)();
// method: GET
// no tiene requisitos especiales
// respuesta: lista todos los empleados
exports.EMPLOYEES_ROUTER.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, employee_controller_1.getAllEmployees)());
}));
// method: GET
// requisito: debe devolver un unico empleado correspondiente al Id recibido
// respuesta: lista un empleado por Id
exports.EMPLOYEES_ROUTER.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, employee_controller_1.getEmployeeById)(req.params.id));
}));
// method: POST
// respuesta: crea y lista un nuevo empleado 
exports.EMPLOYEES_ROUTER.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, employee_controller_1.postEmployee)(req.body));
}));
// method: DELETE 
// requisito: debe eliminar un unico empleado correspondiente al Id recibido
// respuesta: elimina un empleado por Id
exports.EMPLOYEES_ROUTER.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, employee_controller_1.deleteEmployee)(req.params.id));
}));
// method: PUT
// requisito: debe editar un unico empleado correspondiente al Id recibido
// respuesta: edita y lista un empleado por Id
exports.EMPLOYEES_ROUTER.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, employee_controller_1.editEmployee)(req.params.id, req.body));
}));
