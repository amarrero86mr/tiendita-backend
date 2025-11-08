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
exports.postTransaction = exports.getTransactionById = exports.getAllTransactions = void 0;
const access_db_1 = require("../db/access-db");
const transaction_type_1 = require("../schemas/transaction.type");
const errors_util_1 = require("../utils/errors.util");
const getAllTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const querySql = "SELECT * FROM transactions ORDER BY id_transaction";
    try {
        //genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // genera la peticion
        const [transactions] = yield connection.query(querySql);
        // devuelve la lista de transacciones existentes
        return transactions;
    }
    catch (e) {
        console.log(e);
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.getAllTransactions = getAllTransactions;
const getTransactionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const querySql = "SELECT * FROM transactions WHERE id_transaction = ?";
    try {
        //genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // genera la peticion
        const [transactions] = yield connection.query(querySql, [id]);
        // libera y cierra la coneccion
        connection.release();
        // si no se encuentra la transacción, devuelve un error
        if (!transactions[0]) {
            return (0, errors_util_1.error404)();
        }
        // si hay una transacción, la devuelve
        return transactions[0];
    }
    catch (e) {
        console.log(e);
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.getTransactionById = getTransactionById;
const postTransaction = (newTransaction) => __awaiter(void 0, void 0, void 0, function* () {
    // valido si el body recibido es realmente de tipo TTransactionDto
    if (!(0, transaction_type_1.isTTransactionDto)(newTransaction)) {
        // si no lo es, genera y devuelve este error
        return (0, errors_util_1.error400)();
    }
    // genera la query de creación de la transacción
    const querySql = `INSERT INTO transactions (id_type_transaction) VALUES (?)`;
    try {
        //genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // genera la peticion
        const [result] = yield connection.query(querySql, [newTransaction.id_type_transaction]);
        // libera y cierra la coneccion
        connection.release();
        // devuelve el OBJETO tansacción, según el id creado
        return (0, exports.getTransactionById)(result.insertId);
    }
    catch (e) {
        console.log(e);
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.postTransaction = postTransaction;
