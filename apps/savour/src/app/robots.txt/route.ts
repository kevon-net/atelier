import { BASE_URL } from '@repo/constants';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const content = `
User-agent: *
Allow: /
Disallow: /api/
Disallow: /*?ref=*
Disallow: /*?utm_*

Sitemap: ${BASE_URL.SAVOUR}/sitemap.xml
  `.trim();

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
