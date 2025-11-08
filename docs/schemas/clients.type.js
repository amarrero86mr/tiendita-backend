"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTClientDto = void 0;
const is_dto_util_1 = require("../utils/is_dto.util");
const isTClientDto = (obj) => {
    // creo el array de propiedades esperadas del tipo TTransactionDto
    const keys_values = [
        { key: "client_name", type: "string" },
        { key: "active", type: "boolean" },
    ];
    // devuelvo el resultado de la validación de esas propiedades
    return (0, is_dto_util_1.isDto)(obj, keys_values);
};
exports.isTClientDto = isTClientDto;
