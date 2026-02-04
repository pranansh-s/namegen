const { SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');
const { join } = require('path');
const axios = require('axios');

require('dotenv').config();

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://namegen.io' });

  sitemap.write({ url: '/' });
  sitemap.write({ url: '/blog' });
  sitemap.write({ url: '/search' });
  sitemap.write({ url: '/privacy-policy' });
  sitemap.write({ url: '/terms-and-conditions' });

  const dynamicRoutes = await fetchDynamicRoutes();
  dynamicRoutes.forEach(route => {
    sitemap.write({ url: route.params.topic });
  });

  sitemap.end();

  const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
  const writeStream = createWriteStream(sitemapPath);
  sitemap.pipe(writeStream);
}

async function fetchDynamicRoutes() {
  const pageSize = 1000;
  let offset = null;
  let paths = [];

  // console.log(process.env.NEXT_PUBLIC_AIRTABLE_BASEID);
  do {
    const res = await axios.get(`https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASEID}/namegen`, {
      params: {
        offset: offset,
        maxRecords: pageSize,
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
      },
    });

    paths = paths.concat(
      res.data.records.map(x => ({
        params: {
          topic: x.fields.Niche.replace(/\s/g, '-').toLowerCase() + '-brand-name-generator',
        },
      }))
    );

    offset = res.data.offset;
  } while (offset);
  return paths;
}

generateSitemap();
