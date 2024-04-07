import { TableComponent } from "../Table/Table";
import axios from "axios";
import { Link, useRevalidator, useRouteLoaderData } from "react-router-dom";
import { AllDataResponse } from "../../../types/globals";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AddUnit } from "./AddUnit";

type Unit = {
  id: string;
  name: string;
};

const AdminUnits = () => {
  const { units } = useRouteLoaderData("root") as AllDataResponse;
  console.log(units);
  const revalidator = useRevalidator();

  const handleSave = async (item: Unit) => {
    await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/unit/edit/${item?.id}`,
      {
        ...item,
      }
    );
    revalidator.revalidate();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/unit/delete/${id}`);
    revalidator.revalidate();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <AlertDialog>
        <Button asChild className="mt-10">
          <AlertDialogTrigger>Add Unit</AlertDialogTrigger>
        </Button>
        <AddUnit />
      </AlertDialog>
      <TableComponent<Unit>
        tableData={units}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export { AdminUnits };
