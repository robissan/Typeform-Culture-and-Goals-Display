export type ScreenId = 'people' | 'culture' | 'revenue' | 'users' | 'barception';

export const screens: { id: ScreenId; label: string }[] = [
  { id: 'people', label: 'People' },
  { id: 'culture', label: 'Culture' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'users', label: 'Users' },
  { id: 'barception', label: 'Barception' },
];

export const mrr = { current: 4.28, target: 5.2 };
export const mau = { current: 1.84, target: 2.3 };
export const pct = (c: number, t: number) => Number(((c / t) * 100).toFixed(1));
export const trim = (n: number) => Number(n.toFixed(2));

export const beverages = {
  scaleMax: 1500,
  months: [
    { month: 'April', coffee: 1180, beer: 240 },
    { month: 'May', coffee: 1286, beer: 214 },
  ],
};

export type Seg = string | { t: string; c: string };
export const C = {
  coral: '#D8524F', teal: '#2E9E8A', ochre: '#99731B', indigo: '#4B5BB8',
  purple: '#753A88', blue: '#4A7BC0', pink: '#D258FE', lime: '#C6FB50', lilac: '#C6B8FE',
};

export const profiles: { id: string; kind: string; name: string; segs: Seg[]; detail: string; music: string; hobby: string }[] = [
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
];

export const stories: { id: string; label: string; segs: Seg[]; stat: string }[] = [
  { id: 'family', label: 'A family', stat: 'Synthetic illustration: 180 people, 43 countries.',
    segs: ['We are a family of ', { t: '180', c: C.teal }, ' from ', { t: '43', c: C.ochre }, ' different countries. Some of us in ', { t: 'tech', c: C.purple }, ' are terrified of ', { t: 'roosters.', c: C.coral }, ' So take it easy on the ', { t: 'chicken dance.', c: C.blue }] },
  { id: 'tongues', label: 'Many tongues', stat: 'Synthetic illustration: 27 languages at lunch.',
    segs: ['At lunch we hear ', { t: '27', c: C.indigo }, ' languages, and at least ', { t: 'one', c: C.coral }, ' argument about ', { t: 'pineapple.', c: C.ochre }, ' Everyone is ', { t: 'welcome', c: C.teal }, ' at that table.'] },
  { id: 'win', label: 'Win together', stat: 'Win together is a value Typeform has named publicly. This sample line is fictional.',
    segs: [{ t: 'Win together', c: C.teal }, ' is a value Typeform has named publicly. Here it means ', { t: 'saying thanks', c: C.coral }, ' out loud, and handing the ', { t: 'last biscuit', c: C.ochre }, ' to whoever stayed late.'] },
  { id: 'paths', label: 'Paths here', stat: 'Synthetic illustration: 9 former careers.',
    segs: ['Before this we were ', { t: 'nurses,', c: C.coral }, ' ', { t: 'chefs,', c: C.ochre }, ' ', { t: 'cartographers', c: C.teal }, ' and one ', { t: 'professional juggler.', c: C.indigo }, ' Different roads, ', { t: 'same office.', c: C.purple }] },
];

export const mauWords = {
  M: ['Majestic', 'Mysterious', 'Mildly', 'Marvelous', 'Moody', 'Most'],
  A: ['Alligator', 'Aleatory', 'Accordion', 'Aubergine', 'Anxious', 'Avocado'],
  U: ['Unibrows', 'Uses', 'Umbrellas', 'Unicycles', 'Uncles', 'Underdogs'],
};
