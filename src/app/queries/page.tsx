"use client";

import { useEffect, useState } from "react";

export default function SavedQueriesPage() {
  const [queries, setQueries] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/queries")
      .then(r => r.json())
      .then(setQueries);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Saved Queries</h1>
      <ul>
        {queries.map(q => (
          <li key={q.id} className="border p-2 mb-2">
            {q.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
