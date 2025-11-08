"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpointResolver = void 0;
const error_type_1 = require("../schemas/error.type");
const endpointResolver = (req, res, data) => {
    if ((0, error_type_1.isTError)(data)) {
        res.status(data.status);
    }
    res.json(data);
};
exports.endpointResolver = endpointResolver;
