import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import Task from "./Task";
import { createSelector } from "reselect";

function Column({ colIndex, color }) {
  const dispatch = useDispatch();
  const selectBoards = (state) => state.boards;
  const selectFirstBoard = createSelector(
    [selectBoards],
    (boards) => boards[0] // Memoize and return the first board
  );
  const board = useSelector(selectFirstBoard);
  const col = board?.columns?.find((col, i) => i === colIndex);

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(
        boardsSlice.actions.setTaskStatus({
          taskIndex,
          colIndex: prevColIndex,
          newColIndex: colIndex,
          status: board?.columns[colIndex].name,
        })
      );
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]"
    >
      <div className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${color}`} />
        {col.name} ({col.tasks.length})
      </div>

      {col.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
