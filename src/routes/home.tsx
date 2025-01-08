import { useEffect } from 'react';
import { Tooltip } from 'flowbite-react';
import { CardImg_H } from '../components/CardImg_H';
import { base_title, home_title } from '../util/titles.json';

const externalSites = [
  {
    title: 'SeraphDB (HBR Quest)',
    url: 'https://hbr.quest',
  },
  {
    title: 'HBR工具箱 (伤害计算器)',
    url: 'https://www.hbr-tool.com',
  },
  {
    title: '战型统计表',
    url: 'https://leprechaun-chtholly-nota-seniorious.github.io/HeavenBurnsRedStyleChart.html',
  },
];

function Home() {
  useEffect(() => {
    document.title = `${home_title} | ${base_title}`;
  }, []);

  return (
    <div className="flex flex-1 md:flex-wrap w-full p-5 items-center justify-start flex-col md:flex-row gap-5">
      {/* 资讯卡片 */}
      <CardImg_H imgSrc="/assets/stickers/1/499421694@2x.avif">
        <p className="text-3xl">高难Wiki网页版上线啦!</p>
        <p className="text-2xl">
          地址:{' '}
          <a
            href="https://wiki.hbr-hd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-100"
          >
            wiki.hbr-hd.com
          </a>
        </p>
        <p className="mt-2 text-xl">新鲜预览版，更多页面开发中...</p>
      </CardImg_H>

      {/* 站内实用工具 */}
      <CardImg_H imgSrc="/assets/stickers/2/499421853@2x.avif">
        <div className="flex flex-col items-center text-2xl gap-1">
          <p className="font-bold mb-2">站内实用工具</p>
          <Tooltip content="文档版（网页版开发中）">
            <p className="text-amber-50">
              <a
                href="https://docs.qq.com/sheet/DUVBOVkFBZHR4VVJn"
                target="_blank"
                rel="noopener noreferrer"
              >
                OD计算器
              </a>
            </p>
          </Tooltip>
          <Tooltip content="文档版（网页版开发中）">
            <p className="text-amber-50">
              <a
                href="https://docs.qq.com/sheet/DQXZyeGJic0plekFO"
                target="_blank"
                rel="noopener noreferrer"
              >
                破坏率计算器
              </a>
            </p>
          </Tooltip>
          <Tooltip content="文档版（网页版开发中）">
            <p className="text-amber-50">
              <a
                href="https://docs.qq.com/sheet/DZFhHTEFadHRGV3J1"
                target="_blank"
                rel="noopener noreferrer"
              >
                排轴工具
              </a>
            </p>
          </Tooltip>
        </div>
      </CardImg_H>

      {/* 外部链接 */}
      <CardImg_H imgSrc="/assets/stickers/2/499421865@2x.avif">
        <div className="flex flex-col items-center text-2xl gap-1">
          <p className="font-bold mb-2">外部链接</p>
          {externalSites.map((site, idx) => (
            <p key={idx} className="text-amber-50">
              <a href={site.url} target="_blank" rel="noopener noreferrer">
                {site.title}
              </a>
            </p>
          ))}
        </div>
      </CardImg_H>
    </div>
  );
}

export default Home;
