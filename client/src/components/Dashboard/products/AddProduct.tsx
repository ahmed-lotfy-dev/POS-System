import axios from "axios"
import { ToastContainer } from "react-toastify"
import { notify } from "../../../lib/toast"

import { ChangeEvent, FormEvent, useRef } from "react"
import { useRevalidator, useRouteLoaderData } from "react-router-dom"
import { useUploadImage } from "../../../hooks/useUploadImage"
import { Loader } from "@mantine/core"
import { AllDataResponse, Category, Unit } from "../../../types/globals"
import { BackButton } from "../../Ui/BackButton/BackButton"

const AddProduct = () => {
  const { categories, units } = useRouteLoaderData("root") as AllDataResponse
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const revalidator = useRevalidator()

  const { uploadImage, imageLink, isPending, 
    //error
   } = useUploadImage()

  const onAddHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get("name")
    const code = formData.get("code")
    const price = formData.get("price")
    const categoryId = formData.get("categoryId")
    const unitId = formData.get("unitId")

    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/add`, {
      name,
      code,
      price,
      categoryId,
      unitId,
      image: imageLink,
    })
    console.log(data)
    if (data.status === 409) notify(data.response.message, false)
    revalidator.revalidate()
    formRef.current?.reset()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      uploadImage(event.target.files[0])
    }
  }

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
  }

  return (
    <div className='flex justify-center items-center mt-10'>
      <BackButton />
      <form
        ref={formRef}
        action=''
        method='dialog'
        className='modal-box flex flex-col'
        onSubmit={onAddHandler}
      >
        <div className='flex flex-col my-5'>
          <input
            className='input input-bordered border-b-gray-100 input-xs w-full max-w-xs mt-2 m-auto '
            type='text'
            name='name'
            id='name'
            placeholder='Product Name'
          />
        </div>

        <div className='flex flex-col my-5'>
          <input
            className='input input-bordered border-b-gray-100 input-xs w-full max-w-xs mt-2 m-auto '
            type='number'
            name='code'
            id='code'
            placeholder='Product Code'
          />
        </div>

        <div className='flex flex-col my-5'>
          <input
            className='input input-bordered border-b-gray-100 input-xs w-full max-w-xs mt-2 m-auto '
            type='number'
            name='price'
            id='price'
            placeholder='Product Price'
          />
        </div>

        <div className='flex flex-col my-5'>
          <select onChange={selectHandler} name='categoryId'>
            {categories.map((category: Category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              )
            })}
          </select>
        </div>

        <div className='flex flex-col my-5'>
          <select onChange={selectHandler} name='unitId'>
            {units.map((unit: Unit) => {
              return (
                <option value={unit.id} key={unit.id}>
                  {unit.name}
                </option>
              )
            })}
          </select>
        </div>

        <div className='flex flex-col my-5'>
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
        </div>
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
    </div>
  )
}

export { AddProduct }
