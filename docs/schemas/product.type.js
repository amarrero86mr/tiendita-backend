"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTProductDto = void 0;
const is_dto_util_1 = require("../utils/is_dto.util");
const isTProductDto = (product) => {
    const product_dto_keys_values = [
        { key: "product_name", type: "string" },
        { key: "product_description", type: "string" },
        { key: "stock", type: "number" },
        { key: "price", type: "number" },
    ];
    return (0, is_dto_util_1.isDto)(product, product_dto_keys_values);
};
exports.isTProductDto = isTProductDto;
