import { useEffect, useState } from "react";
import axios from "axios";

const useUploadImage = () => {
  const [imageFile, setImageFile] = useState<File | null>();
  const [imageLink, setImageLink] = useState<string | null>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  const uploadImage = async (image: File) => {
    setImageFile(image);
    setIsPending(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/upload`,
        { image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageLink(data.image);
      setIsPending(false);
      return data.image;
    } catch (error) {
      setError("Failed to upload the image");
    }
  };
  useEffect(() => {
    if (!imageFile) {
      setError("Please Provide An Image");
    } else {
      uploadImage(imageFile);
    }
    return () => {
      setError(null);
      setIsPending(false);
      setImageFile(null);
      setImageLink(null);
    };
  }, [imageFile]);
  return { uploadImage, imageLink, isPending, error };
};

export { useUploadImage };
