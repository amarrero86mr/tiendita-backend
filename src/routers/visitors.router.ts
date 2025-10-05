import { Router } from "express";
import bcrypt from "bcryptjs";
import { DB_CONNECTION } from "../db/access-db";
import { endpointResolver } from "../utils/resolver.util";
import { postVisitors } from "../constrollers/visitors.controller";

export const VISITORS_ROUTER = Router();

VISITORS_ROUTER.get("/register", async (req, res) => {
  endpointResolver(req, res, await postVisitors(req.body));
})

