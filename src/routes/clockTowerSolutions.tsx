import { useEffect } from 'react';
import { clock_tower_title, base_title } from '../util/titles.json';

function ClockTowerSolutions() {
  useEffect(() => {
    document.title = `${clock_tower_title} | ${base_title}`;
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-center text-black">Clock Tower Solutions</h1>
    </div>
  );
}

export default ClockTowerSolutions;
