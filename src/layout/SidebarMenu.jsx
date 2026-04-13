import React from "react";

export default function SidebarMenu({
  title,
  items,
  activePage,
  mini,
  theme,
  darkMode,
  onSelect,
}) {
  return (
    <div className="p-4">
      {!mini && (
        <h2 className={`text-sm mb-4 ${theme.textSecondary}`}>{title || ""}</h2>
      )}
      <ul className={`space-y-2 text-sm ${theme.textPrimary}`}>
        {items?.map((item, index) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <li
              key={index}
              onClick={() => onSelect(item)}
              className={`group flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer
                transition-all duration-300 ease-in-out
                hover:scale-[1.02] active:scale-[0.98]
                ${
                  isActive
                    ? darkMode
                      ? "border-gray-700 text-blue-500 "
                      : "border-gray-300 text-blue-600 "
                    : `border-transparent ${theme.secondSide}`
                }
              `}
            >
              <Icon
                className={`w-4 mb-0.5 h-4 ${
                  isActive ? " text-blue-600 " : theme.textSecondary
                } group-hover:text-blue-600`}
              />
              {!mini && (
                <span
                  className={`${
                    isActive ? " text-blue-600 " : theme.textThird
                  } group-hover:text-blue-600`}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
