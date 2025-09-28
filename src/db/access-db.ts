import { createPool } from "mysql2/promise";
import { config } from "dotenv";
import { env } from "process";


export const DB_CONNECTION = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  port: process.env.DB_PORT,
  uri: process.env.DB_URI,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

DB_CONNECTION.getConnection()
  .then((connection) => {
    console.log("se conécto exitosamente a la base de datos");
    connection.release();
  })
  .catch((err) => {
    console.log("NO se conécto a la base de datos", err);
  });

DB_CONNECTION.on("connection", (c) => {
  console.log("se abre conexión");
});

// DB_CONNECTION.end();
