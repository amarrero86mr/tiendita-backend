import { Router } from "express";
import bcrypt from "bcryptjs";
import { DB_CONNECTION } from "../db/access-db";
import { endpointResolver } from "../utils/resolver.util";
import { loginVisitor, postVisitor } from "../constrollers/visitors.controller";
import { TVisitorsDto } from "../schemas/visitors.type";
import { TError } from "../schemas/error.type";

export const VISITORS_ROUTER = Router();

// Register
VISITORS_ROUTER.post("/register", async (req, res) => {
  const data = req.body as TVisitorsDto;
  const result = await postVisitor(data);

  if ((result as TError).status) {
    const err = result as TError;
    return res.status(err.status).json(err);
  }

  res.status(201).json(result);
});

// Login
VISITORS_ROUTER.get("/login", async (req, res) => {
  const credentials = req.body as TVisitorsDto;
  const result = await loginVisitor(credentials);

  if ((result as TError).status) {
    const err = result as TError;
    return res.status(err.status).json(err);
  }

  res.status(200).json(result);
});

