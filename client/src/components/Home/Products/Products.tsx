import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addItemToCart } from "@/store/features/cart/cartSlice";
import { AllDataResponse, Product } from "@/types/globals";
import {  useRouteLoaderData } from "react-router-dom";
import { notify } from "@/lib/toast";

function Products() {
  const { products } = useRouteLoaderData("root") as AllDataResponse;

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items) || [];

  const activeCategory = useSelector(
    (state: RootState) => state.category.categoryId
  );

  const searchToken = useSelector((state: RootState) => state.search.value);

  const filterByCategory = (items: any, category: any) => {
    if (category === "" || category === "all") {
      return items;
    }
    return items.filter((product: any) => product.categoryId === category);
  };

  const filterBySearch = (items: any, searchToken: any) => {
    if (!searchToken) {
      return items;
    }
    const searchTokenLower = searchToken.toLowerCase();
    return items.filter((product: any) =>
      product.name.toLowerCase().includes(searchTokenLower)
    );
  };

  const addProductToCartHandler = (product: any) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      dispatch(
        addItemToCart({
          ...existingItem,
          quantity: existingItem.quantity + 1,
        })
      );
    } else {
      dispatch(
        addItemToCart({
          ...product,
          quantity: 1,
        })
      );
    }
  };
  const filteredByCategory = filterByCategory(products, activeCategory);
  const filteredProducts = filterBySearch(filteredByCategory, searchToken);

  return (
    <div className="w-full justify-start items-start h-8 mb-10 flex flex-col">
      <div className="pl-6">
        <h1 className="font-bold">Products</h1>
      </div>
      <div className="flex justify-start items-start mt-10 w-full">
        {
          filteredProducts.length === 0 ? (
            <Card className="w-full ">
              <h2 className="font-bold text-xl text-center m-10">
                No products here choose another category
              </h2>
            </Card>
          ) : (
            ""
          )
          // <h1>No Products Found</h1>
        }
        {filteredProducts.map((product: Product) => (
          <Card
            key={product.id}
            className="w-full  rounded-2xl p-8 m-6  max-w-[350px]"
          >
            <h2 className="mb-6 font-bold text-lg text-center underline">
              {`${product.name.slice(0, 1).toUpperCase()}${product.name.slice(
                1
              )}`}
            </h2>
            <img
              src={product.image}
              alt="Image 1"
              className="h-36 m-auto aspect-auto"
            />
            <span className="block text-center mt-6">${product.price}</span>
            <Button
              className="w-full mt-5"
              onClick={() => addProductToCartHandler(product)}
            >
              Add To Cart
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export { Products };
