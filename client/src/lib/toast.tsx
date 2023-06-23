import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const notify = (message: string, status: boolean) => {
  if (status) toast.success(message)
  if (!status) toast.warn(message)
}
