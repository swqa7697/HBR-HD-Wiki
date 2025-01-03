import { Outlet } from 'react-router';
import { TopNav } from '../components/TopNav';
import Bg from '../../public/assets/Bg.avif';

function Root() {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden items-center bg-gradient-to-r from-pink-100 via-neutral-50 to-pink-100">
      {/* Header */}
      <div className="relative min-w-[880px] max-w-[2200px] min-h-[105px] max-h-[120px] h-1/6 overflow-hidden z-10">
        <img
          src="assets/Banner.webp"
          alt="Banner"
          className="w-full h-full object-cover pointer-events-none select-none"
          draggable="false"
        />
        <div className="absolute inset-0 z-50 bg-transparent" />
      </div>

      {/* 立绘 */}
      <div className="absolute h-screen w-screen overflow-hidden z-0">
        <img
          src="assets/Hiiragi.webp"
          className="absolute top-[28%] left-[6.25%] h-full min-h-[650px] max-h-[1000px] -translate-x-1/2"
          draggable="false"
        />
        <img
          src="assets/Kiryu.webp"
          className="absolute top-[26%] right-[5.5%] h-full min-h-[650px] max-h-[1000px] translate-x-1/2"
          draggable="false"
        />
      </div>

      {/* Main contents */}
      <div
        className="flex flex-col items-center w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Bg})` }}
      >
        <div className="w-full z-20">
          <TopNav />
        </div>
        <div className="flex-1 w-full md:w-3/4 bg-slate-100 pb-40 overflow-y-auto scrollbar-hide z-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Root;
