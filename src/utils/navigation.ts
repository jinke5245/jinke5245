import { withBase, withoutBase } from './url';

const SAFE_NAVIGATION_SCHEMES = new Set(['http:', 'https:', 'mailto:', 'tel:']);

const normalizeNavigationPath = (path: string) =>
  path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path;

const isProtocolRelativeHref = (href: string) =>
  href.trimStart().startsWith('//');

const getNavigationHrefScheme = (href: string) =>
  href
    .trimStart()
    .match(/^([a-z][a-z\d+.-]*:)/i)?.[1]
    .toLowerCase();

export const isUnsafeNavigationHref = (href: string) => {
  const scheme = getNavigationHrefScheme(href);

  return (
    isProtocolRelativeHref(href) ||
    (scheme !== undefined && !SAFE_NAVIGATION_SCHEMES.has(scheme))
  );
};

export const isSpecialNavigationHref = (href: string) =>
  href.startsWith('#') ||
  isProtocolRelativeHref(href) ||
  getNavigationHrefScheme(href) !== undefined;

export const getActiveNavigationState = (
  pathname: string,
  href: string,
  base = import.meta.env.BASE_URL,
) => {
  if (isSpecialNavigationHref(href)) {
    return false;
  }

  const normalizedPath = normalizeNavigationPath(withoutBase(pathname, base));
  const normalizedHref = normalizeNavigationPath(href);

  if (normalizedHref === '') {
    return false;
  }

  if (normalizedHref === '/') {
    return normalizedPath === '/';
  }

  return (
    normalizedPath === normalizedHref ||
    normalizedPath.startsWith(`${normalizedHref}/`)
  );
};

export const resolveNavigationHref = (
  href: string,
  base = import.meta.env.BASE_URL,
) => {
  if (isUnsafeNavigationHref(href)) {
    throw new Error('Navigation hrefs must use a safe URL scheme.');
  }

  return isSpecialNavigationHref(href) ? href : withBase(href, base);
};
