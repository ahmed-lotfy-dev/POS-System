import { useRouteLoaderData } from "react-router-dom";
import { AllDataResponse } from "../../../types/globals";
import { Button, Chip } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "@/store/features/category/categorySlice";
import { setProducts } from "@/store/features/products/productSlice";
import { RootState } from "@/store/store";
import { TbCategory } from "react-icons/tb";

type Props = {};

function Categories({}: Props) {
  const { categories, products } = useRouteLoaderData(
    "root"
  ) as AllDataResponse;
  const dispatch = useDispatch();
  const activeCategory = useSelector(
    (state: RootState) => state.category.categoryId
  );

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
    <div className="px-6 py-4">
      <div className="flex items-center gap-2 mb-4">
        <TbCategory size={20} className="text-gray-700 dark:text-gray-300" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Categories
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip
          color={
            activeCategory === "all" || !activeCategory ? "primary" : "default"
          }
          variant={
            activeCategory === "all" || !activeCategory ? "solid" : "flat"
          }
          onClick={allProductsHandler}
          className="cursor-pointer"
        >
          All Products
        </Chip>
        {categories &&
          categories.map((category) => (
            <Chip
              key={category.id}
              color={activeCategory === category.id ? "primary" : "default"}
              variant={activeCategory === category.id ? "solid" : "flat"}
              onClick={() => activeCategoryHandler(category)}
              className="cursor-pointer"
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </Chip>
          ))}
      </div>
    </div>
  );
}

export { Categories };
