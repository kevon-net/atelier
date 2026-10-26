export const staticRedirects = {
  '/about/contact': '/contact',
};

export const dynamicRedirects = [
  {
    // Matches "/stories/blog/any-title-123" and preserves the dynamic part
    pattern: /^\/stories\/blog\/([^/]+)$/,
    replacement: '/blog/$1',
  },
];
