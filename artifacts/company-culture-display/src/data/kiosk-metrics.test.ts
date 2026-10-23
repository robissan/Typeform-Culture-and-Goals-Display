import { describe, expect, it } from 'vitest';
import { beverages, mrr, parseSample, rawSample } from './kiosk-data';
import { beverageReport, formatMillions, pct, revenueFigures, signedChange, trim } from './kiosk-metrics';

describe('pct and trim', () => {
  it('turns the sample revenue into 82.3 percent and 0.92 remaining', () => {
    expect(pct(4.28, 5.2)).toBe(82.3);
    expect(pct(mrr.current, mrr.target)).toBe(82.3);
    expect(trim(5.2 - 4.28)).toBe(0.92);
    expect(trim(mrr.target - mrr.current)).toBe(0.92);
  });

  it('turns the sample audience into 80 percent', () => {
    expect(pct(1.84, 2.3)).toBe(80);
  });

  it('refuses to divide by a zero target or a zero baseline', () => {
    expect(pct(1, 0)).toBeNull();
    expect(signedChange(0, 10).percent).toBeNull();
    expect(signedChange(0, 10).number).toBe('+10');
  });
});

describe('revenue label', () => {
  it('matches mrr instead of a separate hardcoded caption', () => {
    const figures = revenueFigures(mrr);
    expect(figures.here).toBe(`We are here: $${formatMillions(mrr.current)}M`);
    expect(figures.here).toContain(mrr.current.toFixed(2));
    expect(figures.routeRemain).toBe(`${figures.progress}% of route, $${formatMillions(trim(mrr.target - mrr.current))}M to go`);
    expect(figures.currentLong).toBe(`$${formatMillions(mrr.current)} million USD`);
    expect(figures.targetLong).toBe(`$${formatMillions(mrr.target)} million USD`);
    expect(figures.remainingLong).toBe(`$${formatMillions(trim(mrr.target - mrr.current))} million USD`);
    expect(figures.progressLabel).toBe('82.3% of target');
    expect(figures.aria).toContain('4.28');
    expect(figures.aria).toContain('0.92');
    expect(figures.aria).toContain('5.2');
  });

  it('says the target is not set when the target is zero', () => {
    const figures = revenueFigures({ current: 1, target: 0 });
    expect(figures.progress).toBeNull();
    expect(figures.here).toBe('We are here: $1M');
    expect(figures.routeRemain).toBe('Target is not set');
    expect(figures.frac).toBe(0);
  });
});

describe('April–May card math', () => {
  it('matches the sample change from April to May when May is selected', () => {
    const report = beverageReport(beverages.months, 1);
    expect(report).not.toBeNull();
    expect(report!.from.month).toBe('April');
    expect(report!.to.month).toBe('May');
    expect(report!.focus.month).toBe('May');
    expect(report!.cards.map((card) => card.heading)).toEqual([
      'Coffee +106',
      'Beer −26',
      'May: 1,500 servings',
      'Coffee is 85.7% of May servings',
    ]);
    expect(report!.cards[0].detail).toBe('1,180 to 1,286 servings (+9.0%)');
    expect(report!.cards[1].detail).toBe('240 to 214 servings (−10.8%)');
    expect(report!.cards[2].detail).toContain('Total +80 from April to May (+5.6%)');
    expect(report!.cards[1].color).toBe('#2A222B');
    expect(report!.ratio).toBe(6);
    expect(report!.share).toBe('85.7');
  });

  it('uses the selected month and its neighbor when a third month exists', () => {
    const months = [
      ...beverages.months,
      { month: 'June', coffee: 1400, beer: 200 },
    ];
    const june = beverageReport(months, 2);
    expect(june!.from.month).toBe('May');
    expect(june!.to.month).toBe('June');
    expect(june!.focus.month).toBe('June');
    expect(june!.cards[0].heading).toBe('Coffee +114');
    expect(june!.ratio).toBe(7);

    const april = beverageReport(months, 0);
    expect(april!.from.month).toBe('April');
    expect(april!.to.month).toBe('May');
    expect(april!.focus.month).toBe('April');
    expect(april!.ratio).toBe(5);
  });

  it('does not invent a ratio when beer is zero', () => {
    const report = beverageReport([{ month: 'June', coffee: 10, beer: 0 }], 0);
    expect(report!.ratio).toBeNull();
    expect(report!.comparable).toBe(false);
  });
});

describe('sample parse', () => {
  it('accepts the shipped sample and rejects an empty people list', () => {
    expect(parseSample(rawSample).ok).toBe(true);
    const empty = { ...rawSample, profiles: [] };
    const result = parseSample(empty);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toContain('People stories are missing');
  });
});
