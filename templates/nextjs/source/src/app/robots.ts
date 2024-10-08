import { getBaseUrl } from '@utils/Helper';
import type { MetadataRoute } from 'next';


export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
