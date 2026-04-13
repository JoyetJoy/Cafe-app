import React, { useState } from "react";

const rolesData = [
  "Admin",
  "Supervisor",
  "Cashier",
  "Chef",
  "Waiter",
  "Accountant",
  "System Operator",
];

const RolesList = () => {
  const [selectedRole, setSelectedRole] = useState("Admin");

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Roles</h2>

      <div className="space-y-3">
        {rolesData.map((role) => (
          <div
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium transition-all
              ${
                selectedRole === role
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            {role}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolesList;