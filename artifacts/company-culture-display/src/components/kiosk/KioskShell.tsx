import { useCallback, useEffect, useState, type ReactElement } from 'react';
import {
  beverages,
  chapterSearch,
  monthIndex as monthIndexFromQuery,
  readChapterQuery,
  sampleResult,
  screens,
  type BarView,
  type ScreenId,
} from '@/data/kiosk-data';
import { BarceptionChapter } from './BarceptionChapter';
import { CultureChapter } from './CultureChapter';
import { KioskChrome, MissingSample } from './KioskChrome';
import { MotionCtx } from './Motion';
import { PeopleChapter } from './PeopleChapter';
import { RevenueChapter } from './RevenueChapter';
import { UsersChapter } from './UsersChapter';

const views: Record<Exclude<ScreenId, 'barception'>, () => ReactElement> = {
  people: PeopleChapter,
  culture: CultureChapter,
  revenue: RevenueChapter,
  users: UsersChapter,
};

function Chapter({ id }: { id: Exclude<ScreenId, 'barception'> }) {
  const View = views[id];
  return <View />;
}

function usePageVisible() {
  const [visible, setVisible] = useState(() => typeof document === 'undefined' || !document.hidden);
  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);
  return visible;
}

export function KioskShell() {
  const [query] = useState(() => readChapterQuery(window.location.search));
  const [idx, setIdx] = useState(() => Math.max(screens.findIndex((screen) => screen.id === query.screen), 0));
  const [unknown, setUnknown] = useState(query.unknownScreen);
  const [staff, setStaff] = useState(false);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [barMonth, setBarMonth] = useState(() => monthIndexFromQuery(beverages.months, query.month));
  const [barView, setBarView] = useState<BarView>(query.view);
  const visible = usePageVisible();
  const n = screens.length;
  const cur = screens[idx] ?? screens[0];

  const go = useCallback((next: number) => {
    setUnknown(null);
    setIdx(((next % n) + n) % n);
  }, [n]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => { if (media.matches) setPaused(true); };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const month = beverages.months[barMonth]?.month ?? '';
    const next = chapterSearch(cur.id, { month, view: barView });
    const url = new URL(window.location.href);
    url.search = next;
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }, [cur.id, barMonth, barView]);

  useEffect(() => {
    if (paused || !visible) return;
    const timer = window.setTimeout(() => go(idx + 1), 20000);
    return () => window.clearTimeout(timer);
  }, [paused, visible, idx, go]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('input,textarea,select,a,[contenteditable="true"],[role="slider"]')) return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        go(idx + 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        go(idx - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, idx]);

  if (!sampleResult.ok) {
    return (
      <KioskChrome screen="people">
        <MissingSample reason={sampleResult.reason} />
      </KioskChrome>
    );
  }

  const live = unknown
    ? `Requested chapter ${unknown} was not found. Showing chapter 1 of ${n}: People.`
    : `Showing chapter ${idx + 1} of ${n}: ${cur.label}`;

  return (
    <MotionCtx.Provider value={{ paused: paused || !visible }}>
      <KioskChrome
        screen={cur.id}
        paused={paused}
        showPause
        onTogglePause={() => setPaused((value) => !value)}
        live={live}
        header={(
          <div className="kx-edge">
            <button type="button" className="kx-btn" onClick={() => go(idx - 1)} aria-label="Previous chapter" data-testid="button-prev">Previous</button>
            <button type="button" className="kx-btn" onClick={() => go(idx + 1)} aria-label="Next chapter" data-testid="button-next">Next</button>
            <button type="button" className="kx-btn" aria-expanded={staff} aria-controls="chapter-list" onClick={() => setStaff((value) => !value)} data-testid="button-chapters">Chapters</button>
          </div>
        )}
      >
        {unknown && <p className="kx-banner" data-testid="text-unknown-screen">{live}</p>}
        {staff && (
          <nav id="chapter-list" className="kx-chapters" aria-label="Chapters">
            {screens.map((screen, index) => (
              <button
                key={screen.id}
                type="button"
                className="kx-btn"
                aria-current={index === idx ? 'page' : undefined}
                onClick={() => go(index)}
                data-testid={`button-screen-${screen.id}`}
              >
                {screen.label}
              </button>
            ))}
          </nav>
        )}
        {cur.id === 'barception' ? (
          <BarceptionChapter monthIndex={barMonth} view={barView} onMonth={setBarMonth} onView={setBarView} />
        ) : (
          <Chapter key={cur.id} id={cur.id} />
        )}
      </KioskChrome>
    </MotionCtx.Provider>
  );
}
