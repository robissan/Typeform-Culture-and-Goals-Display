import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { Seg } from '@/data/kiosk-data';

export const MotionCtx = createContext<{ paused: boolean }>({ paused: false });
export const useMotion = () => useContext(MotionCtx);

/**
 * Repeating timer. It stops while motion is paused or the tab is hidden,
 * and it restarts when `resetKey` changes so one visitor step waits a full interval.
 */
export function useStoryTimer(onTick: () => void, ms: number, resetKey: unknown) {
  const { paused } = useMotion();
  const ref = useRef(onTick);
  ref.current = onTick;
  const [visible, setVisible] = useState(() => typeof document === 'undefined' || !document.hidden);

  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  useEffect(() => {
    if (paused || !visible) return;
    const timer = window.setInterval(() => ref.current(), ms);
    return () => window.clearInterval(timer);
  }, [paused, visible, ms, resetKey]);
}

export function Rich({ segs }: { segs: Seg[] }) {
  return (
    <>
      {segs.map((seg, index) =>
        typeof seg === 'string' ? <span key={index}>{seg}</span> :
          <span key={index} className="kx-hl" style={{ color: seg.c }}>{seg.t}</span>)}
    </>
  );
}

const cols = ['#D8524F', '#D9A441', '#4B5BB8', '#14685A', '#D258FE', '#753A88'];

export function Confetti({ n = 12 }: { n?: number }) {
  const bits = Array.from({ length: n }, (_, i) => {
    const r = (k: number) => ((i * 9301 + k * 49297) % 233280) / 233280;
    return { x: r(1) * 100, s: 5 + r(3) * 8, c: cols[i % cols.length], d: r(4) * 5, rot: r(5) * 40, tri: i % 3 === 0 };
  });
  return (
    <div className="kx-conf" aria-hidden="true">
      {bits.map((bit, index) => (
        <i key={index} className="lp" style={{ left: `${bit.x}%`, top: 6, width: bit.s, height: bit.s, background: bit.c, animationDelay: `-${bit.d}s`, rotate: `${bit.rot}deg`, clipPath: bit.tri ? 'polygon(0 0,100% 30%,40% 100%)' : undefined, borderRadius: bit.tri ? 0 : '50%' }} />
      ))}
    </div>
  );
}

export function Stepper({ noun, count, idx, set, id }: { noun: string; count: number; idx: number; set: (i: number) => void; id: string }) {
  return (
    <div className="kx-step" role="group" aria-label={noun}>
      <button type="button" className="kx-btn" aria-label={`Previous ${noun}`} onClick={() => set((idx + count - 1) % count)} data-testid={`button-${id}-prev`}>Previous</button>
      <span className="kx-count" data-testid={`text-${id}-count`}>{idx + 1} / {count}</span>
      <button type="button" className="kx-btn" aria-label={`Next ${noun}`} onClick={() => set((idx + 1) % count)} data-testid={`button-${id}-next`}>Next</button>
    </div>
  );
}
