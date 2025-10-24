import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { error401 } from "../utils/errors.util";


export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // formato "Bearer <token>"

  if (!token) {
    const err = error401("Access denied. Token missing.");
    return res.status(err.status).json(err);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    (req as any).visitor = decoded; // guarda los datos del visitor autenticado
    next();
  } catch {
    const err = error401("Invalid or expired token.");
    return res.status(err.status).json(err);
  }
};