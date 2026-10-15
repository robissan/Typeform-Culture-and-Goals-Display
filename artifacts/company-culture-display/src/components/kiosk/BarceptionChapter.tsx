import { useEffect, useState } from 'react';
import { beverages } from '@/data/kiosk-data';

const { scaleMax, months } = beverages;
const H = 320;
const Mug = ({ beer, x = 0 }: { beer?: boolean; x?: number }) => (
  <g transform={`translate(${x} 0)`}>
    <rect x="0" y="8" width="26" height="28" rx="4" fill={beer ? '#D9A441' : '#6B4129'} />
    <path d="M26 14h6a4 4 0 0 1 0 14h-6" fill="none" stroke={beer ? '#D9A441' : '#6B4129'} strokeWidth="4" />
    {beer && <path d="M0 10C4 -2 12 4 14 4S24 -2 26 10Z" fill="#FAF9FB" />}
  </g>
);

function Column({ x, v, beer }: { x: number; v: number; beer?: boolean }) {
  const lvl = (v / scaleMax) * H;
  return (
    <g transform={`translate(${x} 60)`}>
      <clipPath id={beer ? 'cb' : 'cc'}><rect width="160" height={H} /></clipPath>
      <rect width="160" height={H} fill="#3a3038" />
      <g clipPath={`url(#${beer ? 'cb' : 'cc'})`}>
        <g className="kx-level" style={{ transform: `translateY(${H - lvl}px)` }}>
          <g className="lp kx-slosh">
            <path d="M-80 0Q-40 -14 0 0T80 0T160 0T240 0V400H-80Z" fill={beer ? '#E7B416' : '#6B4129'} />
            <path d={beer ? 'M-80 0Q-40 -14 0 0T80 0T160 0T240 0V-22Q200 -34 160 -22T80 -22T0 -22T-80 -22Z' : 'M-80 0Q-40 -14 0 0T80 0T160 0T240 0V-12Q200 -22 160 -12T80 -12T0 -12T-80 -12Z'} fill={beer ? '#FAF9FB' : '#C39A66'} />
          </g>
          {[0, 1, 2, 3, 4].map((b) => (
            <circle key={b} className="lp kx-bub" cx={22 + b * 31} cy={12 + (b / 4) * Math.max(lvl - 24, 0)} r={4 + (b % 3) * 2} fill={beer ? '#FAF9FB' : '#2A1A10'} opacity=".5" style={{ animationDelay: `-${b * 1.3}s` }} />
          ))}
        </g>
      </g>
      <rect width="160" height={H} fill="none" stroke="#FAF9FB" strokeOpacity=".5" />
    </g>
  );
}

