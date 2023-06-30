import AddUnit from "./AddUnit"
import Table from "../../Table/Table"
import axios from "axios"
import { useLoaderData, useRevalidator } from "react-router-dom"

type Unit = {
  id: number
  name: string
}

function DashboardUnits() {
  const tableData = useLoaderData() as Unit[]
  console.log(tableData)
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
      <AddUnit />
      <Table<Unit>
        tableData={tableData}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default DashboardUnits
