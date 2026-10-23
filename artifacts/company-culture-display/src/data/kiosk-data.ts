import { z } from 'zod';
import { beverageReport, monthIndex, revenueFigures } from './kiosk-metrics';

export {
  beverageReport,
  count,
  formatMillions,
  monthIndex,
  pct,
  revenueFigures,
  signedChange,
  trim,
} from './kiosk-metrics';
export type { BeverageReport, InsightCard, MonthCount, RevenueFigures, SignedChange } from './kiosk-metrics';
export { chapterSearch, readChapterQuery, screens } from './kiosk-url';
export type { BarView, ChapterQuery, ScreenId } from './kiosk-url';

/** Teal that clears 4.5:1 on the cream poster (#EFEBE1). */
export const tealOnCream = '#14685A';
/** Teal that clears 4.5:1 on the ink field (#2A222B). */
export const tealOnInk = '#2E9E8A';

export const C = {
  coral: '#D8524F',
  teal: tealOnCream,
  ochre: '#99731B',
  indigo: '#4B5BB8',
  purple: '#753A88',
  blue: '#4A7BC0',
  pink: '#D258FE',
  lime: '#C6FB50',
  lilac: '#C6B8FE',
};

const segSchema = z.union([
  z.string(),
  z.object({ t: z.string().min(1), c: z.string().min(1) }),
]);

const sampleSchema = z.object({
  mrr: z.object({
    current: z.number(),
    target: z.number(),
  }),
  mau: z.object({
    current: z.number(),
    target: z.number(),
  }),
  beverages: z.object({
    scaleMax: z.number().positive('Beverage scale must be above zero.'),
    months: z.array(z.object({
      month: z.string().min(1),
      coffee: z.number().nonnegative(),
      beer: z.number().nonnegative(),
    })).min(1, 'Beverage months are missing.'),
  }),
  profiles: z.array(z.object({
    id: z.string().min(1),
    kind: z.string().min(1),
    name: z.string().min(1),
    segs: z.array(segSchema).min(1),
    detail: z.string().min(1),
    music: z.string().min(1),
    hobby: z.string().min(1),
  })).min(1, 'People stories are missing.'),
  stories: z.array(z.object({
    id: z.string().min(1),
    label: z.string().min(1),
    segs: z.array(segSchema).min(1),
    stat: z.string().min(1),
  })).min(1, 'Culture stories are missing.'),
  mauWords: z.object({
    M: z.array(z.string().min(1)).min(1),
    A: z.array(z.string().min(1)).min(1),
    U: z.array(z.string().min(1)).min(1),
  }),
});

export type Seg = z.infer<typeof segSchema>;
export type Sample = z.infer<typeof sampleSchema>;
export type SampleResult = { ok: true; data: Sample } | { ok: false; reason: string };