export function BarceptionChapter() {
  const [mi, setMi] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('month');
    const index = months.findIndex((month) => month.month.toLowerCase() === requested);
    return index < 0 ? 1 : index;
  });
  const [view, setView] = useState<'pour' | 'insights'>(() =>
    new URLSearchParams(window.location.search).get('view') === 'insights' ? 'insights' : 'pour');
  const m = months[mi];
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('month', m.month.toLowerCase());
    url.searchParams.set('view', view);
    window.history.replaceState(null, '', url);
  }, [m.month, view]);
  const [a, b] = months;
  const tot = (x: typeof a) => x.coffee + x.beer;
  const count = (n: number) => n.toLocaleString('en');
  const change = (from: number, to: number) => ({
    number: `${to >= from ? '+' : '\u2212'}${count(Math.abs(to - from))}`,
    percent: `${to >= from ? '+' : '\u2212'}${Math.abs((to - from) / from * 100).toFixed(1)}%`,
  });
  const coffeeChange = change(a.coffee, b.coffee);
  const beerChange = change(a.beer, b.beer);
  const totalChange = change(tot(a), tot(b));
  const share = (b.coffee / tot(b) * 100).toFixed(1);
  const ratio = Math.round(b.coffee / b.beer);
  const cards = [
    { h: `Coffee ${coffeeChange.number}`, s: `${count(a.coffee)} to ${count(b.coffee)} servings (${coffeeChange.percent})`, c: '#6B4129' },
    { h: `Beer ${beerChange.number}`, s: `${count(a.beer)} to ${count(b.beer)} servings (${beerChange.percent})`, c: '#D9A441' },
    { h: `${b.month}: ${count(tot(b))} servings`, s: `Coffee and beer combined. Total ${totalChange.number} from ${a.month} (${totalChange.percent})`, c: '#207467' },
    { h: `Coffee is ${share}% of ${b.month} servings`, s: `${count(b.coffee)} of ${count(tot(b))}`, c: '#753A88' },
  ];
  return (
    <section className="kx-main kx-barception" aria-labelledby="h-bar" data-testid="screen-barception">
      <div className="kx-numtag"><b>/05</b><span>Barception</span></div>
      <div className="kx-segctl" role="group" aria-label="Month and view">
        {view === 'pour' && months.map((x, i) => (
          <button key={x.month} type="button" className="kx-btn" aria-pressed={mi === i} onClick={() => setMi(i)} data-testid={`button-month-${x.month.toLowerCase()}`}>{x.month}</button>
        ))}
        <button type="button" className="kx-btn" aria-pressed={view === 'pour'} onClick={() => setView('pour')} data-testid="button-view-pour">Pour</button>
        <button type="button" className="kx-btn" aria-pressed={view === 'insights'} onClick={() => setView('insights')} data-testid="button-view-insights">Insights</button>
      </div>
      {view === 'pour' ? (
        <div className="kx-bgrid">
          <div>
            <h1 id="h-bar" className="kx-big in" data-testid="text-bar-headline">In {m.month}: <span style={{ color: '#D9A441' }}>{m.coffee.toLocaleString('en')} coffees</span> and <span style={{ color: '#E7B416' }}>{m.beer} beers.</span></h1>
            <p className="kx-note" data-testid="text-scale">Fill height is a count of servings on one shared scale: full glass = {scaleMax.toLocaleString('en')} servings. It is not liquid volume.</p>
            <p className="kx-note">Aggregate counts only. They show how many servings were logged, nothing about why, or about anyone. No one is expected to drink coffee or alcohol.</p>
          </div>
          <svg viewBox="0 0 400 420" className="kx-pour" role="img" aria-label={`${m.month}: ${m.coffee} coffee servings and ${m.beer} beer servings on a scale to 1500 servings`}>
            <g transform="translate(0 0)"><text x="30" y="30" fill="#FAF9FB" fontSize="22" data-testid="text-coffee-count">{m.coffee.toLocaleString('en')}</text><g transform="translate(100 -4)"><Mug /></g></g>
            <g><text x="230" y="30" fill="#FAF9FB" fontSize="22" data-testid="text-beer-count">{m.beer}</text><g transform="translate(290 -4)"><Mug beer /></g></g>
            <Column x={20} v={m.coffee} />
            <Column x={220} v={m.beer} beer />
            <text x="20" y="410" fill="#FAF9FB" fontSize="14">Coffee servings</text>
            <text x="220" y="410" fill="#FAF9FB" fontSize="14">Beer servings</text>
          </svg>
        </div>
      ) : (
        <div className="kx-ins" data-testid="view-insights">
          <h1 id="h-bar" className="kx-big in">{a.month} to {b.month}, in <span style={{ color: '#D9A441' }}>poster headlines.</span></h1>
          <div className="kx-cards">
            {cards.map((c, i) => (
              <div key={i} className="kx-icard" style={{ background: c.c }} data-testid={`card-insight-${i}`}>
                <b>{c.h}</b><span>{c.s}</span>
              </div>
            ))}
            <div className="kx-icard wide" data-testid="card-insight-ratio">
              <b>About {ratio} coffees for every beer</b>
              <svg viewBox={`0 0 ${(ratio + 1) * 38 + 16} 44`} role="img" aria-label={`${ratio} coffee mugs and one beer mug`} className="kx-mugs">
                {Array.from({ length: ratio }, (_, k) => <Mug key={k} x={k * 38} />)}
                <Mug beer x={ratio * 38 + 8} />
              </svg>
              <span>{count(b.coffee)} coffees to {count(b.beer)} beers in {b.month}. Total {a.month} {count(tot(a))}, {b.month} {count(tot(b))}.</span>
            </div>
          </div>
          <p className="kx-note" data-testid="text-establish">What these counts establish: how many servings were logged each month. They do not establish preferences, seasons, productivity or causes. Icons are illustrations; only the figures carry data.</p>
        </div>
      )}
    </section>
  );
}
