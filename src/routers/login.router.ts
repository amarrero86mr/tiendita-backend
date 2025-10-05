import jwt  from "jsonwebtoken";
import { Router } from "express";
import { DB_CONNECTION } from "../db/access-db";
import bcrypt from "bcryptjs";
import { TVisitors } from "../schemas/visitors.type";
import { endpointResolver } from "../utils/resolver.util";
import { getVisitors } from "../constrollers/visitors.controller";

export const VISITORS_ROUTER = Router();

VISITORS_ROUTER.get("/login", async (req, res) => {
  endpointResolver(req, res, await getVisitors());
  
/*   const { useremail, password } = req.body;

  const [rows] = await DB_CONNECTION.query(
    "SELECT * FROM users WHERE user_email = ?",
    [useremail]
  );
  
  const user: TVisitors = Array.isArray(rows) ? rows[0] : [[]];
  
  if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: "Credenciales inválidas" });

  const token = jwt.sign(
    { id: user.id_user, useremail: user.useremail },
    process.env.JWT_SECRET || "tiendita",
    { expiresIn: "1h" }
  );

  res.json({ token }); */
});



