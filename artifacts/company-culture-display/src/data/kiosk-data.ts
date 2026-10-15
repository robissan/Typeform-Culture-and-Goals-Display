export type ScreenId = 'people' | 'revenue' | 'users' | 'barception';

export const screens: { id: ScreenId; label: string }[] = [
  { id: 'people', label: 'People & culture' },
  { id: 'revenue', label: 'Revenue (MRR)' },
  { id: 'users', label: 'Active users (MAU)' },
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

export const profiles = [
  { kind: 'Birthday', name: 'Mara Chen', line: 'Design systems, Barcelona', note: 'Today', color: '#D258FE' },
  { kind: 'Work anniversary', name: 'Leo Martins', line: 'Customer education, Lisbon', note: '3 years this week', color: '#C6FB50' },
  { kind: 'A value', name: 'Win together', line: 'A value Typeform has named publicly. Here: thanks to everyone who made the launch feel easy.', note: '', color: '#BDDDF9' },
  { kind: 'Quirky detail', name: 'Ines Okafor', line: 'Keeps a spreadsheet ranking every desk plant by mood.', note: 'Product ops, Dublin', color: '#C6B8FE' },
];
