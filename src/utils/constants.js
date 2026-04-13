export const getTheme = (darkMode) => ({
  layout: darkMode ? "bg-black text-white" : "bg-[#F5F6FA] text-gray-900",

  textPrimary: darkMode ? "text-white" : "text-gray-900",
  textSecondary: darkMode ? "text-gray-500" : "text-gray-500",
  textThird: darkMode ? "text-gray-300" : "text-black",
  secondSide: darkMode
    ? "hover:border-gray-700 hover:text-blue-500"
    : "hover:border-gray-300 hover:text-blue-600",
  iconborder: darkMode
    ? "border-gray-700 text-blue-500"
    : "border-gray-300 text-blue-600",
  litebackground: darkMode ? "text-white border-gray-800" : "bg-[#f5f6fa] border-gray-200",
  sidebar1: darkMode ? "bg-[#101111] border-gray-800" : "bg-[#f5f6fa] border-gray-200",
  sidebar: darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200",
  navbar: darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200",

  card: darkMode ? "bg-[#0F0F0F] border-gray-800" : "bg-white border-gray-200",

  buttonBorder: darkMode ? "border-gray-800" : "border-gray-200",
});
