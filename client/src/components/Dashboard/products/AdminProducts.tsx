import { AddProduct } from "./AddProduct"
import Table from "../Table/Table"
import { Link, useRouteLoaderData } from "react-router-dom"
import axios from "axios"
import { useRevalidator } from "react-router-dom"
import { ChangeEvent, useState } from "react"

type Product = {
  id: number
  name: string
  code: number
  category: string
  image: string
  price: number
  unit: string
}

const AdminProducts = () => {
  const { products } = useRouteLoaderData("root") as any
  console.log(products)
  const [imageLink, setImageLink] = useState<string>("")

  const revalidator = useRevalidator()

  const handleSave = async (item: Product) => {
    const response = await axios.patch(`/api/product/edit/${item?.id}`, {
      ...item,
      code: +item.code,
      image: imageLink,
    })
    revalidator.revalidate()
  }

  const handleDelete = async (id: number) => {
    const response = await axios.delete(`/api/product/delete/${id}`)
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
      <Link className='btn' to={"/dashboard/products/add"}>
        Add Product
      </Link>
      <Table<Product>
        tableData={products}
        handleSave={handleSave}
        handleDelete={handleDelete}
        uploadHandler={uploadHandler}
      />
    </div>
  )
}

export { AdminProducts }
