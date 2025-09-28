import { RowDataPacket } from "mysql2";
import { DB_CONNECTION } from "../db/access-db";
import { isTPaginationDto, TPagination } from "../schemas/pagination.type";
import { error400, error500 } from "../utils/errors.util";
import { getSqItemsInTableQuery } from "../utils/pagination.utils";

/**
 * @param {number} page - las páginas comienzan a contarse desde el nro 1.
 */
export const getPagination = async <T>(
  table: string,
  page: number,
  items_per_page: number,
  data: Array<T>
) => {
  const querySql = getSqItemsInTableQuery(table);
  try {
    if (!isTPaginationDto({ page, items_per_page })) {
      return error400("Invalid pagination params");
    }

    //genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // genera la peticion
    const [totalItemsData] = await connection.query<
      [RowDataPacket & { "count(*)": number }]
    >(querySql);

    connection.release();

    const total_items = totalItemsData[0]["count(*)"];

    // devuelve la lista de productos existentes
    const result: TPagination<T> = {
      items_per_page,
      total_items,
      total_pages: Math.ceil(total_items / items_per_page),
      page,
      data,
    };

    return result;
  } catch (e) {
    console.log(e);
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};
