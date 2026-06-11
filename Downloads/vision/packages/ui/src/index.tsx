import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export function Button({ variant = "primary", children, ...rest }: ButtonProps) {
  const cls =
    variant === "primary"
      ? "bg-bridge-600 text-white px-4 py-2 rounded-lg"
      : "bg-white border px-4 py-2 rounded-lg";
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return <div className="bg-white p-6 rounded-2xl border border-slate-200">{children}</div>;
}
