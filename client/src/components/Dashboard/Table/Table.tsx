import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Avatar,
  Modal,
  ModalContent,
} from "@heroui/react";

import { ChangeEvent } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import { useDeleteImage } from "../../../hooks/useDeleteImage";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../../../store/features/Item/itemSlice";
import { RootState } from "../../../store/store";
import { useLocation, useRouteLoaderData } from "react-router-dom";

import { EditCategory } from "../categories/EditCategory";
import { AllDataResponse } from "@/types/globals";
import { EditProduct } from "../products/EditProduct";
import { EditUnit } from "../units/EditUnit";

type TableProps<T> = {
  tableData: T[];
  handleSave: (data: T) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  uploadHandler?: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

// Separate component to handle modal state
const EditDialogCell = ({
  data,
  location,
  onEditHandler,
}: {
  data: any;
  location: string;
  onEditHandler: (data: any) => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => {
          onEditHandler(data);
          setIsOpen(true);
        }}
        className="inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      >
        <TbEdit size={20} className="text-blue-600 dark:text-blue-400" />
      </button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen} scrollBehavior="inside">
        <ModalContent>
          {location === "categories" && (
            <EditCategory onClose={() => setIsOpen(false)} />
          )}
          {location === "products" && (
            <EditProduct onClose={() => setIsOpen(false)} />
          )}
          {location === "units" && (
            <EditUnit onClose={() => setIsOpen(false)} />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const TableComponent = <T extends Record<string, any>>({
  tableData,
  handleDelete,
}: TableProps<T>) => {
  const item = useSelector((state: RootState) => state.item);

  const data = tableData || [];

  const dispatch = useDispatch();
  const { deleteImage } = useDeleteImage();

  const location = useLocation().pathname.split("/dashboard/")[1];

  const { categories } = useRouteLoaderData("root") as AllDataResponse;
  const { units } = useRouteLoaderData("root") as AllDataResponse;

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

  const user = useSelector((state: RootState) => state.user.user);

  const keys = Object.keys(data[0] || {}).slice(1, -2);

  const columns = [
    { key: "id", label: "Id" },
    ...keys.map((key) => ({
      key,
      label: key.slice(0, 1).toUpperCase() + key.slice(1),
    })),
    ...(user?.role === "ADMIN"
      ? [
          { key: "update", label: "Update" },
          { key: "remove", label: "Remove" },
        ]
      : []),
  ];

  const renderCell = React.useCallback(
    (data: any, columnKey: React.Key) => {
      const cellValue = data[columnKey as string];

      switch (columnKey) {
        case "id":
          return tableData.indexOf(data) + 1;
        case "image":
          return (
            <Avatar
              src={cellValue}
              alt={data.name || "Item"}
              className="w-12 h-12 m-auto"
              size="md"
              showFallback
            />
          );
        case "unitId":
          return units.find((unit) => unit.id === cellValue)?.name || cellValue;
        case "categoryId":
          return (
            categories.find((category) => category.id === cellValue)?.name ||
            cellValue
          );
        case "update":
          return (
            <EditDialogCell
              data={data}
              location={location}
              onEditHandler={onEditHandler}
            />
          );
        case "remove":
          return (
            <Button
              isIconOnly
              color="danger"
              variant="light"
              onPress={() => deleteHandler(data)}
              className="hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <TbTrash size={20} className="text-red-600 dark:text-red-400" />
            </Button>
          );
        default:
          return cellValue;
      }
    },
    [categories, units, onEditHandler, deleteHandler, tableData]
  );

  return (
    <div className="w-full h-full overflow-auto">
      {data.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4">
          <Table
            aria-label="Data Table"
            classNames={{
              wrapper: "bg-transparent shadow-none p-0",
              th: "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600",
              td: "text-gray-900 dark:text-gray-100",
              tr: "hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.key}
                  className="text-center font-bold"
                  align="center"
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={data}>
              {(item) => (
                <TableRow key={item.id || item.code || Math.random()}>
                  {(columnKey) => (
                    <TableCell className="text-center">
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-10">
          <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
            No {`${location.slice(0, 1).toUpperCase()}${location.slice(1)}`}{" "}
            Available
          </h2>
        </div>
      )}
    </div>
  );
};

export { TableComponent };
