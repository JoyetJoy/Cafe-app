import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { X, Upload, Trash2 } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { getTheme } from "@/utils/constants";

const schema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Staff", value: "staff" },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export default function AddCategoryModal({ isOpen, onClose }) {
  const [preview, setPreview] = useState(null);
  const [show, setShow] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const { darkMode } = useThemeStore();
  const theme = getTheme(darkMode);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
      setTimeout(() => setShouldRender(false), 300); // wait for animation
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    } else {
      alert("Image must be less than 5MB");
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative transform transition-all duration-300 ${
          show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 rounded-full w-8 h-8 flex items-center transition ease-in-out border justify-center  ${theme.buttonBorder} ${
            darkMode
              ? "hover:bg-[#1b1d1d] "
              : "hover:bg-red-500 hover:text-white bg-[#f9f8f8]"
          }`}
        >
          <X size={16} />
        </button>

        <h2 className="text-xl font-semibold mb-6">Add Category</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            {/* Image Upload */}
            <div className="flex  items-center gap-3">
              <div className="w-28 h-28 rounded-lg flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <Upload className="text-gray-400" />
                )}
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium required">User Image</p>
                <p className="text-xs text-gray-500">
                  Image should be within 5 MB
                </p>
                <div className="flex gap-2">
                  <label className="p-2 border border-gray-300 rounded-full cursor-pointer">
                    <Upload size={14} />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageUpload}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="p-2 border border-gray-300 rounded-full text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 space-y-4">
              {/* Name */}
              <div className="flex-1">
                  <label className="text-sm font-medium required">
                    Category Name
                  </label>
                  <input
                    {...register("name")}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  />
                  <p className="text-xs text-red-500">
                    {errors.name?.message}
                  </p>
                </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 w-full border border-gray-300 rounded-md text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 w-full bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
