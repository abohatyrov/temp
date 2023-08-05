
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/cabinet/',
    },
    sitemap: 'https://syodo.com.ua/sitemap.xml',
  };
}