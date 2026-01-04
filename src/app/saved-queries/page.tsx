"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryStore } from "@/app/store/queryStore";
import type { QueryConfig } from "@/app/types/query";

type SavedQuery = {
  id: number;
  name: string;
  config: QueryConfig;
};

export default function SavedQueriesPage() {
  const [queries, setQueries] = useState<SavedQuery[]>([]);
  const [loading, setLoading] = useState(true);

  const setQuery = useQueryStore((s) => s.setQuery);
  const router = useRouter();

  useEffect(() => {
  fetch("/api/queries")
    .then((res) => res.json())
    .then((data) => {
      const parsed = data.map((q: any) => ({
        ...q,
        config: JSON.parse(q.config),
      }));

      setQueries(parsed);
      setLoading(false);
    });
}, []);

  function loadQuery(query: SavedQuery) {
    setQuery(query.config);
    router.push("/query-builder");
  }

  if (loading) return <p className="p-6">Loading saved queries...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Saved Queries</h1>

      {queries.length === 0 ? (
        <p>
          No saved queries.{" "}
          <a href="/query-builder" className="text-blue-600 underline">
            Create one
          </a>
        </p>
      ) : (
        <ul className="space-y-2">
          {queries.map((q) => (
            <li
              key={q.id}
              className="border p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => loadQuery(q)}
            >
              <div className="font-medium">{q.name}</div>
              <div className="text-sm text-gray-500">
                {q.config.dimensions.join(", ")} |{" "}
                {q.config.measures
                  .map((m) => `${m.aggregation}(${m.field})`)
                  .join(", ")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
