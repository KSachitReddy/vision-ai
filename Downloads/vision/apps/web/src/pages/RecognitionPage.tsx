import { useEffect, useRef, useState } from "react";
import { api } from "../lib/api";
import { extractMockLandmarks, loadHands } from "../lib/mediapipe";

export function RecognitionPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [label, setLabel] = useState("—");
  const [confidence, setConfidence] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let raf = 0;
    async function start() {
      await loadHands();
      const stream = await navigator.mediaDevices
        .getUserMedia({ video: true })
        .catch(() => null);
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      const tick = async () => {
        if (!videoRef.current) return;
        const lm = extractMockLandmarks(videoRef.current).map((p) => [p.x, p.y, p.z]);
        try {
          const r = await api.post("/recognition/frame", { landmarks: lm });
          setLabel(r.data.label);
          setConfidence(r.data.confidence);
        } catch {
          /* ignore */
        }
        raf = window.setTimeout(tick, 500) as unknown as number;
      };
      tick();
    }
    if (active) start();
    return () => {
      clearTimeout(raf);
    };
  }, [active]);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Sign Recognition</h1>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex gap-6">
        <video ref={videoRef} className="w-96 h-72 bg-slate-900 rounded-lg" muted playsInline />
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setActive((a) => !a)}
            className="bg-bridge-600 text-white px-4 py-2 rounded-lg"
          >
            {active ? "Stop" : "Start camera"}
          </button>
          <div className="text-sm">
            <div>Detected: <strong>{label}</strong></div>
            <div>Confidence: {(confidence * 100).toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
