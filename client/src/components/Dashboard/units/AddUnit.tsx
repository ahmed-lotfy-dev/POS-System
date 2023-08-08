import axios from "axios"
import { ToastContainer } from "react-toastify"
import { notify } from "../../../lib/toast"

import { FormEvent } from "react"
import { useRevalidator } from "react-router-dom"
import { BackButton } from "../../Ui/BackButton/BackButton"

function AddUnit() {
  const revalidator = useRevalidator()

  const onAddHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const unit = formData.get("unit")
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/unit/add`, {
      name: unit,
    })
    console.log(data)
    if (data.status === 409) notify(data.response.message, false)
    revalidator.revalidate()
  }

  return (
    <div className='flex justify-center items-center'>
      <BackButton />
      <form
        action=''
        method='dialog'
        className='modal-box flex flex-col'
        onSubmit={onAddHandler}
      >
        <label className='m-auto' htmlFor='category'>
          Unit Name
        </label>
        <input
          className='input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 mt-10 m-auto '
          type='text'
          name='unit'
        />
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

export { AddUnit }
