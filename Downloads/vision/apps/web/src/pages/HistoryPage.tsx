import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export function HistoryPage() {
  const { data } = useQuery({
    queryKey: ["history"],
    queryFn: async () => (await api.get("/translations")).data,
  });
  return (
    <div className="space-y-6">
      <h1 className="text-4xl">History</h1>
      <div className="bg-white rounded-xl border border-slate-200 divide-y">
        {(data?.items ?? []).map(
          (t: { id: string; type: string; input: string; output: string; confidence: number }) => (
            <div key={t.id} className="p-4 flex justify-between text-sm">
              <span className="text-slate-500">{t.type}</span>
              <span className="font-mono">{t.input}</span>
              <span className="font-mono">→ {t.output}</span>
              <span>{(t.confidence * 100).toFixed(0)}%</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
