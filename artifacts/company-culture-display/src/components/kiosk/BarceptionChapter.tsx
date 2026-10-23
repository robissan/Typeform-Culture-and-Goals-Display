import { useId } from 'react';
import { beverageReport, beverages, count, type BarView } from '@/data/kiosk-data';

const { scaleMax, months } = beverages;
const H = 280;

const Mug = ({ beer, x = 0 }: { beer?: boolean; x?: number }) => (
  <g transform={`translate(${x} 0)`}>
    <rect x="0" y="8" width="26" height="28" rx="4" fill={beer ? '#D9A441' : '#6B4129'} />
    <path d="M26 14h6a4 4 0 0 1 0 14h-6" fill="none" stroke={beer ? '#D9A441' : '#6B4129'} strokeWidth="4" />
    {beer && <path d="M0 10C4 -2 12 4 14 4S24 -2 26 10Z" fill="#FAF9FB" />}
  </g>
);

function Column({ id, x, v, beer, label }: { id: string; x: number; v: number; beer?: boolean; label: string }) {
  const lvl = scaleMax === 0 ? 0 : (v / scaleMax) * H;
  return (
    <g transform={`translate(${x} 52)`}>
      <clipPath id={id}><rect width="150" height={H} /></clipPath>
      <rect width="150" height={H} fill="#3a3038" />
      <g clipPath={`url(#${id})`}>
        <g className="kx-level" style={{ transform: `translateY(${H - lvl}px)` }}>
          <g className="lp kx-slosh">
            <path d="M-80 0Q-40 -14 0 0T80 0T160 0T240 0V400H-80Z" fill={beer ? '#E7B416' : '#6B4129'} />
            <path d={beer ? 'M-80 0Q-40 -14 0 0T80 0T160 0T240 0V-22Q200 -34 160 -22T80 -22T0 -22T-80 -22Z' : 'M-80 0Q-40 -14 0 0T80 0T160 0T240 0V-12Q200 -22 160 -12T80 -12T0 -12T-80 -12Z'} fill={beer ? '#FAF9FB' : '#C39A66'} />
          </g>
          {[0, 1, 2, 3, 4].map((b) => (
            <circle key={b} className="lp kx-bub" cx={20 + b * 28} cy={12 + (b / 4) * Math.max(lvl - 24, 0)} r={4 + (b % 3) * 2} fill={beer ? '#FAF9FB' : '#2A1A10'} opacity=".5" style={{ animationDelay: `-${b * 1.3}s` }} />
          ))}
        </g>
      </g>
      <rect width="150" height={H} fill="none" stroke="#FAF9FB" strokeOpacity=".5" />
      <text x="75" y={H + 28} textAnchor="middle" fill="#FAF9FB" fontSize="16">{label}</text>
    </g>
  );
}

export function BarceptionChapter({
  monthIndex,
  view,
  onMonth,
  onView,
}: {
  monthIndex: number;
  view: BarView;
  onMonth: (index: number) => void;
  onView: (view: BarView) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const focus = months[monthIndex];
  const report = beverageReport(months, monthIndex);
  if (!focus || !report) {
    return (
      <section className="kx-main" aria-labelledby="h-bar">
        <h1 id="h-bar" className="kx-big">Barception has no sample months.</h1>
      </section>
    );
  }
  const shownMugs = report.ratio == null ? 0 : Math.min(report.ratio, 12);
  return (
    <section className="kx-main kx-barception" aria-labelledby="h-bar" data-testid="screen-barception">
      <div className="kx-numtag"><b>/05</b><span>Barception</span></div>
      <div className="kx-segctl" role="group" aria-label="Month and view">
        {months.map((month, index) => (
          <button key={month.month} type="button" className="kx-btn" aria-pressed={monthIndex === index} onClick={() => onMonth(index)} data-testid={`button-month-${month.month.toLowerCase()}`}>{month.month}</button>
        ))}
        <button type="button" className="kx-btn" aria-pressed={view === 'insights'} onClick={() => onView('insights')} data-testid="button-view-insights">Comparison</button>
        <button type="button" className="kx-btn" aria-pressed={view === 'pour'} onClick={() => onView('pour')} data-testid="button-view-pour">Glasses</button>
      </div>
      {view === 'insights' ? (
        <div className="kx-ins" data-testid="view-insights">
          <div className="kx-ratio" data-testid="card-insight-ratio">
            <h1 id="h-bar" className="kx-big">
              {report.ratio == null
                ? `No coffee-to-beer ratio in ${report.focus.month}.`
                : <>About {report.ratio} coffees for every beer <em>in {report.focus.month}.</em></>}
            </h1>
            {shownMugs > 0 && (
              <svg viewBox={`0 0 ${(shownMugs + 1) * 38 + 16} 44`} role="img" aria-label={`${report.ratio} coffee mugs and one beer mug`} className="kx-mugs">
                {Array.from({ length: shownMugs }, (_, k) => <Mug key={k} x={k * 38} />)}
                <Mug beer x={shownMugs * 38 + 8} />
              </svg>
            )}
            <p>
              {count(report.focus.coffee)} coffees to {count(report.focus.beer)} beers in {report.focus.month}.
              {report.comparable ? ` ${report.from.month} ${count(report.fromTotal)}, ${report.to.month} ${count(report.toTotal)}.` : ' Add another month to compare a change.'}
              {report.ratio != null && report.ratio > shownMugs ? ` The row shows ${shownMugs} of ${report.ratio} mugs.` : ''}
            </p>
          </div>
          {report.comparable && (
            <div className="kx-cards">
              {report.cards.map((card) => (
                <div key={card.key} className="kx-icard" style={{ background: card.background, color: card.color }} data-testid={`card-insight-${card.key}`}>
                  <b>{card.heading}</b><span>{card.detail}</span>
                </div>
              ))}
            </div>
          )}
          <p className="kx-note" data-testid="text-establish">What these counts establish: how many servings were logged. They do not establish preferences, seasons, productivity, or causes. Icons are illustrations; only the figures carry data.</p>
        </div>
      ) : (
        <div className="kx-bgrid">
          <svg viewBox="0 0 380 390" className="kx-pour" role="img" aria-label={`${focus.month}: ${focus.coffee} coffee servings and ${focus.beer} beer servings on a scale to ${scaleMax} servings`}>
            <text x="20" y="28" fill="#FAF9FB" fontSize="22" data-testid="text-coffee-count">{count(focus.coffee)}</text>
            <g transform="translate(108 -6)"><Mug /></g>
            <text x="210" y="28" fill="#FAF9FB" fontSize="22" data-testid="text-beer-count">{count(focus.beer)}</text>
            <g transform="translate(292 -6)"><Mug beer /></g>
            <Column id={`${uid}-coffee`} x={16} v={focus.coffee} label="Coffee servings" />
            <Column id={`${uid}-beer`} x={206} v={focus.beer} beer label="Beer servings" />
          </svg>
          <div className="kx-bcopy">
            <h1 id="h-bar" className="kx-big" data-testid="text-bar-headline">In {focus.month}: <span style={{ color: '#E7B416' }}>{count(focus.coffee)} coffees</span> and <span style={{ color: '#F0C14A' }}>{count(focus.beer)} beers.</span></h1>
            <p className="kx-note" data-testid="text-scale">Fill height is a count of servings on one shared scale: full glass = {count(scaleMax)} servings. It is not liquid volume. The number above each glass is that count.</p>
            <p className="kx-note">Aggregate counts only. They show how many servings were logged, nothing about why, or about anyone. No one is expected to drink coffee or alcohol.</p>
          </div>
        </div>
      )}
    </section>
  );
}
