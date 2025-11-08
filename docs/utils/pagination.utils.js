"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSqItemsInTableQuery = exports.getPaginationDtoFromParams = exports.getSqlPaginationQuery = void 0;
/**
 * @param {number} page - las páginas comienzan a contarse desde el nro 1.
 */
const getSqlPaginationQuery = (page, items_per_page) => {
    return ` LIMIT ${items_per_page} OFFSET ${items_per_page * (page - 1)}`;
};
exports.getSqlPaginationQuery = getSqlPaginationQuery;
const getPaginationDtoFromParams = (pagParams) => {
    const result = {
        items_per_page: pagParams.items_per_page
            ? Number(pagParams.items_per_page)
            : undefined,
        page: pagParams.page ? Number(pagParams.page) : undefined,
    };
    return result;
};
exports.getPaginationDtoFromParams = getPaginationDtoFromParams;
const getSqItemsInTableQuery = (table) => `SELECT count(*) FROM ${table}`;
exports.getSqItemsInTableQuery = getSqItemsInTableQuery;
