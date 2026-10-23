import { useState } from 'react';
import { profiles, segText } from '@/data/kiosk-data';
import { Confetti, Rich, Stepper, useStoryTimer } from './Motion';

export function PeopleChapter() {
  const [i, setI] = useState(0);
  useStoryTimer(() => setI((x) => (x + 1) % profiles.length), 9000, i);
  const p = profiles[i];
  if (!p) return <section className="kx-main" aria-label="People" />;
  return (
    <section className="kx-main kx-personal" aria-labelledby="h-people" data-testid="screen-people">
      <div className="kx-numtag"><b>/01</b><span>People</span></div>
      <div className="kx-pstage">
        <div className="kx-poster" key={p.id}>
          <Confetti />
          <svg className="kx-ribbon" viewBox="0 0 200 60" aria-hidden="true">
            <path className="kx-draw lp" d="M5 40 C40 5 70 55 100 28 S160 8 195 30" fill="none" stroke="#14685A" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p className="kx-kind" data-testid="text-kind">{p.kind}</p>
          <h1 id="h-people" className="kx-story" data-testid="text-story">
            <Rich segs={p.segs} />
          </h1>
          <ul className="kx-facts2">
            <li data-testid="text-music">{p.music}</li>
            <li data-testid="text-hobby">{p.hobby}</li>
            <li>{p.detail}</li>
          </ul>
          <hr />
          <Confetti n={10} />
        </div>
        <div className="kx-side">
          <Stepper noun="person" count={profiles.length} idx={i} set={setI} id="person" />
          <p className="kx-note">Say hi to each other.</p>
          <p className="kx-note">One story at a time. Stories change on their own while the display is running.</p>
        </div>
      </div>
      <p className="kx-sr" aria-live="polite">{p.kind}. {segText(p.segs)}</p>
    </section>
  );
}
