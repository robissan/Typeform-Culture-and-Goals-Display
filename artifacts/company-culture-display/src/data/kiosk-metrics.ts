/** Pure sample-math. No network, no Typeform client. */

export function trim(n: number): number {
  return Number(n.toFixed(2));
}

/** One decimal percent, or null when the target is zero. */
export function pct(current: number, target: number): number | null {
  if (target === 0) return null;
  return Number(((current / target) * 100).toFixed(1));
}

/** Up to two decimals, trailing zeros removed: 5.2, 4.28, 0.92. */
export function formatMillions(n: number): string {
  return trim(n).toFixed(2).replace(/\.?0+$/, '');
}

export function count(n: number): string {
  return n.toLocaleString('en');
}

export type SignedChange = { number: string; percent: string | null };

/** Signed delta. Percent is null when the baseline is zero. */
export function signedChange(from: number, to: number): SignedChange {
  const delta = to - from;
  const sign = delta > 0 ? '+' : delta < 0 ? '\u2212' : '';
  const number = `${sign}${count(Math.abs(delta))}`;
  if (from === 0) return { number, percent: null };
  const percent = `${sign}${Math.abs((delta / from) * 100).toFixed(1)}%`;
  return { number, percent };
}

export type RevenueInput = { current: number; target: number };

export type RevenueFigures = {
  frac: number;
  progress: number | null;
  currentLong: string;
  targetLong: string;
  remainingLong: string;
  progressLabel: string;
  here: string;
  routeRemain: string;
  targetMark: string;
  aria: string;
};

export function revenueFigures(mrr: RevenueInput): RevenueFigures {
  const progress = pct(mrr.current, mrr.target);
  const remaining = trim(mrr.target - mrr.current);
  const currentText = formatMillions(mrr.current);
  const targetText = formatMillions(mrr.target);
  const remainingText = formatMillions(remaining);
  const frac = progress == null ? 0 : Math.min(Math.max(progress / 100, 0), 1);
  const progressLabel = progress == null ? 'Target is not set' : `${progress}% of target`;
  const here = `We are here: $${currentText}M`;
  const routeRemain = progress == null
    ? 'Target is not set'
    : `${progress}% of route, $${remainingText}M to go`;
  const aria = progress == null
    ? 'Winding route. The target is not set.'
    : `Winding route. The rocket is ${progress} percent of the way from 0 to the ${targetText} million dollar target, at ${currentText} million. ${remainingText} million remains.`;
  return {
    frac,
    progress,
    currentLong: `$${currentText} million USD`,
    targetLong: `$${targetText} million USD`,
    remainingLong: `$${remainingText} million USD`,
    progressLabel,
    here,
    routeRemain,
    targetMark: `Target: $${targetText}M`,
    aria,
  };
}

export type MonthCount = { month: string; coffee: number; beer: number };

export type InsightCard = {
  key: string;
  heading: string;
  detail: string;
  background: string;
  color: string;
};

export type BeverageReport = {
  focus: MonthCount;
  from: MonthCount;
  to: MonthCount;
  comparable: boolean;
  cards: InsightCard[];
  ratio: number | null;
  share: string | null;
  focusTotal: number;
  fromTotal: number;
  toTotal: number;
};

function monthTotal(month: MonthCount): number {
  return month.coffee + month.beer;
}

function withPercent(base: string, change: SignedChange): string {
  return change.percent == null ? base : `${base} (${change.percent})`;
}

/**
 * Compare the selected month with its neighbor.
 * A later month is compared with the one before it.
 * The first month is compared with the one after it.
 * Ratio and share belong to the selected month.
 */
export function beverageReport(months: MonthCount[], selectedIndex: number): BeverageReport | null {
  if (months.length === 0) return null;
  const i = Math.min(Math.max(selectedIndex, 0), months.length - 1);
  const focus = months[i];
  const focusTotal = monthTotal(focus);
  const ratio = focus.beer === 0 ? null : Math.round(focus.coffee / focus.beer);
  const share = focusTotal === 0 ? null : ((focus.coffee / focusTotal) * 100).toFixed(1);

  if (months.length < 2) {
    return {
      focus,
      from: focus,
      to: focus,
      comparable: false,
      cards: [],
      ratio,
      share,
      focusTotal,
      fromTotal: focusTotal,
      toTotal: focusTotal,
    };
  }

  const neighborIndex = i === 0 ? 1 : i - 1;
  const earlier = Math.min(i, neighborIndex);
  const later = Math.max(i, neighborIndex);
  const from = months[earlier];
  const to = months[later];
  const fromTotal = monthTotal(from);
  const toTotal = monthTotal(to);
  const coffee = signedChange(from.coffee, to.coffee);
  const beer = signedChange(from.beer, to.beer);
  const total = signedChange(fromTotal, toTotal);

  const cards: InsightCard[] = [
    {
      key: 'coffee',
      heading: `Coffee ${coffee.number}`,
      detail: withPercent(`${count(from.coffee)} to ${count(to.coffee)} servings`, coffee),
      background: '#6B4129',
      color: '#FAF9FB',
    },
    {
      key: 'beer',
      heading: `Beer ${beer.number}`,
      detail: withPercent(`${count(from.beer)} to ${count(to.beer)} servings`, beer),
      background: '#D9A441',
      color: '#2A222B',
    },
    {
      key: 'total',
      heading: `${focus.month}: ${count(focusTotal)} servings`,
      detail: `Coffee and beer combined. Total ${total.number} from ${from.month} to ${to.month}${total.percent ? ` (${total.percent})` : ''}`,
      background: '#207467',
      color: '#FAF9FB',
    },
    {
      key: 'share',
      heading: share == null ? `No servings in ${focus.month}` : `Coffee is ${share}% of ${focus.month} servings`,
      detail: share == null ? 'Both counts are zero.' : `${count(focus.coffee)} of ${count(focusTotal)}`,
      background: '#753A88',
      color: '#FAF9FB',
    },
  ];

  return { focus, from, to, comparable: true, cards, ratio, share, focusTotal, fromTotal, toTotal };
}

export function monthIndex(months: { month: string }[], requested: string | null): number {
  if (months.length === 0) return 0;
  if (!requested) return months.length - 1;
  const index = months.findIndex((month) => month.month.toLowerCase() === requested.toLowerCase());
  return index < 0 ? months.length - 1 : index;
}
