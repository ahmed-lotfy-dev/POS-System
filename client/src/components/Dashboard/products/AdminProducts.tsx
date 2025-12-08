import { TableComponent } from "../Table/Table";
import { Link, useRouteLoaderData } from "react-router-dom";
import axios from "@/lib/axios";
import { useRevalidator } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { AllDataResponse, Product } from "../../../types/globals";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AddUnit } from "../units/AddUnit";
import { AddProduct } from "./AddProduct";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const AdminProducts = () => {
  const { products } = useRouteLoaderData("root") as AllDataResponse;
  console.log(products);
  const [imageLink, setImageLink] = useState<string>("");
  const user = useSelector((state: RootState) => state.user.user);

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
      setImageLink(data.data?.image || data.image);
    }
  };

  return (
    <div className="w-full h-full overflow-auto p-6">
      <AddProduct />
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
