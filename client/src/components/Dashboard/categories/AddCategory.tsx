import axios from "axios";

import { ToastContainer } from "react-toastify";
import { notify } from "../../../lib/toast";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { useUploadImage } from "../../../hooks/useUploadImage";
import { Loader } from "@mantine/core";
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
  const formRef = useRef<HTMLFormElement>(null);
  const [itemName, setItemName] = useState<string>();
  const revalidator = useRevalidator();

  const {
    uploadImage,
    imageLink,
    isPending,
    //error
  } = useUploadImage();

  const onAddHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/category/add`,
      { name: itemName, image: imageLink }
    );
    console.log(data);
    if (data.status === 409) notify(data.response.message, false);
    revalidator.revalidate();
    formRef.current?.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setItemName(value);
  };

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      await uploadImage(event.target.files[0]);
    }
  };

  console.log({ itemName });
  console.log(imageLink);

  return (
    <AlertDialogContent className="flex flex-col justify-center items-center w-full">
      <AlertDialogHeader>
        <AlertDialogTitle className="font-semibold">
          Add New Category
        </AlertDialogTitle>
      </AlertDialogHeader>
      <form
        ref={formRef}
        action=""
        method="dialog"
        className="modal-box flex flex-col"
        onSubmit={onAddHandler}
      >
        <Label className="m-auto my-4 font-semibold" htmlFor="name">
          Category Name
        </Label>
        <Input
          className="input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 mt-10 m-auto focus:bg-gray-200 bg-gray-100"
          type="text"
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
        {isPending ? <Loader className="m-auto my-7" /> : null}
        {imageLink && (
          <div>
            <img
              src={imageLink}
              alt={`${itemName} image`}
              className={`${imageLink ? "block" : "hidden"} w-80 m-auto my-10`}
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
