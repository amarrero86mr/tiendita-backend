import { isTError, TError } from "../schemas/error.type";
import { Request, Response } from "express";

export const endpointResolver = <T>(
  req: Request,
  res: Response,
  data: T | TError
) => {
  if (isTError(data)) {
    res.status(data.status);
  }
  res.json(data);
};
