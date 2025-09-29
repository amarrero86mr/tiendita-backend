import swaggerJsDoc from "swagger-jsdoc";
/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
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
 *
 * @swagger
 *  tags:
 *    name: Client
 */
const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tiendita Backend",
      version: "1.0.0",
      description: "A little store",
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
