import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (message: string, status: string) => {
  if (status === "success") toast.success(message, { position: "top-center" });
  if (status === "fail") toast.warn(message, { position: "top-center" });
  if (status === "info") toast.info(message, { position: "top-center" });
  if (status === "error") toast.error(message, { position: "top-center" });
};
