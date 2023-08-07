import { Button } from "@mantine/core"
import { ReactElement } from "react"

type Props = {
  name: string
  children?: ReactElement | ReactElement[]
}

function ButtonComponent({ name, children, ...props }: Props) {
  return (
    <Button {...props}>
      {children}
      {name}
    </Button>
  )
}

export { ButtonComponent }
