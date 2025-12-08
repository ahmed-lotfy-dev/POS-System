import { addToast } from "@heroui/react";

export const notify = (message: string | any, status: string) => {
  const colorMap: Record<
    string,
    "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  > = {
    success: "success",
    error: "danger",
    fail: "danger",
    info: "primary",
    warning: "warning",
  };

  // Ensure message is always a string
  const messageText =
    typeof message === "string"
      ? message
      : message?.message || JSON.stringify(message) || "An error occurred";

  addToast({
    title: messageText,
    color: colorMap[status] || "default",
    timeout: 3000,
  });
};
