import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { generateHTML, serveFiles } from "swagger-ui-express";
import { CLIENTS_ROUTER } from "./routers/clients.router";
import { EMPLOYEES_ROUTER } from "./routers/employee.router";
import { PRODUCT_ROUTER } from "./routers/product.router";
import { SUPPLIERS_ROUTER } from "./routers/supplier.router";
import { TRANSACTION_ROUTER } from "./routers/transaction.router";
import { TYPE_TRANSACTION_ROUTER } from "./routers/type_transaction.route";
import swaggerSpec from "./swagger";
import { requireAuth } from "./middleware/requireAuth";
import { VISITORS_ROUTER } from "./routers/visitors.router";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.use(express.static("public"));

app.use("/api/visitors", VISITORS_ROUTER);
// app.use("/", (req: Request, res: Response) => {
//   res.sendFile(__dirname + '/public/login.html');
//   res.status(200);
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(
  "/docs",
  serveFiles(swaggerSpec),
  (req: any, res: any) => res.send(generateHTML(swaggerSpec))
);
// app.use("/docs", swagerUi.serve, swagerUi.setup(swaggerSpec));
/* app.use("/docs", swagerUi.serve, swagerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true,
  },
})); */

app.use("/products", requireAuth, PRODUCT_ROUTER);
app.use("/suppliers", requireAuth, SUPPLIERS_ROUTER);
app.use("/clients", requireAuth, CLIENTS_ROUTER);
app.use("/transactions", requireAuth, TRANSACTION_ROUTER);
app.use("/type_transactions", requireAuth, TYPE_TRANSACTION_ROUTER);
app.use("/employees", requireAuth, EMPLOYEES_ROUTER);

export default app;