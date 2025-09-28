import { Router } from "express";
import { endpointResolver } from "../utils/resolver.util";
import {
  getAllTypeTransactions,
  getTypeTransactionById,
} from "../controllers/type_transaction.controller";

export const TYPE_TRANSACTION_ROUTER = Router();

TYPE_TRANSACTION_ROUTER.get("/all", async (req, res) => {
  endpointResolver(req, res, await getAllTypeTransactions());
});

TYPE_TRANSACTION_ROUTER.get("/:id", async (req, res) => {
  endpointResolver(req, res, await getTypeTransactionById(req.params.id));
});
