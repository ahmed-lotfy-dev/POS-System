import { useRouteLoaderData } from "react-router-dom";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

import { Search } from "./Search/Search";
import { Categories } from "./Categories/Categories";
import { Products } from "./Products/Products";
import { Cart } from "./Cart/Cart";
import { useEffect } from "react";
import { AllDataResponse } from "@/types/globals";
import { setProducts } from "@/store/features/products/productSlice";

const Home = () => {
  const { products } = useRouteLoaderData("root") as AllDataResponse;
  const dispatch = useDispatch();
  console.log(products);

  useEffect(() => {
    dispatch(setProducts(products));
  }, [products]);

  return (
    <>
      <div className="w-full flex flex-col">
        <Search />
        <Categories />
        <Products />
      </div>
      <div className="flex-1">
        <Cart />
      </div>
    </>
  );
};

export { Home };
