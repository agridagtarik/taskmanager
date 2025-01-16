import React from "react";

function EmptyBoard() {
  return (
    <div className=" bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col  items-center justify-center">
      <h3 className=" text-gray-500 font-bold">
        This board is empty.There are no tasks available.Refresh and reload the
        page in order to restart with initial dummy datas.
      </h3>
    </div>
  );
}

export default EmptyBoard;
