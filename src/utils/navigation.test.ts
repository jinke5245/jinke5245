import { describe, expect, it } from 'vitest';
import { getActiveNavigationState, resolveNavigationHref } from './navigation';

describe('getActiveNavigationState', () => {
  it('matches the root route only at the site root', () => {
    expect(getActiveNavigationState('/', '/', '/')).toBe(true);
    expect(getActiveNavigationState('/blog', '/', '/')).toBe(false);
    expect(getActiveNavigationState('/blog/post', '/', '/')).toBe(false);
  });

  it('matches top-level navigation for nested routes', () => {
    expect(getActiveNavigationState('/blog', '/blog', '/')).toBe(true);
    expect(getActiveNavigationState('/blog/post', '/blog', '/')).toBe(true);
    expect(getActiveNavigationState('/about', '/blog', '/')).toBe(false);
    expect(getActiveNavigationState('/blogroll', '/blog', '/')).toBe(false);
  });

  it('matches nested navigation by full path segments', () => {
    expect(getActiveNavigationState('/blog/tags', '/blog/tags', '/')).toBe(
      true,
    );
    expect(
      getActiveNavigationState('/blog/tags/astro', '/blog/tags', '/'),
    ).toBe(true);
    expect(getActiveNavigationState('/blog/post', '/blog/tags', '/')).toBe(
      false,
    );
  });

  it('matches routes when deployed under a base path', () => {
    expect(getActiveNavigationState('/jinke5245/', '/', '/jinke5245')).toBe(
      true,
    );
    expect(
      getActiveNavigationState('/jinke5245/blog/post', '/blog', '/jinke5245'),
    ).toBe(true);
    expect(
      getActiveNavigationState('/jinke5245/about', '/blog', '/jinke5245'),
    ).toBe(false);
  });

  it('never marks special hrefs active', () => {
    expect(getActiveNavigationState('/blog', '#content', '/')).toBe(false);
    expect(
      getActiveNavigationState('/blog', 'mailto:hi@example.com', '/'),
    ).toBe(false);
  });
});

describe('resolveNavigationHref', () => {
  it('adds the configured base to route hrefs', () => {
    expect(resolveNavigationHref('/blog', '/jinke5245')).toBe(
      '/jinke5245/blog',
    );
  });

  it('passes through anchor and absolute hrefs', () => {
    expect(resolveNavigationHref('#content', '/jinke5245')).toBe('#content');
    expect(resolveNavigationHref('https://jinke.dev', '/jinke5245')).toBe(
      'https://jinke.dev',
    );
    expect(resolveNavigationHref('mailto:hi@example.com', '/jinke5245')).toBe(
      'mailto:hi@example.com',
    );
  });

  it('rejects unsafe href schemes', () => {
    expect(() => resolveNavigationHref('javascript:alert(1)', '/')).toThrow(
      'Navigation hrefs must use a safe URL scheme.',
    );
    expect(() =>
      resolveNavigationHref('data:text/html,<h1>x</h1>', '/'),
    ).toThrow('Navigation hrefs must use a safe URL scheme.');
    expect(() => resolveNavigationHref('vbscript:msgbox(1)', '/')).toThrow(
      'Navigation hrefs must use a safe URL scheme.',
    );
    expect(() => resolveNavigationHref('//evil.example.com', '/')).toThrow(
      'Navigation hrefs must use a safe URL scheme.',
    );
  });
});
