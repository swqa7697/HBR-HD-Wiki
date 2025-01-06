import { useEffect } from 'react';
import { sa_title, base_title } from '../util/titles.json';

function ScoreRecords() {
  useEffect(() => {
    document.title = `${sa_title} | ${base_title}`;
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-center text-black">Score Attack Records</h1>
    </div>
  );
}

export default ScoreRecords;
