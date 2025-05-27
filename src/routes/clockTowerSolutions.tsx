import { useEffect } from 'react';
import { CardImg_H } from '../components/CardImg_H';
import { clock_tower_title, base_title } from '../util/titles.json';

function ClockTowerSolutions() {
  useEffect(() => {
    document.title = `${clock_tower_title} | ${base_title}`;
  }, []);

  return (
    <div className="flex flex-1 md:flex-wrap w-full p-4 items-center justify-center flex-col md:flex-row gap-4">
      <CardImg_H imgSrc="/assets/stickers/2/499421859@2x.avif">
        <div className="flex flex-col items-center text-center gap-2 text-2xl">
          <p className="text-4xl">Hell钟楼解法</p>
          <p className="text-4xl text-amber-100 mb-3">
            <a
              href="https://docs.qq.com/sheet/DWEJKQ2JRUlZVU2hn"
              target="_blank"
              rel="noopener noreferrer"
            >
              →→ 文档版 ←←
            </a>
          </p>
          <p className="text-xl">
            页面开发中...
            <br />
            Coming Soon...
          </p>
        </div>
      </CardImg_H>
    </div>
  );
}

export default ClockTowerSolutions;
