import { describe, expect, it } from 'vitest';
import { withBase, withoutBase } from './url';

describe('withBase', () => {
  it('normalizes root base paths', () => {
    expect(withBase('', '/')).toBe('/');
    expect(withBase('/blog', '/')).toBe('/blog');
    expect(withBase('blog', '/')).toBe('/blog');
  });

  it('normalizes configured base paths', () => {
    expect(withBase('', '/jinke5245')).toBe('/jinke5245/');
    expect(withBase('/blog', '/jinke5245')).toBe('/jinke5245/blog');
    expect(withBase('blog', 'jinke5245')).toBe('/jinke5245/blog');
  });
});

describe('withoutBase', () => {
  it('leaves paths unchanged when the base is root', () => {
    expect(withoutBase('/', '/')).toBe('/');
    expect(withoutBase('/blog', '/')).toBe('/blog');
  });

  it('strips only exact configured base prefixes', () => {
    expect(withoutBase('/jinke5245', '/jinke5245')).toBe('/');
    expect(withoutBase('/jinke5245/', '/jinke5245')).toBe('/');
    expect(withoutBase('/jinke5245/foo', '/jinke5245')).toBe('/foo');
    expect(withoutBase('/jinke5245extra', '/jinke5245')).toBe(
      '/jinke5245extra',
    );
  });

  it('accepts configured base values without a leading slash', () => {
    expect(withoutBase('/jinke5245/foo', 'jinke5245')).toBe('/foo');
    expect(withoutBase('/jinke5245/foo', 'jinke5245/')).toBe('/foo');
  });
});
