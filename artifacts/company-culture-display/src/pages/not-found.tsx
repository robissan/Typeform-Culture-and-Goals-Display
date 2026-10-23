import { KioskChrome } from '@/components/kiosk/KioskChrome';

const home = import.meta.env.BASE_URL || '/';

export default function NotFound() {
  return (
    <KioskChrome screen="people" live="That page is not on this display.">
      <section className="kx-main" aria-labelledby="h-missing-page" data-testid="screen-not-found">
        <div className="kx-numtag"><b>/00</b><span>Missing page</span></div>
        <h1 id="h-missing-page" className="kx-big">That page is not on this display.</h1>
        <p className="kx-note">The office display has five chapters, starting with People.</p>
        <p className="kx-step">
          <a className="kx-btn" href={home}>Back to People</a>
        </p>
      </section>
    </KioskChrome>
  );
}
