import axios from "axios"
import { ToastContainer } from "react-toastify"
import { notify } from "../../../lib/toast"

import { ChangeEvent, FormEvent, useRef } from "react"
import { useNavigate, useRevalidator } from "react-router-dom"
import { useUploadImage } from "../../../hooks/useUploadImage"
import { Loader } from "@mantine/core"
import { BackButton } from "../../Ui/BackButton/BackButton"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { setItem } from "../../../store/features/Item/itemSlice"

const AddCategory = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const revalidator = useRevalidator()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const editItem = useSelector((state: RootState) => state.item.item)
  const { uploadImage, imageLink, isPending,
    //error
   } = useUploadImage()

  const onAddHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get("name")
    const image = imageLink
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/category/add`, {
      name,
      image,
    })
    console.log(data)
    if (data.status === 409) notify(data.response.message, false)
    revalidator.revalidate()
    formRef.current?.reset()
    dispatch(setItem(null))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const onEditHandler = async (id: number) => {
    console.log("on edit handler")
    const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/category/edit/${id}`, {
      ...editItem,
    })
    console.log(response)
    setTimeout(() => {
      dispatch(setItem(null))
      revalidator.revalidate()
    }, 100)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editItem) {
      await onEditHandler(editItem.id)
    } else {
      onAddHandler(event)
    }
    navigate(-1)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    dispatch(setItem({ ...editItem, [name]: value }))
  }

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      uploadImage(event.target.files[0])
      dispatch(setItem({ ...editItem, image: imageLink }))
    }
  }

  return (
    <div className='flex justify-center items-center mt-10 w-full '>
      <BackButton />
      <form
        ref={formRef}
        action=''
        method='dialog'
        className='modal-box flex flex-col'
        onSubmit={onSubmit}
      >
        <label className='m-auto' htmlFor='name'>
          Category Name
        </label>
        <input
          className='input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 mt-10 m-auto focus:bg-gray-200 bg-gray-100'
          type='text'
          name='name'
          id='name'
          value={editItem?.name || ""}
          onChange={onChange}
        />
        <>
          <button
            className='input text-center w-full bg-gray-700 text-gray-200'
            onClick={() => uploadHandler}
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
        {editItem?.image && (
          <div>
            <img
              src={editItem.image}
              alt={`${editItem.name} image`}
              className={`${
                editItem?.image ? "block" : "hidden"
              } w-80 m-auto my-10`}
            />
          </div>
        )}
        <button
          type='submit'
          className='btn-neutral rounded-lg w-1/4 py-2 m-auto'
        >
          {editItem ? "Save" : "Add"}
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export { AddCategory }
