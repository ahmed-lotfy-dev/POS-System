import { TableComponent } from "../Table/Table"
import { Link, useRouteLoaderData } from "react-router-dom"
import axios from "axios"
import { useRevalidator } from "react-router-dom"
import { ChangeEvent, useState } from "react"

type Category = {
  id: number
  image: string
}

function AdminCategories() {
  const { categories } = useRouteLoaderData("root") as any
  console.log(categories)
  const [imageLink, setImageLink] = useState<string>("")

  const revalidator = useRevalidator()

  const handleSave = async (item: Category) => {
    const response = await axios.patch(`/api/category/edit/${item?.id}`, {
      ...item,
      image: imageLink,
    })
    revalidator.revalidate()
  }

  const handleDelete = async (id: number) => {
    const response = await axios.delete(`/api/category/delete/${id}`)
    revalidator.revalidate()
  }

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const { data } = await axios.post(
        "/api/upload/product",
        { image: event.target.files[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      console.log(data)
      setImageLink(data.image)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <Link className='btn' to={"/dashboard/categories/add"}>
        Add Category
      </Link>
      <TableComponent<Category>
        tableData={categories}
        handleSave={handleSave}
        handleDelete={handleDelete}
        uploadHandler={uploadHandler}
      />
    </div>
  )
}

export { AdminCategories }
