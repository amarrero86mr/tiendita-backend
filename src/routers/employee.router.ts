import { Router } from "express";
import { endpointResolver } from "../utils/resolver.util";
import {
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  postEmployee,
  editEmployee
} from "../constrollers/employee.controller";

export const EMPLOYEES_ROUTER = Router();

// method: GET
// no tiene requisitos especiales
// respuesta: lista todos los empleados
/**
 * @swagger
 * /employees/all:
 *   get:
 *     summary: Returns all employees
 *     security:
 *       - bearerAuth: []
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: the list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employees'
 */
EMPLOYEES_ROUTER.get("/all", async (req, res) => {
  endpointResolver(req, res, await getAllEmployees());
});

// method: GET
// requisito: debe devolver un unico empleado correspondiente al Id recibido
// respuesta: lista un empleado por Id

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Return a Employee by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employees'
 *       404:
 *         description: Employee not found
 */
EMPLOYEES_ROUTER.get("/:id", async (req, res) => {
  endpointResolver(req, res, await getEmployeeById(req.params.id));
});

// method: POST
// respuesta: crea y lista un nuevo empleado

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     security:
 *       - bearerAuth: []
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employees'
 *             example: { "employee_name": "Employee Name", "active": true }
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employees'
 *       400:
 *         description: Bad Request
 */
EMPLOYEES_ROUTER.post("/", async (req, res) => {
  endpointResolver(req, res, await postEmployee(req.body));
});

// method: DELETE 
// requisito: debe eliminar un unico empleado correspondiente al Id recibido
// respuesta: elimina un empleado por Id

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Deleting a Employee by ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee deleted
 *         content:
 *           application/json:
 *             schema:
 *               example: { "id_employee": number, "employee_name": "Employee Name", "active": FALSE }
 *               $ref: '#/components/schemas/Employees'
 *       404:
 *         description: Employee not found
 */
EMPLOYEES_ROUTER.delete("/:id", async (req, res) => {
  endpointResolver(req, res, await deleteEmployee(req.params.id))
});

// method: PUT
// requisito: debe editar un unico empleado correspondiente al Id recibido
// respuesta: edita y lista un empleado por Id

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Edit an employee
 *     security:
 *       - bearerAuth: []
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employees'
 *             example: { "employee_name": "Employee Name", "active": true }
 *     responses:
 *       201:
 *         description: Employee successfully edited
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employees'
 *               example: { "id_employee": number, "employee_name": "new name", "active": boolean }
 *       400:
 *         description: Bad Request
 */
EMPLOYEES_ROUTER.put("/:id", async  (req, res) => {
  endpointResolver(req, res, await editEmployee(req.params.id, req.body))
});


