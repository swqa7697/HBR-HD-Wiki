import { Card } from 'flowbite-react';
import { FC } from 'react';
import { MdAdd } from 'react-icons/md';

interface AddCalcProps {
  onAdd: () => void;
}

export const AddCalc: FC<AddCalcProps> = ({ onAdd }) => {
  return (
    <Card
      className="max-w-lg min-w-96 bg-gradient-to-tl from-zinc-800/35 from-25% to-rose-100/20 border-0 opacity-55 hover:shadow-lg hover:opacity-65"
      onClick={onAdd}
    >
      <MdAdd size={56} className="self-center" />
    </Card>
  );
};
