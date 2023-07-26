import { ReactElement } from "react"
import { NavLink } from "react-router-dom"
import { twMerge } from "tailwind-merge"

type Props = {
  children?: ReactElement | ReactElement[]
  name: string
  linkTo?: any
  onHandler?: () => void
}

function NavLi({ name, linkTo, children, onHandler, ...props }: Props) {
  return (
    <div className='flex space-x-2' onClick={onHandler}>
      {children}
      <NavLink
        className={twMerge("font-semibold dark:text-gray-300")}
        to={linkTo}
        {...props}
      >
        {name}
      </NavLink>
    </div>
  )
}

export { NavLi }
