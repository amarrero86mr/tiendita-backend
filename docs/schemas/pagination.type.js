"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTPaginationDto = void 0;
const is_dto_util_1 = require("../utils/is_dto.util");
const isTPaginationDto = (obj) => {
    const pagination_dto_keys_values = [
        { key: "items_per_page", type: "number" },
        { key: "page", type: "number" },
    ];
    const isPaginationDtoObj = (0, is_dto_util_1.isDto)(obj, pagination_dto_keys_values);
    const valuesInRange = obj.items_per_page > 0 && obj.page >= 1;
    return isPaginationDtoObj && valuesInRange;
};
exports.isTPaginationDto = isTPaginationDto;
