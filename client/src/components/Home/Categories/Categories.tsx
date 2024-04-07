import { useRouteLoaderData } from "react-router-dom";
import { AllDataResponse } from "../../../types/globals";
import { Button } from "@/components/ui/button";
import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { setActiveCategory } from "@/store/features/category/categorySlice";
import { setProducts } from "@/store/features/products/productSlice";

type Props = {};

function Categories({}: Props) {
  const { categories, products } = useRouteLoaderData(
    "root"
  ) as AllDataResponse;
  console.log(products);

  const dispatch = useDispatch();

  const activeCategoryHandler = (category: any) => {
    dispatch(
      setActiveCategory({
        categoryId: category.id,
      })
    );
  };

  const allProductsHandler = () => {
    dispatch(setProducts(products));
    dispatch(setActiveCategory({ categoryId: "all" }));
  };

  return (
    <div className="w-full justify-start items-start h-8 mb-36 flex flex-col">
      <div className="pl-6">
        <h1 className="font-bold">Categories</h1>
      </div>
      <div className="w-full flex justify-start items-start ml-6 mt-3">
        <Button
          variant={"outline"}
          className="hover:bg-orange-300 font-bold text-lg text-left mr-1"
          onClick={() => allProductsHandler()}
        >
          All
        </Button>
        {categories?.map((category) => (
          <Button
            key={category.id}
            variant={"outline"}
            className="hover:bg-orange-300 mx-1"
            onClick={() => activeCategoryHandler(category)}
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
