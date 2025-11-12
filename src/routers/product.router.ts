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


/**
 * @swagger
 * /products/all/{page}/{items_per_page}:
 *   get:
 *     summary: Returns all products, per page and by number of items per page
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: string
 *           default: 1
 *         required: true
 *         description: Page number
 *       - in: path
 *         name: items_per_page
 *         schema:
 *           type: string
 *           default: 10
 *         required: true
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: the list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Products'
 */
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

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Return a products by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Products ID
 *     responses:
 *       200:
 *         description: Products found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       404:
 *         description: Products not found
 */
PRODUCT_ROUTER.get("/:id", async (req, res) => {
  endpointResolver(req, res, await getProductById(req.params.id));
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new products
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *             example: { "id_product": 20, "product_name": "Insecticida Raid", "product_description": "Aerosol contra mosquitos y cucarachas 360ml", "stock": 300, "price": 2800 }
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clients'
 *       400:
 *         description: Bad Request
 */
PRODUCT_ROUTER.post("/", async (req, res) => {
  endpointResolver(req, res, await postProduct(req.body));
});


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deleting a product by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Products ID
 *     responses:
 *       200:
 *         description: Products deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       404:
 *         description: Products not found
 */
PRODUCT_ROUTER.delete("/:id", async (req, res) => {
  endpointResolver(req, res, await deleteProduct(req.params.id));
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Create a new product
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Products ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *             example: { "id_product": 20, "product_name": "Insecticida Raid", "product_description": "Aerosol contra mosquitos y cucarachas 360ml", "stock": 300, "price": 2800 }
 *     responses:
 *       201:
 *         description: Products created successfully
 *         content:
 *           application/json:
 *             schema:
 *               example: { "id_product": 20, "product_name": "Insecticida Raid", "product_description": "Aerosol contra mosquitos y cucarachas 360ml", "stock": 300, "price": 2800 }
 *               $ref: '#/components/schemas/Products'
 *       400:
 *         description: Bad Request
 */
PRODUCT_ROUTER.put("/:id", async (req, res) => {
  endpointResolver(req, res, await editProduct(req.params.id, req.body));
});
