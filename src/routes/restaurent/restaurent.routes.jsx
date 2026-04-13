import RoleandPermissions from "@/pages/restaurent/admin/RoleandPermissions";
import Users from "@/pages/restaurent/admin/Users";
import CategoryList from "@/pages/restaurent/menu/CategoryList";
import UsersPage from "@/pages/users/UsersPage";

export const restaurentRoutes = [
  { index: true, element: <UsersPage /> }, // ✅ default route

  { path: "menu/categories", element: <CategoryList /> },
  { path: "admin/users", element: <Users /> },   // ✅ no slash
  { path: "admin/permissions", element: <RoleandPermissions /> }, 
];