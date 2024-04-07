import { TableComponent } from "../Table/Table";
import { useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import { useRevalidator } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { AllDataResponse } from "../../../types/globals";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AddCategory } from "./AddCategory";
import { Button } from "@/components/ui/button";

type Category = {
  id: number;
  image: string;
};

function AdminCategories() {
  const { categories } = useRouteLoaderData("root") as AllDataResponse;
  const [imageLink, setImageLink] = useState<string>("");

  const revalidator = useRevalidator();

  const handleSave = async (item: Category) => {
    await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/category/edit/${item?.id}`,
      {
        ...item,
        image: imageLink,
      }
    );
    revalidator.revalidate();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/category/delete/${id}`
    );
    console.log(id);
    revalidator.revalidate();
  };

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/upload/product`,
        { image: event.target.files[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageLink(data.image);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <AlertDialog>
        <Button asChild className="mt-10 mb-6">
          <AlertDialogTrigger>Add Category</AlertDialogTrigger>
        </Button>
        <AddCategory />
      </AlertDialog>
      <TableComponent<Category>
        tableData={categories}
        handleSave={handleSave}
        handleDelete={handleDelete}
        uploadHandler={uploadHandler}
      />
    </div>
  );
}

export { AdminCategories };
