import { TError } from "../schemas/error.type";

export const error500 = (description?: string) => {
  const error: TError = {
    msg: "Internal server error",
    status: 500,
    description,
  };
  return error;
};

export const error404 = (description?: string) => {
  const error: TError = {
    msg: "Element not found",
    status: 404,
    description,
  };
  return error;
};

export const error400 = (description?: string) => {
  const error: TError = {
    msg: "Invalid data",
    status: 400,
    description,
  };
  return error;
};

export const error401 = (description?: string) => {
  const error: TError = {
    msg: "401 - Unauthorized / Authorization Expired",
    status: 401,
    description,
  };
  return error;
};
