import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/recognition", label: "Recognition" },
  { to: "/translate", label: "Translate" },
  { to: "/history", label: "History" },
  { to: "/admin", label: "Admin" },
];

export function AppLayout() {
  const { user, logout } = useAuthStore();
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-6">
        <Link to="/dashboard" className="font-display text-2xl text-bridge-700">
          SignBridge
        </Link>
        <nav className="flex flex-col gap-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm ${isActive ? "bg-bridge-500 text-white" : "text-slate-700 hover:bg-bridge-50"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto text-xs text-slate-500">
          <div className="mb-2">{user?.email}</div>
          <button
            onClick={() => {
              logout();
              nav("/login");
            }}
            className="text-bridge-700 underline"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
