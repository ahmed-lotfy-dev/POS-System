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
import { AllDataResponse } from "@/types/globals";
import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

type Props = {};

const Orders = ({}: Props) => {
  const { orders } = useRouteLoaderData("root") as AllDataResponse;
  console.log(orders);

  // Get the current date and format it as "MM/DD/YYYY"
  const todayDate = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")[0];

  console.log("todayDate:", todayDate);

  // Filter orders with orderDate equal to the current date
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.orderDate)
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .split("/")[0];
    console.log("Order Date:", orderDate);
    return orderDate === todayDate;
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div>
        <Select >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Months</SelectLabel>
              {months.map((month, index) => (
                <SelectItem key={index} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <h2>normal all orders</h2>
      <div className="flex flex-wrap">
        {orders.map((order) => (
          <Card className="m-5" key={order.orderNumber}>
            <h2>{order.userId}</h2>
            <h2>{order.orderNumber}</h2>
            <h3>{new Date(order.orderDate).toLocaleDateString("en-UK")}</h3>
          </Card>
        ))}
      </div>
      <h2>filteredOrders</h2>
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
