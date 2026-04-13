import React from "react";

export default function SidebarSwitcher({ items, selectedId, onSelect, theme, darkMode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 bg-orange-400 rounded-xl mb-3" />
      {items?.map((item, index) => {
        const Icon = item.icon;
        const isActive = selectedId === item.id;

        return (
          <div
            key={item.id || index}
            onClick={() => onSelect(item.id)}
            className={`relative group w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-200 rounded-md border
              ${
                isActive
                  ? darkMode
                    ? "border-gray-700 bg-gray-900"
                    : "border-gray-300 bg-white"
                  : "border-transparent"
              }
              ${
                !isActive &&
                (darkMode
                  ? "hover:border-gray-700 hover:bg-black"
                  : "hover:border-gray-300 hover:bg-white")
              }`}
          >
            <Icon
              className={`w-4 mb-0.5 h-4 transition ${theme.textThird}`}
              strokeWidth={2.01}
            />
            <span
              className={`absolute left-10 whitespace-nowrap px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none
                ${darkMode ? "bg-gray-800 text-white" : "bg-black text-white"}`}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
