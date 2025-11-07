import { Router } from "express";
//importa las funciones en controllers
import {
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  postSupplier,
  putSupplier,
} from "../constrollers/supplier.controller";
import { endpointResolver } from "../utils/resolver.util";

export const SUPPLIERS_ROUTER = Router();
// Devuelve todos los suppliers
SUPPLIERS_ROUTER.get("/all", async (req, res) => {
  endpointResolver(req, res, await getAllSuppliers());
});

// Devuelve un supplier por id
SUPPLIERS_ROUTER.get("/:id", async (req, res) => {
  endpointResolver(req, res, await getSupplierById(req.params.id));
});

// Añade un supplier a la base de datos
SUPPLIERS_ROUTER.post("/", async (req, res) => {
  endpointResolver(req, res, await postSupplier(req.body));
});

// Edita un supplier ya presente en la base de datos
SUPPLIERS_ROUTER.put("/:id", async (req, res) => {
  endpointResolver(req, res, await putSupplier(req.params.id, req.body));
});

// Elimina un supplier de la base de datos
SUPPLIERS_ROUTER.delete("/:id", async (req, res) => {
  endpointResolver(req, res, await deleteSupplier(req.params.id));
});
