"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTTypeTransactionDto = void 0;
const is_dto_util_1 = require("../utils/is_dto.util");
const isTTypeTransactionDto = (obj) => {
    // creo el array de propiedades esperadas del tipo TTypeTransactionDto
    const keys_values = [{ key: "type_transaction_name", type: "string" }];
    // devuelvo el resultado de la validación de esas propiedades
    return (0, is_dto_util_1.isDto)(obj, keys_values);
};
exports.isTTypeTransactionDto = isTTypeTransactionDto;
