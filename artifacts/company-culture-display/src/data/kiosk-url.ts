export const screens = [
  { id: 'people', label: 'People' },
  { id: 'culture', label: 'Culture' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'users', label: 'Users' },
  { id: 'barception', label: 'Barception' },
] as const;

export type ScreenId = (typeof screens)[number]['id'];
export type BarView = 'pour' | 'insights';

export type ChapterQuery = {
  screen: ScreenId;
  /** The requested screen name when it is not one of the five chapters. */
  unknownScreen: string | null;
  month: string | null;
  view: BarView;
};

export function readChapterQuery(search: string): ChapterQuery {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const raw = params.get('screen');
  const known = screens.find((screen) => screen.id === raw);
  const month = params.get('month');
  const view: BarView = params.get('view') === 'pour' ? 'pour' : 'insights';
  return {
    screen: known ? known.id : 'people',
    unknownScreen: raw && !known ? raw : null,
    month,
    view,
  };
}

/** Month and view belong to Barception only. Other chapters drop them. */
export function chapterSearch(screen: ScreenId, bar?: { month: string; view: BarView }): string {
  const params = new URLSearchParams();
  params.set('screen', screen);
  if (screen === 'barception' && bar) {
    params.set('month', bar.month.toLowerCase());
    params.set('view', bar.view);
  }
  return `?${params.toString()}`;
}
