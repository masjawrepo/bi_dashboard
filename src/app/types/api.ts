// types/api.ts

import { QueryConfig } from "./query";

export interface QueryBuildRequest {
  query: QueryConfig;
}

export interface QueryBuildResponse {
  columns: string[];
  rows: any[];
}
