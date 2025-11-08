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
exports.getTypeTransactionById = exports.getAllTypeTransactions = void 0;
const access_db_1 = require("../db/access-db");
const errors_util_1 = require("../utils/errors.util");
const getAllTypeTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const querySql = "SELECT * FROM type_transactions";
    try {
        //genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // genera la peticion
        const [products] = yield connection.query(querySql);
        // devuelve la lista de tipos de transacciones
        return products;
    }
    catch (e) {
        console.log(e);
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.getAllTypeTransactions = getAllTypeTransactions;
const getTypeTransactionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query_sql = "SELECT * FROM type_transactions WHERE id_type_transaction = ?";
    try {
        //genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // genera la peticion
        const [type_transactions] = yield connection.query(query_sql, [id]);
        // libera y cierra la coneccion
        connection.release();
        // si no se encuentra el tipo de transacción, devuelve un error
        if (!type_transactions[0]) {
            return (0, errors_util_1.error404)();
        }
        // si hay un tipo de transacción, lo devuelve
        return type_transactions[0];
    }
    catch (e) {
        console.log(e);
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.getTypeTransactionById = getTypeTransactionById;
