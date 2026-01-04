export type AggregationType = "SUM" | "AVG" | "COUNT";

export type FieldSchema =
  | { type: "dimension"; dataType: "string" | "date" }
  | { type: "measure"; dataType: "number"; aggregations: AggregationType[] };

export const schema = {
  transactions: {
    /* ======================
     * IDENTIFIER
     * ====================== */
    transaction_id: {
      role: "identifier",
      dataType: "string",
      label: "Transaction ID",
      description: "Unique transaction identifier",
    },

    /* ======================
     * FILTERS
     * ====================== */
    date: {
      role: "filter",
      dataType: "date",
      label: "Date",
      description: "Transaction date",
      operators: ["between"],
      timeGrain: ["day", "month", "quarter", "year"],
    },

    /* ======================
     * DIMENSIONS
     * ====================== */
    region: {
      role: "dimension",
      dataType: "string",
      label: "Region",
      description: "Sales region",
    },

    product_category: {
      role: "dimension",
      dataType: "string",
      label: "Product Category",
      description: "Product category",
    },

    customer_segment: {
      role: "dimension",
      dataType: "string",
      label: "Customer Segment",
      description: "Customer segment (SMB, Enterprise, etc)",
    },

    /* ======================
     * MEASURES
     * ====================== */
    units_sold: {
      role: "measure",
      dataType: "number",
      label: "Units Sold",
      description: "Total units sold",
      aggregations: ["SUM"],
    },

    revenue: {
      role: "measure",
      dataType: "number",
      label: "Revenue",
      description: "Total revenue",
      aggregations: ["SUM", "AVG"],
    },

    cost: {
      role: "measure",
      dataType: "number",
      label: "Cost",
      description: "Total cost",
      aggregations: ["SUM", "AVG"],
    },

    discount_applied: {
      role: "measure",
      dataType: "number",
      label: "Discount Applied",
      description: "Discount applied",
      aggregations: ["SUM", "AVG"],
    },

    /* ======================
     * CALCULATED MEASURES
     * ====================== */
    profit: {
      role: "measure",
      isCalculated: true,
      dataType: "number",
      label: "Profit",
      description: "Profit (revenue - cost)",
      formula: "revenue - cost",
      aggregations: ["SUM", "AVG"],
    },
  },
};

