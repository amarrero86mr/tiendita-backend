"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_util_1 = require("../utils/errors.util");
const requireAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]; // formato "Bearer <token>"
    if (!token) {
        const err = (0, errors_util_1.error401)("Access denied. Token missing.");
        return res.status(err.status).json(err);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "default_secret");
        req.visitor = decoded; // guarda los datos del visitor autenticado
        next();
    }
    catch (_a) {
        const err = (0, errors_util_1.error401)("Invalid or expired token.");
        return res.status(err.status).json(err);
    }
};
exports.requireAuth = requireAuth;
