import { ChangeEvent, useState } from "react"
import { Product } from "./AdminProducts"
import { TbDeviceFloppy, TbEdit, TbTrash, TbX } from "react-icons/tb"
import axios from "axios"

type Props = {
  products: Product[]
  fetchData: () => void
}

export default function ProductsTable({ products, fetchData }: Props) {
  const [editing, setEditing] = useState(false)
  const [editableRow, setEditableRow] = useState<number>()
  const [editableProduct, setEditableProduct] = useState<Product>()

  const saveProductData = async () => {
    const response = await axios.patch(
      `/api/product/edit/${editableProduct?.id}`,
      {
        // name: editableProduct?.name,
        name: "Hello World",
      }
    )
    const data = response.data
    console.log(data)
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEditableProduct({
      ...editableProduct!,
      [event.target.name]: event.target.value,
    })
  }

  const onEditHandler = (product: Product) => {
    setEditing(true)
    setEditableRow(product.id)
    setEditableProduct({ ...product })
  }
  console.log(editableProduct)

  const onSaveHandler = () => {
    saveProductData()
    fetchData()
    setEditing(false)
  }
console.log(products)
const editedProducts= Object.keys(products[0])
console.log(editedProducts)
  return (
    <div className='mt-10 w-2/3'>
      <table className='table bg-stone-300 text-center'>
        <thead className='text-stone-500 p-10'>
          <tr className='text-lg font-semibold'>
            <th>#</th>
            <th>Name</th>
            <th>Code</th>
            <th>Category</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Update</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, idx) => (
            <tr
              className='text-stone-950 text-lg font-semibold'
              key={product.id}
            >
              <td>{idx + 1}</td>
              {editing ? (
                <>
                  <td>
                    <input
                      className='input w-full max-w-xs bg-gray-600'
                      type='text'
                      value={editableProduct?.name}
                      onChange={onChangeHandler}
                    />
                  </td>
                  <td>
                    <input
                      className='input w-full max-w-xs bg-gray-600'
                      type='text'
                      value={editableProduct?.code}
                      onChange={onChangeHandler}
                    />
                  </td>
                  <td>
                    <input
                      className='input w-full max-w-xs bg-gray-600'
                      type='text'
                      value={editableProduct?.category}
                      onChange={onChangeHandler}
                    />
                  </td>
                  <td>
                    <input
                      className='input w-full max-w-xs bg-gray-600'
                      type='text'
                      value={editableProduct?.price}
                      onChange={onChangeHandler}
                    />
                  </td>
                  <td>
                    <input
                      className='input w-full max-w-xs bg-gray-600'
                      type='text'
                      value={editableProduct?.unit}
                      onChange={onChangeHandler}
                    />
                  </td>{" "}
                  <td>
                    <div className='space-x-1'>
                      <button onClick={() => onSaveHandler()}>
                        <TbDeviceFloppy size={25} />
                      </button>
                      <button onClick={() => setEditing(false)}>
                        <TbX size={25} />
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{product.name}</td>
                  <td>{product.code}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.unit}</td>
                  <td>
                    <button onClick={() => onEditHandler(product)}>
                      <TbEdit size={25} />
                    </button>
                  </td>
                </>
              )}
              <td className='block'>
                <button>
                  <TbTrash size={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
