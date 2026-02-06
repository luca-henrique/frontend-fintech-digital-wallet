import React, { useEffect, useState } from "react";
import { Notification } from "../@types/types";
import { CheckCircleIcon } from "./icons/CheckCircleIcon";
import { XCircleIcon } from "./icons/XCircleIcon";
import { InfoIcon } from "./icons/InfoIcon";
import { XIcon } from "./icons/XIcon";

interface NotificationItemProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

const ICONS = {
  success: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
  error: <XCircleIcon className="h-6 w-6 text-red-500" />,
  info: <InfoIcon className="h-6 w-6 text-cyan-500" />,
};

const BORDER_COLORS = {
  success: "border-green-500",
  error: "border-red-500",
  info: "border-cyan-500",
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setVisible(true);

    // Set timer to dismiss
    const timer = setTimeout(() => {
      handleDismiss();
    }, 6000); // 6 seconds

    return () => clearTimeout(timer);
  }, [notification.id]);

  const handleDismiss = () => {
    setVisible(false);
    // Wait for animation to finish before removing from DOM
    setTimeout(() => onDismiss(notification.id), 300);
  };

  return (
    <div
      className={`
        bg-white dark:bg-dark-card text-slate-800 dark:text-dark-text
        rounded-lg shadow-2xl p-4 flex items-start gap-4
        border-l-4 ${BORDER_COLORS[notification.type]}
        transition-all duration-300 ease-in-out
        ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      <div className="flex-shrink-0">{ICONS[notification.type]}</div>
      <div className="flex-1">
        <p className="font-bold text-slate-900 dark:text-dark-text">
          {notification.title}
        </p>
        <p className="text-sm text-slate-600 dark:text-dark-text-secondary mt-1">
          {notification.message}
        </p>
      </div>
      <button
        onClick={handleDismiss}
        className="p-1 rounded-full text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
        aria-label="Fechar notificação"
      >
        <XIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default NotificationItem;
