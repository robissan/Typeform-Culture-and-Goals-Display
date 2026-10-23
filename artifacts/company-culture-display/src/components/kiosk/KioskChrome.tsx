import type { ReactNode } from 'react';
import type { ScreenId } from '@/data/kiosk-url';

const home = import.meta.env.BASE_URL || '/';

export function KioskChrome({
  screen = 'people',
  paused = false,
  children,
  header,
  live,
  showPause = false,
  onTogglePause,
}: {
  screen?: ScreenId;
  paused?: boolean;
  children: ReactNode;
  header?: ReactNode;
  live?: string;
  showPause?: boolean;
  onTogglePause?: () => void;
}) {
  return (
    <div className="kx" data-t={screen} data-motion={paused ? 'paused' : 'on'}>
      <header className="kx-top">
        <a className="kx-brand" href={home}>
          <img src={`${import.meta.env.BASE_URL}brand/typeform-symbol.svg`} width={43} height={24} alt="" />
          <span>Typeform Commons</span>
        </a>
        {header}
      </header>
      <main id="main">{children}</main>
      {live ? <div className="kx-sr" role="status" aria-live="polite">{live}</div> : null}
      <footer className="kx-foot">
        <span>Figures are illustrative samples only. People and quotes are fictional. No live feeds.</span>
        {showPause && onTogglePause ? (
          <button type="button" className="kx-btn" aria-pressed={paused} onClick={onTogglePause} data-testid="button-pause">
            {paused ? 'Resume' : 'Pause'}
          </button>
        ) : null}
      </footer>
    </div>
  );
}

export function MissingSample({ reason }: { reason: string }) {
  return (
    <section className="kx-main" aria-labelledby="h-missing">
      <div className="kx-numtag"><b>/00</b><span>Sample</span></div>
      <h1 id="h-missing" className="kx-big">The sample for this display is missing.</h1>
      <p className="kx-note">{reason}</p>
      <p className="kx-note">People, culture, revenue, users, and Barception stay on screen only when the sample parses. Nothing here is loaded from a live feed.</p>
    </section>
  );
}
