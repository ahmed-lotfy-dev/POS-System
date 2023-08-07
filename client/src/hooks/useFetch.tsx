import { AxiosResponse, AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"

type AxiosFunction = (
  url: string,
  config?: AxiosRequestConfig
) => Promise<AxiosResponse>

function useFetch(
  axiosFunction: AxiosFunction,
  url: string,
  config?: AxiosRequestConfig
) {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<unknown>(null)
  const [error, setError] = useState<unknown | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axiosFunction(url, config)
        setData(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [axiosFunction, url, config])

  return { data, isLoading, error }
}

export default useFetch
