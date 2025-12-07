import { TableComponent } from "../Table/Table";
import axios from "axios";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
import { AllDataResponse, Unit } from "../../../types/globals";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AddUnit } from "./AddUnit";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const AdminUnits = () => {
  const { units } = useRouteLoaderData("root") as AllDataResponse;
  console.log(units);
  const revalidator = useRevalidator();
  const user = useSelector((state: RootState) => state.user.user);

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
    <div className="w-full h-full overflow-auto p-6">
      <AddUnit />
      <TableComponent<Unit>
        tableData={units}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export { AdminUnits };
