import axios from "axios";

import { ToastContainer } from "react-toastify";
import { notify } from "../../../lib/toast";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
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
import { AllDataResponse } from "@/types/globals";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductType = {
  name: string;
  price: number;
  code: number;
  image: string;
  categoryId: string;
  unitId: string;
};

const AddProduct = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [item, setItem] = useState<ProductType>({
    name: "",
    price: 0,
    code: 0,
    image: "",
    categoryId: "",
    unitId: "",
  });
  const revalidator = useRevalidator();
  const { categories } = useRouteLoaderData("root") as AllDataResponse;
  const { units } = useRouteLoaderData("root") as AllDataResponse;

  const {
    uploadImage,
    // imageLink,
    isPending,
    //error
  } = useUploadImage();

  const onAddHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ item });
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/product/add`,
      item
    );
    if (data.status === 409) notify(data.response.message, false);
    revalidator.revalidate();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setItem({
      name: "",
      price: 0,
      code: 0,
      image: "",
      categoryId: "",
      unitId: "",
    });
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log({ name, value });
    setItem({ ...item, [name]: value });
  };

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      const imageLink = await uploadImage(event.target.files[0]);
      setItem({ ...item, image: imageLink });
      console.log({ imageLink });
    }
  };

  return (
    <AlertDialogContent className="flex flex-col justify-center items-center w-full">
      <AlertDialogHeader>
        <AlertDialogTitle className="font-semibold">
          Add New Product
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
          name="name"
          id="name"
          placeholder="Name"
          value={item.name || ""}
          onChange={changeHandler}
        />
        <Input
          className="input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 mt-10 m-auto focus:bg-gray-200 bg-gray-100"
          type="number"
          name="price"
          placeholder="Price"
          id="price"
          value={item.price || ""}
          onChange={changeHandler}
        />
        <Input
          className="input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 mt-10 m-auto focus:bg-gray-200 bg-gray-100"
          type="number"
          name="code"
          placeholder="Code"
          id="code"
          value={item.code || ""}
          onChange={changeHandler}
        />
        {/* Category */}
        <Select
          onValueChange={(value: string) =>
            changeHandler({
              target: { name: "categoryId", value },
            } as ChangeEvent<HTMLInputElement>)
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem value={category.id}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectContent></SelectContent>
        </Select>
        {/* Unit */}
        <Select
          onValueChange={(value: string) =>
            changeHandler({
              target: { name: "unitId", value },
            } as ChangeEvent<HTMLInputElement>)
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Unis" />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem value={unit.id}>{unit.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectContent></SelectContent>
        </Select>
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
        {item && (
          <div>
            <img
              src={item.image}
              alt={`${item.name} image`}
              className={`${item.image ? "block" : "hidden"} w-80 m-auto my-10`}
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

export { AddProduct };
