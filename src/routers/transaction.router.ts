import { Router } from "express";
import { endpointResolver } from "../utils/resolver.util";
import {
  getAllTransactions,
  getTransactionById,
  postTransaction,
} from "../constrollers/transaction.controller";

export const TRANSACTION_ROUTER = Router();

TRANSACTION_ROUTER.get("/all", async (req, res) => {
  endpointResolver(req, res, await getAllTransactions());
});

TRANSACTION_ROUTER.get("/:id", async (req, res) => {
  endpointResolver(req, res, await getTransactionById(req.params.id));
});

// TRANSACTION_ROUTER.post("/", async (req, res) => {
//   endpointResolver(req, res, await postTransaction(req.body));
// });
