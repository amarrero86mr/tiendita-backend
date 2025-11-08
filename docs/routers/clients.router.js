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
exports.CLIENTS_ROUTER = void 0;
const express_1 = require("express");
const clients_controller_1 = require("../constrollers/clients.controller");
const resolver_util_1 = require("../utils/resolver.util");
exports.CLIENTS_ROUTER = (0, express_1.Router)();
/**
 * @swagger
 * /clients/all:
 *   get:
 *     summary: Returns all clients
 *     security:
 *       - bearerAuth: []
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: the list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clients'
 */
exports.CLIENTS_ROUTER.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, clients_controller_1.getAllClients)());
}));
/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Return a client by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clients'
 *       404:
 *         description: Client not found
 */
exports.CLIENTS_ROUTER.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, clients_controller_1.getClientById)(req.params.id));
}));
// Crear un cliente
/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clients'
 *             example: { "client_name": "Clien Name", "active": true }
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
exports.CLIENTS_ROUTER.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, clients_controller_1.postClient)(req.body));
}));
// Modificar un cliente
/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Create a new client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clients'
 *             example: { "client_name": "Clien Name", "active": true }
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clients'
 *               example: { "id_client": number, "client_name": "new name", "active": boolean }
 *       400:
 *         description: Bad Request
 */
exports.CLIENTS_ROUTER.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, clients_controller_1.editClient)(req.params.id, req.body));
}));
// Eliminar un cliente
/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Deleting a client by ID changes its active status to false.
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client deleted
 *         content:
 *           application/json:
 *             schema:
 *               example: { "id_client": number, "client_name": "Client Name", "active": FALSE }
 *               $ref: '#/components/schemas/Clients'
 *       404:
 *         description: Client not found
 */
exports.CLIENTS_ROUTER.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, resolver_util_1.endpointResolver)(req, res, yield (0, clients_controller_1.deleteClient)(req.params.id));
}));
