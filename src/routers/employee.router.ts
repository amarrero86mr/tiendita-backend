import { Router } from "express";
import { endpointResolver } from "../utils/resolver.util";
import {
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  postEmployee,
  editEmployee
} from "../controllers/employee.controller";

export const EMPLOYEES_ROUTER = Router();

// method: GET
// no tiene requisitos especiales
// respuesta: lista todos los empleados
EMPLOYEES_ROUTER.get("/all", async (req, res) => {
  endpointResolver(req, res, await getAllEmployees());
});

// method: GET
// requisito: debe devolver un unico empleado correspondiente al Id recibido
// respuesta: lista un empleado por Id
EMPLOYEES_ROUTER.get("/:id", async (req, res) => {
  endpointResolver(req, res, await getEmployeeById(req.params.id));
});

// method: POST
// respuesta: crea y lista un nuevo empleado 
EMPLOYEES_ROUTER.post("/", async (req, res) => {
  endpointResolver(req, res, await postEmployee(req.body));
});

// method: DELETE 
// requisito: debe eliminar un unico empleado correspondiente al Id recibido
// respuesta: elimina un empleado por Id
EMPLOYEES_ROUTER.delete("/:id", async (req, res) => {
  endpointResolver(req, res, await deleteEmployee(req.params.id))
});

// method: PUT
// requisito: debe editar un unico empleado correspondiente al Id recibido
// respuesta: edita y lista un empleado por Id
EMPLOYEES_ROUTER.put("/:id", async  (req, res) => {
  endpointResolver(req, res, await editEmployee(req.params.id, req.body))
});


