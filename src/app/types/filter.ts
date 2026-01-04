export type DateRangeFilter = {
  field: string;        // "date"
  operator: "between";
  value: {
    start: string;      // "2023-01-01"
    end: string;        // "2023-03-31"
  };
};
