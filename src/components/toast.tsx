import { nanoid } from "nanoid";
import { create } from "zustand";
import toast, { ToastOptions } from "react-hot-toast";

// Define the Notification type
export type Notification = {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message?: string;
};

type NotificationsStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  dismissNotification: (id: string) => void;
};

// Create the Zustand store
export const useNotificationStore = create<NotificationsStore>((set) => ({
  notifications: [],

  addNotification: (notification) => {
    // Close existing toasts before showing a new one
    toast.dismiss();

    const id = nanoid();
    const toastType = notification.type as keyof typeof toast;

    // Define custom styles per toast type
    const options: ToastOptions = {
      duration: 4000,
      icon:
        notification.type === "success"
          ? "✅"
          : notification.type === "error"
          ? "❌"
          : notification.type === "warning"
          ? "⚠️"
          : "ℹ️",
      style: {
        background:
          notification.type === "success"
            ? "#f3c6c6" // Light maroon for success
            : notification.type === "error"
            ? "#d32f2f"
            : notification.type === "warning"
            ? "#f57c00"
            : "#607d8b",
        color:
          notification.type === "success"
            ? "#800000" // Maroon text
            : "white",
        fontWeight: "bold",
        borderRadius: "8px",
        padding: "12px 16px",
      },
    };

    const message = notification.message || notification.title || "";

    toast[toastType](message as any, options as any);

    set(() => ({
      notifications: [{ id, ...notification }], // Keep only one
    }));
  },

  dismissNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
    toast.dismiss(id);
  },
}));
