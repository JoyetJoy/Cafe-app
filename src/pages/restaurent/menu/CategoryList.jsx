import Table from "@/components/common/Table";
import AddUserModal from "@/components/popups/restaurent/admin/AddUserModal";
import ActionBar from "@/components/popups/common/ActionBar";
import { useThemeStore } from "@/store/useThemeStore";
import { Eye, PencilLine, Shield, SquarePen, Trash2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AddCategoryModal from "@/components/popups/restaurent/menu/AddCategoryModal";

export default function CategoryList() {
  const [page, setPage] = useState(1);
  const [popupOpen, setPopupOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const data = [
    {
      id: 1,
      name: "dsfsd0",
      role: "Admin",
      number: "2345242340",
      status: "Active",
    },
    {
      id: 2,
      name: "dsfsd0",
      role: "Admin",
      number: "2345242340",
      status: "Active",
    },
    {
      id: 3,
      name: "dsfsd0",
      role: "Admin",
      number: "2345242340",
      status: "Active",
    },
    {
      id: 4,
      name: "dsfsd0",
      role: "Admin",
      number: "2345242340",
      status: "Active",
    },
    {
      id: 5,
      name: "dsfsd0",
      role: "Admin",
      number: "2345242340",
      status: "Active",
    },
    {
      id: 5,
      name: "dsfsd0",
      role: "Admin",
      number: "2345242340",
      status: "Active",
    },
    {
      id: 5,
      name: "dsfsd0",
      role: "Admin",
      number: "2345242340",
      status: "Active",
    },
    {
      id: 5,
      name: "dsfsd0",
      role: "Admin",
      number: "2345242340",
      status: "Active",
    },
    {
      id: 5,
      name: "dsfsd0",
      role: "Admin",
      number: "2345242340",
      status: "Active",
    },
    {
      id: 5,
      name: "dsfsd0",
      role: "Admin",
      number: "2345242340",
      status: "Active",
    },
    {
      id: 6,
      name: "dsfsd0",
      role: "Admin",
      number: "2345242340",
      status: "Active",
    },
    {
      id: 7,
      name: "dsfsd0",
      role: "Admin",
      number: "2345242340",
      status: "Active",
    },
  ];

  const { darkMode } = useThemeStore();

  const columns = useMemo(
    () => [
      //   {
      //     header: "SL:No.",
      //     accessor: () => "",
      //     Cell: ({ row, index }) => {
      //       const isChecked = selectedRows.some(
      //         (item) => item.id === row?.id
      //       );

      //       const isDifferentSeller =
      //         selectedRows.length > 0 &&
      //         selectedRows[0].sellerId !== row?.sellerId;

      //       return (
      //         <div className="flex items-center gap-2 px-2">
      //           {/* Checkbox */}
      //           <input
      //             type="checkbox"
      //             checked={isChecked}
      //             disabled={isDifferentSeller}
      //             onChange={() => handleSelect(row)}
      //           />

      //           {/* Serial Number */}
      //           <span>
      //             {index + 1 + (currentPage - 1) * pageLimit}.
      //           </span>
      //         </div>
      //       );
      //     },
      //   },
      {
        header: "Category",
        accessor: "name",
      },
      {
        header: "No of Items",
        accessor: "role",
      },
      {
        header: "Created On",
        accessor: "number",
      },
      {
        header: "Status",
        accessor: (row) => (
          <span
            className={`px-3 py-1 rounded-md text-xs font-medium ${darkMode? "bg-[#031d0a] text-green-700":"bg-green-100 text-green-700"}`}
          >
            {row.status}
          </span>
        ),
      },

      {
        header: "Action",
        accessor: (row) => (
          <div className="flex items-center gap-2 text-xs">
            {/* <Link
              to={`${row.id}`}
              className={`flex size-8 cursor-pointer items-center justify-center rounded-full border ${darkMode? "border-gray-800 hover:bg-gray-900 text-gray-200":"border-gray-200 hover:bg-gray-100"}`}
            >
              <Shield className="size-3.5" />
            </Link> */}
            <Link
              to={`${row.id}`}
              className={`flex size-8 cursor-pointer items-center justify-center rounded-full border ${darkMode? "border-gray-800 hover:bg-gray-900 text-gray-200":"border-gray-200 hover:bg-gray-100"}`}
            >
              <PencilLine className="size-3.5" />
            </Link>
            <Link
              to={`${row.id}`}
              className={`flex size-8 cursor-pointer items-center justify-center rounded-full border ${darkMode? "border-gray-800 hover:bg-gray-900 text-gray-200":"border-gray-200 hover:bg-gray-100"}`}
            >
              <Trash2 className="size-3.5" />
            </Link>
          </div>
        ),
      },
    ],
    [darkMode],
  );
  return (
    <div className="w-full overflow-hidden">
      <ActionBar
       menuTitle= "Categories"
        onExport={(type) => console.log("Export:", type)}
        onAdd={() => setPopupOpen(true)}
      />
      <AddCategoryModal isOpen={popupOpen} onClose={() => setPopupOpen(false)}/>
      <Table
        columns={columns}
        data={data}
        type="admin-users"
        page={page}
        totalPages={10}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}
