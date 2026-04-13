import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  page = 1,
  totalPages = 5,
  onPageChange,
  pageSize = 10,
  onPageSizeChange,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(10);

  const options = [10, 25, 50, 100];
  return (
    <div className="w-full flex items-center justify-between mt-4">
      {/* Left - Entries */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="relative inline-block">
          {/* Trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="px-5 py-2 border border-gray-200 rounded-md bg-white text-sm"
          >
            {selected}
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute bottom-full mb-1 w-full bg-white border border-gray-200 rounded-md shadow-md z-50">
              {options.map((size) => (
                <div
                  key={size}
                  onClick={() => {
                    setSelected(size);
                    setOpen(false);
                  }}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                >
                  {size}
                </div>
              ))}
            </div>
          )}
        </div>
        <span>Entries</span>
      </div>

      {/* Right - Pagination */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={() => onPageChange?.(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm disabled:opacity-50"
        >
          <ChevronLeft size={14} />
          Prev
        </button>

        {/* Current Page */}
        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm">
          {page}
        </button>

        {/* Next */}
        <button
          onClick={() => onPageChange?.(page + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm disabled:opacity-50"
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
