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
CLIENTS_ROUTER.post("/", async (req, res) => {
  endpointResolver(req, res, await postClient(req.body));
});

// Modificar un cliente
CLIENTS_ROUTER.put("/:id", async (req, res) => {
  endpointResolver(req, res, await editClient(req.params.id, req.body));
});

// Eliminar un cliente
CLIENTS_ROUTER.delete("/:id", async (req, res) => {
  endpointResolver(req, res, await deleteClient(req.params.id));
});
