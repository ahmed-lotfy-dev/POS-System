import { useEffect, useState } from "react"
import axios from "axios"

const useUpload = () => {
  const [imageLink, setImageLink] = useState<string | null>()
  const [isPending, setIsPending] = useState<boolean>(false)
  const [error, setError] = useState<string | null>()

  const deleteImage = async (image: string) => {
    setImageLink(image)
    setIsPending(true)
    try {
      const { data } = await axios.delete("/api/upload", {
        data: { imageLink },
      })
    } catch (error) {
      setError("Failed to upload the image")
    } finally {
      setIsPending(false)
    }
  }

  useEffect(() => {
    if (!imageLink) {
      setError("Please Provide An Image")
    } else {
      deleteImage(imageLink)
    }
    return () => {
      setError(null)
      setIsPending(false)
      setImageLink(null)
    }
  }, [imageLink])

  return { deleteImage, isPending, error }
}

export { useUpload }
