import { useEffect } from 'react';
import { base_title, home_title } from '../util/titles.json';

function Home() {
  useEffect(() => {
    document.title = `${home_title} | ${base_title}`;
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-center text-black">HOME</h1>
      <a href="https://google.com" target="_blank" rel="noopener noreferrer">
        Google (test)
      </a>
    </div>
  );
}

export default Home;
