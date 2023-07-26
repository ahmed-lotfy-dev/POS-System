import { BsArrowLeft } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

function BackButton() {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }
  
  return (
    <div
      className='flex justify-normal items-start h-full ml-10'
      onClick={goBack}
    >
      <BsArrowLeft size={30} color={"orange"} />
    </div>
  )
}

export { BackButton }
