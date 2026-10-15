import { createContext, useContext, useEffect, useRef } from 'react';
import type { Seg } from '@/data/kiosk-data';

export const MotionCtx = createContext<{ paused: boolean }>({ paused: false });
export const useMotion = () => useContext(MotionCtx);

/** Repeating timer that stops while motion is paused. */
export function useStoryTimer(onTick: () => void, ms: number) {
  const { paused } = useMotion();
  const ref = useRef(onTick);
  ref.current = onTick;
  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => ref.current(), ms);
    return () => window.clearInterval(t);
  }, [paused, ms]);
}

export function Rich({ segs }: { segs: Seg[] }) {
  return (
    <>
      {segs.map((s, i) =>
        typeof s === 'string' ? <span key={i}>{s}</span> :
          <span key={i} className="kx-hl lp" style={{ color: s.c, animationDelay: `${i * 180}ms` }}>{s.t}</span>)}
    </>
  );
}

const cols = ['#D8524F', '#D9A441', '#4B5BB8', '#2E9E8A', '#D258FE', '#753A88'];
export function Confetti({ n = 26 }: { n?: number }) {
  const bits = Array.from({ length: n }, (_, i) => {
    const r = (k: number) => ((i * 9301 + k * 49297) % 233280) / 233280;
    return { x: r(1) * 100, y: r(2) * 100, s: 5 + r(3) * 9, c: cols[i % cols.length], d: r(4) * 5, rot: r(5) * 360, tri: i % 3 === 0 };
  });
  return (
    <div className="kx-conf" aria-hidden="true">
      {bits.map((b, i) => (
        <i key={i} className="lp" style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.s, height: b.s, background: b.c, animationDelay: `-${b.d}s`, rotate: `${b.rot}deg`, clipPath: b.tri ? 'polygon(0 0,100% 30%,40% 100%)' : undefined, borderRadius: b.tri ? 0 : '50%' }} />
      ))}
    </div>
  );
}

export function Stepper({ label, count, idx, set, id }: { label: string; count: number; idx: number; set: (i: number) => void; id: string }) {
  return (
    <div className="kx-step" role="group" aria-label={label}>
      <button type="button" className="kx-btn" onClick={() => set((idx + count - 1) % count)} data-testid={`button-${id}-prev`}>Previous</button>
      <span className="kx-count" data-testid={`text-${id}-count`}>{idx + 1} / {count}</span>
      <button type="button" className="kx-btn" onClick={() => set((idx + 1) % count)} data-testid={`button-${id}-next`}>Next</button>
    </div>
  );
}
