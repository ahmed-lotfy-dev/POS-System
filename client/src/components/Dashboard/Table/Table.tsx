import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChangeEvent } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import { useDeleteImage } from "../../../hooks/useDeleteImage";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../../../store/features/Item/itemSlice";
import { RootState } from "../../../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { EditCategory } from "../categories/EditCategory";

type TableProps<T> = {
  tableData: T[];
  handleSave: (data: T) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  uploadHandler?: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const TableComponent = <T extends Record<string, any>>({
  tableData,
  handleDelete,
}: TableProps<T>) => {
  const item = useSelector((state: RootState) => state.item);

  const navigate = useNavigate();

  const data = tableData || [];

  const dispatch = useDispatch();
  const { deleteImage } = useDeleteImage();

  const location = useLocation().pathname.split("/dashboard/")[1];

  const onEditHandler = (data: T) => {
    dispatch(setItem({ ...data }));
  };

  const deleteHandler = async (data: any) => {
    const { id, image } = data;
    if (image !== "") {
      await deleteImage(image);
    }

    await handleDelete(id);
  };

  const keys = Object.keys(data[0] || {}).slice(1, -2);

  const tHead = () => {
    return (
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Id</TableHead>
          {keys.map((key) => (
            <TableHead className="font-bold text-sm p-6 text-center" key={key}>
              {key.slice(0, 1).toUpperCase() + key.slice(1)}
            </TableHead>
          ))}
          <TableHead className="font-bold text-sm p-6 text-center">
            Update
          </TableHead>
          <TableHead className="font-bold text-sm p-6 text-center">
            Remove
          </TableHead>
        </TableRow>
      </TableHeader>
    );
  };

  const tdData = () => {
    return data.map((data, index) => {
      return (
        <TableBody className="text-gray-600 text-lg font-semibold" key={index}>
          <TableRow>
            <TableCell>{index + 1}</TableCell>
            {keys.map((key) => {
              return (
                <TableCell key={key} className="h-20">
                  {key === "image" ? (
                    <img
                      src={data[key]}
                      alt="Image"
                      className="h-40 w-28 m-auto"
                    />
                  ) : (
                    data[key]
                  )}
                </TableCell>
              );
            })}
            <TableCell>
              <AlertDialog>
                <AlertDialogTrigger
                  className="m-auto"
                  asChild
                  onClick={() => onEditHandler(data)}
                >
                  <TbEdit size={25} />
                </AlertDialogTrigger>
                <EditCategory />
              </AlertDialog>
            </TableCell>
            <TableCell>
              <button className="m-auto" onClick={() => deleteHandler(data)}>
                <TbTrash size={25} />
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    });
  };

  return (
    <div className="text-center w-full">
      {data.length > 0 ? (
        <Table className="w-3/5 table bg-stone-300 text-center m-auto mt-10">
          {tHead()}
          {tdData()}
        </Table>
      ) : (
        <h2 className="mt-10">
          No {`${location.slice(0, 1).toUpperCase()}${location.slice(1)}`}{" "}
          Available
        </h2>
      )}
    </div>
  );
};

export { TableComponent };
