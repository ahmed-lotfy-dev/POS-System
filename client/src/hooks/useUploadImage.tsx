import { useEffect, useState } from "react"
import axios from "axios"

const useUpload = () => {
  const [imageFile, setImageFile] = useState<File | null>()
  const [imageLink, setImageLink] = useState<string | null>()
  const [isPending, setIsPending] = useState<boolean>(false)
  const [error, setError] = useState<string | null>()

  const uploadImage = async (image: File) => {
    setImageFile(image)
    setIsPending(true)
    try {
      const { data } = await axios.post(
        "/api/upload",
        { image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      setImageLink(data.image)
    } catch (error) {
      setError("Failed to upload the image")
    } finally {
      setIsPending(false)
    }
  }

  useEffect(() => {
    if (!imageFile) {
      setError("Please Provide An Image")
    } else {
      uploadImage(imageFile)
    }
    return () => {
      setError(null)
      setIsPending(false)
      setImageFile(null)
      setImageLink(null)
    }
  }, [imageFile])

  return { uploadImage, imageLink, isPending, error }
}

export { useUpload }
