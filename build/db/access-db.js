"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONNECTION = void 0;
const promise_1 = require("mysql2/promise");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getDbConfig() {
    return {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        uri: process.env.DB_URI,
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0,
    };
}
exports.DB_CONNECTION = (0, promise_1.createPool)(getDbConfig()
//   {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT,
//   uri: process.env.DB_URI,
//   waitForConnections: true,
//   connectionLimit: 5,
//   queueLimit: 0,
// }
);
exports.DB_CONNECTION.getConnection()
    .then((connection) => {
    console.log("se conécto exitosamente a la base de datos");
    connection.release();
})
    .catch((err) => {
    console.log("NO se conécto a la base de datos", err);
});
exports.DB_CONNECTION.on("connection", (c) => {
    console.log("se abre conexión");
});
// DB_CONNECTION.end();
