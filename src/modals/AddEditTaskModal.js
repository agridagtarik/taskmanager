import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

let points = [
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "5" },
  { value: "8" },
  { value: "13" },
];

function AddEditTaskModal({
  type,
  device,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  const columns = board?.columns;

  const col = columns?.find((col, index) => index === prevColIndex);
  const task = col
    ? col?.tasks?.find((task, index) => index === taskIndex)
    : [];

  const initialState = {
    title: task?.title || "",
    description: task?.description || "",
    startDate: task?.startDate || null,
    endDate: task?.endDate || null,
    status: task?.status || null,
    personel: task?.personel || null,
    storypoint: task?.storypoint || null,
    newColIndex: prevColIndex,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_VALUES":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };

  const [values, setValues] = useReducer(reducer, initialState);

  const onDateChange = (dates) => {
    const [start, end] = dates;
    const startDate = start || values.startDate;
    const endDate = end || values.endDate;
    setValues({
      type: "SET_VALUES",
      payload: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  };

  const onSubmit = () => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          ...values,
          startDate: moment(values.startDate).format("YYYY-MM-DD"),
          endDate: moment(values.endDate).format("YYYY-MM-DD"),
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          ...values,
          startDate: moment(values.startDate).format("YYYY-MM-DD"),
          endDate: moment(values.endDate).format("YYYY-MM-DD"),
          taskIndex: taskIndex,
          prevColIndex: prevColIndex,
          newColIndex: values.newColIndex,
        })
      );
    }
    setIsAddTaskModalOpen(false);
  };

  const disabled = !Object.entries(values).every(
    ([key, val]) => val !== null && val !== undefined && val !== ""
  );
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
            value={values.title}
            onChange={(e) =>
              setValues({
                type: "SET_VALUES",
                payload: { title: e.target.value },
              })
            }
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
            selected={values.startDate}
            onChange={onDateChange}
            startDate={values.startDate}
            endDate={values.endDate}
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
            value={values.description}
            onChange={(e) =>
              setValues({
                type: "SET_VALUES",
                payload: { description: e.target.value },
              })
            }
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
            value={values.personel?.id}
            onChange={(e) => {
              const selectedPersonel = board.personel.find(
                (obj) => obj.id === Number(e.target.value)
              );
              setValues({
                type: "SET_VALUES",
                payload: { personel: selectedPersonel },
              });
            }}
            className="select-status flex-grow px-3 py-1 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#8E1616] outline-none dark:bg-[#2b2c37]"
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
          <label className="text-sm dark:text-white text-gray-500">
            StoryPoint
          </label>
          <select
            value={values.storypoint}
            onChange={(e) =>
              setValues({
                type: "SET_VALUES",
                payload: { storypoint: e.target.value },
              })
            }
            className="select-status flex-grow px-3 py-1 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#8E1616] outline-none dark:bg-[#2b2c37]"
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
            value={values.status}
            onChange={(e) => {
              setValues({
                type: "SET_VALUES",
                payload: {
                  status: e.target.value,
                  newColIndex: e.target.selectedIndex - 1,
                },
              });
            }}
            className=" select-status flex-grow px-3 py-1 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#8E1616] outline-none dark:bg-[#2b2c37]"
          >
            <option value="">Choose a Status</option>
            {columns.map((column, index) => (
              <option key={index} value={column.name}>
                {column.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => onSubmit()}
            className={`w-full items-center text-white py-2 rounded-full ${
              disabled ? "bg-gray-300" : "bg-[#8E1616]"
            }`}
            disabled={disabled}
          >
            {type === "edit" ? " Save" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;