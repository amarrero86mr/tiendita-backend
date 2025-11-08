"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const access_db_1 = require("../db/access-db");
const pagination_type_1 = require("../schemas/pagination.type");
const errors_util_1 = require("../utils/errors.util");
const pagination_utils_1 = require("../utils/pagination.utils");
/**
 * @param {number} page - las páginas comienzan a contarse desde el nro 1.
 */
const getPagination = (table, page, items_per_page, data) => __awaiter(void 0, void 0, void 0, function* () {
    const querySql = (0, pagination_utils_1.getSqItemsInTableQuery)(table);
    try {
        if (!(0, pagination_type_1.isTPaginationDto)({ page, items_per_page })) {
            return (0, errors_util_1.error400)("Invalid pagination params");
        }
        //genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // genera la peticion
        const [totalItemsData] = yield connection.query(querySql);
        connection.release();
        const total_items = totalItemsData[0]["count(*)"];
        // devuelve la lista de productos existentes
        const result = {
            items_per_page,
            total_items,
            total_pages: Math.ceil(total_items / items_per_page),
            page,
            data,
        };
        return result;
    }
    catch (e) {
        console.log(e);
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.getPagination = getPagination;
