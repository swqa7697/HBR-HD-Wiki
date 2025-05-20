import React, { useEffect, useState } from 'react';
import { Card, Checkbox, Label, Select, TextInput } from 'flowbite-react';
import {
  CalcFieldsOD,
  calcOD,
  createDefaultODFields,
} from '../util/calc-utils';

export const CalcOD = () => {
  const [inputs, setInputs] = useState<CalcFieldsOD>(() =>
    createDefaultODFields(),
  );

  const [output, setOutput] = useState<number>(0);

  useEffect(() => {
    setOutput(calcOD(inputs));
  }, [inputs]);

  const handleNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const intValue = Math.floor(Number(value));

    setInputs((prev) => ({
      ...prev,
      [name]: intValue < 0 ? 0 : intValue,
    }));
  };

  const handleBoolean = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleODRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const intValue = Math.floor(Number(value));

    setInputs((prev) => ({
      ...prev,
      [name]: intValue < 0 ? 100 : intValue,
    }));
  };

  return (
    <Card className="max-w-lg bg-gradient-to-tl from-rose-800/35 from-20% to-pink-800/20 border-0">
      <div className="flex flex-row w-full justify-between md:gap-4 gap-3">
        <div className="flex flex-col gap-1 w-[88%]">
          <div className="flex flex-row justify-between gap-2">
            <div>
              <Label htmlFor="hit">Hit数</Label>
              <TextInput
                id="hit"
                name="hit"
                type="number"
                sizing="md"
                placeholder="0"
                onChange={handleNumber}
                onBlur={(e) =>
                  (e.target.value = inputs.hit > 0 ? String(inputs.hit) : '')
                }
                className="min-w-12 max-w-24"
              />
            </div>
            <div>
              <Label htmlFor="hitCountUp">连击数</Label>
              <TextInput
                id="hitCountUp"
                name="hitCountUp"
                type="number"
                sizing="md"
                placeholder="0"
                onChange={handleNumber}
                onBlur={(e) =>
                  (e.target.value =
                    inputs.hitCountUp > 0 ? String(inputs.hitCountUp) : '')
                }
                className="min-w-12 max-w-24"
              />
            </div>
            <div>
              <Label htmlFor="earrings">耳环系数</Label>
              <Select
                id="earrings"
                name="earrings"
                value={inputs.earrings}
                onChange={handleNumber}
                className="min-w-max max-w-24"
              >
                {[0, 10, 12, 15].map((n) => (
                  <option key={n} value={n}>
                    {n}%
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="numTarget">目标数</Label>
              <Select
                id="numTarget"
                name="numTarget"
                value={inputs.numTarget}
                onChange={handleNumber}
                className="min-w-max max-w-24"
              >
                {[1, 2, 3].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex flex-row justify-between gap-2">
            <div>
              <Label htmlFor="fixedOD">固定OD</Label>
              <TextInput
                id="fixedOD"
                name="fixedOD"
                type="number"
                sizing="md"
                placeholder="0"
                rightIcon={() => <p>%</p>}
                onChange={handleNumber}
                onBlur={(e) =>
                  (e.target.value =
                    inputs.fixedOD > 0 ? String(inputs.fixedOD) : '')
                }
                className="min-w-12 max-w-24"
              />
            </div>
            <div>
              <Label htmlFor="otherBuff">其他增益</Label>
              <TextInput
                id="otherBuff"
                name="otherBuff"
                type="number"
                sizing="md"
                placeholder="0"
                rightIcon={() => <p>%</p>}
                onChange={handleNumber}
                onBlur={(e) =>
                  (e.target.value =
                    inputs.otherBuff > 0 ? String(inputs.otherBuff) : '')
                }
                className="min-w-12 max-w-24"
              />
            </div>
            <div>
              <Label htmlFor="odRate">敌方OD率</Label>
              <TextInput
                id="odRate"
                name="odRate"
                type="number"
                sizing="md"
                placeholder="100"
                rightIcon={() => <p>%</p>}
                onChange={handleODRate}
                onBlur={(e) =>
                  (e.target.value =
                    inputs.odRate < 0 || inputs.odRate === 100
                      ? ''
                      : String(inputs.odRate))
                }
                className="min-w-12 max-w-24"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between min-w-fit">
          <Label className="font-[500] text-lg mt-2">实际Hit</Label>
          <Label className="font-[600] text-base">{output}</Label>
          <div className="flex flex-col justify-end gap-[3px] min-w-max">
            <div className="flex items-center gap-[3px]">
              <Checkbox
                id="isResisted"
                name="isResisted"
                checked={inputs.isResisted}
                onChange={handleBoolean}
              ></Checkbox>
              <Label htmlFor="isResisted">抗性</Label>
            </div>
            <div className="flex items-center gap-[3px]">
              <Checkbox
                id="isBaboo"
                name="isBaboo"
                checked={inputs.isBaboo}
                onChange={handleBoolean}
              ></Checkbox>
              <Label htmlFor="isBaboo">幼儿化</Label>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