export const rawSample = {
  mrr: { current: 4.28, target: 5.2 },
  mau: { current: 1.84, target: 2.3 },
  beverages: {
    scaleMax: 1500,
    months: [
      { month: 'April', coffee: 1180, beer: 240 },
      { month: 'May', coffee: 1286, beer: 214 },
    ],
  },
  profiles: [
    { id: 'mara', kind: 'Birthday', name: 'Mara Chen',
      segs: ['We want to wish ', { t: 'Mara Chen', c: C.coral }, ' a happy birthday! Give ', { t: 'her', c: C.teal }, ' your best air-synth solo of ', { t: 'Running Up That Hill', c: C.purple }, ', ', { t: 'extra dramatic.', c: C.indigo }],
      detail: 'Design systems, Barcelona. Fictional profile.', music: 'Favorite song: a synth-pop singalong', hobby: 'Hobby: sourdough with questionable shapes' },
    { id: 'leo', kind: 'Work anniversary', name: 'Leo Martins',
      segs: [{ t: 'Leo Martins', c: C.coral }, ' has been here ', { t: '3 years', c: C.ochre }, ' this week. Ask ', { t: 'him', c: C.teal }, ' about the ', { t: 'tiny ukulele', c: C.purple }, ' under the desk and the ', { t: 'perfect pastel de nata.', c: C.indigo }],
      detail: 'Customer education, Lisbon. Fictional profile.', music: 'Plays: ukulele, mostly sea shanties', hobby: 'Hobby: pastry research' },
    { id: 'ines', kind: 'Quirky detail', name: 'Ines Okafor',
      segs: [{ t: 'Ines Okafor', c: C.coral }, ' keeps a spreadsheet ranking every desk plant by ', { t: 'mood.', c: C.teal }, ' The ', { t: 'fern', c: C.ochre }, ' is currently ', { t: 'winning.', c: C.purple }],
      detail: 'Product ops, Dublin. Fictional profile.', music: 'Listens to: rainy-day jazz', hobby: 'Hobby: houseplant diplomacy' },
    { id: 'kenji', kind: 'Birthday', name: 'Kenji Aoki',
      segs: ['Happy birthday, ', { t: 'Kenji Aoki', c: C.coral }, '! Please give ', { t: 'him', c: C.teal }, ' a standing ovation for the ', { t: 'karaoke', c: C.ochre }, ' version of ', { t: 'Mr. Brightside.', c: C.indigo }],
      detail: 'Engineering, Tokyo. Fictional profile.', music: 'Favorite song: a stadium-rock karaoke staple', hobby: 'Hobby: night bike rides' },
  ],
  stories: [
    { id: 'family', label: 'A family', stat: 'Synthetic illustration: 180 people, 43 countries.',
      segs: ['We are a family of ', { t: '180', c: C.teal }, ' from ', { t: '43', c: C.ochre }, ' different countries. Some of us in ', { t: 'tech', c: C.purple }, ' are terrified of ', { t: 'roosters.', c: C.coral }, ' So take it easy on the ', { t: 'chicken dance.', c: C.blue }] },
    { id: 'tongues', label: 'Many tongues', stat: 'Synthetic illustration: 27 languages at lunch.',
      segs: ['At lunch we hear ', { t: '27', c: C.indigo }, ' languages, and at least ', { t: 'one', c: C.coral }, ' argument about ', { t: 'pineapple.', c: C.ochre }, ' Everyone is ', { t: 'welcome', c: C.teal }, ' at that table.'] },
    { id: 'win', label: 'Win together', stat: 'Win together is a value Typeform has named publicly. This sample line is fictional.',
      segs: [{ t: 'Win together', c: C.teal }, ' is a value Typeform has named publicly. Here it means ', { t: 'saying thanks', c: C.coral }, ' out loud, and handing the ', { t: 'last biscuit', c: C.ochre }, ' to whoever stayed late.'] },
    { id: 'paths', label: 'Paths here', stat: 'Synthetic illustration: 9 former careers.',
      segs: ['Before this we were ', { t: 'nurses,', c: C.coral }, ' ', { t: 'chefs,', c: C.ochre }, ' ', { t: 'cartographers', c: C.teal }, ' and one ', { t: 'professional juggler.', c: C.indigo }, ' Different roads, ', { t: 'same office.', c: C.purple }] },
  ],
  mauWords: {
    M: ['Majestic', 'Mysterious', 'Mildly', 'Marvelous', 'Moody', 'Most'],
    A: ['Alligator', 'Aleatory', 'Accordion', 'Aubergine', 'Anxious', 'Avocado'],
    U: ['Unibrows', 'Uses', 'Umbrellas', 'Unicycles', 'Uncles', 'Underdogs'],
  },
} as const;

export function parseSample(input: unknown): SampleResult {
  const parsed = sampleSchema.safeParse(input);
  if (!parsed.success) {
    const reason = parsed.error.issues.map((issue) => issue.message).join(' ');
    return { ok: false, reason: reason || 'Sample data is not valid.' };
  }
  return { ok: true, data: parsed.data };
}

export const sampleResult: SampleResult = parseSample(rawSample);

const data = sampleResult.ok ? sampleResult.data : null;

export const mrr = data?.mrr ?? { current: 0, target: 0 };
export const mau = data?.mau ?? { current: 0, target: 0 };
export const beverages = data?.beverages ?? { scaleMax: 1, months: [] };
export const profiles = data?.profiles ?? [];
export const stories = data?.stories ?? [];
export const mauWords = data?.mauWords ?? { M: [], A: [], U: [] };

export function segText(segs: Seg[]): string {
  return segs.map((seg) => (typeof seg === 'string' ? seg : seg.t)).join('');
}

export const revenue = revenueFigures(mrr);
export const initialMonthIndex = monthIndex(beverages.months, null);
export const initialBeverage = beverageReport(beverages.months, initialMonthIndex);
