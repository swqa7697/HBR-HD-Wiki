import { useCallback, useEffect, useState } from 'react';
import { CalcOD } from '../components/CalcOD';
import { tool_od_title, base_title } from '../util/titles.json';
import { AddCalc } from '../components/AddCalc';
import { CalcFieldsOD, createDefaultODFields } from '../util/calc-utils';

const OD_CALC_STORAGE_KEY = 'ODCalcs';
const OD_SHOW_PERCENTAGE_STORAGE_KEY = 'ODShowPercentage';

interface ODCalcItem {
  id: string;
  calcInputs: CalcFieldsOD;
}

function ODTool() {
  useEffect(() => {
    document.title = `${tool_od_title} | ${base_title}`;
  }, []);

  const [calcs, setCalcs] = useState<ODCalcItem[]>(() => {
    const raw = localStorage.getItem(OD_CALC_STORAGE_KEY);
    const initCalcs: ODCalcItem[] =
      raw && raw.startsWith('[') ? JSON.parse(raw) : [];

    if (initCalcs.length === 0) {
      initCalcs.push({
        id: Date.now().toString(),
        calcInputs: createDefaultODFields(),
      });
    }

    return initCalcs;
  });

  const [isShowPercentage, setIsShowPercentage] = useState<boolean>(() => {
    const raw = localStorage.getItem(OD_SHOW_PERCENTAGE_STORAGE_KEY);
    return raw ? raw === 'true' : false;
  });

  useEffect(() => {
    if (calcs) {
      localStorage.setItem(OD_CALC_STORAGE_KEY, JSON.stringify(calcs));
    }
  }, [calcs]);

  useEffect(() => {
    if (isShowPercentage !== undefined) {
      localStorage.setItem(
        OD_SHOW_PERCENTAGE_STORAGE_KEY,
        JSON.stringify(isShowPercentage),
      );
    }
  }, [isShowPercentage]);

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
    <div className="flex flex-col w-full h-[97%] items-center justify-around overflow-hidden">
      {/* Header */}
      <h1 className="block text-3xl [text-shadow:1px_1px_3px_gray] pt-5 pb-5">
        OD计算器
      </h1>

      {/* Contents Div */}
      {/* 计算器 */}
      <div className="flex flex-col w-full h-full items-center overflow-y-auto scrollbar-hide">
        <ul>
          {calcs.map((calc) => (
            <li className="mb-2">
              <CalcOD
                key={calc.id}
                id={calc.id}
                initValues={calc.calcInputs}
                onChange={handleUpdate}
                onRemove={() => handleRemove(calc.id)}
                isShowPercentage={isShowPercentage}
                setIsShowPercentage={setIsShowPercentage}
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

export default ODTool;
