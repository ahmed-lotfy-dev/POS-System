import { TableComponent } from "../Table/Table";
import { Link, useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import { useRevalidator } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { AllDataResponse } from "../../../types/globals";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AddUnit } from "../units/AddUnit";
import { AddProduct } from "./AddProduct";

type Product = {
  id: string;
  name: string;
  code: number;
  category: string;
  image: string;
  price: number;
  unit: string;
};

const AdminProducts = () => {
  const { products } = useRouteLoaderData("root") as AllDataResponse;
  console.log(products);
  const [imageLink, setImageLink] = useState<string>("");

  const revalidator = useRevalidator();

  const handleSave = async (item: Product) => {
    await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/product/edit/${item?.id}`,
      {
        ...item,
        code: +item.code,
        image: imageLink,
      }
    );
    revalidator.revalidate();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/product/delete/${id}`
    );
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
      console.log(data);
      setImageLink(data.image);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <AlertDialog>
        <Button asChild className="mt-10 mb-6">
          <AlertDialogTrigger>Add Product</AlertDialogTrigger>
        </Button>
        <AddProduct />
      </AlertDialog>
      <TableComponent<Product>
        tableData={products}
        handleSave={handleSave}
        handleDelete={handleDelete}
        uploadHandler={uploadHandler}
      />
    </div>
  );
};

export { AdminProducts };
