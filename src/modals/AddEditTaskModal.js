import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

function AddEditTaskModal({
  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [isValid, setIsValid] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  let points = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "5" },
    { value: "8" },
    { value: "13" },
  ];
  const columns = board?.columns;

  const col = columns?.find((col, index) => index === prevColIndex);
  const task = col
    ? col?.tasks?.find((task, index) => index === taskIndex)
    : [];
  const [status, setStatus] = useState();

  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [personel, setPersonel] = useState();

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex - 1);
  };

  const onChangePersonel = (e) => {
    setPersonel(e);
  };
  const [storypoint, setStorypoint] = useState();
  const onChangeStorypoint = (e) => {
    setStorypoint(e.target.value);
  };

  const validate = () => {
    if (
      title?.trim() &&
      personel?.title?.trim() &&
      endDate &&
      startDate &&
      status &&
      description?.length > 0
    ) {
      setIsValid(true);
      onSubmit(type);
      setIsAddTaskModalOpen(false);
      type === "edit" && setIsTaskModalOpen(false);
    } else {
      setIsValid(false);
      return false;
    }
  };
  useEffect(() => {
    if (type === "edit" && isFirstLoad) {
      setTitle(task?.title);
      setDescription(task?.description);
      setPersonel(columns[prevColIndex].tasks[taskIndex].personel);
      setStorypoint(task?.storypoint);
      setStartDate(moment(task?.startDate).toDate());
      setEndDate(moment(task?.endDate).toDate());
      setStatus(columns[prevColIndex].name);
      setIsFirstLoad(false);
    }
  }, []);

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          personel: personel,
          storypoint: storypoint,
          status: status,
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          personel,
          storypoint,
          status,
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
          taskIndex: taskIndex,
          prevColIndex: prevColIndex,
          newColIndex: newColIndex,
        })
      );
    }
  };

  return (
    <div
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute left-0 flex right-0 bottom-[-100vh] top-0 dropdown"
          : "py-6 px-6 pb-40 absolute left-0 flex right-0 bottom-0 top-0 dropdown"
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      {/* Modal Section */}

      <div
        className="scrollbar-hide max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-5 py-5 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        {/* Task Name */}

        <div className="mt-5 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className="bg-transparent px-3 py-1 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#8E1616] outline-1  ring-0"
            placeholder="Enter a task name"
          />
        </div>

        {/* Date Range */}

        <div className="mt-5 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Date Range
          </label>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            placeholderText="Select date..."
            className="bg-transparent px-3 py-1 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#8E1616] outline-1 ring-0"
          />
        </div>

        {/* Description */}
        <div className="mt-5 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className="bg-transparent outline-none min-h-[100px] focus:border-0 px-3 py-1 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#8E1616] outline-[1px] "
            placeholder="Enter a task description"
          />
        </div>

        {/* Personel */}
        <div className="mt-5 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Personel
          </label>

          <select
            value={personel?.id}
            onChange={(e) => {
              const objectWithId = board.personel.find(
                (obj) => obj.id === Number(e.target.value)
              );
              onChangePersonel(objectWithId);
            }}
            className="select-status flex-grow px-3 py-1 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#8E1616] outline-none"
            placeholder="Choose a Personel"
          >
            <option value="">Choose a Personel</option>
            {board.personel.map((column, index) => (
              <option key={index} value={column.id}>
                {column.title}
              </option>
            ))}
          </select>
        </div>

        {/* StoryPoint */}
        <div className="mt-5 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            StoryPoint
          </label>
          <select
            value={storypoint}
            onChange={onChangeStorypoint}
            className=" select-status flex-grow px-3 py-1 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#8E1616] outline-none"
          >
            <option value="">Choose a Storypoint</option>
            {points.map((point, index) => (
              <option key={index} value={point.value}>
                {point.value}
              </option>
            ))}
          </select>
        </div>

        {/* Current Status  */}
        <div className="mt-5 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={status}
            onChange={onChangeStatus}
            className=" select-status flex-grow px-3 py-1 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#8E1616] outline-none"
          >
            <option value="">Choose a Status</option>
            {columns.map((column, index) => (
              <option key={index} value={column.name}>
                {column.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              validate();
            }}
            className={`w-full items-center text-white py-2 rounded-full ${
              !title?.trim() ||
              !personel?.title?.trim() ||
              !endDate ||
              !startDate ||
              !status ||
              !description?.length > 0
                ? "bg-gray-300"
                : "bg-[#8E1616]"
            }`}
            disabled={
              !title?.trim() ||
              !personel?.title?.trim() ||
              !endDate ||
              !startDate ||
              !status ||
              !description?.length > 0
            }
          >
            {type === "edit" ? " Save" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
