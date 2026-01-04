
import type { DateRangeFilter } from "./filter";
export type AggregationType = "SUM" | "AVG" | "COUNT";

export interface Filter {
  field: string;
  operator: "=" | "!=" | ">" | "<" | ">=" | "<=" | "IN" | "BETWEEN";
  value: any;
}

export interface Measure {
  field: string;
  aggregation: AggregationType;
  alias?: string;
}

/*
export interface QueryConfig {
  table: string;
  dimensions: string[];
  measures: Measure[];
  filters?: Filter[];
  groupBy?: string[];
}*/


export type QueryConfig = {
  table: string;
  dimensions: string[];
  measures: {
    field: string;
    aggregation: AggregationType;
  }[];
  groupBy: string[];
  filters?: DateRangeFilter[]; // 👈 optional
};