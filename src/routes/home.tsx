import { useEffect } from 'react';
import { base_title, home_title } from '../util/titles.json';
import { CardImg_H } from '../components/CardImg_H';

function Home() {
  useEffect(() => {
    document.title = `${home_title} | ${base_title}`;
  }, []);

  return (
    <div className="flex flex-1 md:flex-wrap w-full p-5 items-center justify-start flex-col md:flex-row gap-5">
      <CardImg_H imgSrc="/assets/stickers/1/499421694_key@2x.png">
        <div className="text-white [text-shadow:1.5px_1.5px_2px_black]">
          <p className="text-3xl">高难Wiki网页版上线啦!</p>
          <p className="text-2xl">
            地址:{' '}
            <a
              href="https://wiki.hbr-hd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-100 underline"
            >
              wiki.hbr-hd.com
            </a>
          </p>
          <p className="mt-2 text-xl">新鲜预览版，更多页面开发中...</p>
        </div>
      </CardImg_H>
    </div>
  );
}

export default Home;
