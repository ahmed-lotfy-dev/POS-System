import { useRouteLoaderData } from "react-router-dom";
import { AllDataResponse } from "../../../types/globals";
import { Button } from "@/components/ui/button";

type Props = {};

function Categories({}: Props) {
  const { categories, products } = useRouteLoaderData(
    "root"
  ) as AllDataResponse;
  console.log(categories);

  return (
    <div className="w-full justify-start items-start h-8 mb-36 flex flex-col">
      <div className="pl-6">
        <h1 className="font-bold">Categories</h1>
      </div>
      <div className="w-full flex justify-start items-start ml-6 mt-3">
        <Button
          variant={"outline"}
          className="hover:bg-orange-300 font-bold text-lg text-left mr-1"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={"outline"}
            className="hover:bg-orange-300 mx-1"
          >
            <h2 className="font-bold text-lg text-left">{`${category.name
              .slice(0, 1)
              .toUpperCase()}${category.name.slice(1)}`}</h2>
          </Button>
        ))}
      </div>
    </div>
  );
}

export { Categories };
