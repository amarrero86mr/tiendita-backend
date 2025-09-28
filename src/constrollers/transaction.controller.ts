import { ResultSetHeader, RowDataPacket } from "mysql2";
import { DB_CONNECTION } from "../db/access-db";
import { TError } from "../schemas/error.type";
import {
  isTTransactionDto,
  TTransaction,
  TTransactionDto,
} from "../schemas/transaction.type";
import { error400, error404, error500 } from "../utils/errors.util";

export const getAllTransactions = async (): Promise<
  Array<RowDataPacket & TTransaction> | TError
> => {
  const querySql = "SELECT * FROM transactions ORDER BY id_transaction";
  try {
    //genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // genera la peticion
    const [transactions] = await connection.query<
      Array<RowDataPacket & TTransaction>
    >(querySql);

    // devuelve la lista de transacciones existentes
    return transactions;
  } catch (e) {
    console.log(e);
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};

export const getTransactionById = async (
  id: string | number
): Promise<TTransaction | TError> => {
  const querySql = "SELECT * FROM transactions WHERE id_transaction = ?";

  try {
    //genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // genera la peticion
    const [transactions] = await connection.query<
      [RowDataPacket & TTransaction]
    >(querySql, [id]);

    // libera y cierra la coneccion
    connection.release();

    // si no se encuentra la transacción, devuelve un error
    if (!transactions[0]) {
      return error404();
    }

    // si hay una transacción, la devuelve
    return transactions[0];
  } catch (e) {
    console.log(e);
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};

export const postTransaction = async (
  newTransaction: TTransactionDto
): Promise<TTransaction | TError> => {
  // valido si el body recibido es realmente de tipo TTransactionDto
  if (!isTTransactionDto(newTransaction)) {
    // si no lo es, genera y devuelve este error
    return error400();
  }

  // genera la query de creación de la transacción
  const querySql = `INSERT INTO transactions (id_type_transaction) VALUES (?)`;
  try {
    //genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // genera la peticion
    const [result] = await connection.query<ResultSetHeader & TTransaction>(
      querySql,
      [newTransaction.id_type_transaction]
    );

    // libera y cierra la coneccion
    connection.release();

    // devuelve el OBJETO tansacción, según el id creado
    return getTransactionById(result.insertId);
  } catch (e) {
    console.log(e);
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};
