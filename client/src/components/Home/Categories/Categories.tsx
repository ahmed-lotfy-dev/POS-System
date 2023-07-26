import { useRouteLoaderData } from "react-router-dom"
import { AllDataResponse } from "../../../types/globals"
type Props = {}

function Categories({}: Props) {
  const { categories } = useRouteLoaderData("root") as AllDataResponse
  console.log(categories)
  return (
    <div className=''>
      {categories.map((category) => (
        <h1>{category.name}</h1>
      ))}
    </div>
  )
}

export { Categories }
