// ✅ CLEAN THEME WITH CONSISTENT TEXT COLORS

import React, { useEffect, useState } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { getTheme } from "../utils/constants";
import {
  BadgeDollarSign,
  BadgePercent,
  Bike,
  Cog,
  ConciergeBell,
  Drumstick,
  FileClock,
  FileSpreadsheet,
  HandPlatter,
  LayoutDashboard,
  LayoutList,
  Layers,
  LibraryBig,
  ListTodo,
  LockKeyhole,
  Merge,
  PanelRightOpen,
  Pin,
  Printer,
  Shield,
  SquarePercent,
  TextSelect,
  UserCog,
  UserRound,
  Users,
  Warehouse,
  X,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SidebarSwitcher from "./SidebarSwitcher";
import SidebarMenu from "./SidebarMenu";
import DashboardNavbar from "./DashboardNavbar";

const sidebarTitles = {
  1: "MAIN",
  2: "MENU MANAGEMENT",
  3: "OPERATIONS",
  4: "ADMINISTRATION",
  5: "PAGES",
  6: "SETTINGS",
};

const sidemenuItems = [
  { id: 1, label: "MAIN", icon: LayoutDashboard },
  { id: 2, label: "MENU", icon: Layers },
  { id: 3, label: "OPERATIONS", icon: Merge },
  { id: 4, label: "ADMIN", icon: UserCog },
  { id: 5, label: "PAGES", icon: LibraryBig },
  { id: 6, label: "SETTINGS", icon: Cog },
];

const sidebarMenuMap = {
  1: [
    { id: 1, label: "Dashboard", icon: LayoutDashboard, link: "/store/login" },
    { id: 2, label: "POS", icon: HandPlatter, link: "/store/signup" },
    { id: 3, label: "Orders", icon: ListTodo, link: "/store/forgot-password" },
    { id: 4, label: "Kitchen (KDS)", icon: Drumstick },
    { id: 5, label: "Reservation", icon: FileClock },
  ],
  2: [
    { id: 1, label: "Categories", icon: Layers, link: "/store/menu/categories" },
    { id: 2, label: "Items", icon: LayoutList, link: "/store/signup" },
    { id: 3, label: "Addons", icon: TextSelect, link: "/store/forgot-password" },
    { id: 4, label: "Coupons", icon: BadgePercent },
  ],
  3: [
    { id: 1, label: "Tables", icon: ConciergeBell, link: "/store/login" },
    { id: 2, label: "Customers", icon: UserRound, link: "/store/signup" },
    {
      id: 3,
      label: "Invoices",
      icon: FileSpreadsheet,
      link: "/store/forgot-password",
    },
    { id: 4, label: "Payments", icon: BadgeDollarSign },
  ],
  4: [
    { id: 1, label: "Users", icon: Users, link: "/store/admin/users" },
    { id: 2, label: "Permissions", icon: Shield, link: "/store/admin/permissions" },
    {
      id: 3,
      label: "Reports",
      icon: FileSpreadsheet,
      link: "/store/forgot-password",
    },
  ],
  5: [
    { id: 1, label: "Tax", icon: SquarePercent, link: "/store/signup" },
    { id: 2, label: "Print", icon: Printer, link: "/store/forgot-password" },
    { id: 3, label: "Payment Types", icon: BadgeDollarSign },
    { id: 4, label: "Delivery", icon: Bike, link: "/store/otp" },
    { id: 5, label: "Notifications", icon: Pin, link: "/store/reset-password" },
  ],
  6: [
    { id: 1, label: "Store Settings", icon: Warehouse, link: "/store/login" },
    {
      id: 2,
      label: "Reset Password",
      icon: LockKeyhole,
      link: "/store/reset-password",
    },
  ],
};

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useThemeStore();
  const theme = getTheme(darkMode);

  const [selectedSidebar1, setSelectedSidebar1] = useState();
  const [activePage, setActivePage] = useState(null);
  const [mini, setMini] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("admin")) {
      setSelectedSidebar1(4);
    }else if (location.pathname.includes("menu")) {
      setSelectedSidebar1(2);
    }
  }, [location.pathname]);

  const menuItems = sidebarMenuMap[selectedSidebar1] || [];

  useEffect(() => {
    setActivePage(null);
  }, [selectedSidebar1]);

  // useEffect(() => {
  //   const firstItem = menuItems[0];
  //   if (firstItem?.link) {
  //     setActivePage(firstItem.id);
  //   }
  // }, [selectedSidebar1]);

  const handleMenuItemClick = (item, options = {}) => {
    if (!item) return;
    if (item.link) {
      navigate(item.link);
    }
    setActivePage(item.id);
    if (options.closeMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className={`flex h-screen ${theme.layout} ${theme.textPrimary} relative`}>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 bg-opacity-50 lg:hidden z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`hidden lg:flex min-w-16 max-w-16 border-r flex-col items-center py-4 justify-between ${theme.sidebar1}`}
      >
        <SidebarSwitcher
          items={sidemenuItems}
          selectedId={selectedSidebar1}
          onSelect={setSelectedSidebar1}
          theme={theme}
          darkMode={darkMode}
        />
      </div>

      <div className={`${!mini && "w-53"} border-r ${theme.sidebar} hidden lg:flex flex-col`}>
        <div
          className={`h-15 ${!mini && "w-53"} border-r border-b p-4 flex items-center ${mini ? "justify-center" : "justify-between"} font-semibold ${theme.sidebar} ${theme.textPrimary}`}
        >
          {!mini && <span>Steak House</span>}
          <PanelRightOpen
            onClick={() => setMini(!mini)}
            className={`w-4 mb-0.5 h-4 transition hover:text-blue-600 cursor-pointer ${theme.textThird}`}
            strokeWidth={2.01}
          />
        </div>

        <SidebarMenu
          title={sidebarTitles[selectedSidebar1] || ""}
          items={menuItems}
          activePage={activePage}
          mini={mini}
          theme={theme}
          darkMode={darkMode}
          onSelect={(item) => handleMenuItemClick(item)}
        />
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        <DashboardNavbar
          darkMode={darkMode}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenMobile={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-0 flex z-40">
            <div
              className={`pointer-events-auto min-w-16 max-w-16 border-r flex flex-col items-center py-4 justify-between ${theme.sidebar1}`}
            >
              <SidebarSwitcher
                items={sidemenuItems}
                selectedId={selectedSidebar1}
                onSelect={setSelectedSidebar1}
                theme={theme}
                darkMode={darkMode}
              />
            </div>

            <div className={`${!mini && "w-53"} border-r ${theme.sidebar}`}>
              <div
                className={`h-15 ${!mini && "w-53"} border-r border-b p-4 flex items-center ${mini ? "justify-center" : "justify-between"} font-semibold ${theme.sidebar} ${theme.textPrimary}`}
              >
                {!mini && <span>Steak House</span>}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg transition lg:hidden"
                >
                  <X className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
                </button>
              </div>

              <SidebarMenu
                title={sidebarTitles[selectedSidebar1] || ""}
                items={menuItems}
                activePage={activePage}
                mini={mini}
                theme={theme}
                darkMode={darkMode}
                onSelect={(item) => handleMenuItemClick(item, { closeMobile: true })}
              />
            </div>

            <div className="flex-1 cursor-default" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        <div className={`p-6 min-h-160 overflow-y-auto ${darkMode ? "bg-[#101111] border-gray-800" : "bg-[#f5f6fa] border-gray-200"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
