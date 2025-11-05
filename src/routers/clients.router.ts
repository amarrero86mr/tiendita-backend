import { Router } from "express";
import {
  deleteClient,
  editClient,
  getAllClients,
  getClientById,
  postClient,
} from "../constrollers/clients.controller";
import { endpointResolver } from "../utils/resolver.util";

export const CLIENTS_ROUTER = Router();

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
CLIENTS_ROUTER.get("/all", async (req, res) => {
  endpointResolver(req, res, await getAllClients());
});


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
CLIENTS_ROUTER.get("/:id", async (req, res) => {
  endpointResolver(req, res, await getClientById(req.params.id));
});

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
CLIENTS_ROUTER.post("/", async (req, res) => {
  endpointResolver(req, res, await postClient(req.body));
});

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
CLIENTS_ROUTER.put("/:id", async (req, res) => {
  endpointResolver(req, res, await editClient(req.params.id, req.body));
});

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
CLIENTS_ROUTER.delete("/:id", async (req, res) => {
  endpointResolver(req, res, await deleteClient(req.params.id));
});
