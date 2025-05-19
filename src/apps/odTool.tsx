import { useEffect } from 'react';
import {
  //MdCheckBox,
  MdCheckBoxOutlineBlank,
  //MdIndeterminateCheckBox,
  MdEditNote,
  MdDelete,
} from 'react-icons/md';
import { tool_od_title, base_title } from '../util/titles.json';

function ODTool() {
  useEffect(() => {
    document.title = `${tool_od_title} | ${base_title}`;
  }, []);

  return (
    <div className="flex flex-col w-full h-[97%] pb-[108px] md:pb-[68px] items-center overflow-hidden">
      {/* Header */}
      <h1 className="block text-3xl [text-shadow:1px_1px_3px_gray] pt-5 pb-3">
        OD计算器
      </h1>

      {/* Contents Div */}
      <div className="flex w-full h-full flex-col md:flex-row-reverse items-center md:items-start md:justify-evenly">
        {/* 速查表 */}
        <div className="flex flex-col w-1/3 items-center mb-3 bg-slate-600/20">
          <p>速查表</p>
          <p>...</p>
          <p>...</p>
        </div>

        {/* 计算器 */}
        <div className="flex flex-col w-3/5 h-full">
          <div className="flex flex-row w-full h-8 justify-between">
            <div>
              <MdCheckBoxOutlineBlank size={24} />
            </div>
            <div className="flex flex-row-reverse">
              <MdEditNote size={24} />
              <MdDelete size={24} />
            </div>
          </div>
          <ul className="w-full h-full overflow-y-auto scrollbar-hide">
            {Array.from({ length: 50 }, (_, idx) => (
              <li key={idx}>Calc {idx}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ODTool;
