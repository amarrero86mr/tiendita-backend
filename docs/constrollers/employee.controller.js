"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editEmployee = exports.deleteEmployee = exports.postEmployee = exports.getEmployeeById = exports.getAllEmployees = void 0;
const employee_type_1 = require("../schemas/employee.type");
const access_db_1 = require("../db/access-db");
const errors_util_1 = require("../utils/errors.util");
// Selecciona todos los empleados de la tabla empleados
const getAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const querySql = "SELECT * FROM employees";
    try {
        // Genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // Ejecuta la peticion
        const [employees] = yield connection.query(querySql);
        // Devuelve la lista de empleados existentes
        return employees;
    }
    catch (e) {
        // En caso de cualquier error de infraestructura, devuelve el sig obj de error
        console.log(e);
        return (0, errors_util_1.error500)();
    }
});
exports.getAllEmployees = getAllEmployees;
// Selecciona de la tabla empleados un empleado por id
const getEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const querySql = "SELECT * FROM employees WHERE id_employee = ?";
    try {
        // Genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // Ejecuta la peticion
        const [employee] = yield connection.query(querySql, [id]);
        // Libera y cierra la coneccion
        connection.release();
        // Si no se encuentra el empleado devuelve un error
        if (!employee[0]) {
            return (0, errors_util_1.error404)();
        }
        // Si existe el empleado, lo devuelve
        return employee[0];
    }
    catch (e) {
        console.log(e);
        // En caso de cualquier error de infraestructura, devuelve el sig obj de error
        return (0, errors_util_1.error500)();
    }
});
exports.getEmployeeById = getEmployeeById;
// Crea y lista un nuevo empleado con su respectivo Id
const postEmployee = (newEmployee) => __awaiter(void 0, void 0, void 0, function* () {
    // Valida si el body recibido es realmente de tipo TEmployeeDto
    if (!(0, employee_type_1.isTEmployeeDto)(newEmployee)) {
        // Si no lo es genera y devuelve el error
        return (0, errors_util_1.error400)();
    }
    // Genera la query de creacion de el nuevo empleado
    const querySql = `INSERT INTO employees (employee_name, active) VALUES (?, ?)`;
    try {
        // Genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // Ejecuta la peticion
        const [result] = yield connection.query(querySql, [newEmployee.employee_name, newEmployee.active]);
        // Libera y ierra la coneccion
        connection.release();
        // Devuelve el OBJETO empleado, segun el Id creado
        return (0, exports.getEmployeeById)(result.insertId);
    }
    catch (e) {
        // En caso de cualquier error de infraestructura, devuelve el sig obj de error
        console.log(e);
        return (0, errors_util_1.error500)();
    }
});
exports.postEmployee = postEmployee;
// Elimina de la tabla empleados un empleado por id
const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const querySql = "DELETE FROM employees WHERE id_employee = ? ";
    try {
        // Genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // Ejecuta la peticion
        const [result] = yield connection.query(querySql, [id]);
        // Si no afecta ningun elemento genera este error y lo devuelve
        if (!result.affectedRows) {
            return (0, errors_util_1.error404)();
        }
        // Devuelve un mensaje de éxito
        return `employee with id: ${id} deleted`;
    }
    catch (e) {
        console.log(e);
        return (0, errors_util_1.error500)();
    }
});
exports.deleteEmployee = deleteEmployee;
// Modifica de la tabla empleados los siguientes valores
// "active",
const editEmployee = (id, dto) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, employee_type_1.isTEmployeeDto)(dto)) {
        // Si no lo es genera y devuelve este error
        return (0, errors_util_1.error400)();
    }
    // Genera la query para editar un empleado By Id
    const querySql = "UPDATE employees SET employee_name = ?, active = ? WHERE id_employee = ?";
    try {
        // Genera la coneccion
        const connection = yield access_db_1.DB_CONNECTION.getConnection();
        // Ejecuta la peticion
        const [result] = yield connection.query(querySql, [
            dto.employee_name,
            dto.active,
            id,
        ]);
        // Si no afecta ningún elemento, genera este error y lo devuelve
        if (!result.affectedRows) {
            return (0, errors_util_1.error404)();
        }
        // Si afectó un elemento, devuelve el obj completo modificado
        return yield (0, exports.getEmployeeById)(id);
    }
    catch (e) {
        console.log(e);
        return (0, errors_util_1.error500)();
    }
});
exports.editEmployee = editEmployee;
