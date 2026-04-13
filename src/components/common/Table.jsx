import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Filter,
  Pencil,
  Trash2,
  Shield,
  ChevronDown,
} from "lucide-react";
import Pagination from "./Pagination";
import { getTheme } from "@/utils/constants";
import { useThemeStore } from "@/store/useThemeStore";

const Table = ({
  data = [],
  columns = [],
  onPageSizeChange,
  pageSize,
  onPageChange,
  totalPages,
}) => {
  // ✅ Prevent crash
  const { darkMode } = useThemeStore();
  const theme = getTheme(darkMode);
  const safeColumns = columns || [];
  const safeData = Array.isArray(data) ? data : [];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Newest");
  const ref = useRef();

  const options = ["Newest", "Oldest", "Ascending", "Descending"];

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <div
        className={`min-w-136 rounded-lg border p-4 ${
          darkMode ? "bg-black border-gray-800" : " bg-white border-gray-200"
        }`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          {/* Search */}
          <div
            className={`relative w-60 ${
              darkMode ? "hover:bg-[#1b1d1d]" : "hover:bg-blue-50 bg-white"
            }`}
          >
            <input
              type="text"
              placeholder="Search"
              className={`w-full pl-3 pr-7 py-2 border rounded-md text-sm focus:outline-none ${
                darkMode ? " border-gray-800 text-gray-400" : "border-gray-200"
              }`}
            />
            <Search
              className={`absolute right-3 top-2.5 w-4 h-4 text-black ${
                darkMode ? "  text-gray-300" : "border-gray-200"
              }`}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              className={`flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md text-sm ${theme.buttonBorder} ${
                darkMode
                  ? "hover:bg-[#1b1d1d] text-gray-300"
                  : "hover:bg-blue-50 bg-white"
              }`}
            >
              <Filter size={16} /> Filter
            </button>

            <div className="relative inline-block" ref={ref}>
              <button
                onClick={() => setOpen(!open)}
                className={`px-3 py-2 border flex items-center border-gray-200 rounded-md text-sm ${theme.buttonBorder} ${
                  darkMode
                    ? "hover:bg-[#1b1d1d] text-gray-300"
                    : "hover:bg-blue-50 bg-white"
                }`}
              >
                Sort by : {selected}{" "}
                <ChevronDown className="size-4 mt-0.5 ml-1" />
              </button>
              {/* Dropdown */}
              {open && (
                <div
                  className={`absolute right-0 mt-2 w-40 overflow-hidden border border-gray-200 rounded-md shadow-lg z-50 ${
                    darkMode ? " text-gray-300 bg-black" : " bg-white"
                  }`}
                >
                  {options.map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setSelected(item);
                        setOpen(false);
                      }}
                      className={`px-3 py-2 text-sm cursor-pointer ${
                        selected === item ? "text-blue-600 font-medium" : ""
                      } ${darkMode ? " hover:bg-gray-900" : " hover:bg-gray-100"}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div
          className={`w-full overflow-hidden border  rounded-sm ${theme.buttonBorder} ${
            darkMode
              ? " text-gray-300"
              : " bg-white"
          }`}
        >
          <table className="w-full lg:table-fixed">
            <thead>
              <tr className={`text-left text-sm  ${
                  darkMode ? " text-gray-300 bg-gray-900" : "bg-gray-100 "
                }`}>
                {safeColumns.map((col, index) => (
                  <th key={index} className="py-3 px-3 font-medium">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {safeData.length > 0 ? (
                safeData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`border-b w-full transition-all text-sm text-gray-700 ${theme.buttonBorder}`}
                  >
                    {safeColumns.map((col, colIndex) => (
                      <td key={colIndex} className="py-3 px-3">
                        {col.Cell
                          ? col.Cell({ row, index: rowIndex })
                          : typeof col.accessor === "function"
                            ? col.accessor(row)
                            : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : props.data && props.data.length === 0 ? (
                <tr>
                  <td colSpan={safeColumns.length}>
                    <div className="w-full flex justify-center items-center py-10">
                      No data found
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={safeColumns.length}>
                    <div className="w-full flex justify-center items-center py-10">
                      <img
                        src="/loading.gif"
                        className="w-16 h-16"
                        alt="loading"
                      />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          page={totalPages}
          totalPages={10}
          onPageChange={onPageChange}
          pageSize={pageSize}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
};

export default Table;
