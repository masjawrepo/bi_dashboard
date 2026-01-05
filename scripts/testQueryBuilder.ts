import { buildSQL } from "../src/app/lib/sqlBuilder";
import { QueryConfig } from "../src/app/types/query";

const query: QueryConfig = {
  configName: "Test",
  table: "transactions",
  dimensions: ["region"],
  measures: [
    { field: "revenue", aggregation: "SUM" }
  ],
  groupBy: ["region"],
  filters: [
    {
      field: "date",
      operator: "between",
      value: {
        start: "2023-01-01",
        end: "2023-03-31"
      }
    }
  ]
};

console.log(buildSQL(query));