import { RowDataPacket } from "mysql2";
import { DB_CONNECTION } from "../db/access-db";
import { TError } from "../schemas/error.type";
import { TTypeTransaction } from "../schemas/type_transaction.type";
import { error404, error500 } from "../utils/errors.util";

export const getAllTypeTransactions = async (): Promise<
  Array<RowDataPacket & TTypeTransaction> | TError
> => {
  const querySql = "SELECT * FROM type_transactions";
  try {
    //genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // genera la peticion
    const [products] = await connection.query<
      Array<RowDataPacket & TTypeTransaction>
    >(querySql);

    // devuelve la lista de tipos de transacciones
    return products;
  } catch (e) {
    console.log(e);
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};

export const getTypeTransactionById = async (
  id: string | number
): Promise<TTypeTransaction | TError> => {
  const query_sql = "SELECT * FROM type_transactions WHERE id_type_transaction = ?";

  try {
    //genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // genera la peticion
    const [type_transactions] = await connection.query<
      [RowDataPacket & TTypeTransaction]
    >(query_sql, [id]);

    // libera y cierra la coneccion
    connection.release();

    // si no se encuentra el tipo de transacción, devuelve un error
    if (!type_transactions[0]) {
      return error404();
    }

    // si hay un tipo de transacción, lo devuelve
    return type_transactions[0];
  } catch (e) {
    console.log(e);
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};
