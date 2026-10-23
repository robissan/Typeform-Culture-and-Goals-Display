import { describe, expect, it } from 'vitest';
import { chapterSearch, readChapterQuery } from './kiosk-url';

describe('screen, month, and view query', () => {
  it('reads a known chapter and defaults Barception to the insights poster', () => {
    expect(readChapterQuery('?screen=revenue')).toMatchObject({
      screen: 'revenue',
      unknownScreen: null,
      view: 'insights',
    });
    expect(readChapterQuery('?screen=barception&month=april').view).toBe('insights');
    expect(readChapterQuery('?screen=barception&view=pour').view).toBe('pour');
    expect(readChapterQuery('').screen).toBe('people');
  });

  it('keeps an unknown screen name and opens People', () => {
    expect(readChapterQuery('?screen=lobby')).toMatchObject({
      screen: 'people',
      unknownScreen: 'lobby',
    });
  });

  it('writes month and view only on Barception', () => {
    expect(chapterSearch('people')).toBe('?screen=people');
    expect(chapterSearch('people', { month: 'April', view: 'insights' })).toBe('?screen=people');
    expect(chapterSearch('culture', { month: 'May', view: 'pour' })).toBe('?screen=culture');
    expect(chapterSearch('barception', { month: 'April', view: 'insights' })).toBe('?screen=barception&month=april&view=insights');
    expect(chapterSearch('barception', { month: 'May', view: 'pour' })).toBe('?screen=barception&month=may&view=pour');
  });
});
