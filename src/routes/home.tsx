import { useEffect } from 'react';
import { Link } from 'react-router';
import { Tooltip } from 'flowbite-react';
import { CardImg_H } from '../components/CardImg_H';
import { base_title, home_title } from '../util/titles.json';

const externalSites = [
  {
    title: 'Seraph 数据库 (Quest)',
    url: 'https://hbr.quest',
  },
  {
    title: 'HBR Tools (伤害计算器)',
    url: 'https://www.hbr-tool.com',
  },
  {
    title: '战型(卡面)统计表',
    url: 'https://leprechaun-chtholly-nota-seniorious.github.io/HeavenBurnsRedStyleChart.html',
  },
  {
    title: '美观轴图制作工具',
    url: 'https://hbr-axletool.pages.dev',
  },
];

function Home() {
  useEffect(() => {
    document.title = `${home_title} | ${base_title}`;
  }, []);

  return (
    <div className="flex flex-1 md:flex-wrap w-full p-4 items-center flex-col md:flex-row gap-4">
      {/* 资讯卡片 */}
      <CardImg_H imgSrc="/assets/stickers/1/499421694@2x.avif">
        <p className="text-3xl pb-1">高难Wiki网页版上线啦~</p>
        <p className="text-2xl">
          收藏地址 →{' '}
          <a
            href="https://wiki.hbr-hd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-200"
          >
            wiki.hbr-hd.com
          </a>
        </p>
        <p className="text-2xl text-sky-300 mt-2">
          站内OD、DR计算器均已上线
          <br />
          欢迎使用！
        </p>
        <p className="text-xl mt-2">新鲜预览版，更多页面开发中...</p>
      </CardImg_H>

      {/* 站内实用工具 */}
      <CardImg_H imgSrc="/assets/stickers/2/499421853@2x.avif">
        <div className="flex flex-col items-center text-2xl gap-1">
          <p className="font-bold mb-2">站内工具</p>
          <p className="text-amber-50">
            <Link to="/od-tool" target="_blank" rel="noopener noreferrer">
              OD计算器
            </Link>
          </p>
          <p className="text-amber-50">
            <Link to="/dr-tool" target="_blank" rel="noopener noreferrer">
              破坏率计算器
            </Link>
          </p>
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

      {/* Tools使用指南 */}
      <CardImg_H imgSrc="/assets/stickers/3/499421720@2x.avif">
        <div className="flex flex-col items-center text-2xl gap-1">
          <p className="font-bold">HBR Tools 使用指南</p>
          <p>@Tommyovo</p>
          <p className="text-amber-50">
            <a
              href="/assets/attachments/HBR_Tools_Manual.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              HBR Tools Manual.pdf
            </a>
          </p>
        </div>
      </CardImg_H>
    </div>
  );
}

export default Home;
