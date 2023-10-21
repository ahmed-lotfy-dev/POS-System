import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useRef } from "react";
import { useUploadImage } from "../../../hooks/useUploadImage";
// import { Loader } from "@mantine/core";
import { Loader } from "@/components/ui/loader";

import { setItem } from "../../../store/features/Item/itemSlice";
import { Button } from "@/components/ui/button";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer } from "react-toastify";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import { Select, SelectContent } from "@/components/ui/select";
import { SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { AllDataResponse } from "@/types/globals";
type Props = {};

function EditProduct({}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const editItem = useSelector((state: RootState) => state.item.item);
  const dispatch = useDispatch();
  const revalidator = useRevalidator();

  const { categories } = useRouteLoaderData("root") as AllDataResponse;
  const { units } = useRouteLoaderData("root") as AllDataResponse;

  const objectKeys = editItem ? Object.keys(editItem).slice(1, -2) : [];

  const onSaveHandler = async () => {
    console.log(editItem)
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/product/edit/${editItem.id}`,
      {
        ...editItem,
      }
    );
    console.log(data);
    console.log(editItem.id);
    revalidator.revalidate();
    dispatch(setItem({}));
  };

  const {
    uploadImage,
    imageLink,
    isPending,
    //error
  } = useUploadImage();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedItem = { ...editItem, [name]: value }; // Update the corresponding property
    dispatch(setItem(updatedItem));
  };

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      await uploadImage(event.target.files[0]);
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
        ref={formRef}
        action=""
        method="dialog"
        className="modal-box flex flex-col"
        onSubmit={() => onSaveHandler()}
      >
        <Label className="m-auto my-4 font-semibold" htmlFor="name">
          Category Name
        </Label>
        <Input
          className="input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 mt-10 m-auto focus:bg-gray-200 bg-gray-100"
          type="text"
          name="name"
          id="name"
          value={editItem?.name || ""}
          onChange={onChangeHandler}
        />
        <Input
          className="input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 mt-10 m-auto focus:bg-gray-200 bg-gray-100"
          type="number"
          name="price"
          placeholder="Price"
          id="price"
          value={editItem?.price || ""}
          onChange={onChangeHandler}
        />
        <Input
          className="input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 mt-10 m-auto focus:bg-gray-200 bg-gray-100"
          type="number"
          name="code"
          placeholder="Code"
          id="code"
          value={editItem?.code || ""}
          onChange={onChangeHandler}
        />
        {/* Category */}
        <Select
          onValueChange={(value: string) =>
            onChangeHandler({
              target: { name: "categoryId", value },
            } as ChangeEvent<HTMLInputElement>)
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectContent></SelectContent>
        </Select>
        {/* Unit */}
        <Select
          onValueChange={(value: string) =>
            onChangeHandler({
              target: { name: "unitId", value },
            } as ChangeEvent<HTMLInputElement>)
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Unis" />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem key={unit.id} value={unit.id}>
                {unit.name}
              </SelectItem>
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
        {isPending ? <Loader /> : null}
        {imageLink ? (
          <img
            src={imageLink}
            alt={`${editItem.name} image`}
            className={`${imageLink ? "block" : "hidden"} w-80 m-auto my-10`}
          />
        ) : (
          <img
            src={editItem ? editItem.image : ""}
            alt={` image`}
            // className={`${imageLink ? "block" : "hidden"} w-80 m-auto my-10`}
          />
        )}
        <div className="flex gap-5 m-auto">
          <AlertDialogAction type="submit">Add</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </div>
      </form>
      <ToastContainer />
    </AlertDialogContent>
  );
}

export { EditProduct };
