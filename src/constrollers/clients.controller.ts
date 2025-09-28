import { ResultSetHeader, RowDataPacket } from "mysql2";
import { DB_CONNECTION } from "../db/access-db";
import { TClient, TClientDto, isTClientDto } from "../schemas/clients.type";
import { TError } from "../schemas/error.type";
import { error400, error404, error500 } from "../utils/errors.util";

export const getAllClients = async (): Promise<
  Array<RowDataPacket & TClient> | TError
> => {
  const sql = "SELECT * FROM clients";

  try {
    const connection = await DB_CONNECTION.getConnection(); //genera la coneccion

    const [clients] = await connection.query<[RowDataPacket & TClient]>(sql); // genera la peticion
    connection.release(); // libera y cierra la coneccion

    // devuelve la respuesta de la peticion
    return clients;
  } catch (e) {
    console.log(e);
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};

export const getClientById = async (
  id: string | number
): Promise<TClient | TError> => {
  const sql = "SELECT * FROM clients WHERE id_client = ?";

  try {
    const connection = await DB_CONNECTION.getConnection(); //genera la coneccion
    const [clients] = await connection.query<[RowDataPacket & TClient]>(sql, [
      id,
    ]); // genera la peticion
    connection.release(); // libera y cierra la coneccion

    if (!clients[0]) {
      return error404();
    }

    return clients[0];
  } catch (e) {
    console.log(e);
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};

export const postClient = async (
  newClient: TClientDto
): Promise<TClient | TError> => {
  // valido si el body recibido es realmente de tipo TProductDto
  if (!isTClientDto(newClient)) {
    // si no lo es, genera y devuelve este error
    return error400();
  }

  const sql = "INSERT INTO clients (client_name, active) VALUES (?,?)";

  try {
    const connection = await DB_CONNECTION.getConnection(); //genera la coneccion
    const [result] = await connection.query<ResultSetHeader & TClient>(sql, [
      newClient.client_name,
      newClient.active,
    ]); // genera la peticion
    connection.release(); // libera y cierra la coneccion

    if (!newClient) {
      const error: TError = {
        msg: "Invalid request",
        status: 400,
      };
      return error;
    }

    // devuelve el OBJETO producto, según el id creado
    return getClientById(result.insertId);
  } catch (e) {
    console.log(e);
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};

export const editClient = async (
  id: string | number,
  dto: TClientDto
): Promise<TClient | TError> => {
  if (!isTClientDto(dto)) {
    return error400();
  }

  const sql = "UPDATE clients SET client_name=?, active=? WHERE id_client=?";

  try {
    const connection = await DB_CONNECTION.getConnection(); //genera la coneccion
    const [result] = await connection.query<ResultSetHeader>(sql, [
      dto.client_name,
      dto.active,
      id,
    ]); // genera la peticion
    connection.release(); // libera y cierra la coneccion

    if (!result.affectedRows) {
      return error404();
    }

    return getClientById(id);
  } catch (e) {
    console.log(e);
    return error500();
  }
};

// si bien este es un delete "fisico" en un futuro sera un delete logico a partire de la modificacion de un valor
export const deleteClient = async (
  id: string | number
): Promise<string | TError> => {
  const sql = "UPDATE clients SET active=0 WHERE id_client = ?";

  try {
    const connection = await DB_CONNECTION.getConnection(); //genera la coneccion

    const [result] = await connection.query<ResultSetHeader>(sql, [id]); // genera la peticion
    connection.release(); // libera y cierra la coneccion

    // console.log(result.affectedRows)
    if (!result.affectedRows) {
      return error404();
    }

    return `Client id: ${id}, deleted`;
  } catch (e) {
    console.log(e);
    return error500();
  }
};
