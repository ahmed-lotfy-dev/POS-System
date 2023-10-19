import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { setItem } from "@/store/features/Item/itemSlice";
import { addItemToCart } from "@/store/features/cart/cartSlice";
import { RootState } from "@/store/store";
import { AllDataResponse } from "@/types/globals";
import { useDispatch, useSelector } from "react-redux";
import { useRouteLoaderData } from "react-router-dom";

type Props = {};

function Products({}: Props) {
  const { categories, products } = useRouteLoaderData(
    "root"
  ) as AllDataResponse;

  console.log(products);

  const cartItems = useSelector((state: RootState) => state.cart.items) || [];
  console.log(cartItems);
  const dispatch = useDispatch();

  const addProductToCartHandler = (product: any) => {
    console.log("Product Added");
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

  return (
    <div className="w-full justify-start items-start h-8 mb-10 flex flex-col">
      <div className="pl-6">
        <h1>Products</h1>
      </div>
      <div className="flex justify-start items-start">
        {products?.map((product) => (
          <Card key={product.id} className="w-full  rounded-2xl p-8 m-6">
            <h2 className="mb-6 font-bold text-lg text-center underline">
              {`${product.name.slice(0, 1).toUpperCase()}${product.name.slice(
                1
              )}`}
            </h2>
            <img src={product.image} alt="Image 1" className="h-36" />
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
