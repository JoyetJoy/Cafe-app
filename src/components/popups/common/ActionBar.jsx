import React, { useState, useRef, useEffect } from "react";
import { Upload, ChevronDown, RefreshCw, CirclePlus } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { getTheme } from "@/utils/constants";

const ActionBar = ({ menuTitle, onExport, onAdd }) => {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const ref = useRef();
  const { darkMode } = useThemeStore();
  const theme = getTheme(darkMode);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const exportOptions = ["PDF", "Excel", "CSV"];

  return (
    <div className="w-full flex justify-between items-center gap-3 pb-6">
      <div className="flex gap-2 justify-between">
        <h2 className="text-2xl font-bold">{menuTitle || ""}</h2>
        <div
          onClick={() => {
            setAnimate(false); // reset
            setTimeout(() => setAnimate(true), 10); // trigger again
          }}
          className={`flex size-8 cursor-pointer items-center justify-center rounded-full border
  ${theme.buttonBorder} ${
    darkMode ? "hover:bg-[#1b1d1d]" : "hover:bg-blue-50 bg-white"
  }
  `}
        >
          <RefreshCw
            className={`size-3.5 ${animate ? "animate-spin-once" : ""}`}
          />
        </div>
      </div>

      <div className="flex gap-3">
        {/* Export Dropdown */}
        <div className="relative" ref={ref}>
          {menuTitle !== "Permissions" && (
            <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md  text-sm transition ${theme.buttonBorder} ${
              darkMode ? "hover:bg-[#1b1d1d]" : "hover:bg-blue-50 bg-white"
            }`}
          >
            <Upload size={16} />
            Export
            <ChevronDown size={14} />
          </button>
          )}

          {open && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-md z-50">
              {exportOptions.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setOpen(false);
                    onExport?.(item);
                  }}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add New Button */}
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
        >
          <CirclePlus size={16} />
          Add New
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
