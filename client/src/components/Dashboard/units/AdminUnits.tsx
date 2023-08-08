import { TableComponent } from "../Table/Table"
import axios from "axios"
import { Link, useRevalidator, useRouteLoaderData } from "react-router-dom"
import { AllDataResponse } from "../../../types/globals"

type Unit = {
  id: number
  name: string
}

const AdminUnits = () => {
  const { units } = useRouteLoaderData("root") as AllDataResponse
  console.log(units)
  const revalidator = useRevalidator()

  const handleSave = async (item: Unit) => {
    await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/unit/edit/${item?.id}`, {
      ...item,
    })
    revalidator.revalidate()
  }

  const handleDelete = async (id: number) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/unit/delete/${id}`)
    revalidator.revalidate()
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <Link className='btn' to={"/dashboard/units/add"}>
        Add Unit
      </Link>{" "}
      <TableComponent<Unit>
        tableData={units}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export { AdminUnits }
