"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDto = void 0;
const isDto = (dto_obj, dto_keys_values) => {
    // si el argumento es de tipo objeto
    if (typeof dto_obj === "object") {
        // se recorrerán todas sus keys, para ver si esa propiedad existe y tiene ese tipo de valor
        return dto_keys_values.every((pair) => {
            return typeof dto_obj[pair.key] === pair.type;
        });
    }
    return false;
};
exports.isDto = isDto;
