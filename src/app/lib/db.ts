import mysql from "mysql2/promise";
import fs from 'fs';

export const db = mysql.createPool({
  host: process.env.db_host,
  database: process.env.db_name,
  user: process.env.db_user,
  password: process.env.db_pass,
  port: process.env.db_port ? parseInt(process.env.db_port, 10) : 3306,
  waitForConnections: true,
  connectionLimit: 100
});
