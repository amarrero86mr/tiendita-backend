import swaggerJsDoc from "swagger-jsdoc";
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 *   schemas:
 *     Clients:
 *       type: object
 *       required:
 *         - client_name
 *         - active
 *       properties:
 *         client_name:
 *           type: string
 *           description: Client name
 *         active:
 *           type: boolean
 *           descripton: Whether the client is available
 *       example:
 *         client_name: Pepito
 *         active: true
 *
 *     Products:
 *       type: object
 *       required:
 *         - product_name
 *         - product_description
 *         - price
 *         - stock
 *       properties:
 *         product_name:
 *           type: string
 *           description: Product name
 *         product_description:
 *           type: string
 *           description: Product description
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the product
 *         stock:
 *           type: integer
 *           description: Units available
 *       example:
 *         id_product: 1
 *         product_name: "Yerba Piporé"
 *         product_description: "Paquete de yerba Piporé clásica"
 *         price: 2150
 *         stock: 500
 * 
 *     Employees:
 *       type: object
 *       required:
 *         - employee_name
 *         - active
 *       properties:
 *         employee_name:
 *           type: string
 *           description: Employee name
 *         active:
 *           type: boolean
 *           descripton: Whether the eployee is available
 *       example:
 *         id_employee: 4
 *         employee_name: "Patricio"
 *         active: true
 *
 * @swagger
 *  tags:
 *    - name: Clients
 *    - name: Products
 *    - name: Employees
 */
const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tiendita Backend",
      version: "1.0.0",
      description: "A Little Store",
    },
  },
  apis: [
    `${__dirname}/routers/*.js`,
    `${__dirname}/routers/*.ts`,
    `${__dirname}/swagger.js`,
    `${__dirname}/swagger.ts`,
  ],
});

export default swaggerSpec;
