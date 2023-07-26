import axios from "axios"
import { ToastContainer } from "react-toastify"
import { notify } from "../../../lib/toast"

import { ChangeEvent, FormEvent, useRef } from "react"
import { useRevalidator } from "react-router-dom"
import { useUpload } from "../../../hooks/useUpload"
import { Loader } from "@mantine/core"

function AddCategory() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const revalidator = useRevalidator()

  const { uploadImage, imageLink, isPending, error } = useUpload()

  const onAddHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get("name")
    console.log(imageLink)
    const image = imageLink
    console.log(image)
    const { data } = await axios.post("/api/category/add", {
      name,
      image,
    })
    console.log(data)
    if (data.status === 409) notify(data.response.message, false)
    revalidator.revalidate()
  }

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      uploadImage(event.target.files[0])
    }
  }

  return (
    <div className='flex justify-center items-center mt-10'>
      <button className='btn' onClick={() => window.my_modal_2.showModal()}>
        Add Category
      </button>
      <dialog id='my_modal_2' className='modal'>
        <form
          ref={formRef}
          action=''
          method='dialog'
          className='modal-box flex flex-col'
          onSubmit={onAddHandler}
        >
          <label className='m-auto' htmlFor='name'>
            Category Name
          </label>
          <input
            className='input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 mt-10 m-auto '
            type='text'
            name='name'
            id='name'
          />
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
              name='image'
              ref={fileInputRef}
              onChange={uploadHandler}
            />
          </>
          {isPending ? (
            <div className='flex justify-center items-center mt-6'>
              <Loader />
            </div>
          ) : null}
          <div>
            <img
              src={imageLink ?? ""}
              alt='product image'
              className={`${imageLink ? "block" : "hidden"} w-80 m-auto my-10`}
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
