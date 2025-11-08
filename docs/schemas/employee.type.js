"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTEmployeeDto = void 0;
const is_dto_util_1 = require("../utils/is_dto.util");
const isTEmployeeDto = (employeeDto) => {
    const employee_dto_keys_values = [
        { key: "employee_name", type: "string" },
        { key: "active", type: "boolean" },
    ];
    return (0, is_dto_util_1.isDto)(employeeDto, employee_dto_keys_values);
};
exports.isTEmployeeDto = isTEmployeeDto;
