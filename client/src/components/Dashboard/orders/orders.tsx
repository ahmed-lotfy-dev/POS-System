import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectMonth } from "@/components/ui/select-month/select-month"
import { AllDataResponse } from "@/types/globals"
import { addDays } from "date-fns/addDays"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { Link, useRouteLoaderData } from "react-router-dom"

type Props = {}

const Orders = ({}: Props) => {
  const { orders } = useRouteLoaderData("root") as AllDataResponse
  console.log(orders)

  const [date, setDate] = useState<Date>()

  const filteredOrders = orders.filter((order) => {
    const { orderDate } = order
    if (date) {
      return new Date(orderDate) > new Date(date)
    }
    return true
  })

  console.log(date)

  function formatTimeWithLeadingZero(value: number) {
    return value < 10 ? `0${value}` : `${value}`
  }

  return (
    <div className="flex flex-col justify-start items-center w-full p-10">
      <SelectMonth className={"mt-16 mb-8"} date={date} setDate={setDate} />
      <h2 className="font-bold text-xl mb-10">Orders</h2>
      <Card className="flex flex-wrap justify-start items-start p-10">
        {filteredOrders.map((order) => (
          <Link to={`/dashboard/orders/${order.orderNumber}`}>
            <Card className="m-5 px-10 py-6 h-36" key={order.orderNumber}>
              <h2>{order.orderNumber}</h2>
              <h3>{`${formatTimeWithLeadingZero(
                new Date(order.orderDate).getHours()
              )}:${formatTimeWithLeadingZero(
                new Date(order.orderDate).getMinutes()
              )}`}</h3>

              <h3>{new Date(order.orderDate).toLocaleDateString("en-UK")}</h3>
            </Card>
          </Link>
        ))}
      </Card>
    </div>
  )
}

export { Orders }
