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
exports.deleteClient = exports.editClient = exports.postClient = exports.getClientById = exports.getAllClients = void 0;
const access_db_1 = require("../db/access-db");
const clients_type_1 = require("../schemas/clients.type");
const errors_util_1 = require("../utils/errors.util");
const getAllClients = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "SELECT * FROM clients";
    try {
        const connection = yield access_db_1.DB_CONNECTION.getConnection(); //genera la coneccion
        const [clients] = yield connection.query(sql); // genera la peticion
        connection.release(); // libera y cierra la coneccion
        // devuelve la respuesta de la peticion
        return clients;
    }
    catch (e) {
        console.log(e);
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.getAllClients = getAllClients;
const getClientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "SELECT * FROM clients WHERE id_client = ?";
    try {
        const connection = yield access_db_1.DB_CONNECTION.getConnection(); //genera la coneccion
        const [clients] = yield connection.query(sql, [
            id,
        ]); // genera la peticion
        connection.release(); // libera y cierra la coneccion
        if (!clients[0]) {
            return (0, errors_util_1.error404)();
        }
        return clients[0];
    }
    catch (e) {
        console.log(e);
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.getClientById = getClientById;
const postClient = (newClient) => __awaiter(void 0, void 0, void 0, function* () {
    // valido si el body recibido es realmente de tipo TProductDto
    if (!(0, clients_type_1.isTClientDto)(newClient)) {
        // si no lo es, genera y devuelve este error
        return (0, errors_util_1.error400)();
    }
    const sql = "INSERT INTO clients (client_name, active) VALUES (?,?)";
    try {
        const connection = yield access_db_1.DB_CONNECTION.getConnection(); //genera la coneccion
        const [result] = yield connection.query(sql, [
            newClient.client_name,
            newClient.active,
        ]); // genera la peticion
        connection.release(); // libera y cierra la coneccion
        if (!newClient) {
            const error = {
                msg: "Invalid request",
                status: 400,
            };
            return error;
        }
        // devuelve el OBJETO producto, según el id creado
        return (0, exports.getClientById)(result.insertId);
    }
    catch (e) {
        console.log(e);
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.postClient = postClient;
const editClient = (id, dto) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, clients_type_1.isTClientDto)(dto)) {
        return (0, errors_util_1.error400)();
    }
    const sql = "UPDATE clients SET client_name=?, active=? WHERE id_client=?";
    try {
        const connection = yield access_db_1.DB_CONNECTION.getConnection(); //genera la coneccion
        const [result] = yield connection.query(sql, [
            dto.client_name,
            dto.active,
            id,
        ]); // genera la peticion
        connection.release(); // libera y cierra la coneccion
        if (!result.affectedRows) {
            return (0, errors_util_1.error404)();
        }
        return (0, exports.getClientById)(id);
    }
    catch (e) {
        console.log(e);
        return (0, errors_util_1.error500)();
    }
});
exports.editClient = editClient;
// si bien este es un delete "fisico" en un futuro sera un delete logico a partire de la modificacion de un valor
const deleteClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "UPDATE clients SET active=0 WHERE id_client = ?";
    try {
        const connection = yield access_db_1.DB_CONNECTION.getConnection(); //genera la coneccion
        const [result] = yield connection.query(sql, [id]); // genera la peticion
        connection.release(); // libera y cierra la coneccion
        // console.log(result.affectedRows)
        if (!result.affectedRows) {
            return (0, errors_util_1.error404)();
        }
        return `Client id: ${id}, deleted`;
    }
    catch (e) {
        console.log(e);
        return (0, errors_util_1.error500)();
    }
});
exports.deleteClient = deleteClient;
