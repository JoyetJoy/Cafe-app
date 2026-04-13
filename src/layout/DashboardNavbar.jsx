import React from "react";
import {
  Crown,
  HandPlatter,
  ListTodo,
  Drumstick,
  FileClock,
  ConciergeBell,
  ChartColumnStacked,
  Sun,
  TextAlignJustify,
  SearchIcon,
  MoonIcon,
} from "lucide-react";

export default function DashboardNavbar({ darkMode, theme, onToggleTheme, onOpenMobile }) {
  return (
    <div
      className={`h-15 border-b px-5 py-2 flex items-center justify-between sticky top-0 z-30 ${theme.navbar}`}
    >
      <button onClick={onOpenMobile} className="lg:hidden rounded-lg">
        <TextAlignJustify className="w-5.5 h-5.5 cursor-pointer hover:text-blue-600" />
      </button>

      <div className={`hidden lg:flex gap-6 items-center text-sm ${theme.textSecondary}`}>
        <div className={`flex gap-7 border rounded-md px-4 py-3 text-[13.5px] ${theme.litebackground}`}>
          <span className={`group cursor-pointer flex gap-1 items-center ${theme.textThird}`}>
            <HandPlatter className="w-3.5 h-3.5 group-hover:text-blue-600 mb-1" />
            <span className="group-hover:text-blue-600">POS</span>
          </span>
          <span className={`group cursor-pointer flex gap-1 items-center ${theme.textThird}`}>
            <ListTodo className="w-3.5 h-3.5 group-hover:text-blue-600" />
            <span className="group-hover:text-blue-600">Orders</span>
          </span>
          <span className={`group cursor-pointer flex gap-1 items-center ${theme.textThird}`}>
            <Drumstick className="w-3.5 h-3.5 group-hover:text-blue-600" />
            <span className="group-hover:text-blue-600">Kitchen</span>
          </span>
          <span className={`group cursor-pointer flex gap-1 items-center ${theme.textThird}`}>
            <FileClock className="w-3.5 h-3.5 group-hover:text-blue-600 " />
            <span className="group-hover:text-blue-600">Reservation</span>
          </span>
          <span className={`group cursor-pointer flex gap-1 items-center ${theme.textThird}`}>
            <ConciergeBell className="w-3.5 h-3.5 group-hover:text-blue-600" />
            <span className="group-hover:text-blue-600">Table</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 ">
        <button className="group flex gap-1 items-center bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm">
          <Crown className={`w-4 mt-0.5 h-4 text-white`} />
          Upgrade
        </button>

        <div className="relative group flex justify-center">
          <button
            className={`p-2 border cursor-pointer rounded-lg ${theme.buttonBorder} ${
              darkMode ? "hover:bg-[#1b1d1d]" : "hover:bg-blue-50"
            } transition-all duration-200`}
          >
            <SearchIcon className="w-4 h-4"/>
          </button>
        </div>

        <div className="relative group flex justify-center">
          <button
            className={`p-2 border cursor-pointer rounded-lg ${theme.buttonBorder} ${
              darkMode ? "hover:bg-[#1b1d1d]" : "hover:bg-blue-50"
            } transition-all duration-200`}
          >
            <ChartColumnStacked className="w-4 h-4" />
          </button>
          <span
            className={`absolute top-12 whitespace-nowrap px-2 py-1 text-xs rounded-md 
              opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-200 pointer-events-none
              ${darkMode ? "bg-gray-800 text-white" : "bg-black text-white"}`}
          >
            Report
          </span>
        </div>

        <div className="relative group flex justify-center">
          <button
            onClick={onToggleTheme}
            className={`p-2 border cursor-pointer rounded-lg ${theme.buttonBorder} ${
              darkMode ? "hover:bg-[#1b1d1d]" : "hover:bg-blue-50"
            } transition-all duration-200`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
          <span
            className={`absolute top-12 right-1 whitespace-nowrap px-2 py-1 text-xs rounded-md 
              opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-200 pointer-events-none
              ${darkMode ? "bg-gray-800 text-white" : "bg-black text-white"}`}
          >
            Dark/Light Mode
          </span>
        </div>
      </div>
    </div>
  );
}
