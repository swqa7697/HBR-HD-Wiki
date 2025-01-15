import { Plugin } from 'vite';
import { createWriteStream, existsSync, readFileSync, writeFileSync } from 'fs';
import { SitemapStream } from 'sitemap';
import { sitemapRoutes } from './site-routes';

export default function customSitemap(): Plugin {
  const hostname = 'https://wiki.hbr-hd.com';
  const outputPath = './dist';
  const sitemapPath = 'sitemap.xml';
  const robots = `User-agent: *\nAllow: /\nSitemap: ${hostname}/${sitemapPath}`;

  const lastmod = new Date().toISOString();

  const outputSitemap = () => {
    const sitemap = new SitemapStream({ hostname });
    const writeStream = createWriteStream(`${outputPath}/${sitemapPath}`);

    sitemap.pipe(writeStream);

    sitemap.write({
      url: '/',
      lastmod,
      changefreq: 'monthly',
      priority: 1.0,
    });

    sitemapRoutes.forEach((route) => {
      sitemap.write({
        url: route.path,
        lastmod,
        changefreq: 'monthly',
        priority: 0.8,
      });
    });

    sitemap.end();

    writeStream.on('finish', () =>
      cleanSitemapOutput(`${outputPath}/${sitemapPath}`),
    );
  };

  const cleanSitemapOutput = (path: string) => {
    if (existsSync(path)) {
      let sitemap = readFileSync(path, 'utf-8');
      sitemap = sitemap.replace(
        /<lastmod>(\d{4}-\d{2}-\d{2})T[\d:.]+Z<\/lastmod>/g,
        '<lastmod>$1</lastmod>',
      );
      writeFileSync(path, sitemap, 'utf-8');
    }
  };

  const outputRobots = () => {
    writeFileSync(`${outputPath}/robots.txt`, robots);
  };

  return {
    name: 'my-custom-sitemap',
    apply: 'build',
    closeBundle() {
      outputSitemap();
      outputRobots();
    },
  };
}
