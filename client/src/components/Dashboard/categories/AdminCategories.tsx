import AddCategory from "./AddCategory"
import Table from "../../Table/Table"
import { useLoaderData } from "react-router-dom"
import axios from "axios"
import { useRevalidator } from "react-router-dom"

type Category = {
  id: number
}

function DashboardCategories() {
  const tableData = useLoaderData() as Category[]
  console.log(tableData)
  const revalidator = useRevalidator()

  const handleSave = async (item: Category) => {
    const response = await axios.patch(`/api/category/edit/${item?.id}`, {
      ...item,
    })
    revalidator.revalidate()
  }

  const handleDelete = async (id: number) => {
    const response = await axios.delete(`/api/category/delete/${id}`)
    revalidator.revalidate()
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <AddCategory />
      <Table<Category>
        tableData={tableData}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default DashboardCategories
