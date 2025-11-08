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
exports.putSupplier = exports.postSupplier = exports.deleteSupplier = exports.getSupplierById = exports.getAllSuppliers = void 0;
const access_db_1 = require("../db/access-db");
const supplier_type_1 = require("../schemas/supplier.type");
const errors_util_1 = require("../utils/errors.util");
// Devuelve todos los suppliers en forma de array
const getAllSuppliers = () => __awaiter(void 0, void 0, void 0, function* () {
    const querysql = "SELECT * FROM suppliers";
    try {
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        const [supplierList] = yield connection.query(querysql);
        connection.release();
        return supplierList;
    }
    catch (e) {
        console.log(e);
        return (0, errors_util_1.error500)();
    }
});
exports.getAllSuppliers = getAllSuppliers;
// Deveulve un supplier (para propositos de testeo)
const getSupplierById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const querysql = "SELECT * FROM suppliers WHERE id_supplier = ? ";
    try {
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        const [suppliers] = yield connection.query(querysql, [id]);
        connection.release();
        if (!suppliers[0]) {
            return (0, errors_util_1.error404)();
        }
        return suppliers[0];
    }
    catch (e) {
        console.log(e);
        return (0, errors_util_1.error500)();
    }
});
exports.getSupplierById = getSupplierById;
// Borra un supplier en base a su id
const deleteSupplier = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const querySql = "DELETE FROM suppliers WHERE id_supplier = ?";
    try {
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        const [result] = yield connection.query(querySql, [id]);
        connection.release();
        if (result.affectedRows == 0) {
            return (0, errors_util_1.error404)();
        }
        return `supplier with id: ${id} deleted`;
    }
    catch (e) {
        console.log(e);
        return (0, errors_util_1.error500)();
    }
});
exports.deleteSupplier = deleteSupplier;
//Agrega un supplier a la base de datos
const postSupplier = (newsupplierDto) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, supplier_type_1.isTSupplierDto)(newsupplierDto)) {
        return (0, errors_util_1.error400)();
    }
    const querySql = "INSERT INTO suppliers (supplier_name, email, active) VALUES (?, ?, ?) ";
    try {
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        const [result] = yield connection.query(querySql, [
            newsupplierDto.supplier_name,
            newsupplierDto.email,
            newsupplierDto.active,
        ]);
        connection.release();
        return yield (0, exports.getSupplierById)(result.insertId);
    }
    catch (e) {
        console.log(e);
        return (0, errors_util_1.error500)();
    }
});
exports.postSupplier = postSupplier;
// Edita cierto supplier en base a su id
const putSupplier = (id, supplierDto) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, supplier_type_1.isTSupplierDto)(supplierDto)) {
        return (0, errors_util_1.error400)();
    }
    const querySql = "UPDATE suppliers SET supplier_name = ?, email = ?, active = ? WHERE id_supplier = ?";
    try {
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        const [result] = yield connection.query(querySql, [
            supplierDto.supplier_name,
            supplierDto.email,
            supplierDto.active,
            id,
        ]);
        connection.release();
        if (result.affectedRows == 0) {
            return (0, errors_util_1.error404)();
        }
        return yield (0, exports.getSupplierById)(id);
    }
    catch (e) {
        console.log(e);
        return (0, errors_util_1.error500)();
    }
});
exports.putSupplier = putSupplier;
