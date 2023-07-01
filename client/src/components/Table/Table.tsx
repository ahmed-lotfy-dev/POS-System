import axios from "axios"
import React, { useRef } from "react"
import { useState, ChangeEvent } from "react"
import { TbDeviceFloppy, TbEdit, TbTrash, TbX } from "react-icons/tb"

type TableProps<T> = {
  tableData: T[]
  handleSave: (data: T) => Promise<void>
  handleDelete: (id: number) => Promise<void>
  uploadHandler?: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
}

export default function Table<T extends Record<string, any>>({
  tableData,
  handleSave,
  handleDelete,
  uploadHandler,
}: TableProps<T>) {
  const [editableRow, setEditableRow] = useState<number | null>(null)
  const [editableItem, setEditableItem] = useState<T>()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditableItem({
      ...editableItem!,
      [event.target.name]: event.target.value,
    })
  }

  const onEditHandler = (data: T) => {
    setEditableRow(data.id)
    setEditableItem({ ...data })
  }

  const keys = Object.keys(tableData[0] || {}).slice(1, -2)

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
    return tableData.map((data, index) => {
      return (
        <tr className='text-gray-600 text-lg font-semibold' key={index}>
          <td>{index + 1}</td>
          {keys.map((key) => {
            return (
              <React.Fragment key={key}>
                {editableRow === data.id ? (
                  <td className='h-20'>
                    {key === "image" ? (
                      <>
                        <button
                          className='input text-center w-full bg-gray-700 text-gray-200'
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Upload
                        </button>
                        <input
                          className='hidden'
                          type='file'
                          name={key}
                          ref={fileInputRef}
                          onChange={uploadHandler}
                        />
                      </>
                    ) : (
                      <input
                        className='input file-input w-full max-w-xs text-center bg-gray-700 text-gray-200'
                        type='text'
                        name={key}
                        value={editableItem![key]}
                        onChange={handleChange}
                      />
                    )}
                  </td>
                ) : (
                  <td className='h-20'>
                    {key === "image" ? (
                      <img src={data[key]} alt='Image' className='h-40 w-28 ' />
                    ) : (
                      data[key]
                    )}
                  </td>
                )}
              </React.Fragment>
            )
          })}
          <td>
            {editableRow === data.id ? (
              <div className='space-x-1'>
                <button
                  onClick={() => {
                    handleSave(editableItem as T)
                    setEditableRow(null)
                  }}
                >
                  <TbDeviceFloppy size={25} />
                </button>
                <button
                  onClick={() => {
                    setEditableItem({ ...data })
                    setEditableRow(null)
                  }}
                >
                  <TbX size={25} />
                </button>
              </div>
            ) : (
              <button className='ml-8' onClick={() => onEditHandler(data)}>
                <TbEdit size={25} />
              </button>
            )}
          </td>
          <td>
            <button onClick={() => handleDelete(data.id)}>
              <TbTrash size={25} />
            </button>
          </td>
        </tr>
      )
    })
  }

  return (
    <table className='mt-10 w-3/5 table bg-stone-300 text-center'>
      <thead className="text-gray-500 p-10'">{tHead()}</thead>
      <tbody>{tdData()}</tbody>
    </table>
  )
}
