"use client";

import React from "react";
import {
  saveCategoryAction,
  editCategoryAction,
} from "@/app/actions/categoryActions";
import { Alert } from "@/app/lib/alerts";

interface Props {
  onClose: () => void;
  editData?: any;
}

export default function AddCategoryModal({ onClose, editData }: Props) {
  const clientAction = async (formData: FormData) => {
    try {
      if (editData) {
        await editCategoryAction(formData);
        Alert.success("Updated!", "Category modified successfully.");
      } else {
        await saveCategoryAction(formData);
        Alert.success("Saved!", "New category created with success.");
      }
      onClose();
    } catch (e) {
      Alert.error("Error", "Something went wrong while saving.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[2px]">
      <div className="relative w-full max-w-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-150 border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="px-8 pt-8 pb-4">
          <h2 className="text-slate-900 tracking-tight text-[28px] font-black leading-tight">
            {editData ? "Edit Category" : "Add New Category"}
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Define a new organizational resource group.
          </p>
        </div>

        <form action={clientAction}>
          {editData && <input type="hidden" name="id" value={editData.id} />}

          <div className="px-8 py-4 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
                Category Name
              </label>
              <input
                name="name"
                defaultValue={editData?.name || ""}
                required
                className="w-full h-14 rounded-xl text-slate-900 focus:outline-0 focus:ring-4 focus:ring-blue-50 border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#137fec] p-4 text-base font-medium transition-all placeholder:text-slate-300"
                placeholder="e.g. Software Licenses"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={editData?.description || ""}
                className="w-full h-36 rounded-xl text-slate-900 focus:outline-0 focus:ring-4 focus:ring-blue-50 border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#137fec] p-4 text-base font-medium transition-all placeholder:text-slate-300 resize-none"
                placeholder="Enter a brief overview..."
              />
            </div>
          </div>

          <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-slate-400 font-bold text-sm hover:text-slate-600 hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl bg-[#137fec] text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              {editData ? "Update Category" : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
