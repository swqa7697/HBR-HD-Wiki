import { useCallback, useEffect, useState } from 'react';

import { CalcOD } from '../components/CalcOD';
import { tool_od_title, base_title } from '../util/titles.json';
import { AddCalc } from '../components/AddCalc';
import { CalcFieldsOD, createDefaultODFields } from '../util/calc-utils';

const STORAGE_KEY = 'ODCalcs';

interface ODCalcItem {
  id: string;
  calcInputs: CalcFieldsOD;
}

function ODTool() {
  useEffect(() => {
    document.title = `${tool_od_title} | ${base_title}`;
  }, []);

  const [calcs, setCalcs] = useState<ODCalcItem[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const initCalcs: ODCalcItem[] =
      raw && raw.startsWith('[') ? JSON.parse(raw) : [];

    if (initCalcs.length === 0) {
      initCalcs.push({
        id: Date.now().toString(),
        calcInputs: createDefaultODFields(),
      });
    }
    console.log(initCalcs);

    return initCalcs;
  });

  useEffect(() => {
    if (calcs) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(calcs));
    }
  }, [calcs]);

  const handleUpdate = useCallback((newInputs: CalcFieldsOD, id: string) => {
    setCalcs((prev) =>
      prev.map((calc) =>
        calc.id === id ? { ...calc, calcInputs: newInputs } : calc,
      ),
    );
  }, []);

  const handleAdd = useCallback(() => {
    setCalcs((prev) => [
      ...prev,
      { id: Date.now().toString(), calcInputs: createDefaultODFields() },
    ]);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setCalcs((prev) => prev.filter((calc) => calc.id !== id));
  }, []);

  return (
    <div className="flex flex-col w-full h-[97%] pb-[156px] md:pb-[68px] items-center justify-around overflow-hidden">
      {/* Header */}
      <h1 className="block text-3xl [text-shadow:1px_1px_3px_gray] pt-5 pb-3">
        OD计算器
      </h1>

      {/* Contents Div */}
      {/* 计算器 */}
      <div className="flex flex-col w-full h-full items-center pl-5 pr-5">
        <ul className="h-full overflow-y-auto scrollbar-hide">
          {calcs.map((calc) => (
            <li className="mb-2">
              <CalcOD
                key={calc.id}
                id={calc.id}
                initValues={calc.calcInputs}
                onChange={handleUpdate}
                onRemove={() => handleRemove(calc.id)}
              />
            </li>
          ))}
          <li>
            <AddCalc onAdd={handleAdd} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ODTool;
