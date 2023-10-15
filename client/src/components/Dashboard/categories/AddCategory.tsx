import axios from "axios";

import { ToastContainer } from "react-toastify";
import { notify } from "../../../lib/toast";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { useUploadImage } from "../../../hooks/useUploadImage";
// import { Loader } from "@mantine/core";
import { Loader } from "@/components/ui/loader";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";

const AddCategory = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [itemName, setItemName] = useState<string>("");
  const [image, setImage] = useState<string | null | undefined>("");
  const revalidator = useRevalidator();

  const {
    uploadImage,
    // imageLink,
    isPending,
    //error
  } = useUploadImage();

  const onAddHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ itemName, image });
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/category/add`,
      { name: itemName, image }
    );
    if (data.status === 409) notify(data.response.message, false);
    revalidator.revalidate();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setItemName("");
    setImage("");
  };

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setItemName(value);
  };

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      const imageLink = await uploadImage(event.target.files[0]);
      setImage(imageLink);
      console.log({ imageLink });
    }
  };

  return (
    <AlertDialogContent className="flex flex-col justify-center items-center w-full">
      <AlertDialogHeader>
        <AlertDialogTitle className="font-semibold">
          Add New Category
        </AlertDialogTitle>
      </AlertDialogHeader>
      <form
        action=""
        method="dialog"
        className="modal-box flex flex-col"
        onSubmit={onAddHandler}
      >
        <Input
          className="input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 mt-10 m-auto focus:bg-gray-200 bg-gray-100"
          type="text"
          placeholder="Category Name"
          name="name"
          id="name"
          value={itemName || ""}
          onChange={nameChangeHandler}
        />
        <>
          <Button
            className="my-5"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Image
          </Button>
          <input
            className="hidden"
            type="file"
            name="image"
            id="hiddenFileInput"
            ref={fileInputRef}
            onChange={uploadHandler}
          />
        </>
        {isPending ? <Loader /> : null}
        {image && (
          <div>
            <img
              src={image}
              alt={`${itemName} image`}
              className={`${image ? "block" : "hidden"} w-80 m-auto my-10`}
            />
          </div>
        )}
        <div className="flex gap-5 m-auto">
          <AlertDialogAction type="submit">Add</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </div>
      </form>
      <ToastContainer />
    </AlertDialogContent>
  );
};

export { AddCategory };
