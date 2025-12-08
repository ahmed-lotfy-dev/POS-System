import {
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Chip,
} from "@heroui/react";
import {
  TbShoppingCart,
  TbTrash,
  TbPlus,
  TbMinus,
  TbReceipt,
} from "react-icons/tb";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  deleteCartItem,
  clearCartItems,
} from "@/store/features/cart/cartSlice";
import axios from "@/lib/axios";
import { notify } from "@/lib/toast";
import { useRevalidator } from "react-router-dom";

type Props = {};

function Cart({}: Props) {
  const cartItems = useSelector((state: RootState) => state.cart.items) || [];
  const [tax, setTax] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch();
  const { revalidate } = useRevalidator();

  const calcSubtotal = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const user = useSelector((state: RootState) => state.user.user);

  const calcTotal = () => {
    const taxAmount = calcSubtotal * (tax / 100);
    const discountAmount = calcSubtotal * (discount / 100);
    const totalAmount = calcSubtotal + taxAmount - discountAmount;
    setTotal(totalAmount);
  };

  const handleIncreaseQuantity = (item: any) => {
    dispatch(changeQuantity({ id: item.id, status: "increase" }));
  };

  const handleDecreaseQuantity = (item: any) => {
    dispatch(changeQuantity({ id: item.id, status: "decrease" }));
  };

  const newOrderHandler = async () => {
    console.log("Pay Now clicked!");
    console.log("Cart items:", cartItems);
    console.log("Total:", total);
    console.log("User:", user);

    if (user?.role === "VIEWER") {
      notify("You don't have privileges (View Only)", "info");
      return;
    }

    if (cartItems.length < 1) {
      notify("Cart is empty", "error");
      return;
    }

    setIsProcessing(true);
    try {
      const { data } = await axios.post("/order/add/", {
        orderData: {
          userId: user?.sub,
          orderNumber: Date.now().toString(36),
          totalAmount: total,
        },
        orderItems: cartItems.map((item) => ({
          id: item.id,
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.quantity * item.price,
        })),
      });

      console.log("Order created successfully:", data);
      dispatch(clearCartItems());
      revalidate();
      setTax(0);
      setDiscount(0);
      notify(
        `Order #${data.data.orderNumber} has been placed successfully!`,
        "success"
      );
    } catch (error: any) {
      console.error("Order creation error:", error);
      notify(
        error.response?.data?.message || "Failed to create order",
        "error"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteItemHandler = (id: any) => {
    dispatch(deleteCartItem(id));
  };

  const clearCartHandler = () => {
    dispatch(clearCartItems());
    setTax(0);
    setDiscount(0);
  };

  useEffect(() => {
    calcTotal();
  }, [tax, discount, cartItems]);

  return (
    <div className="h-screen w-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TbShoppingCart
              size={24}
              className="text-blue-600 dark:text-blue-400"
            />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Cart
            </h2>
          </div>
          <Chip color="primary" variant="flat" size="sm">
            {cartItems.length} items
          </Chip>
        </div>
        <Button
          size="sm"
          color="danger"
          variant="flat"
          className="w-full"
          onPress={clearCartHandler}
          isDisabled={cartItems.length === 0}
        >
          Clear Cart
        </Button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-auto">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <TbShoppingCart
              size={64}
              className="text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add some products to get started
            </p>
          </div>
        ) : (
          <Table
            removeWrapper
            aria-label="Cart items table"
            classNames={{
              th: "bg-gray-50 dark:bg-gray-700",
            }}
          >
            <TableHeader>
              <TableColumn>ITEM</TableColumn>
              <TableColumn>QTY</TableColumn>
              <TableColumn>PRICE</TableColumn>
              <TableColumn> </TableColumn>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500">#{item.code}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleDecreaseQuantity(item)}
                      >
                        <TbMinus size={14} />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleIncreaseQuantity(item)}
                      >
                        <TbPlus size={14} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold">
                      ${item.quantity * item.price}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      variant="light"
                      onPress={() => deleteItemHandler(item.id)}
                    >
                      <TbTrash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Footer - Calculations */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Subtotal
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            ${calcSubtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Tax %
          </span>
          <Input
            type="number"
            size="sm"
            className="w-24"
            value={tax.toString()}
            onChange={(e) => setTax(+e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="flex justify-between items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Discount %
          </span>
          <Input
            type="number"
            size="sm"
            className="w-24"
            value={discount.toString()}
            onChange={(e) => setDiscount(+e.target.value)}
            placeholder="0"
          />
        </div>

        <Divider />

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            Total
          </span>
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            ${total.toFixed(2)}
          </span>
        </div>

        <Button
          color="primary"
          size="lg"
          className="w-full"
          startContent={<TbReceipt size={20} />}
          onPress={newOrderHandler}
          isDisabled={cartItems.length === 0}
          isLoading={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </div>
  );
}

export { Cart };
