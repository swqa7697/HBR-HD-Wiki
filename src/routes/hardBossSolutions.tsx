import { useEffect } from 'react';
import { CardImg_H } from '../components/CardImg_H';
import { hard_title, base_title } from '../util/titles.json';

function HardBossSolutions() {
  useEffect(() => {
    document.title = `${hard_title} | ${base_title}`;
  }, []);

  return (
    <div className="flex flex-1 md:flex-wrap w-full p-5 items-center justify-start flex-col md:flex-row gap-5">
      <CardImg_H imgSrc="/assets/stickers/3/499421720@2x.avif">
        <div className="flex flex-col items-center gap-2 text-2xl">
          <p className="text-amber-50 mb-3">
            <a
              href="https://docs.qq.com/sheet/DYnZSTmxFaGhRZ0hq"
              target="_blank"
              rel="noopener noreferrer"
            >
              异时层 (文档版)
            </a>
          </p>
          <p>页面开发中...</p>
          <p>Coming Soon...</p>
        </div>
      </CardImg_H>
    </div>
  );
}

export default HardBossSolutions;
