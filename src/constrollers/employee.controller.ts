import { ResultSetHeader, RowDataPacket } from "mysql2";
import {
  isTEmployeeDto,
  TEmployee,
  TEmployeeDto,
} from "../schemas/employee.type";
import { TError } from "../schemas/error.type";
import { DB_CONNECTION } from "../db/access-db";
import { error400, error404, error500 } from "../utils/errors.util";

// Selecciona todos los empleados de la tabla empleados
export const getAllEmployees = async (): Promise<
  Array<RowDataPacket & TEmployee> | TError
> => {
  const querySql = "SELECT * FROM employees";

  try {
    // Genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // Ejecuta la peticion
    const [employees] = await connection.query<
      Array<RowDataPacket & TEmployee>
    >(querySql);

    // Devuelve la lista de empleados existentes
    return employees;
  } catch (e) {
    // En caso de cualquier error de infraestructura, devuelve el sig obj de error
    console.log(e);
    return error500();
  }
};

// Selecciona de la tabla empleados un empleado por id
export const getEmployeeById = async (
  id: string | number
): Promise<TEmployee | TError> => {
  const querySql = "SELECT * FROM employees WHERE id_employee = ?";

  try {
    // Genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // Ejecuta la peticion
    const [employee] = await connection.query<[RowDataPacket & TEmployee]>(
      querySql,
      [id]
    );

    // Libera y cierra la coneccion
    connection.release();

    // Si no se encuentra el empleado devuelve un error
    if (!employee[0]) {
      return error404();
    }

    // Si existe el empleado, lo devuelve
    return employee[0];
  } catch (e) {
    console.log(e);
    // En caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};

// Crea y lista un nuevo empleado con su respectivo Id
export const postEmployee = async (
  newEmployee: TEmployeeDto
): Promise<TEmployeeDto | TError> => {
  // Valida si el body recibido es realmente de tipo TEmployeeDto
  if (!isTEmployeeDto(newEmployee)) {
    // Si no lo es genera y devuelve el error
    return error400();
  }

  // Genera la query de creacion de el nuevo empleado
  const querySql = `INSERT INTO employees (employee_name, active) VALUES (?, ?)`;

  try {
    // Genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // Ejecuta la peticion
    const [result] = await connection.query<ResultSetHeader & TEmployee>(
      querySql,
      [newEmployee.employee_name, newEmployee.active]
    );

    // Libera y ierra la coneccion
    connection.release();

    // Devuelve el OBJETO empleado, segun el Id creado
    return getEmployeeById(result.insertId);
  } catch (e) {
    // En caso de cualquier error de infraestructura, devuelve el sig obj de error
    console.log(e);
    return error500();
  }
};

// Elimina de la tabla empleados un empleado por id
export const deleteEmployee = async (id: string | number) => {
  const querySql = "DELETE FROM employees WHERE id_employee = ? ";

  try {
    // Genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // Ejecuta la peticion
    const [result] = await connection.query<ResultSetHeader>(querySql, [id]);

    // Si no afecta ningun elemento genera este error y lo devuelve
    if (!result.affectedRows) {
      return error404();
    }

    // Devuelve un mensaje de éxito
    return `employee with id: ${id} deleted`;
  } catch (e) {
    console.log(e);
    return error500();
  }
};

// Modifica de la tabla empleados los siguientes valores
// "active",
export const editEmployee = async (id: string | number, dto: TEmployeeDto) => {
  if (!isTEmployeeDto(dto)) {
    // Si no lo es genera y devuelve este error
    return error400();
  }

  // Genera la query para editar un empleado By Id
  const querySql =
    "UPDATE employees SET employee_name = ?, active = ? WHERE id_employee = ?";

  try {
    // Genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // Ejecuta la peticion
    const [result] = await connection.query<ResultSetHeader>(querySql, [
      dto.employee_name,
      dto.active,
      id,
    ]);

    // Si no afecta ningún elemento, genera este error y lo devuelve
    if (!result.affectedRows) {
      return error404();
    }

    // Si afectó un elemento, devuelve el obj completo modificado
    return await getEmployeeById(id);
  } catch (e) {
    console.log(e);
    return error500();
  }
};
