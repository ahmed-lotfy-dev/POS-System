import { useLocation } from "react-router-dom"
import { BackButton } from "../../Ui/BackButton/BackButton"
import { RootState } from "../../../store/store"
import { useSelector } from "react-redux"

type Props = {}

function Edit({}: Props) {
  const location = useLocation().pathname
  const editItem = useSelector((state: RootState) => state.item.item)
  const objectKeys = editItem ? Object.keys(editItem).slice(1, -2) : []

  console.log(location)
  
  const onSaveHandler = () => {
    console.log("saving item")
  }

  return (
    <div>
      Edit Component
      <div className='flex flex-col'>
        {objectKeys.map((key) =>
          key === "image" ? (
            <input key={key} type='file' />
          ) : (
            <input key={key} value={editItem[key] || ""} />
          )
        )}
        <button onClick={onSaveHandler}>Save</button>
      </div>
      <BackButton />
    </div>
  )
}

export { Edit }
