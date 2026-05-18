export const withBase = (path = '', base = import.meta.env.BASE_URL) => {
  const basePath = base.startsWith('/') ? base : `/${base}`;
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
  return `${normalizedBase}${path.replace(/^\/+/, '')}`;
};

export const withoutBase = (
  pathname: string,
  base = import.meta.env.BASE_URL,
) => {
  const normalizedBase = base.startsWith('/') ? base : `/${base}`;
  const basePath = normalizedBase.endsWith('/')
    ? normalizedBase.slice(0, -1)
    : normalizedBase;

  if (!basePath) {
    return pathname;
  }

  // Keep base-root cases explicit: /base, /base/, and /base/path.
  if (pathname === basePath) {
    return '/';
  }

  return pathname.startsWith(`${basePath}/`)
    ? pathname.slice(basePath.length)
    : pathname;
};
