import { FC, useEffect, useState } from 'react';
import { Card, Label, Select, TextInput } from 'flowbite-react';
import { MdClose } from 'react-icons/md';
import {
  calcDR,
  CalcFieldsDR,
  CalcResult,
  createDefaultDRFields,
} from '../util/calc-utils';

interface CalcDRProps {
  id?: string;
  initValues?: CalcFieldsDR;
  onChange?: (changedInputs: CalcFieldsDR, id: string) => void;
  onRemove?: () => void;
}

export const CalcDR: FC<CalcDRProps> = ({
  id,
  initValues,
  onChange,
  onRemove,
}) => {
  const [inputs, setInputs] = useState<CalcFieldsDR>(
    () => initValues ?? createDefaultDRFields(),
  );

  const [output, setOutput] = useState<CalcResult>({
    resValue: 0,
    resPercentage: 0,
  });

  if (!id) {
    id = Date.now().toString();
  }

  useEffect(() => {
    setOutput(calcDR(inputs));

    if (onChange) {
      onChange(inputs, id);
    }
  }, [inputs, onChange, id]);

  const handleInt = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const intValue = Math.floor(Number(value));

    setInputs((prev) => ({
      ...prev,
      [name]: intValue < 0 ? 0 : intValue,
    }));
  };

  const handleFloat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const floatValue = Number(value);

    setInputs((prev) => ({
      ...prev,
      [name]: floatValue < 0 ? 0 : floatValue,
    }));
  };

  return (
    <Card className="relative max-w-lg bg-gradient-to-tl from-amber-700/25 from-20% to-yellow-800/15 border-0">
      {onRemove && (
        <div
          className="absolute top-[10px] right-[10px] md:opacity-0 md:hover:opacity-100"
          onClick={onRemove}
        >
          <MdClose size={22} />
        </div>
      )}
      <div className="flex flex-row w-full justify-between md:gap-4 gap-3">
        <div className="flex flex-col gap-1 w-[88%]">
          <div className="flex flex-row justify-start gap-2">
            <div>
              <Label htmlFor={`skillDr-${id}`}>破坏倍率(DR)</Label>
              <TextInput
                id={`skillDr-${id}`}
                name="skillDr"
                type="number"
                sizing="md"
                placeholder="0"
                value={inputs.skillDr > 0 ? inputs.skillDr : ''}
                onChange={handleFloat}
                className="min-w-12 max-w-24"
              />
            </div>
            <div>
              <Label htmlFor={`hit-${id}`}>原始Hit</Label>
              <TextInput
                id={`hit-${id}`}
                name="hit"
                type="number"
                sizing="md"
                placeholder="0"
                value={inputs.hit > 0 ? inputs.hit : ''}
                onChange={handleInt}
                className="min-w-12 max-w-24"
              />
            </div>
            <div>
              <Label htmlFor={`earrings-${id}`}>耳环系数</Label>
              <Select
                id={`earrings-${id}`}
                name="earrings"
                value={inputs.earrings}
                onChange={handleInt}
                className="w-[88px]"
              >
                {[0, 10, 12, 15].map((n) => (
                  <option key={n} value={n}>
                    {n}%
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor={`necklace-${id}`}>项链系数</Label>
              <Select
                id={`necklace-${id}`}
                name="necklace"
                value={inputs.necklace}
                onChange={handleInt}
                className="min-w-max max-w-24"
              >
                {[0, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}%
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex flex-row justify-start gap-2">
            <div>
              <Label htmlFor={`hitCountUp_sm-${id}`}>连击数(小)</Label>
              <TextInput
                id={`hitCountUp_sm-${id}`}
                name="hitCountUp_sm"
                type="number"
                sizing="md"
                placeholder="0"
                value={inputs.hitCountUp_sm > 0 ? inputs.hitCountUp_sm : ''}
                onChange={handleInt}
                className="min-w-12 max-w-24"
              />
            </div>
            <div>
              <Label htmlFor={`hitCountUp_lg-${id}`}>连击数(大)</Label>
              <TextInput
                id={`hitCountUp_lg-${id}`}
                name="hitCountUp_lg"
                type="number"
                sizing="md"
                placeholder="0"
                value={inputs.hitCountUp_lg > 0 ? inputs.hitCountUp_lg : ''}
                onChange={handleInt}
                className="min-w-12 max-w-24"
              />
            </div>
            <div>
              <Label htmlFor={`drBoost-${id}`}>破坏率上升</Label>
              <Select
                id={`drBoost-${id}`}
                name="drBoost"
                value={inputs.drBoost}
                onChange={handleInt}
                className="w-[88px]"
              >
                {[0, 30, 50, 80, 100, 130].map((n) => (
                  <option key={n} value={n}>
                    {n}%
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor={`targetDr-${id}`}>目标DR</Label>
              <Select
                id={`targetDr-${id}`}
                name="targetDr"
                value={inputs.targetDr}
                onChange={handleInt}
                className="min-w-max max-w-24"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}%
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 min-w-fit">
          <div className="flex flex-col items-center gap-1 min-w-16">
            <Label className="font-[500] text-lg">实际DR</Label>
            <Label className="font-[600] text-base">{output.resValue}</Label>
          </div>
          <div className="flex flex-col items-center gap-1 min-w-16">
            <Label className="font-[600] text-base">
              {output.resPercentage}%
            </Label>
            <Label className="font-[500] text-base">实际破坏率</Label>
          </div>
        </div>
      </div>
    </Card>
  );
};
