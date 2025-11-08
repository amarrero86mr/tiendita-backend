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
exports.editProduct = exports.deleteProduct = exports.postProduct = exports.getProductById = exports.getAllProducts = void 0;
const access_db_1 = require("../db/access-db");
const error_type_1 = require("../schemas/error.type");
const pagination_type_1 = require("../schemas/pagination.type");
const product_type_1 = require("../schemas/product.type");
const errors_util_1 = require("../utils/errors.util");
const pagination_utils_1 = require("../utils/pagination.utils");
const pagination_controller_1 = require("../Controllers/pagination.controller");
const getAllProducts = (partialDto) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const dtoDefaultValues = {
            page: 1,
            items_per_page: 10,
        };
        const dto = {
            page: (_a = partialDto.page) !== null && _a !== void 0 ? _a : dtoDefaultValues.page,
            items_per_page: (_b = partialDto.items_per_page) !== null && _b !== void 0 ? _b : dtoDefaultValues.items_per_page,
        };
        if (!(0, pagination_type_1.isTPaginationDto)(dto)) {
            return (0, errors_util_1.error400)("Invalid pagination params");
        }
        const querySql = "SELECT * FROM products";
        const paginationQuerySql = (0, pagination_utils_1.getSqlPaginationQuery)(dto.page, dto.items_per_page);
        //genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // genera la peticion
        const [products] = yield connection.query(querySql + paginationQuerySql);
        connection.release();
        // devuelve la lista de productos existentes
        return (0, pagination_controller_1.getPagination)("products", dto.page, dto.items_per_page, products);
    }
    catch (e) {
        console.log(e);
        // en caso de que el error sea conocido (type TError), se devuelve ese obj
        if ((0, error_type_1.isTError)(e)) {
            return e;
        }
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const querySql = "SELECT * FROM products WHERE id_product = ?";
    try {
        //genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // genera la peticion
        const [products] = yield connection.query(querySql, [id]);
        // libera y cierra la coneccion
        connection.release();
        // si no se encuentra el producto, devuelve un error
        if (!products[0]) {
            return (0, errors_util_1.error404)();
        }
        // si hay un producto, lo devuelve
        return products[0];
    }
    catch (e) {
        console.log(e);
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.getProductById = getProductById;
const postProduct = (newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    // valido si el body recibido es realmente de tipo TProductDto
    if (!(0, product_type_1.isTProductDto)(newProduct)) {
        // si no lo es, genera y devuelve este error
        return (0, errors_util_1.error400)();
    }
    // genera la query de creación del producto
    const querySql = `INSERT INTO products (product_name, product_description, stock, price) VALUES (?, ?, ?, ?)`;
    try {
        //genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // genera la peticion
        const [result] = yield connection.query(querySql, [
            newProduct.product_name,
            newProduct.product_description,
            newProduct.stock,
            newProduct.price,
        ]);
        // libera y cierra la coneccion
        connection.release();
        // devuelve el OBJETO producto, según el id creado
        return (0, exports.getProductById)(result.insertId);
    }
    catch (e) {
        console.log(e);
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.postProduct = postProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // genera la query para eliminar un producto by id
    const querySql = `DELETE FROM products WHERE id_product = ?`;
    try {
        //genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // ejecuta la peticion
        const [result] = yield connection.query(querySql, [id]);
        // si no afecta ningún elemento, genera este error y lo devuelve
        if (!result.affectedRows) {
            return (0, errors_util_1.error404)();
        }
        // devuelve un mensaje de éxito
        return `product with id: ${id} deleted`;
    }
    catch (e) {
        console.log(e);
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.deleteProduct = deleteProduct;
const editProduct = (id, dto) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, product_type_1.isTProductDto)(dto)) {
        // si no lo es, genera y devuelve este error
        return (0, errors_util_1.error400)();
    }
    // genera la query para editar un producto by id
    const querySql = `UPDATE products SET product_name = ?, product_description = ?, stock = ?, price = ? WHERE id_product = ?`;
    try {
        //genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // ejecuta la peticion
        const [result] = yield connection.query(querySql, [
            dto.product_name,
            dto.product_description,
            dto.stock,
            dto.price,
            id,
        ]);
        // si no afecta ningún elemento, genera este error y lo devuelve
        if (!result.affectedRows) {
            return (0, errors_util_1.error404)();
        }
        // si afectó un elemento, devuelve el obj completo modificado
        return yield (0, exports.getProductById)(id);
    }
    catch (e) {
        console.log(e);
        // en caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.editProduct = editProduct;
