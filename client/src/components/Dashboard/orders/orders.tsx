import { Card } from "@/components/ui/card";
import { AllDataResponse } from "@/types/globals";
import { useRouteLoaderData } from "react-router-dom";

type Props = {};

const Orders = ({}: Props) => {
  const { orders } = useRouteLoaderData("root") as AllDataResponse;
  console.log(orders);

  // Get the current date and format it as "MM/DD/YYYY"
  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  console.log("todayDate:", todayDate);

  // Filter orders with orderDate equal to the current date
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.orderDate).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    console.log("Order Date:", orderDate);
    return orderDate === todayDate;
  });

  return (
    <div className="flex flex-col justify-center items-center w-full">
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
      <div>
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
