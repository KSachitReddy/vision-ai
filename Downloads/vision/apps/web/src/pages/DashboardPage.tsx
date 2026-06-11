import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export function DashboardPage() {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => (await api.get("/translations/stats")).data,
  });
  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="text-sm text-slate-500">Total translations</div>
          <div className="text-3xl font-display">{data?.total ?? 0}</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="text-sm text-slate-500">Last session</div>
          <div className="text-sm">{data?.lastSession ? "Active" : "—"}</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="text-sm text-slate-500">By type</div>
          <ul className="text-sm">
            {(data?.byType ?? []).map((b: { type: string; _count: { _all: number } }) => (
              <li key={b.type}>
                {b.type}: {b._count._all}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
