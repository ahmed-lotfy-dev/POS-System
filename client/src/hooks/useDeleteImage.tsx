import {  useState } from "react"
import axios from "axios"

const useDeleteImage = () => {
  const [isPending, setIsPending] = useState<boolean>(false)
  const [error, setError] = useState<string | null>()

  const deleteImage = async (image: string) => {
    console.log(image)
    setIsPending(true)
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/upload`, { data: { image } })
      console.log(data)
      setIsPending(false)
    } catch (error) {
      setError("Failed to upload the image")
    }
  }

  return { deleteImage, isPending, error }
}

export { useDeleteImage }
