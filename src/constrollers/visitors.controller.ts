import { ResultSetHeader, RowDataPacket } from "mysql2";
import { isTVisitorsDto, TVisitors, TVisitorsDto } from "../schemas/visitors.type";
import { TError } from "../schemas/error.type";
import { DB_CONNECTION } from "../db/access-db";
import { error400, error401, error404, error500 } from "../utils/errors.util";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getVisitors = async (): Promise<Array<RowDataPacket & TVisitors> | TError> => {
    const querySql = "SELECT * FROM visitors"

    try {
        const connection = await DB_CONNECTION.getConnection();

        const [visitors] = await connection.query<Array<RowDataPacket & TVisitors>>(querySql);
        connection.release();

        return visitors

    } catch (e) {
        console.log(e)
        return error500();
    }
}

export const getVisitorById = async (
    id: string | number
): Promise<TVisitors | TError> => {
    const querySql = "SELECT * FROM visitors WHERE id_visitor = ?"

    try {
        // Genera la coneccion
        const connection = await DB_CONNECTION.getConnection();

        // Ejecuta la peticion
        const [visitor] = await connection.query<[RowDataPacket & TVisitors]>(querySql, [id]);

        // Libera y cierra la coneccion
        connection.release();

        // Si no se encuentra el empleado devuelve un error
        if (!visitor[0]) {
            return error404();
        }

        // Si existe el empleado, lo devuelve
        return visitor[0];
    } catch (e) {
        console.log(e);
        // En caso de cualquier error de infraestructura, devuelve el sig obj de error
        return error500();
    }
};

export const postVisitor = async (
    newVisitor: TVisitorsDto
): Promise<TVisitors | TError> => {
    if (!isTVisitorsDto(newVisitor)) {
        return error400("Invalid visitor format");
    }

    const sql = "INSERT INTO visitors (email, password_hash) VALUES (?, ?)";

    try {
        const connection = await DB_CONNECTION.getConnection();
        const hashedPassword = await bcrypt.hash(newVisitor.password, 10);

        const [result] = await connection.query<ResultSetHeader>(sql, [
            newVisitor.email,
            hashedPassword,
        ]);
        connection.release();

        // Devuelve el visitor recién creado

        return getVisitorById(result.insertId);
    } catch (e) {
        console.error(e);
        return error500();
    }
};

export const loginVisitor = async (
  credentials: TVisitorsDto
): Promise<{ token: string } | TError> => {
  const { email, password } = credentials;

  if (!email || !password) return error400("Missing email or password");

  const sql = "SELECT * FROM visitors WHERE email = ?";

  try {
    const connection = await DB_CONNECTION.getConnection();
    const [rows] = await connection.query<any[]>(sql, [email]);
    connection.release();

    if (rows.length === 0) return error401("Email not found");

    const visitor = rows[0];
    const validPassword = await bcrypt.compare(password, visitor.password_hash);
    if (!validPassword) return error401("Invalid password");

    const token = jwt.sign(
      { id: visitor.id_visitor, email: visitor.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    return { token };
  } catch (e) {
    console.error(e);
    return error500();
  }
};