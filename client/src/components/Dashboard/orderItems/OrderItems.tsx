import { AllDataResponse } from "@/types/globals";
import React from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";

type Props = {};

const OrderItems = ({}: Props) => {
  const { orderItems }: any = useLoaderData();
  const { products } = useRouteLoaderData("root") as AllDataResponse;

  console.log(orderItems);
  return (
    <div>
      {orderItems.map((orderItem: any) =>
        products
          .filter((product) => orderItem.productId === product.id)
          .map((item) => <h1 key={orderItem.id}>{item.name}</h1>)
      )}
    </div>
  );
};

export { OrderItems };
