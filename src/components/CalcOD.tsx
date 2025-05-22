import React, { FC, useEffect, useState } from 'react';
import { Card, Checkbox, Label, Select, TextInput } from 'flowbite-react';
import { MdClose } from 'react-icons/md';
import {
  CalcFieldsOD,
  calcOD,
  CalcResult,
  createDefaultODFields,
} from '../util/calc-utils';
import { odPresets } from '../util/od-presets';

interface CalcODProps {
  id?: string;
  initPresetIdx?: number;
  initValues?: CalcFieldsOD;
  onChange?: (
    changedInputs: CalcFieldsOD,
    id: string,
    presetIdx: number,
  ) => void;
  onRemove?: () => void;
  isShowPercentage?: boolean;
  setIsShowPercentage?: (toggleShowPercentage: boolean) => void;
}

export const CalcOD: FC<CalcODProps> = ({
  id,
  initPresetIdx,
  initValues,
  onChange,
  onRemove,
  isShowPercentage,
  setIsShowPercentage,
}) => {
  const [inputs, setInputs] = useState<CalcFieldsOD>(
    () => initValues ?? createDefaultODFields(),
  );

  const [output, setOutput] = useState<CalcResult>({
    resValue: 0,
    resPercentage: 0,
  });

  const [presetIdx, setPresetIdx] = useState<number>(() => initPresetIdx ?? 0);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (!id) {
    id = Date.now().toString();
  }

  useEffect(() => {
    setOutput(calcOD(inputs));

    if (isEditing) {
      setPresetIdx(0);
      setIsEditing(false);
    }

    if (onChange) {
      onChange(inputs, id, presetIdx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, presetIdx]);

  const handleInt = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const intValue = Math.floor(Number(value));

    setIsEditing(true);

    setInputs((prev) => ({
      ...prev,
      [name]: intValue < 0 ? 0 : intValue,
    }));
  };

  const handleFloat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const floatValue = Number(value);

    setIsEditing(true);

    setInputs((prev) => ({
      ...prev,
      [name]: floatValue < 0 ? 0 : floatValue,
    }));
  };

  const handleBoolean = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setIsEditing(true);

    setInputs((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleODRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const intValue = Math.floor(Number(value));

    setIsEditing(true);

    setInputs((prev) => ({
      ...prev,
      [name]: intValue > 0 && intValue !== 100 ? intValue : 100,
    }));
  };

  const handlePreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = Number(e.target.value);

    setPresetIdx(idx);

    if (idx > 0) {
      setInputs(odPresets[idx].presetInputs);
    }
  };

  return (
    <Card className="relative max-w-lg bg-gradient-to-tl from-rose-800/35 from-20% to-pink-800/20 border-0">
      {onRemove && (
        <div
          className="absolute top-[10px] right-[10px] md:opacity-0 md:hover:opacity-100"
          onClick={onRemove}
        >
          <MdClose size={22} />
        </div>
      )}
      <Select
        id={`preset-${id}`}
        value={presetIdx}
        onChange={handlePreset}
        className="absolute top-[14px] left-6"
      >
        {odPresets.map((n, idx) => (
          <option key={idx} value={idx}>
            {n.presetName}
          </option>
        ))}
      </Select>
      <div className="flex flex-row w-full justify-between gap-3">
        <div className="flex flex-col gap-1 w-[88%] mt-9">
          <div className="flex flex-row justify-start gap-2">
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
              <Label htmlFor={`hitCountUp-${id}`}>连击数</Label>
              <TextInput
                id={`hitCountUp-${id}`}
                name="hitCountUp"
                type="number"
                sizing="md"
                placeholder="0"
                value={inputs.hitCountUp > 0 ? inputs.hitCountUp : ''}
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
              <Label htmlFor={`numTarget-${id}`}>目标数</Label>
              <Select
                id={`numTarget-${id}`}
                name="numTarget"
                value={inputs.numTarget}
                onChange={handleInt}
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
          <div className="flex flex-row justify-start gap-2">
            <div>
              <Label htmlFor={`fixedOD-${id}`}>固定OD</Label>
              <TextInput
                id={`fixedOD-${id}`}
                name="fixedOD"
                type="number"
                sizing="md"
                placeholder="0"
                rightIcon={() => <p>%</p>}
                value={inputs.fixedOD > 0 ? inputs.fixedOD : ''}
                onChange={handleFloat}
                className="min-w-12 max-w-24"
              />
            </div>
            <div>
              <Label htmlFor={`otherBuff-${id}`}>其他增益</Label>
              <TextInput
                id={`otherBuff-${id}`}
                name="otherBuff"
                type="number"
                sizing="md"
                placeholder="0"
                rightIcon={() => <p>%</p>}
                value={inputs.otherBuff > 0 ? inputs.otherBuff : ''}
                onChange={handleInt}
                className="min-w-12 max-w-24"
              />
            </div>
            <div>
              <Label htmlFor={`odRate-${id}`}>敌方OD率</Label>
              <TextInput
                id={`odRate-${id}`}
                name="odRate"
                type="number"
                sizing="md"
                placeholder="100"
                rightIcon={() => <p>%</p>}
                value={
                  inputs.odRate > 0 && inputs.odRate !== 100
                    ? inputs.odRate
                    : ''
                }
                onChange={handleODRate}
                className="min-w-12 max-w-24"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between w-20">
          <div
            className="flex flex-col items-center text-center w-full max-w-[70px] mt-5"
            onClick={() => {
              if (setIsShowPercentage && isShowPercentage !== undefined) {
                setIsShowPercentage(!isShowPercentage);
              }
            }}
          >
            <Label className="font-[500] text-lg">
              {!isShowPercentage ? '实际Hit' : '实际%'}
            </Label>
            <Label className="font-[600] text-base w-full mt-[22px] pb-3">
              {!isShowPercentage ? output.resValue : `${output.resPercentage}%`}
            </Label>
          </div>
          <div className="flex flex-col justify-end gap-[2px] min-w-max">
            <div className="flex items-center gap-[3px]">
              <Checkbox
                id={`isResisted-${id}`}
                name="isResisted"
                checked={inputs.isResisted}
                onChange={handleBoolean}
              />
              <Label htmlFor={`isResisted-${id}`}>抗性</Label>
            </div>
            <div className="flex items-center gap-[3px]">
              <Checkbox
                id={`isBaboo-${id}`}
                name="isBaboo"
                checked={inputs.isBaboo}
                onChange={handleBoolean}
              />
              <Label htmlFor={`isBaboo-${id}`}>幼儿化</Label>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
