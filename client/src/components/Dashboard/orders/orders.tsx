import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectMonth } from "@/components/ui/select-month/select-month";
import { AllDataResponse } from "@/types/globals";
import addDays from "date-fns/addDays";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useRouteLoaderData } from "react-router-dom";

type Props = {};

const Orders = ({}: Props) => {
  const { orders } = useRouteLoaderData("root") as AllDataResponse;
  console.log(orders);

  const [date, setDate] = useState<Date>();

  const filteredOrders = orders.filter((order) => {
    const { orderDate } = order;
    if (date) {
      return new Date(orderDate) > new Date(date);
    }
    return true;
  });

  console.log(date);

  return (
    <div className="flex flex-col justify-start items-center w-full">
      <SelectMonth className={"mt-16 mb-8"} date={date} setDate={setDate} />
      <h2 className="font-bold text-xl">Orders</h2>
      <div className="flex flex-wrap">
        {filteredOrders.map((order) => (
          <Card className="m-5" key={order.orderNumber}>
            <h2>{order.userId}</h2>
            <h2>{order.orderNumber}</h2>
            <h3>{new Date(order.orderDate).toLocaleDateString("en-UK")}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { Orders };
