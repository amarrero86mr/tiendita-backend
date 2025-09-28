import { Router } from "express";
import {
  deleteClient,
  editClient,
  getAllClients,
  getClientById,
  postClient,
} from "../controllers/clients.controller";
import { endpointResolver } from "../utils/resolver.util";

export const CLIENTS_ROUTER = Router();

// Todos los clientes
CLIENTS_ROUTER.get("/all", async (req, res) => {
  endpointResolver(req, res, await getAllClients());
});

// Un clients por id
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
