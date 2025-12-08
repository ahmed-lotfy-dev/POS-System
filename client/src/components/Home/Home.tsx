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

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-card text-foreground flex flex-col">
        <Search />
        <Categories />
        <Products />
      </div>
      <div className="w-[360px] flex-shrink-0 sticky top-0 h-screen">
        <Cart />
      </div>
    </div>
  );
};

export { Home };
