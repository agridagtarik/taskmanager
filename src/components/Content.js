import React from "react";
import { useSelector } from "react-redux";
import Column from "./Column";
import { createSelector } from "reselect";

function Content() {
  const colors = ["bg-yellow-500", "bg-red-500", "bg-blue-500", "bg-green-500"];
  const selectBoards = (state) => state.boards;
  const selectFirstBoard = createSelector(
    [selectBoards],
    (boards) => boards[0]
  );
  const board = useSelector(selectFirstBoard);
  const columns = board.columns;

  return (
    <div className="bg-[#f4f7fd] overflow-x-scroll h-screen flex flex-wrap justify-around dark:bg-[#20212c] pt-3">
      {columns.map((col, index) => (
        <Column key={index} colIndex={index} color={colors[index]} />
      ))}
    </div>
  );
}

export default Content;
