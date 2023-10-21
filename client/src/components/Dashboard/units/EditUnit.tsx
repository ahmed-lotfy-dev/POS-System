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
import { useRevalidator } from "react-router-dom";
import axios from "axios";
type Props = {};

function EditUnit({}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const editItem = useSelector((state: RootState) => state.item.item);
  const dispatch = useDispatch();
  const revalidator = useRevalidator();

  const objectKeys = editItem ? Object.keys(editItem).slice(1, -2) : [];

  const onSaveHandler = async () => {
    console.log({ onsave: editItem });
    console.log("saving item");
    const { data } = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/unit/edit/${editItem.id}`,
      editItem
    );
    revalidator.revalidate();
    dispatch(setItem({}));
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedItem = { ...editItem, [name]: value }; // Update the corresponding property
    dispatch(setItem(updatedItem));
  };

  console.log(editItem);

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
          value={editItem ? editItem.name : ""}
          onChange={onChangeHandler}
        />
        <div className="flex gap-5 m-auto mt-6">
          <AlertDialogAction type="submit">Save</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </div>
      </form>
      <ToastContainer />
    </AlertDialogContent>
  );
}

export { EditUnit };
