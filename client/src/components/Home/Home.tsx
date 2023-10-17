import { useRouteLoaderData } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import { Search } from "./Search/Search";
import { Categories } from "./Categories/Categories";
import { Products } from "./Products/Products";
import { Cart } from "./Cart/Cart";

const Home = () => {
  const data = useRouteLoaderData("root");
  console.log(data);

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
