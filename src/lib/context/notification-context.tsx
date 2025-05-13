"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Notification from "@/components/ui/Notification";

interface NotificationContextProps {
  showNotification: (
    message: string,
    type?: "success" | "error" | "info",
    duration?: number
  ) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
    duration: number;
    id: number;
  } | null>(null);

  const showNotification = (
    message: string,
    type: "success" | "error" | "info" = "success",
    duration: number = 3000
  ) => {
    setNotification({ message, type, duration, id: Date.now() });
  };

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={handleClose}
        />
      )}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
