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
    <div className="w-full justify-start items-start h-8 mb-10 flex flex-1">
      {products.map((category) => (
        <>
          <div className="dark:bg-gray-500 bg-gray-300 rounded-2xl flex flex-col justify-center items-center p-8 m-6">
            <h2 className="mb-10 font-bold text-xl text-left">
              {category.name}
            </h2>
            <img src={category.image} alt="Image 1" className="h-36" />
          </div>
        </>
      ))}
    </div>
  );
}

export { Products };
