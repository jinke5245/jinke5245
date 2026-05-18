import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { URL } from 'node:url';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { withBase } from '../utils/url';

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error('Site URL is required to generate RSS feed.');
  }

  const site = context.site;
  const posts = await getCollection('blog');

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: new URL(withBase(), site),
    items: posts.map((post) => {
      const { title, description, pubDate } = post.data;

      return {
        title,
        description,
        pubDate,
        link: new URL(withBase(`blog/${post.id}/`), site).toString(),
      };
    }),
  });
}
