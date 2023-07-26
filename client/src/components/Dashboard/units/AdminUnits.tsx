import { AddUnit } from "./AddUnit"
import Table from "../Table/Table"
import axios from "axios"
import { Link, useRevalidator, useRouteLoaderData } from "react-router-dom"

type Unit = {
  id: number
  name: string
}

const AdminUnits = () => {
  const { units } = useRouteLoaderData("root") as any
  console.log(units)
  const revalidator = useRevalidator()

  const handleSave = async (item: Unit) => {
    const response = await axios.patch(`/api/unit/edit/${item?.id}`, {
      ...item,
    })
    revalidator.revalidate()
  }

  const handleDelete = async (id: number) => {
    const response = await axios.delete(`/api/unit/delete/${id}`)
    revalidator.revalidate()
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <Link className='btn' to={"/dashboard/units/add"}>
        Add Unit
      </Link>{" "}
      <Table<Unit>
        tableData={units}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export { AdminUnits }
