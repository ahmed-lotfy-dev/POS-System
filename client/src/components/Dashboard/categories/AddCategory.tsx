import axios from "axios"
import { ToastContainer } from "react-toastify"
import { notify } from "../../../lib/toast"

import { FormEvent } from "react"
import { useRevalidator } from "react-router-dom"

function AddCategory() {
  const revalidator = useRevalidator()

  const onAddHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const category = formData.get("category")
    const { data } = await axios.post("/api/category/add", {
      name: category,
    })
    console.log(data)
    if (data.status === 409) notify(data.response.message, false)
    revalidator.revalidate()
  }

  return (
    <div className='flex justify-center items-center mt-10'>
      <button className='btn' onClick={() => window.my_modal_2.showModal()}>
        Add Category
      </button>
      <dialog id='my_modal_2' className='modal'>
        <form
          action=''
          method='dialog'
          className='modal-box flex flex-col'
          onSubmit={onAddHandler}
        >
          <label className='m-auto' htmlFor='category'>
            Category Name
          </label>
          <input
            className='input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 mt-10 m-auto '
            type='text'
            name='category'
            id='category'
          />
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
