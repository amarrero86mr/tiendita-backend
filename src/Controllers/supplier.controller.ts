import { ResultSetHeader, RowDataPacket } from "mysql2";
import { DB_CONNECTION } from "../db/access-db";
import { TError } from "../schemas/error.type";
import {
  isTSupplierDto,
  TSupplier,
  TSupplierDto,
} from "../schemas/supplier.type";
import { error400, error404, error500 } from "../utils/errors.util";

// Devuelve todos los suppliers en forma de array
export const getAllSuppliers = async (): Promise<
  Array<RowDataPacket & TSupplier> | TError
> => {
  const querysql = "SELECT * FROM suppliers";

  try {
    const connection = await DB_CONNECTION.getConnection();

    const [supplierList] = await connection.query<
      Array<RowDataPacket & TSupplier>
    >(querysql);
    connection.release();

    return supplierList;
  } catch (e) {
    console.log(e);
    return error500();
  }
};

// Deveulve un supplier (para propositos de testeo)
export const getSupplierById = async (id: string | number) => {
  const querysql = "SELECT * FROM suppliers WHERE id_supplier = ? ";
  try {
    const connection = await DB_CONNECTION.getConnection();

    const [suppliers] = await connection.query<
      Array<RowDataPacket & TSupplier>
    >(querysql, [id]);
    connection.release();

    if (!suppliers[0]) {
      return error404();
    }

    return suppliers[0];
  } catch (e) {
    console.log(e);
    return error500();
  }
};

// Borra un supplier en base a su id
export const deleteSupplier = async (
  id: number | string
): Promise<string | TError> => {
  const querySql = "DELETE FROM suppliers WHERE id_supplier = ?";
  try {
    const connection = await DB_CONNECTION.getConnection();

    const [result] = await connection.query<ResultSetHeader>(querySql, [id]);
    connection.release();

    if (result.affectedRows == 0) {
      return error404();
    }

    return `supplier with id: ${id} deleted`;
  } catch (e) {
    console.log(e);
    return error500();
  }
};
//Agrega un supplier a la base de datos
export const postSupplier = async (
  newsupplierDto: TSupplierDto
): Promise<TSupplier | TError> => {
  if (!isTSupplierDto(newsupplierDto)) {
    return error400();
  }

  const querySql =
    "INSERT INTO suppliers (supplier_name, email, active) VALUES (?, ?, ?) ";

  try {
    const connection = await DB_CONNECTION.getConnection();

    const [result] = await connection.query<ResultSetHeader & TSupplier>(
      querySql,
      [
        newsupplierDto.supplier_name,
        newsupplierDto.email,
        newsupplierDto.active,
      ]
    );
    connection.release();

    return await getSupplierById(result.insertId);
  } catch (e) {
    console.log(e);
    return error500();
  }
};

// Edita cierto supplier en base a su id
export const putSupplier = async (
  id: number | string,
  supplierDto: TSupplierDto
): Promise<TSupplier | TError> => {
  if (!isTSupplierDto(supplierDto)) {
    return error400();
  }
  const querySql =
    "UPDATE suppliers SET supplier_name = ?, email = ?, active = ? WHERE id_supplier = ?";
  try {
    const connection = await DB_CONNECTION.getConnection();

    const [result] = await connection.query<ResultSetHeader>(querySql, [
      supplierDto.supplier_name,
      supplierDto.email,
      supplierDto.active,
      id,
    ]);
    connection.release();

    if (result.affectedRows == 0) {
      return error404();
    }

    return await getSupplierById(id);
  } catch (e) {
    console.log(e);
    return error500();
  }
};
