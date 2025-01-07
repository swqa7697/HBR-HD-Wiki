import { useEffect } from 'react';
import { base_title, home_title } from '../util/titles.json';
import { Card } from 'flowbite-react';

function Home() {
  useEffect(() => {
    document.title = `${home_title} | ${base_title}`;
  }, []);

  return (
    <div className="flex flex-1 md:flex-wrap w-full p-5 items-center justify-start md:flex-row flex-col gap-5">
      <Card
        className="max-w-sm bg-pink-800/75 border-4 border-black shadow-lg"
        renderImage={() => <img src="assets/logo.webp" className="h-10" />}
        horizontal
      >
        <h1 className="text-center text-black">HOME</h1>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          Google (test)
        </a>
      </Card>
      <Card
        className="bg-pink-800/75 border-4 border-black shadow-lg"
        renderImage={() => <img src="assets/logo.webp" className="h-10" />}
        horizontal
      >
        <h1 className="text-center text-black">HOME</h1>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          Google (test)
        </a>
      </Card>
      <Card
        className="bg-pink-800/75 border-4 border-black shadow-lg"
        renderImage={() => <img src="assets/logo.webp" className="h-10" />}
        horizontal
      >
        <h1 className="text-center text-black">HOME</h1>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          Google (test)
        </a>
      </Card>
    </div>
  );
}

export default Home;
