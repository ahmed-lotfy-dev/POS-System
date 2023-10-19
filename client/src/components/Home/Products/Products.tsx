import { Card } from "@/components/ui/card";
import { AllDataResponse } from "@/types/globals";
import React from "react";
import { useRouteLoaderData } from "react-router-dom";

type Props = {};

function Products({}: Props) {
  const { categories, products } = useRouteLoaderData(
    "root"
  ) as AllDataResponse;

  console.log(products);

  return (
    <div className="w-full justify-start items-start h-8 mb-10 flex flex-col">
      <div className="pl-6">
        <h1>Products</h1>
      </div>
      <div className="flex justify-start items-start">
        {products.map((product) => (
          <Card key={product.id} className="w-full  rounded-2xl p-8 m-6">
            <h2 className="mb-10 font-bold text-xl text-left">
              {`${product.name.slice(0, 1).toUpperCase()}${product.name.slice(
                1
              )}`}
            </h2>
            <img src={product.image} alt="Image 1" className="h-36" />
            <span className="block text-center mt-6">${product.price}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

export { Products };
