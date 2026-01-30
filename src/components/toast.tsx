import { create } from "zustand";
import toast, { ToastOptions } from "react-hot-toast";

type NotificationType = "info" | "warning" | "success" | "error";

type NotificationsStore = {
  addNotification: (args: {
    type: NotificationType;
    title: string;
    message?: string;
  }) => void;
};

export const useNotificationStore = create<NotificationsStore>(() => ({
  addNotification: ({ type, title, message }) => {
    toast.dismiss();

    const options: ToastOptions = {
      duration: 4000,
      icon:
        type === "success"
          ? "✅"
          : type === "error"
          ? "❌"
          : type === "warning"
          ? "⚠️"
          : "ℹ️",
      style: {
        background:
          type === "success"
            ? "#f3c6c6"
            : type === "error"
            ? "#d32f2f"
            : type === "warning"
            ? "#f57c00"
            : "#607d8b",
        color: type === "success" ? "#800000" : "#fff",
        fontWeight: 600,
        borderRadius: "10px",
        padding: "12px 16px",
      },
    };

    const text = message || title;

    switch (type) {
      case "success":
        toast.success(text, options);
        break;
      case "error":
        toast.error(text, options);
        break;
      default:
        toast(text, options);
    }
  },
}));
