"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTSupplierDto = void 0;
const is_dto_util_1 = require("../utils/is_dto.util");
const isTSupplierDto = (supplierDto) => {
    const supplier_dto_keys_values = [
        { key: "supplier_name", type: "string" },
        { key: "email", type: "string" },
        { key: "active", type: "boolean" },
    ];
    return (0, is_dto_util_1.isDto)(supplierDto, supplier_dto_keys_values);
};
exports.isTSupplierDto = isTSupplierDto;
