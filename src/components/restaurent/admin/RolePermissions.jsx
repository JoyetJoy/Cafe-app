import React, { useState } from "react";

const modulesList = [
  "Dashboard",
  "POS",
  "Hold/Resume Sale",
  "Refund / Return",
  "Products",
  "Categories",
  "Customers",
  "Reports",
  "Settings",
];

const actions = ["view", "add", "edit", "delete", "export", "approved"];

const RolePermissions = () => {
  const initialState = modulesList.reduce((acc, module) => {
    acc[module] = actions.reduce((a, action) => {
      a[action] = true;
      return a;
    }, {});
    return acc;
  }, {});

  const [permissions, setPermissions] = useState(initialState);
  const [revertAll, setRevertAll] = useState(true);

  const togglePermission = (module, action) => {
  setPermissions((prev) => {
    const updated = {
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action],
      },
    };

    // check if ALL are true
    const allChecked = modulesList.every((mod) =>
      actions.every((act) => updated[mod][act])
    );

    setRevertAll(allChecked);

    return updated;
  });
};
  const handleRevertAll = () => {
    const updated = {};
    modulesList.forEach((module) => {
      updated[module] = {};
      actions.forEach((action) => {
        updated[module][action] = revertAll;
      });
    });
    setPermissions(updated);
  };

  return (
    <div className="col-span-2 bg-gray-100 min-h-screen w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Role : Admin</h2>

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={revertAll}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setRevertAll(isChecked);

              const updated = {};
              modulesList.forEach((module) => {
                updated[module] = {};
                actions.forEach((action) => {
                  updated[module][action] = isChecked;
                });
              });

              setPermissions(updated);
            }}
            className="w-3 h-3"
          />
          Revert All
        </label>
      </div>
      <div className="bg-white rounded-lg shadow border border-gray-200 p-3">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 ">Module</th>
                <th className="px-4 py-3 ">View</th>
                <th className="px-4 py-3 ">Add</th>
                <th className="px-4 py-3 ">Edit</th>
                <th className="px-4 py-3 ">Delete</th>
                <th className="px-4 py-3 ">Export</th>
                <th className="px-4 py-3 ">Approved/Void</th>
              </tr>
            </thead>

            <tbody>
              {modulesList.map((module, index) => (
                <tr key={module} className="text-center">
                  <td
                    className={`text-left px-4 py-3 border-t border-t-gray-200`}
                  >
                    {module}
                  </td>

                  {actions.map((action) => (
                    <td
                      key={action}
                      className="py-2 border-t border-t-gray-200"
                    >
                      <input
                        type="checkbox"
                        checked={permissions[module][action]}
                        onChange={() => togglePermission(module, action)}
                        className="w-3 h-3 accent-blue-600"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="px-5 py-2 rounded-md border border-gray-300 text-gray-600 bg-white hover:bg-gray-100">
            Cancel
          </button>

          <button className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolePermissions;
