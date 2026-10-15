import { useState } from 'react';
import { profiles } from '@/data/kiosk-data';
import { Confetti, Rich, Stepper, useStoryTimer } from './Motion';

export function PeopleChapter() {
  const [i, setI] = useState(0);
  useStoryTimer(() => setI((x) => (x + 1) % profiles.length), 9000);
  const p = profiles[i];
  return (
    <section className="kx-main kx-personal" aria-labelledby="h-people" data-testid="screen-people">
      <div className="kx-numtag"><b>/01</b><span>Manifesto</span></div>
      <div className="kx-pstage">
        <div className="kx-poster" key={p.id}>
          <Confetti />
          <svg className="kx-ribbon" viewBox="0 0 200 60" aria-hidden="true">
            <path className="kx-draw lp" d="M5 40 C40 5 70 55 100 28 S160 8 195 30" fill="none" stroke="#2E9E8A" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p className="kx-kind" data-testid="text-kind">{p.kind}</p>
          <h1 id="h-people" className="kx-story in" data-testid="text-story">
            <Rich segs={p.segs} />
          </h1>
          <ul className="kx-facts2">
            <li data-testid="text-music">{p.music}</li>
            <li data-testid="text-hobby">{p.hobby}</li>
            <li>{p.detail}</li>
          </ul>
          <hr />
        </div>
        <div className="kx-side">
          <p className="kx-big">Say hi to each other.</p>
          <Stepper label="Person" count={profiles.length} idx={i} set={setI} id="person" />
          <p className="kx-note">One story at a time. Stories change on their own unless motion is paused.</p>
        </div>
      </div>
    </section>
  );
}
