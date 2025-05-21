import { useCallback, useEffect, useState } from 'react';
import { tool_dr_title, base_title } from '../util/titles.json';
import { CalcFieldsDR, createDefaultDRFields } from '../util/calc-utils';
import { CalcDR } from '../components/CalcDR';
import { AddCalc } from '../components/AddCalc';

const DR_CALC_STORAGE_KEY = 'DRCalcs';

interface DRCalcItem {
  id: string;
  calcInputs: CalcFieldsDR;
}

function DRTool() {
  useEffect(() => {
    document.title = `${tool_dr_title} | ${base_title}`;
  }, []);

  const [calcs, setCalcs] = useState<DRCalcItem[]>(() => {
    const raw = localStorage.getItem(DR_CALC_STORAGE_KEY);
    const initCalcs: DRCalcItem[] =
      raw && raw.startsWith('[') ? JSON.parse(raw) : [];

    if (initCalcs.length === 0) {
      initCalcs.push({
        id: Date.now().toString(),
        calcInputs: createDefaultDRFields(),
      });
    }

    return initCalcs;
  });

  useEffect(() => {
    if (calcs) {
      localStorage.setItem(DR_CALC_STORAGE_KEY, JSON.stringify(calcs));
    }
  }, [calcs]);

  const handleUpdate = useCallback((newInputs: CalcFieldsDR, id: string) => {
    setCalcs((prev) =>
      prev.map((calc) =>
        calc.id === id ? { ...calc, calcInputs: newInputs } : calc,
      ),
    );
  }, []);

  const handleAdd = useCallback(() => {
    setCalcs((prev) => [
      ...prev,
      { id: Date.now().toString(), calcInputs: createDefaultDRFields() },
    ]);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setCalcs((prev) => prev.filter((calc) => calc.id !== id));
  }, []);

  return (
    <div className="flex flex-col w-full h-[97%] items-center justify-around overflow-hidden">
      {/* Header */}
      <h1 className="block text-3xl [text-shadow:1px_1px_3px_gray] pt-5 pb-5">
        破坏率计算器
      </h1>

      {/* Contents Div */}
      {/* 计算器 */}
      <div className="flex flex-col w-full h-full items-center overflow-y-auto scrollbar-hide">
        <ul>
          {calcs.map((calc) => (
            <li className="mb-2">
              <CalcDR
                key={calc.id}
                id={calc.id}
                initValues={calc.calcInputs}
                onChange={handleUpdate}
                onRemove={() => handleRemove(calc.id)}
              />
            </li>
          ))}
          <li className="w-full">
            <AddCalc onAdd={handleAdd} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DRTool;
