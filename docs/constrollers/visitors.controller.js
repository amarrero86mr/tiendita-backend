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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginVisitor = exports.postVisitor = exports.getVisitorById = exports.getVisitors = void 0;
const visitors_type_1 = require("../schemas/visitors.type");
const access_db_1 = require("../db/access-db");
const errors_util_1 = require("../utils/errors.util");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getVisitors = () => __awaiter(void 0, void 0, void 0, function* () {
    const querySql = "SELECT * FROM visitors";
    try {
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        const [visitors] = yield connection.query(querySql);
        connection.release();
        return visitors;
    }
    catch (e) {
        console.log(e);
        return (0, errors_util_1.error500)();
    }
});
exports.getVisitors = getVisitors;
const getVisitorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const querySql = "SELECT * FROM visitors WHERE id_visitor = ?";
    try {
        // Genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // Ejecuta la peticion
        const [visitor] = yield connection.query(querySql, [id]);
        // Libera y cierra la coneccion
        connection.release();
        // Si no se encuentra el empleado devuelve un error
        if (!visitor[0]) {
            return (0, errors_util_1.error404)();
        }
        // Si existe el empleado, lo devuelve
        return visitor[0];
    }
    catch (e) {
        console.log(e);
        // En caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.getVisitorById = getVisitorById;
const postVisitor = (newVisitor) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, visitors_type_1.isTVisitorsDto)(newVisitor)) {
        console.log(newVisitor);
        return (0, errors_util_1.error400)("Invalid visitor format");
    }
    const sql = "INSERT INTO visitors (email, password_hash) VALUES (?, ?)";
    try {
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        const hashedPassword = yield bcryptjs_1.default.hash(newVisitor.password, 10);
        const [result] = yield connection.query(sql, [
            newVisitor.email,
            hashedPassword,
        ]);
        connection.release();
        // Devuelve el visitor recién creado
        return (0, exports.getVisitorById)(result.insertId);
    }
    catch (e) {
        console.error(e);
        return (0, errors_util_1.error500)();
    }
});
exports.postVisitor = postVisitor;
const loginVisitor = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = credentials;
    if (!email || !password)
        return (0, errors_util_1.error400)("Missing email or password");
    const sql = "SELECT * FROM visitors WHERE email = ?";
    try {
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        const [rows] = yield connection.query(sql, [email]);
        connection.release();
        if (rows.length === 0)
            return (0, errors_util_1.error401)("Email not found");
        const visitor = rows[0];
        const validPassword = yield bcryptjs_1.default.compare(password, visitor.password_hash);
        if (!validPassword)
            return (0, errors_util_1.error401)("Invalid password");
        const token = jsonwebtoken_1.default.sign({ id: visitor.id_visitor, email: visitor.email }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });
        return { token };
    }
    catch (e) {
        console.error(e);
        return (0, errors_util_1.error500)();
    }
});
exports.loginVisitor = loginVisitor;
