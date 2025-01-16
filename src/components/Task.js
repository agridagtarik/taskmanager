import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";
import { createSelector } from "reselect";

function Task({ colIndex, taskIndex }) {
  const selectBoards = (state) => state.boards;
  const selectFirstBoard = createSelector(
    [selectBoards],
    (boards) => boards[0] // Memoize and return the first board
  );
  const boards = useSelector(selectFirstBoard);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [theTask, setTheTask] = useState();

  useEffect(() => {
    const columns = boards.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);

    setTheTask(task);
  }, [boards]);

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#8E1616] dark:text-white dark:hover:text-[#8E1616] cursor-pointer "
      >
        <p className=" font-bold tracking-wide ">{theTask?.title}</p>
        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
          <strong className="underline decoration-black-500">
            Personel assigned:{" "}
          </strong>
          {theTask?.personel?.title || "N/A"}
        </p>
        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
          <strong className="underline decoration-black-500">
            Date Range:
          </strong>{" "}
          from {theTask?.startDate} to {theTask?.endDate}
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
