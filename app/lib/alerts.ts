import Swal from "sweetalert2";

export const Alert = {
  // 1. Success Alert (Insert/Update)
  success: (title: string, text?: string) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        popup: "rounded-2xl border border-gray-100",
        title: "text-slate-900 font-black",
      },
    });
  },

  // 2. Delete Confirmation Alert
  confirmDelete: async (itemLabel: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${itemLabel}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#137fec",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl border border-gray-100",
        title: "text-slate-900 font-black",
        confirmButton: "rounded-xl px-6 py-2.5 font-bold",
        cancelButton: "rounded-xl px-6 py-2.5 font-bold",
      },
    });
    return result.isConfirmed;
  },

  // 3. Error Alert
  error: (title: string, text: string) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: "error",
      confirmButtonColor: "#137fec",
      customClass: {
        popup: "rounded-2xl border border-red-50 shadow-xl",
        title: "text-slate-900 font-black",
        confirmButton: "rounded-xl px-10 py-2.5 font-bold",
      },
    });
  },
};
