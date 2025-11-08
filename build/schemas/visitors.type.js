"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTVisitorsDto = void 0;
const is_dto_util_1 = require("../utils/is_dto.util");
const isTVisitorsDto = (obj) => {
    // creo el array de propiedades esperadas del tipo TTransactionDto
    const keys_values = [
        { key: "email", type: "string" },
        { key: "password", type: "string" },
    ];
    // devuelvo el resultado de la validación de esas propiedades
    return (0, is_dto_util_1.isDto)(obj, keys_values);
};
exports.isTVisitorsDto = isTVisitorsDto;
