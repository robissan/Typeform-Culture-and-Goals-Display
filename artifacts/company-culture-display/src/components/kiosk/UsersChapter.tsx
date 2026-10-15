import { useState } from 'react';
import { mau, mauWords, pct, trim } from '@/data/kiosk-data';
import { useStoryTimer } from './Motion';

const shapes = ['M60 20C110 -10 170 10 175 70S120 150 70 135 10 50 60 20Z', 'M30 60C20 10 100 0 150 30S190 110 120 140 40 110 30 60Z', 'M50 30C90 0 160 20 170 80S110 150 60 130 10 60 50 30Z'];
const fills = ['#D9A441', '#4B5BB8', '#C0483F'];
const pos = [{ x: 20, y: 40 }, { x: 250, y: 150 }, { x: 60, y: 300 }];

export function UsersChapter() {
  const [pick, setPick] = useState([4, 1, 1]);
  const shuffle = () => setPick((previous) => (['M', 'A', 'U'] as const).map((key, i) => {
    const length = mauWords[key].length;
    return (previous[i] + 1 + Math.floor(Math.random() * (length - 1))) % length;
  }));
  useStoryTimer(shuffle, 8000);
  const p = pct(mau.current, mau.target);
  const keys = ['M', 'A', 'U'] as const;
  const words = keys.map((k, i) => mauWords[k][pick[i]]);
  return (
    <section className="kx-main kx-users" aria-labelledby="h-mau" data-testid="screen-users">
      <div className="kx-numtag"><b>/04</b><span>Most Aleatory Uses</span></div>
      <div className="kx-ugrid">
        <div>
          <h1 id="h-mau" className="kx-big in">MAU means <em style={{ color: '#2E9E8A' }}>Monthly active users.</em></h1>
          <p className="kx-stat" data-testid="text-mau">{mau.current.toFixed(2)} million of {mau.target.toFixed(1)} million</p>
          <ul className="kx-facts2">
            <li>Progress: <b>{p}% of target</b></li>
            <li>Remaining: <b>{trim((mau.target - mau.current) * 1000)}k users</b></li>
          </ul>
          <svg viewBox="0 0 400 30" className="kx-wave" role="img" aria-label={`${p} percent of the way to 2.3 million`}>
            <path d="M5 15C40 0 70 30 105 15S170 0 205 15 270 30 305 15 360 0 395 15" fill="none" stroke="#BFB9AE" strokeWidth="8" strokeLinecap="round" />
            <path d="M5 15C40 0 70 30 105 15S170 0 205 15 270 30 305 15 360 0 395 15" pathLength={100} fill="none" stroke="#2E9E8A" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${p} 100`} />
          </svg>
          <button type="button" className="kx-btn kx-primary" onClick={shuffle} data-testid="button-shuffle">Shuffle words</button>
          <p className="kx-note">The three words are whimsy only. The real definition of MAU is monthly active users.</p>
          <p className="kx-sr" aria-live="polite" data-testid="text-mau-phrase-sr">Playful phrase: {words.join(' ')}</p>
        </div>
        <svg viewBox="-10 0 520 500" className="kx-blobs" role="img" aria-label={`Playful phrase: ${words.join(' ')}`}>
          {shapes.map((d, i) => (
            <g key={i} transform={`translate(${pos[i].x} ${pos[i].y}) scale(${i === 1 ? 1.15 : 1})`}>
              <g className="lp kx-morph" style={{ animationDelay: `-${i * 2}s` }}>
                <path d={d} fill={fills[i]} />
                <path d={d} fill="none" stroke="#fff" strokeOpacity=".4" transform="translate(6 6)" />
              </g>
              <text x="95" y="82" textAnchor="middle" fill="#FAF9FB" fontSize="26" data-testid={`text-word-${keys[i]}`}>
                <tspan fontWeight="700" fontSize="34">{keys[i]}</tspan>
                <tspan dx="4">{words[i].slice(1)}</tspan>
              </text>
            </g>
          ))}
          <text x="330" y="60" textAnchor="middle" fill="#2E9E8A" fontSize="30" fontWeight="600">1.84M</text>
        </svg>
      </div>
    </section>
  );
}
