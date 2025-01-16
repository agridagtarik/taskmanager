import React, { useState } from "react";
import logo from "../assets/logo-mobile.svg";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import { Switch } from "@headlessui/react";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import { useSelector } from "react-redux";

function Header() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* Left Side  */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-6 w-6" />
          <div className="flex items-center">
            <h3 className="truncate md:text-2xl text-xl font-bold md:ml-10 font-sans">
              {board.name}
            </h3>
          </div>
          <div className="flex -space-x-2 overflow-hidden ms-6">
            {board?.personel?.map((pers, index) => (
              <img
                className="inline-block size-8 rounded-full ring-3 ring-white"
                src={pers?.img}
                alt="#"
                key={index}
                title={pers?.title}
              />
            ))}
          </div>
        </div>
        {/* Right Side */}
        <div className="flex space-x-4 items-center md:space-x-6">
          <button
            className="button hidden md:block"
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            + Add New Task
          </button>
          <button
            className="button py-1 px-3 md:hidden"
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            +
          </button>
          <div className="mx-2  p-4  space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
            <img src={lightIcon} alt="sun indicating light mode" />

            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-[#8E1616]" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>

            <img src={darkIcon} alt="moon indicating dark mode" />
          </div>
        </div>
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}
    </div>
  );
}

export default Header;
