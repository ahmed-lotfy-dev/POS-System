import { BsArrowLeft } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setItem } from "../../../store/features/Item/itemSlice"

function BackButton() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const goBack = () => {
    navigate(-1)
    dispatch(setItem(null))
  }

  return (
    <div
      className='flex justify-normal items-start h-full ml-10 absolute left-0 mt-10'
      onClick={goBack}
    >
      <BsArrowLeft size={30} color={"blue"} />
    </div>
  )
}

export { BackButton }
