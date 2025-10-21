import { Commune } from "../lib/supabase";

interface TopCommunesProps {
  communes: Commune[];
  topN?: number;
}

export function TopCommunes({ communes, topN = 5 }: TopCommunesProps) {
  // Trier les communes par score décroissant
  const sorted = [...communes].sort((a, b) => b.score - a.score).slice(0, topN);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-56 max-h-80 overflow-y-auto">
      <h3 className="font-semibold text-gray-800 mb-2">Top {topN} Communes</h3>
      <ol className="list-decimal list-inside space-y-1">
        {sorted.map((c, idx) => (
          <li key={c.id}>
            <span className="font-medium">{c.name}</span> ({c.canton}) -{" "}
            <span className="text-emerald-600 font-semibold">{c.score.toFixed(1)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
