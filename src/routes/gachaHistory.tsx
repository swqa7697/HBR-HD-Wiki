import { useEffect } from 'react';
import { gacha_title, base_title } from '../util/titles.json';

function GachaHistory() {
  useEffect(() => {
    document.title = `${gacha_title} | ${base_title}`;
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-center text-black">Gacha History</h1>
    </div>
  );
}

export default GachaHistory;
