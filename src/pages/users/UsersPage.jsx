import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
// USERS PAGE

const users = [
  { name: "John Smith", role: "Admin / Owner", phone: "+123456 78901" },
  { name: "Emily Johnson", role: "Supervisor", phone: "+134567 89012" },
];

export default function UsersPage() {
  const [darkMode, setDarkMode] =useState(false);

  return (
    <div
        className={`rounded-xl p-6 shadow-sm border ${
          darkMode ? "bg-[#0F0F0F] border-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <table className="w-full text-sm">
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-3">{u.name}</td>
                <td>{u.role}</td>
                <td>{u.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}
