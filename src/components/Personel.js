import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Personel({ index, taskIndex, colIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards[0];
  const col = board.columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [personelInfo, setPersonelInfo] = useState(null);
  useEffect(() => {
    setPersonelInfo(task.personel);
  }, [task]);

  return (
    <div className=" w-full flex rounded-md relative items-center justify-between dark:bg-[#20212c]  p-3 gap-4  bg-[#f4f7fd]">
      <div className="flex -space-x-2 overflow-hidden justify-center align-middle">
        <img
          className="inline-block size-8 rounded-full ring-3 ring-white me-5"
          src={personelInfo?.img}
          alt={personelInfo?.title}
          key={index}
          title={personelInfo?.title}
        />
        <p className="flex justify-center align-middle mt-1">
          {personelInfo?.title}
        </p>
      </div>
      <div>
        <span className="inline-flex items-center rounded-xl bg-red-50 px-2 py-1 text-xs font-bold text-red-800 ring-1 ring-inset ring-gray-500/10">
          {task?.storypoint}
        </span>
      </div>
    </div>
  );
}

export default Personel;
