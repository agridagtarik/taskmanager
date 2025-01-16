import React, { useState } from "react";
import boardsSlice from "./redux/boardsSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Content from "./components/Content";
import EmptyBoard from "./components/EmptyBoard";

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  return (
    <div className="overflow-hidden">
      <>
        {boards?.length > 0 ? (
          <>
            {/* Header Section */}
            <Header
              setIsBoardModalOpen={setIsBoardModalOpen}
              isBoardModalOpen={isBoardModalOpen}
            />
            {/* Content Section */}
            <Content />
          </>
        ) : (
          <>
            <EmptyBoard />
          </>
        )}
      </>
    </div>
  );
}

export default App;
