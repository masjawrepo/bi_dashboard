import mysql from "mysql2/promise";
import fs from 'fs';

export const db = mysql.createPool({
  host: process.env.db_host,
  database: process.env.db_name,
  user: process.env.db_user,
  password: process.env.db_pass,
  waitForConnections: true,
  connectionLimit: 100
});
