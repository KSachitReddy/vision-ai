import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useAuthStore } from "../store/authStore";

export function AdminPage() {
  const role = useAuthStore((s) => s.user?.role);
  const { data: users } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => (await api.get("/admin/users")).data,
    enabled: role === "ADMIN",
  });
  if (role !== "ADMIN") return <div>Restricted area.</div>;
  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Admin</h1>
      <div className="bg-white rounded-xl border border-slate-200 divide-y">
        {(users?.items ?? []).map((u: { id: string; email: string; role: string }) => (
          <div key={u.id} className="p-4 flex justify-between text-sm">
            <span>{u.email}</span>
            <span className="text-slate-500">{u.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
