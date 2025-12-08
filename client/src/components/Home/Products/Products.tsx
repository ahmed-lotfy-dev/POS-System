import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Pagination,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addItemToCart } from "@/store/features/cart/cartSlice";
import { AllDataResponse, Product } from "@/types/globals";
import { useRouteLoaderData } from "react-router-dom";
import { TbShoppingCart, TbPackage } from "react-icons/tb";
import { useState, useMemo } from "react";

function Products() {
  const { products } = useRouteLoaderData("root") as AllDataResponse;

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items) || [];

  const activeCategory = useSelector(
    (state: RootState) => state.category.categoryId
  );

  const searchToken = useSelector((state: RootState) => state.search.value);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Show 12 products per page

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

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [activeCategory, searchToken]);

  return (
    <div className="px-6 py-4">
      <div className="flex items-center gap-2 mb-4">
        <TbPackage size={20} className="text-gray-700 dark:text-gray-300" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Products
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({filteredProducts.length} items)
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <Card className="w-full">
          <CardBody className="text-center py-12">
            <TbPackage
              size={48}
              className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try selecting a different category or adjusting your search
            </p>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map((product: Product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-shadow duration-200 h-fit"
                isPressable
              >
                <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                  <h4 className="font-bold text-lg line-clamp-1">
                    {product.name.charAt(0).toUpperCase() +
                      product.name.slice(1)}
                  </h4>
                  <small className="text-default-500">
                    Code: #{product.code}
                  </small>
                </CardHeader>
                <CardBody className="overflow-visible py-4">
                  <Image
                    alt={product.name}
                    className="object-cover rounded-xl w-full h-[140px]"
                    src={product.image}
                    fallbackSrc="https://via.placeholder.com/300x200?text=No+Image"
                  />
                </CardBody>
                <CardFooter className="flex flex-col gap-2 pt-0">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${product.price}
                    </span>
                  </div>
                  <Button
                    color="primary"
                    className="w-full"
                    startContent={<TbShoppingCart size={18} />}
                    onPress={() => addProductToCartHandler(product)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 pb-4">
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
                showControls
                color="primary"
                size="lg"
                classNames={{
                  wrapper: "gap-2",
                  item: "w-10 h-10 text-sm",
                  cursor: "bg-primary text-white font-bold",
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export { Products };
