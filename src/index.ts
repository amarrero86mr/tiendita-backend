import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import swagerUi from "swagger-ui-express";
import { CLIENTS_ROUTER } from "./routers/clients.router";
import { EMPLOYEES_ROUTER } from "./routers/employee.router";
import { PRODUCT_ROUTER } from "./routers/product.router";
import { SUPPLIERS_ROUTER } from "./routers/supplier.router";
import { TRANSACTION_ROUTER } from "./routers/transaction.router";
import { TYPE_TRANSACTION_ROUTER } from "./routers/type_transaction.route";
import swaggerSpec from "./swagger";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use("/products", PRODUCT_ROUTER);
app.use("/suppliers", SUPPLIERS_ROUTER);

app.use("/clients", CLIENTS_ROUTER);

app.use("/transactions", TRANSACTION_ROUTER);
app.use("/type_transactions", TYPE_TRANSACTION_ROUTER);

app.use("/employees", EMPLOYEES_ROUTER);

app.use("/docs", swagerUi.serve, swagerUi.setup(swaggerSpec));
