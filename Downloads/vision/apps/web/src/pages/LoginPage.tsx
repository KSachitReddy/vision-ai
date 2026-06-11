import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { useAuthStore } from "../store/authStore";

export function LoginPage() {
  const [email, setEmail] = useState("admin@signbridge.dev");
  const [password, setPassword] = useState("Admin#Pass1");
  const [err, setErr] = useState<string | null>(null);
  const setAuth = useAuthStore((s) => s.setAuth);
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      const r = await api.post("/auth/login", { email, password });
      setAuth(r.data.user, r.data.accessToken, r.data.refreshToken);
      nav("/dashboard");
    } catch (e) {
      setErr("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-96 flex flex-col gap-4"
      >
        <h1 className="font-display text-3xl">Welcome back</h1>
        <input
          className="border rounded-lg px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          className="border rounded-lg px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="bg-bridge-600 text-white py-2 rounded-lg">Sign in</button>
        <Link to="/register" className="text-bridge-700 text-sm">
          Create an account
        </Link>
      </form>
    </div>
  );
}
