import { useEffect } from 'react';
import { hard_title, base_title } from '../util/titles.json';

function HardBossSolutions() {
  useEffect(() => {
    document.title = `${hard_title} | ${base_title}`;
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-center text-black">Hard Solutions</h1>
    </div>
  );
}

export default HardBossSolutions;
