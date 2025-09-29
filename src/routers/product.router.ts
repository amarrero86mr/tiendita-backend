import { Router } from "express";

import {
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
  postProduct,
} from "../constrollers/product.controller";
import { getPaginationDtoFromParams } from "../utils/pagination.utils";
import { endpointResolver } from "../utils/resolver.util";

export const PRODUCT_ROUTER = Router();

PRODUCT_ROUTER.get("/all/:page?/:items_per_page?", async (req, res) => {
  endpointResolver(
    req,
    res,
    await getAllProducts(
      getPaginationDtoFromParams({
        page: req.params.page,
        items_per_page: req.params.items_per_page,
      })
    )
  );
});

PRODUCT_ROUTER.get("/:id", async (req, res) => {
  endpointResolver(req, res, await getProductById(req.params.id));
});

PRODUCT_ROUTER.post("/", async (req, res) => {
  endpointResolver(req, res, await postProduct(req.body));
});

PRODUCT_ROUTER.delete("/:id", async (req, res) => {
  endpointResolver(req, res, await deleteProduct(req.params.id));
});

PRODUCT_ROUTER.put("/:id", async (req, res) => {
  endpointResolver(req, res, await editProduct(req.params.id, req.body));
});
