import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuthStore } from "../store/authStore";

export function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState<string | null>(null);
  const setAuth = useAuthStore((s) => s.setAuth);
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      const r = await api.post("/auth/register", form);
      setAuth(r.data.user, r.data.accessToken, r.data.refreshToken);
      nav("/dashboard");
    } catch {
      setErr("Could not create account");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-96 flex flex-col gap-4"
      >
        <h1 className="font-display text-3xl">Create account</h1>
        {(["name", "email", "password"] as const).map((k) => (
          <input
            key={k}
            className="border rounded-lg px-3 py-2"
            type={k === "password" ? "password" : k === "email" ? "email" : "text"}
            placeholder={k[0].toUpperCase() + k.slice(1)}
            value={form[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
          />
        ))}
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="bg-bridge-600 text-white py-2 rounded-lg">Sign up</button>
        <Link to="/login" className="text-bridge-700 text-sm">
          Already have an account?
        </Link>
      </form>
    </div>
  );
}
