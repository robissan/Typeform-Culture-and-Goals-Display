import { useLayoutEffect, useRef, useState } from 'react';
import { mrr, revenue, tealOnCream } from '@/data/kiosk-data';

const D = 'M70 60H730A40 40 0 0 1 730 140H70A40 40 0 0 0 70 220H730A40 40 0 0 1 730 300H70A40 40 0 0 0 70 380H730A40 40 0 0 1 730 460';

export function RevenueChapter() {
  const ref = useRef<SVGPathElement>(null);
  const fig = revenue;
  const [m, setM] = useState({ x: 160, y: 380, a: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const length = el.getTotalLength();
    const at = el.getPointAtLength(length * fig.frac);
    const next = el.getPointAtLength(Math.min(length, length * fig.frac + 2));
    setM({ x: at.x, y: at.y, a: (Math.atan2(next.y - at.y, next.x - at.x) * 180) / Math.PI });
  }, [fig.frac]);
  const lx = Math.min(Math.max(m.x - 40, 40), 480);
  return (
    <section className="kx-main kx-revenue" aria-labelledby="h-rev" data-testid="screen-revenue">
      <div className="kx-numtag"><b>/03</b><span>The journey</span></div>
      <div className="kx-journey">
        <div className="kx-jtext">
          <h1 id="h-rev" className="kx-big">Fasten your <em style={{ color: tealOnCream }}>seatbelts.</em></h1>
          <p className="kx-stat" data-testid="text-mrr">{fig.currentLong}</p>
          <p className="kx-sub">Monthly recurring revenue, demo value</p>
          <ul className="kx-facts2">
            <li>Target: <b data-testid="text-target">{fig.targetLong}</b></li>
            <li>Progress: <b data-testid="text-progress">{fig.progressLabel}</b></li>
            <li>Remaining: <b data-testid="text-remaining">{fig.remainingLong}</b></li>
          </ul>
          <p className="kx-note">Distance along the route equals value{fig.progress == null ? '' : `: ${fig.progress}% of the path is travelled`}. The route is not a calendar and says nothing about being on track.</p>
        </div>
        <svg className="kx-jsvg" viewBox="0 0 800 520" role="img" aria-label={fig.aria}>
          <circle className="lp kx-orbit" cx="690" cy="500" r="26" fill="#B5703A" opacity=".85" />
          <circle className="lp kx-orbit" cx="40" cy="480" r="18" fill="#753A88" opacity=".8" />
          <path d={D} fill="none" stroke="#4B6FA8" strokeWidth="14" strokeLinecap="round" strokeDasharray="1 22" opacity=".5" />
          <path ref={ref} d={D} fill="none" stroke="#BFB9AE" strokeWidth="14" strokeLinecap="round" />
          <path d={D} pathLength={1000} fill="none" stroke="#14685A" strokeWidth="14" strokeLinecap="round" strokeDasharray={`${fig.frac * 1000} 1000`} />
          <path d={D} pathLength={1000} fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="3" strokeDasharray="6 14" className="lp kx-flow" />
          <circle cx="70" cy="60" r="11" fill="#FAF9FB" stroke="#753A88" strokeWidth="4" />
          <text x="92" y="30" fill="#753A88" fontSize="20">Start: $0</text>
          <circle cx="730" cy="460" r="11" fill="#FAF9FB" stroke="#753A88" strokeWidth="4" />
          <text x="720" y="500" textAnchor="end" fill="#753A88" fontSize="20">{fig.targetMark}</text>
          <g transform={`translate(${m.x} ${m.y}) rotate(${m.a})`} data-testid="marker-rocket">
            <g className="lp kx-bob">
              <path d="M-16 -9L-26 -17L-24 0L-26 17L-16 9Z" fill="#B2373A" />
              <path d="M-16 -10C6 -16 22 -6 28 0C22 6 6 16 -16 10Z" fill="#D8524F" />
              <circle cx="6" cy="0" r="5" fill="#FAF9FB" />
              <ellipse className="lp kx-flame" cx="-32" cy="0" rx="9" ry="4" fill="#D9A441" />
            </g>
          </g>
          <g transform={`translate(${lx} ${m.y + 42})`}>
            <text fill="#2A222B" fontSize="20" fontWeight="600" data-testid="text-here">{fig.here}</text>
            <text y="22" fill="#8E2E32" fontSize="16" data-testid="text-route">{fig.routeRemain}</text>
          </g>
        </svg>
      </div>
      <p className="kx-note">Sample monthly recurring revenue is {mrr.current} of a {mrr.target} million target. The picture uses those same figures.</p>
    </section>
  );
}
