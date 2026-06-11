import { useState } from "react";
import { api } from "../lib/api";

type Mode = "TEXT_TO_SIGN" | "SIGN_TO_TEXT" | "SPEECH_TO_SIGN" | "SIGN_TO_SPEECH";

export function TranslatePage() {
  const [mode, setMode] = useState<Mode>("TEXT_TO_SIGN");
  const [input, setInput] = useState("Hello world");
  const [output, setOutput] = useState("");

  async function translate() {
    const r = await api.post("/translations", { type: mode, input });
    setOutput(r.data.output);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Translation Studio</h1>
      <div className="flex gap-2">
        {(["TEXT_TO_SIGN", "SIGN_TO_TEXT", "SPEECH_TO_SIGN", "SIGN_TO_SPEECH"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 rounded-full border ${mode === m ? "bg-bridge-600 text-white" : "bg-white"}`}
          >
            {m.replace(/_/g, " ").toLowerCase()}
          </button>
        ))}
      </div>
      <textarea
        className="w-full border rounded-xl p-4 h-32"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={translate} className="bg-bridge-600 text-white px-4 py-2 rounded-lg">
        Translate
      </button>
      {output && (
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 mb-2">Output</div>
          <div className="font-mono">{output}</div>
        </div>
      )}
    </div>
  );
}
