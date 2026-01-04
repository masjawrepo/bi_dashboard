import fs from "fs";
import csv from "csv-parser";
import mysql from "mysql2/promise";

async function importCSV() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bi_dashboard"
  });

  const rows: any[] = [];

  fs.createReadStream("scripts/sample_sales_data(in).csv")
    .pipe(csv())
    .on("data", (data) => {
      rows.push([
        data.transaction_id,
        new Date(data.date),
        data.region,
        data.product_category,
        data.customer_segment,
        Number(data.units_sold),
        Number(data.revenue),
        Number(data.cost),
        Number(data.discount_applied)
      ]);
    })
    .on("end", async () => {
      const sql = `
        INSERT INTO transactions
        (transaction_id, date, region, product_category, customer_segment,
         units_sold, revenue, cost, discount_applied)
        VALUES ?
      `;
      await connection.query(sql, [rows]);
      await connection.end();
      console.log("CSV imported successfully");
    });
}

importCSV();
