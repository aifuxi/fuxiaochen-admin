import slugify from 'slugify';

export function formatSlug(s?: string): string {
  if (!s) {
    return '';
  }

  return slugify(s, {
    lower: true,
  });
}
