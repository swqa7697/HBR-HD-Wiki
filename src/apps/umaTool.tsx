import { useCallback, useEffect, useState } from 'react';
import { AddCalc } from '../components/AddCalc';
import { UmaSkill } from '../components/UmaSkill_input';
import { Card, Label, TextInput } from 'flowbite-react';

interface Skill {
  id: string;
  cost: number;
  isRare: boolean;
}

const skillStyle = {
  selected:
    'max-w-lg border-0 bg-gradient-to-tl from-amber-600/30 from-20% to-yellow-800/15',
  unselected:
    'max-w-lg border-0 bg-gradient-to-tl from-zinc-800/20 from-25% to-stone-50',
};

function UmaTool() {
  useEffect(() => {
    document.title = '赛马娘竞技场技能计算器';
  }, []);

  const [totalSP, setTotalSP] = useState<number>(0);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());

  useEffect(() => {
    setSelectedSkills(selectSkills(totalSP, skills));
  }, [totalSP, skills]);

  const handleSP = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const spValue = Math.floor(Number(value));
    setTotalSP(spValue < 0 ? 0 : spValue);
  };

  const handleUpdate = useCallback(
    (id: string, newCost: number, newIsRare: boolean) => {
      setSkills((prev) =>
        prev.map((skill) =>
          skill.id === id
            ? { id: id, cost: newCost, isRare: newIsRare }
            : skill,
        ),
      );
    },
    [],
  );

  const handleAdd = useCallback(() => {
    setSkills((prev) => [
      ...prev,
      { id: Date.now().toString(), cost: 0, isRare: false },
    ]);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  }, []);

  return (
    <div className="flex flex-col w-full h-[97%] items-center justify-around overflow-hidden">
      {/* Header */}
      <h1 className="block text-3xl text-center [text-shadow:1px_1px_3px_gray] pt-5 pb-5">
        欢迎来到里世界
        <br />
        赛马娘 技能计算器 (竞技场)
      </h1>

      {/* Contents Div */}
      {/* Total SP */}
      <div className="flex items-center gap-3 mb-3">
        <Label htmlFor="totalSP" className="text-xl">
          剩余SP
        </Label>
        <TextInput
          id="totalSP"
          type="number"
          sizing="md"
          placeholder="0"
          value={totalSP > 0 ? totalSP : ''}
          onChange={handleSP}
          className="min-w-24 max-w-32"
        />
      </div>
      {/* Skills */}
      <div className="flex flex-col w-full h-full items-center overflow-y-auto scrollbar-hide">
        <ul>
          <li className="mb-2"></li>
          {skills.map((skill) => (
            <li key={skill.id} className="mb-2">
              <Card
                className={
                  selectedSkills.has(skill.id)
                    ? skillStyle.selected
                    : skillStyle.unselected
                }
              >
                <UmaSkill
                  id={skill.id}
                  onChange={handleUpdate}
                  onRemove={() => handleRemove(skill.id)}
                />
              </Card>
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

export default UmaTool;

const selectSkills = (totalSP: number, skills: Skill[]): Set<string> => {
  const selected: Set<string> = new Set();

  const totalCost = skills.reduce((sum, { cost }) => sum + cost, 0);
  if (totalCost <= totalSP) {
    skills.forEach((skill) => selected.add(skill.id));
    return selected;
  }

  const n = skills.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(totalSP + 1).fill(0),
  );

  for (let i = 1; i <= n; i++) {
    const { cost, isRare } = skills[i - 1];
    const score = getSkillScore(isRare);

    for (let j = 0; j <= totalSP; j++) {
      if (j < cost) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - cost] + score);
      }
    }
  }

  const selectedArr: string[] = [];
  let j = totalSP;
  for (let i = n; i > 0; i--) {
    if (dp[i][j] !== dp[i - 1][j]) {
      selectedArr.push(skills[i - 1].id);
      j -= skills[i - 1].cost;
    }
  }

  selectedArr.forEach((id) => selected.add(id));
  return selected;
};

const getSkillScore = (isRare: boolean): number => {
  return isRare ? 1200 : 500;
};
