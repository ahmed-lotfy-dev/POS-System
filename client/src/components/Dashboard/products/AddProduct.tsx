import axios from "axios"
import { ToastContainer } from "react-toastify"
import { notify } from "../../../lib/toast"

import { ChangeEvent, FormEvent, useState } from "react"

function AddCategory() {
  const [imagePreview, setImagePreview] = useState<string | undefined>("")

  const onAddHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get("name")
    const code = formData.get("code")
    const category = formData.get("category")
    const price = formData.get("price")
    const unit = formData.get("unit")
    const image = formData.get("image")
    const { data } = await axios.post("http://localhost:3001/category/add", {
      name,
      code,
      category,
      price,
      unit,
      image,
    })
    console.log(data)
    if (data.status === 409) notify(data.response.message, false)
  }

  const imageUploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const imagePreviewUrl = URL.createObjectURL(event.target.files[0])
      setImagePreview(imagePreviewUrl)
    }
  }

  return (
    <div className='flex justify-center items-center mt-10'>
      <button className='btn' onClick={() => window.my_modal_2.showModal()}>
        Add Product
      </button>
      <dialog id='my_modal_2' className='modal'>
        <form
          action=''
          method='dialog'
          className='modal-box flex flex-col'
          onSubmit={onAddHandler}
        >
          <div className='flex flex-col my-5'>
            <label className='m-auto' htmlFor='productName'>
              Product Name
            </label>
            <input
              className='input input-bordered border-b-gray-100 input-xs w-full max-w-xs mt-2 m-auto '
              type='text'
              name='name'
              id='name'
            />
          </div>

          <div className='flex flex-col my-5'>
            <label className='m-auto' htmlFor='productCode'>
              Product Code
            </label>
            <input
              className='input input-bordered border-b-gray-100 input-xs w-full max-w-xs mt-2 m-auto '
              type='number'
              name='code'
              id='code'
            />
          </div>

          <div className='flex flex-col my-5'>
            <label className='m-auto' htmlFor='productCategory'>
              Product Category
            </label>
            <input
              className='input input-bordered border-b-gray-100 input-xs w-full max-w-xs mt-2 m-auto '
              type='text'
              name='category'
              id='category'
            />
          </div>

          <div className='flex flex-col my-5'>
            <label className='m-auto' htmlFor='productPrice'>
              Product Price
            </label>
            <input
              className='input input-bordered border-b-gray-100 input-xs w-full max-w-xs mt-2 m-auto '
              type='number'
              name='price'
              id='price'
            />
          </div>

          <div className='flex flex-col my-5'>
            <label className='m-auto' htmlFor='productUnit'>
              Product Unit
            </label>
            <input
              className='input input-bordered border-b-gray-100 input-xs w-full max-w-xs mt-2 m-auto '
              type='text'
              name='unit'
              id='unit'
            />
          </div>

          <div className='flex flex-col my-5'>
            <label className='m-auto' htmlFor='productCategory'>
              Product Image
            </label>
            <input
              className='input input-bordered border-b-gray-100 input-xs w-full max-w-xs mt-2 m-auto '
              type='file'
              name='image'
              id='image'
              onChange={imageUploadHandler}
            />
          </div>
          <div>
            <img
              src={imagePreview}
              alt='product image'
              className='w-80 m-auto my-10'
            />
          </div>
          <button
            type='submit'
            className='btn-neutral rounded-lg w-1/4 py-2 m-auto'
          >
            Add
          </button>
        </form>
        <ToastContainer />
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default AddCategory
