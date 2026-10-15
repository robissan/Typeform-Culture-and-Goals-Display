import { beverages, mau, mrr, pct, profiles, trim } from '@/data/kiosk-data';

const initials = (n: string) => n.split(' ').map((p) => p[0]).join('');

export function PeopleChapter() {
  return (
    <section className="kx-main" aria-labelledby="h-people" data-testid="screen-people">
      <p className="kx-eye">People & culture</p>
      <h1 className="kx-h" id="h-people">Say hi to each other.</h1>
      <div className="kx-people">
        {profiles.map((p, i) => (
          <article key={p.kind} className={`kx-card${i === 2 ? ' dark' : ''}`} data-testid={`card-${i}`}>
            <div className="kx-av" style={{ background: p.color }} aria-hidden="true">
              {i === 2 ? 'W' : initials(p.name)}
            </div>
            <span className="tag">{p.kind}</span>
            <h3>{p.name}</h3>
            <p>{p.line}</p>
            {p.note && <p><strong style={{ fontWeight: 400, opacity: 0.8 }}>{p.note}</strong></p>}
            {i === 2 && (
              <p style={{ fontSize: 13, opacity: 0.8 }}>
                Source: <a href="https://www.typeform.com/blog/series-c-is-just-the-beginning" style={{ color: 'inherit' }}>Typeform blog</a>
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export function RevenueChapter() {
  const p = pct(mrr.current, mrr.target);
  const r = 150, c = 2 * Math.PI * r, arc = c * 0.75;
  return (
    <section className="kx-main kx-revenue" aria-labelledby="h-rev" data-testid="screen-revenue">
      <p className="kx-eye">Revenue (MRR)</p>
      <h1 className="kx-h" id="h-rev">Monthly recurring revenue</h1>
      <div className="kx-split">
        <div>
          <p className="kx-stat" data-testid="text-mrr">${mrr.current.toFixed(2)} million USD</p>
          <div className="kx-facts">
            <span>Target: <b>${mrr.target.toFixed(1)} million USD</b></span>
            <span>Progress: <b>{p}% of target</b></span>
            <span>Not yet reached: ${trim(mrr.target - mrr.current)} million to go</span>
          </div>
        </div>
        <svg className="kx-svg" viewBox="0 0 400 400" role="img" aria-label={`Open ring, ${p} percent filled toward the 5.2 million dollar target`}>
          <g transform="rotate(135 200 200)" fill="none" strokeLinecap="round" strokeWidth="34">
            <circle cx="200" cy="200" r={r} stroke="#4a3f4c" strokeDasharray={`${arc} ${c}`} />
            <circle className="kx-ring-fill" cx="200" cy="200" r={r} stroke="#C6FB50" strokeDasharray={`${(arc * p) / 100} ${c}`} />
          </g>
          <text x="200" y="215" textAnchor="middle" fill="#FAF9FB" fontSize="64">{p}%</text>
          <text x="200" y="250" textAnchor="middle" fill="#C6B8FE" fontSize="18">of $5.2M</text>
        </svg>
      </div>
    </section>
  );
}

export function UsersChapter() {
  const p = pct(mau.current, mau.target);
  const dots = Array.from({ length: 100 }, (_, i) => i);
  return (
    <section className="kx-main" aria-labelledby="h-mau" data-testid="screen-users">
      <p className="kx-eye">Active users (MAU)</p>
      <h1 className="kx-h" id="h-mau">Monthly active users</h1>
      <div className="kx-split">
        <svg className="kx-svg" viewBox="0 0 400 400" role="img" aria-label="Grid of 100 dots, 80 filled, representing 80 percent of the 2.3 million target">
          {dots.map((i) => (
            <circle key={i} className="kx-dot" style={{ animationDelay: `${i * 5}ms` }} cx={20 + (i % 10) * 40} cy={20 + Math.floor(i / 10) * 40} r={15}
              fill={i < p ? '#753A88' : 'none'} stroke="#753A88" strokeWidth="2" strokeDasharray={i < p ? undefined : '4 4'} />
          ))}
        </svg>
        <div>
          <p className="kx-stat" data-testid="text-mau">{mau.current.toFixed(2)} million</p>
          <div className="kx-facts">
            <span>Target: <b>{mau.target.toFixed(1)} million</b></span>
            <span>Progress: <b>{p}% of target</b></span>
            <span>Not yet reached: {trim(mau.target - mau.current)} million to go</span>
            <span>Each dot is 1% of target: 80 filled, 20 open.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BarceptionChapter() {
  const { months, scaleMax } = beverages;
  const [a, b] = months;
  const delta = (x: number, y: number) => {
    const d = y - x;
    return `${d > 0 ? '+' : '\u2212'}${Math.abs(d)} servings (${d > 0 ? '+' : '\u2212'}${Math.abs((d / x) * 100).toFixed(1)}%)`;
  };
  const row = (label: string, key: 'coffee' | 'beer', color: string) => (
    <div className="kx-row">
      <strong style={{ fontWeight: 400, fontSize: 22 }}>{label}</strong>
      {months.map((m) => (
        <div key={m.month} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 56 }}>{m.month}</span>
          <div style={{ flex: 1 }}>
            <div className="kx-bar" role="img" aria-label={`${m.month} ${label}: ${m[key]} servings`}
              style={{ width: `${(m[key] / scaleMax) * 100}%`, background: color, minWidth: 4 }} />
          </div>
          <span style={{ width: 70, textAlign: 'right' }}>{m[key].toLocaleString('en')}</span>
        </div>
      ))}
       <div style={{ marginLeft: 70 }}>Change: <b style={{ fontWeight: 400, color: '#753A88' }}>{delta(a[key], b[key])}</b></div>
    </div>
  );
  return (
    <section className="kx-main" aria-labelledby="h-bar" data-testid="screen-barception">
      <p className="kx-eye">Barception</p>
      <h1 className="kx-h" id="h-bar">April to May, one pour at a time.</h1>
      <div style={{ maxWidth: 900, marginTop: 20 }}>
        {row('Coffee servings', 'coffee', '#D258FE')}
        {row('Beer servings', 'beer', '#C6B8FE')}
        <p style={{ fontSize: 14 }}>Both bars use one shared scale: full width is {scaleMax.toLocaleString('en')} servings.</p>
        <p style={{ fontSize: 16, maxWidth: 680 }}>
          Aggregate counts only. These are not productivity measures, and no one is expected to drink coffee or alcohol.
        </p>
      </div>
    </section>
  );
}
