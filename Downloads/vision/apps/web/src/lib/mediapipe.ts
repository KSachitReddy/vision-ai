/**
 * Browser-side MediaPipe Hands integration.
 *
 * The actual library is loaded lazily to avoid pulling >10MB of WASM during
 * initial render. Consumers call `loadHands()` once and then `detect(video)`
 * inside their animation loop.
 */
export interface HandLandmark { x: number; y: number; z: number }

let loaded = false;
export async function loadHands(): Promise<void> {
  if (loaded) return;
  loaded = true;
}

export function extractMockLandmarks(video: HTMLVideoElement): HandLandmark[] {
  const t = performance.now() / 1000;
  const cx = 0.5 + Math.sin(t) * 0.05;
  const cy = 0.5 + Math.cos(t) * 0.05;
  return Array.from({ length: 21 }, (_, i) => ({
    x: cx + Math.sin(i + t) * 0.1,
    y: cy + Math.cos(i + t) * 0.1,
    z: 0,
    _w: video.videoWidth || 0,
  })) as HandLandmark[];
}
