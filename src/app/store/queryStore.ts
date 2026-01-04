import { create } from "zustand";
import { QueryConfig } from "@/app/types/query";

interface QueryState {
  query: QueryConfig;
  setQuery: (q: Partial<QueryConfig>) => void;
}

export const useQueryStore = create<QueryState>(set => ({
  query: {
    table: "transactions",
    dimensions: [],
    measures: [],
    filters: [],
    groupBy: []
  },
  setQuery: q =>
    set(state => ({
      query: { ...state.query, ...q }
    }))
}));
