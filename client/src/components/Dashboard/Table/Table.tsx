import React from "react"
import { ChangeEvent } from "react"
import { Table } from "@mantine/core"
import { TbEdit, TbTrash } from "react-icons/tb"
import { useDeleteImage } from "../../../hooks/useDeleteImage"
import { useDispatch, useSelector } from "react-redux"
import { setItem } from "../../../store/features/Item/itemSlice"
import { RootState } from "../../../store/store"
import { useLocation, useNavigate } from "react-router-dom"

type TableProps<T> = {
  tableData: T[]
  handleSave: (data: T) => Promise<void>
  handleDelete: (id: number) => Promise<void>
  uploadHandler?: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
}

const TableComponent = <T extends Record<string, any>>({
  tableData,
  handleDelete,
}: TableProps<T>) => {
  const item = useSelector((state: RootState) => state.item)
  console.log(item)
  const navigate = useNavigate()
  const data = tableData || []
  const dispatch = useDispatch()
  const { deleteImage } = useDeleteImage()
  const location = useLocation().pathname

  const onEditHandler = (data: T) => {
    dispatch(setItem({ ...data }))
    if (location.includes("categories")) {
      setTimeout(() => {
        navigate("/dashboard/categories/edit")
      }, 100)
    }
    if (location.includes("products")) {
      setTimeout(() => {
        navigate("/dashboard/products/edit")
      }, 100)
    }
    if (location.includes("units")) {
      setTimeout(() => {
        navigate("/dashboard/units/edit")
      }, 100)
    }
  }

  const deleteHandler = (data: any) => {
    handleDelete(data.id)
    deleteImage(data.image)
  }
  const keys = Object.keys(data[0] || {}).slice(1, -2)

  const tHead = () => {
    return (
      <tr className='text-lg font-semibold'>
        <td>ID</td>
        {keys.map((key) => (
          <td key={key}>{key.toUpperCase()}</td>
        ))}
        <th>Update</th>
        <th>Remove</th>
      </tr>
    )
  }

  const tdData = () => {
    return data.map((data, index) => {
      return (
        <tr className='text-gray-600 text-lg font-semibold' key={index}>
          <td>{index + 1}</td>
          {keys.map((key) => {
            return (
              <React.Fragment key={key}>
                <td className='h-20'>
                  {key === "image" ? (
                    <img src={data[key]} alt='Image' className='h-40 w-28 ' />
                  ) : (
                    data[key]
                  )}
                </td>
              </React.Fragment>
            )
          })}
          <td>
            <button className='ml-8' onClick={() => onEditHandler(data)}>
              <TbEdit size={25} />
            </button>
          </td>
          <td>
            <button onClick={() => deleteHandler(data)}>
              <TbTrash size={25} />
            </button>
          </td>
        </tr>
      )
    })
  }

  return (
    <Table className='mt-10 w-3/5 table bg-stone-300 text-center'>
      <thead className="text-gray-500 p-10'">{tHead()}</thead>
      <tbody>{tdData()}</tbody>
    </Table>
  )
}

export { TableComponent }
