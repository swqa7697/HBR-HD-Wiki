import { useEffect } from 'react';

function NotFound() {
  useEffect(() => {
    document.title = 'No Page Found';
  }, []);

  return (
    <div className="h-screen w-screen bg-[url('./Bg.avif')] bg-center bg-cover">
      <div className="flex h-full w-full items-center justify-center bg-black bg-opacity-80">
        <h1 className="text-4xl text-gray-300 text-center">
          404: 没有找到页面
          <br />
          No Page Found
        </h1>
      </div>
      <div className="absolute inset-0 z-50" />
    </div>
  );
}

export default NotFound;
