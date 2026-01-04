import { QueryConfig } from "@/app/types/query";

export function buildSQL(config: QueryConfig): string {
  const selectParts: string[] = [];
  const whereParts: string[] = [];

  // dimensions
  if (config.dimensions.length) {
    selectParts.push(...config.dimensions);
  }

  // measures
  config.measures.forEach(m => {
    selectParts.push(
      `${m.aggregation}(${m.field}) AS ${m.field}`
    );
  });

  // date filters
  config.filters?.forEach(f => {
    if (f.operator === "between") {
      whereParts.push(
        `${f.field} BETWEEN '${f.value.start}' AND '${f.value.end}'`
      );
    }
  });

  const sql = `
    SELECT ${selectParts.join(", ")}
    FROM ${config.table}
    ${whereParts.length ? "WHERE " + whereParts.join(" AND ") : ""}
    ${config.groupBy.length ? "GROUP BY " + config.groupBy.join(", ") : ""}
  `;

  return sql.trim();
}


/*
export function buildSQL(config: QueryConfig): string {
  const selectParts: string[] = [];
  const whereParts: string[] = [];

  // dimensions
    if (config.dimensions?.length) {
    selectParts.push(...config.dimensions);
    }

    // measures
    config.measures.forEach(m => {
    selectParts.push(
        `${m.aggregation}(${m.field}) AS ${m.alias || m.field}`
    );
    });

    // ⬇️ VALIDASI PENTING
    if (selectParts.length === 0) {
    throw new Error("Query must have at least one dimension or measure");
    }


  // filters
  config.filters?.forEach(f => {
    if (f.operator === "BETWEEN") {
      whereParts.push(
        `${f.field} BETWEEN '${f.value[0]}' AND '${f.value[1]}'`
      );
    } else if (f.operator === "IN") {
      whereParts.push(
        `${f.field} IN (${f.value.map((v: any) => `'${v}'`).join(",")})`
      );
    } else {
      whereParts.push(
        `${f.field} ${f.operator} '${f.value}'`
      );
    }
  });

  const sql = `
    SELECT ${selectParts.join(", ")}
    FROM ${config.table}
    ${whereParts.length ? "WHERE " + whereParts.join(" AND ") : ""}
    ${config.groupBy?.length ? "GROUP BY " + config.groupBy.join(", ") : ""}
  `;

  return sql.trim();
}
*/

