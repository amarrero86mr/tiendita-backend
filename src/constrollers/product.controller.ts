import { ResultSetHeader, RowDataPacket } from "mysql2";
import { DB_CONNECTION } from "../db/access-db";
import { isTError, TError } from "../schemas/error.type";
import {
  isTPaginationDto,
  TPagination,
  TPaginationDto,
} from "../schemas/pagination.type";
import { isTProductDto, TProduct, TProductDto } from "../schemas/product.type";
import { error400, error404, error500 } from "../utils/errors.util";
import { getSqlPaginationQuery } from "../utils/pagination.utils";
import { getPagination } from "./pagination.controller";

export const getAllProducts = async (
  partialDto: Partial<TPaginationDto>
): Promise<TPagination<TProduct> | TError> => {
  try {
    const dtoDefaultValues = {
      page: 1,
      items_per_page: 10,
    };
    const dto: TPaginationDto = {
      page: partialDto.page ?? dtoDefaultValues.page,
      items_per_page:
        partialDto.items_per_page ?? dtoDefaultValues.items_per_page,
    };
    if (!isTPaginationDto(dto)) {
      return error400("Invalid pagination params");
    }

    const querySql = "SELECT * FROM products";
    const paginationQuerySql = getSqlPaginationQuery(
      dto.page,
      dto.items_per_page
    );
    //genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // genera la peticion
    const [products] = await connection.query<Array<RowDataPacket & TProduct>>(
      querySql + paginationQuerySql
    );
    
    connection.release();

    // devuelve la lista de productos existentes
    return getPagination("products", dto.page, dto.items_per_page, products);
  } catch (e) {
    console.log(e);
    // en caso de que el error sea conocido (type TError), se devuelve ese obj
    if (isTError(e)) {
      return e;
    }
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};

export const getProductById = async (
  id: string | number
): Promise<TProduct | TError> => {
  const querySql = "SELECT * FROM products WHERE id_product = ?";

  try {
    //genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // genera la peticion
    const [products] = await connection.query<[RowDataPacket & TProduct]>(
      querySql,
      [id]
    );

    // libera y cierra la coneccion
    connection.release();

    // si no se encuentra el producto, devuelve un error
    if (!products[0]) {
      return error404();
    }

    // si hay un producto, lo devuelve
    return products[0];
  } catch (e) {
    console.log(e);
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};

export const postProduct = async (
  newProduct: TProductDto
): Promise<TProduct | TError> => {
  // valido si el body recibido es realmente de tipo TProductDto
  if (!isTProductDto(newProduct)) {
    // si no lo es, genera y devuelve este error
    return error400();
  }

  // genera la query de creación del producto
  const querySql = `INSERT INTO products (product_name, product_description, stock, price) VALUES (?, ?, ?, ?)`;
  try {
    //genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // genera la peticion
    const [result] = await connection.query<ResultSetHeader & TProduct>(
      querySql,
      [
        newProduct.product_name,
        newProduct.product_description,
        newProduct.stock,
        newProduct.price,
      ]
    );

    // libera y cierra la coneccion
    connection.release();

    // devuelve el OBJETO producto, según el id creado
    return getProductById(result.insertId);
  } catch (e) {
    console.log(e);
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};

export const deleteProduct = async (id: string | number) => {
  // genera la query para eliminar un producto by id
  const querySql = `DELETE FROM products WHERE id_product = ?`;

  try {
    //genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // ejecuta la peticion
    const [result] = await connection.query<ResultSetHeader>(querySql, [id]);

    // si no afecta ningún elemento, genera este error y lo devuelve
    if (!result.affectedRows) {
      return error404();
    }

    // devuelve un mensaje de éxito
    return `product with id: ${id} deleted`;
  } catch (e) {
    console.log(e);
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};

export const editProduct = async (id: string | number, dto: TProductDto) => {
  if (!isTProductDto(dto)) {
    // si no lo es, genera y devuelve este error
    return error400();
  }

  // genera la query para editar un producto by id
  const querySql = `UPDATE products SET product_name = ?, product_description = ?, stock = ?, price = ? WHERE id_product = ?`;
  try {
    //genera la coneccion
    const connection = await DB_CONNECTION.getConnection();

    // ejecuta la peticion
    const [result] = await connection.query<ResultSetHeader>(querySql, [
      dto.product_name,
      dto.product_description,
      dto.stock,
      dto.price,
      id,
    ]);

    // si no afecta ningún elemento, genera este error y lo devuelve
    if (!result.affectedRows) {
      return error404();
    }

    // si afectó un elemento, devuelve el obj completo modificado
    return await getProductById(id);
  } catch (e) {
    console.log(e);
    // en caso de cualquier error de infraestructura, devuelve el sig obj de error
    return error500();
  }
};
