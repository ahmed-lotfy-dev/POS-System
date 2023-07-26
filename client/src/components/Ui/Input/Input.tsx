import { Input } from "@mantine/core"

type Props = {
  name: string
  type: string
  value: any
  placeholder?: string
  className: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function InputComponent({
  name,
  value,
  placeholder,
  type,
  onChange,
  className,
  ...props
}: Props) {
  return (
    <Input
      className={className}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    />
  )
}

export { InputComponent }
