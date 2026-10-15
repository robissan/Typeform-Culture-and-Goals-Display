import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from 'react';
import { screens, type ScreenId } from '@/data/kiosk-data';
import { BarceptionChapter, PeopleChapter, RevenueChapter, UsersChapter } from './Chapters';

const initial = (): number => {
  const q = new URLSearchParams(window.location.search).get('screen');
  const i = screens.findIndex((s) => s.id === q);
  return i < 0 ? 0 : i;
};

const views: Record<ScreenId, () => ReactElement> = {
  people: PeopleChapter,
  revenue: RevenueChapter,
  users: UsersChapter,
  barception: BarceptionChapter,
};

export function KioskShell() {
  const [idx, setIdx] = useState(initial);
  const [auto, setAuto] = useState(false);
  const n = screens.length;
  const go = useCallback((i: number) => setIdx(((i % n) + n) % n), [n]);
  const cur = screens[idx];

  useEffect(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('screen', cur.id);
    window.history.replaceState(null, '', u);
  }, [cur.id]);

  useEffect(() => {
    if (!auto) return;
    const t = window.setTimeout(() => setIdx((i) => (i + 1) % n), 20000);
    return () => window.clearTimeout(t);
  }, [auto, idx, n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest('input,textarea,select,a,[contenteditable="true"],[role="slider"]')) return;
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % n);
      else if (e.key === 'ArrowLeft') setIdx((i) => (i + n - 1) % n);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [n]);

  const View = views[cur.id];
  return (
    <div className="kx" data-t={cur.id} data-testid="company-culture-kiosk">
      <header className="kx-top">
        <div className="kx-brand">
          <img src={`${import.meta.env.BASE_URL}brand/typeform-symbol.svg`} width={43} height={24} alt="" />
          <span>Typeform Commons</span>
        </div>
        <nav className="kx-nav" aria-label="Chapters">
          <button type="button" className="kx-btn" onClick={() => go(idx - 1)} aria-label="Previous chapter" data-testid="button-prev">Previous</button>
          {screens.map((s, i) => (
            <button key={s.id} type="button" className="kx-btn" aria-current={i === idx} onClick={() => go(i)} data-testid={`button-screen-${s.id}`}>
              {s.label}
            </button>
          ))}
          <button type="button" className="kx-btn" onClick={() => go(idx + 1)} aria-label="Next chapter" data-testid="button-next">Next</button>
          <button type="button" className="kx-btn" aria-pressed={auto} onClick={() => setAuto((a) => !a)} data-testid="button-auto">
            {auto ? 'Pause rotation' : 'Auto-rotate every 20s'}
          </button>
        </nav>
      </header>
      <main id="main"><View key={cur.id} /></main>
      <div className="kx-sr" role="status" aria-live="polite">
        Showing chapter {idx + 1} of {n}: {cur.label}
      </div>
      <footer className="kx-foot">
        <span>Figures are illustrative samples only. People and quotes are fictional. No live feeds.</span>
        <span>Arrow keys change chapter. Auto-rotation is {auto ? 'on' : 'off'}.</span>
      </footer>
    </div>
  );
}
