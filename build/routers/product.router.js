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
exports.PRODUCT_ROUTER = void 0;
const express_1 = require("express");
const product_controller_1 = require("../constrollers/product.controller");
const pagination_utils_1 = require("../utils/pagination.utils");
const resolver_util_1 = require("../utils/resolver.util");
exports.PRODUCT_ROUTER = (0, express_1.Router)();
/**
 * @swagger
 * /products/all/{page}/{items_per_page}:
 *   get:
 *     summary: Returns all products, per page and by number of items per page
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: string
 *           default: 1
 *         required: true
 *         description: Page number
 *       - in: path
 *         name: items_per_page
 *         schema:
 *           type: string
 *           default: 10
 *         required: true
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: the list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Products'
 */
exports.PRODUCT_ROUTER.get("/all/:page?/:items_per_page?", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, product_controller_1.getAllProducts)((0, pagination_utils_1.getPaginationDtoFromParams)({
        page: req.params.page,
        items_per_page: req.params.items_per_page,
    })));
}));
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Return a products by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Products ID
 *     responses:
 *       200:
 *         description: Products found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       404:
 *         description: Products not found
 */
exports.PRODUCT_ROUTER.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, product_controller_1.getProductById)(req.params.id));
}));
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new products
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *             example: { "id_product": 20, "product_name": "Insecticida Raid", "product_description": "Aerosol contra mosquitos y cucarachas 360ml", "stock": 300, "price": 2800 }
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clients'
 *       400:
 *         description: Bad Request
 */
exports.PRODUCT_ROUTER.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, product_controller_1.postProduct)(req.body));
}));
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deleting a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Products ID
 *     responses:
 *       200:
 *         description: Products deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       404:
 *         description: Products not found
 */
exports.PRODUCT_ROUTER.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, product_controller_1.deleteProduct)(req.params.id));
}));
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Create a new product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Products ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *             example: { "id_product": 20, "product_name": "Insecticida Raid", "product_description": "Aerosol contra mosquitos y cucarachas 360ml", "stock": 300, "price": 2800 }
 *     responses:
 *       201:
 *         description: Products created successfully
 *         content:
 *           application/json:
 *             schema:
 *               example: { "id_product": 20, "product_name": "Insecticida Raid", "product_description": "Aerosol contra mosquitos y cucarachas 360ml", "stock": 300, "price": 2800 }
 *               $ref: '#/components/schemas/Products'
 *       400:
 *         description: Bad Request
 */
exports.PRODUCT_ROUTER.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, product_controller_1.editProduct)(req.params.id, req.body));
}));
