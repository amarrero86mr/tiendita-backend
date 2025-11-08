"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = require("swagger-ui-express");
const clients_router_1 = require("./routers/clients.router");
const employee_router_1 = require("./routers/employee.router");
const product_router_1 = require("./routers/product.router");
const supplier_router_1 = require("./routers/supplier.router");
const transaction_router_1 = require("./routers/transaction.router");
const type_transaction_route_1 = require("./routers/type_transaction.route");
const swagger_1 = __importDefault(require("./swagger"));
const requireAuth_1 = require("./middleware/requireAuth");
const visitors_router_1 = require("./routers/visitors.router");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static("public"));
app.use("/api/visitors", visitors_router_1.VISITORS_ROUTER);
// app.use("/", (req: Request, res: Response) => {
//   res.sendFile(__dirname + '/public/login.html');
//   res.status(200);
// });
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
app.use("/docs", (0, swagger_ui_express_1.serveFiles)(swagger_1.default), (req, res) => res.send((0, swagger_ui_express_1.generateHTML)(swagger_1.default)));
// app.use("/docs", swagerUi.serve, swagerUi.setup(swaggerSpec));
/* app.use("/docs", swagerUi.serve, swagerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true,
  },
})); */
app.use("/products", requireAuth_1.requireAuth, product_router_1.PRODUCT_ROUTER);
app.use("/suppliers", requireAuth_1.requireAuth, supplier_router_1.SUPPLIERS_ROUTER);
app.use("/clients", requireAuth_1.requireAuth, clients_router_1.CLIENTS_ROUTER);
app.use("/transactions", requireAuth_1.requireAuth, transaction_router_1.TRANSACTION_ROUTER);
app.use("/type_transactions", requireAuth_1.requireAuth, type_transaction_route_1.TYPE_TRANSACTION_ROUTER);
app.use("/employees", requireAuth_1.requireAuth, employee_router_1.EMPLOYEES_ROUTER);
exports.default = app;
