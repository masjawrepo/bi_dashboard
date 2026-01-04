"use client";

import { useState } from "react";
import { schema } from "@/app/lib/schema";
import type { AggregationType, QueryConfig } from "@/app/types/query";
import {useQueryStore} from "@/app/store/queryStore";

export default function QueryBuilderPage() {
  const table = "transactions";
  const { query } = useQueryStore();

  const [selectedDimension, setSelectedDimension] = useState<string>("");
  const [selectedMeasure, setSelectedMeasure] = useState<string>("");
  const [selectedAgg, setSelectedAgg] = useState<AggregationType | "">("");

  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  /* ===== schema parsing ===== */
  const tableSchema = schema[table];
  type TableSchema = typeof tableSchema;
  type FieldKey = keyof TableSchema;

  
  const dimensions = Object.entries(tableSchema)
  .filter(([, v]) => v.role === "dimension")
  .map(([k]) => k as FieldKey);

  const measures = Object.entries(tableSchema)
    .filter(([, v]) => v.role === "measure")
    .map(([k, v]) => ({
      field: k as FieldKey,
      aggregations: (v as any).aggregations as AggregationType[],
    }));

  const currentMeasure = measures.find(
    (m) => m.field === selectedMeasure
  );

  /* ===== build query from UI ===== */
  function buildQuery(): QueryConfig {
  const filters = startDate && endDate
    ? [{
        field: "date",
        operator: "between" as const,
        value: {
          start: startDate,
          end: endDate,
        },
      }]
    : undefined;

  return {
    table: "transactions",
    dimensions: selectedDimension ? [selectedDimension] : [],
    measures:
      selectedMeasure && selectedAgg
        ? [{ field: selectedMeasure, aggregation: selectedAgg }]
        : [],
    groupBy: selectedDimension ? [selectedDimension] : [],
    filters,
  };
}


  /* ===== preview ===== */
 
  async function preview() {
  setLoading(true);

  const query = buildQuery();
  
    if (!query.measures.length) {
      alert("Pilih measure dan aggregation dulu");
      return;
    }

  const res = await fetch("/api/query/build", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });

  const json = await res.json();

  if (!res.ok) {
    alert(json.error);
    setResult([]);
    setLoading(false);
    return;
  }

  setResult(Array.isArray(json.data) ? json.data : []);
  setLoading(false);
}

  /* ===== save ===== */
  async function save() {
    const query = buildQuery();

    if (!query.measures.length) {
      alert("Query belum lengkap");
      return;
    }

    await fetch("/api/queries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "My Query",
        config: query,
      }),
    });

    alert("Query saved");
  }

  function getColumnLabel(
    key: string,
    tableSchema: Record<string, any>
    ) {
    return tableSchema[key]?.label ?? key.replace(/_/g, " ").toUpperCase();
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Query Builder</h1>

      {/* Dimension */}
        <select
        value={selectedDimension}
        onChange={(e) => setSelectedDimension(e.target.value)}
        className="border px-2 py-1"
        >
        <option value="">-- pilih dimension --</option>
        {dimensions.map((d) => (
            <option key={d} value={d}>
            {tableSchema[d].label}
            </option>
        ))}
        </select>

      {/* Measure */}
      <select
        value={selectedMeasure}
        onChange={(e) => {
          setSelectedMeasure(e.target.value);
          setSelectedAgg("");
        }}
        className="border px-2 py-1"
      >
        <option value="">-- pilih measure --</option>
        {measures.map((m) => (
          <option key={m.field} value={m.field}>
            {tableSchema[m.field].label}
          </option>
        ))}
      </select>

      {/* Aggregation */}
      <select
        value={selectedAgg}
        onChange={(e) => setSelectedAgg(e.target.value as AggregationType)}
        disabled={!currentMeasure}
        className="border px-2 py-1"
      >
        <option value="">-- aggregation --</option>
        {currentMeasure?.aggregations.map((agg) => (
          <option key={agg} value={agg}>
            {agg}
          </option>
        ))}
      </select>

      {/* Date Filter */}
        <div className="flex gap-2 items-center">
        <label className="text-sm">Date Range:</label>

        <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1"
        />

        <span>-</span>

        <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1"
        />
        </div>

      {/* Actions */}
      <div className="space-x-2">
        <button
          onClick={preview}
          className="bg-blue-500 text-white px-4 py-1"
        >
          Preview
        </button>
        <button
          onClick={save}
          className="bg-green-600 text-white px-4 py-1"
        >
          Save Query
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {/* Preview Table */}
      {result.length > 0 && (
        <table className="border mt-4">
            <thead>
            <tr>
                {Object.keys(result[0]).map((k) => (
                <th key={k} className="border px-2">
                    {getColumnLabel(k, tableSchema)}
                </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {result.map((row, i) => (
                <tr key={i}>
                {Object.values(row).map((v, j) => (
                    <td key={j} className="border px-2">
                    {String(v)}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
      )}

    </div>
  );
}
