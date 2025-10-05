import { ResultSetHeader, RowDataPacket } from "mysql2";
import { isTVisitorsDto, TVisitors, TVisitorsDto } from "../schemas/visitors.type";
import { TError } from "../schemas/error.type";
import { DB_CONNECTION } from "../db/access-db";
import { error400, error404, error500 } from "../utils/errors.util";

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


export const postVisitors = async (
    user : TVisitorsDto =
): Promise<Array<RowDataPacket & TVisitors> | TError> => {
    const querySql = "INSERT INTO visitors (user_email, password_hash) VALUES (?, ?)"
    const { name_email, password_hash } = user;

    try {
        if (!name_email || !password_hash) {
        return res.status(400).json({ error: "Faltan datos" });

        }

    }

  const hashed = await bcrypt.hash(password_hash, 10);

  await DB_CONNECTION.query( querySql, [name_email, password_hash] );

  res.json({ message: "Usuario registrado" });
});

