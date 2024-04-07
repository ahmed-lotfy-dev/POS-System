import { useEffect, useState } from "react"

type Props = {
  value: string
  time: number
}

function useDebounce({ value, time }: Props) {
  const [searchValue, setSearchValue] = useState<string>("")

  useEffect(() => {
    setTimeout(() => {
      setSearchValue(value)
    }, time)
  }, [value])
  return { searchValue }
}

export default useDebounce
