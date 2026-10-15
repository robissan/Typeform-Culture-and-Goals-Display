import { useState } from 'react';
import { stories } from '@/data/kiosk-data';
import { Rich, Stepper, useStoryTimer } from './Motion';

const blobs = ['M60 20C110 -10 170 10 175 70S120 150 70 135 10 50 60 20Z', 'M30 60C20 10 100 0 150 30S190 110 120 140 40 110 30 60Z', 'M50 30C90 0 160 20 170 80S110 150 60 130 10 60 50 30Z'];

export function CultureChapter() {
  const [i, setI] = useState(0);
  useStoryTimer(() => setI((x) => (x + 1) % stories.length), 10000);
  const s = stories[i];
  const winLink = s.id === 'win';
  return (
    <section className="kx-main kx-culture" aria-labelledby="h-culture" data-testid="screen-culture">
      <div className="kx-numtag"><b>/02</b><span>Together</span></div>
      <svg className="kx-bgblobs" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {blobs.map((d, k) => (
          <path key={k} className="lp kx-wob" d={d} transform={`translate(${60 + k * 200} ${40 + (k % 2) * 160}) scale(1.6)`} fill="none" stroke="currentColor" strokeOpacity=".35" strokeWidth=".8" style={{ animationDelay: `-${k * 3}s` }} />
        ))}
      </svg>
      <div className="kx-manifesto" key={s.id}>
        <p className="kx-kind">{s.label}</p>
        <h1 id="h-culture" className="kx-mtext in" data-testid="text-manifesto"><Rich segs={s.segs} /></h1>
        <p className="kx-note" data-testid="text-synthetic">{s.stat}{winLink && <> Source: <a href="https://www.typeform.com/blog/series-c-is-just-the-beginning">Typeform blog</a>.</>}</p>
        <p className="kx-note">Quotes and numbers here are fictional samples, not official statements.</p>
      </div>
      <Stepper label="Culture story" count={stories.length} idx={i} set={setI} id="story" />
    </section>
  );
}
