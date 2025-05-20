import { Outlet } from 'react-router';
import { TopNav } from '../components/TopNav';

function Root() {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden items-center bg-[url('/assets/root/Bg.avif')] bg-cover bg-center">
      {/* Header */}
      <div className="relative min-w-[880px] max-w-[2200px] min-h-[105px] max-h-[120px] h-1/6 overflow-hidden">
        <img
          src="/assets/root/Banner.webp"
          alt="Banner"
          className="relative w-full h-full object-cover pointer-events-none select-none z-20"
          draggable="false"
        />
        <div className="absolute inset-0 bg-transparent z-50" />
      </div>
      <div className="flex absolute w-full h-1/6 min-h-[105px] max-h-[120px] items-center z-0 bg-gradient-to-r from-pink-100 via-neutral-50 to-pink-100">
        <div className="w-full h-[55%] bg-[url('/assets/stickers/2/499421867@2x.avif')] bg-contain" />
      </div>

      {/* 立绘 */}
      <div className="absolute h-screen w-screen overflow-hidden pointer-events-none select-none">
        <img
          src="/assets/root/Hiiragi.webp"
          className="absolute top-[28%] left-[6.25%] h-full min-h-[650px] max-h-[1000px] -translate-x-1/2 z-0"
          draggable="false"
        />
        <img
          src="/assets/root/Kiryu.webp"
          className="absolute top-[26%] right-[5.5%] h-full min-h-[650px] max-h-[1000px] translate-x-1/2 z-0"
          draggable="false"
        />
        <div className="absolute inset-0 bg-transparent z-10" />
      </div>

      {/* Main contents */}
      <div className="flex flex-col items-center w-full h-full">
        <div className="w-full z-30">
          <TopNav />
        </div>
        <div className="flex-1 w-full md:w-3/4 bg-slate-100/85 pb-28 overflow-y-auto scrollbar-hide z-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Root;
