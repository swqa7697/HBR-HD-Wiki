import { Checkbox, Label, TextInput } from 'flowbite-react';
import { FC, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

interface UmaSkillProps {
  id: string;
  onChange: (id: string, cost: number, isRare: boolean) => void;
  onRemove: () => void;
}

export const UmaSkill: FC<UmaSkillProps> = ({ id, onChange, onRemove }) => {
  const [cost, setCost] = useState<number>(0);
  const [isRare, setIsRare] = useState<boolean>(false);

  useEffect(() => {
    onChange(id, cost, isRare);
  }, [cost, isRare, id, onChange]);

  const handleCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const costValue = Math.floor(Number(value));
    setCost(costValue < 0 ? 0 : costValue);
  };

  const handleIsRare = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsRare(checked);
  };

  return (
    <div className="relative">
      <div
        className="absolute top-[-18px] right-[-18px] md:opacity-0 md:hover:opacity-100"
        onClick={onRemove}
      >
        <MdClose size={22} />
      </div>
      <div className="flex w-full gap-3 items-center justify-evenly">
        <div className="flex items-center gap-2">
          <Label htmlFor={`skillName-${id}`}>技能</Label>
          <TextInput
            id={`skillName-${id}`}
            sizing="md"
            placeholder="选填"
            className="min-w-24 max-w-32"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor={`cost-${id}`}>SP</Label>
          <TextInput
            id={`cost-${id}`}
            type="number"
            sizing="md"
            placeholder="0"
            value={cost > 0 ? cost : ''}
            onChange={handleCost}
            onWheel={(e) => e.currentTarget.blur()}
            className="min-w-24 max-w-32"
          />
        </div>
        <div className="flex items-center gap-1">
          <Checkbox
            id={`isRare-${id}`}
            checked={isRare}
            onChange={handleIsRare}
          />
          <Label htmlFor={`isRare-${id}`}>金技</Label>
        </div>
      </div>
    </div>
  );
};
