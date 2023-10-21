import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { RootState } from "@/store/store";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity } from "@/store/features/cart/cartSlice";

type Props = {};

function Cart({}: Props) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [tax, setTax] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const dispatch = useDispatch();
  const calcSubtotal = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const calcTotal = () => {
    const taxAmount = calcSubtotal * (tax / 100);
    const discountAmount = calcSubtotal * (discount / 100);
    const totalAmount = calcSubtotal + taxAmount - discountAmount;
    setTotal(totalAmount);
  };

  const handleIncreaseQuantity = (item: any) => {
    // Use the changeQuantity action to increase the quantity
    dispatch(changeQuantity({ id: item.id, status: "increase" }));
  };

  const handleDecreaseQuantity = (item: any) => {
    // Use the changeQuantity action to decrease the quantity
    dispatch(changeQuantity({ id: item.id, status: "decrease" }));
  };

  useEffect(() => {
    calcTotal();
  }, [tax, discount, calcSubtotal]);

  return (
    <div className=" h-full w-[400px] bg-gray-200 rounded-none border-l-2 border-gray-300 flex flex-col justify-between">
      <h1 className="p-4 font-bold">Cart Component</h1>
      <div className="flex-1">
        <Table className="w-full bg-gray-300">
          <TableHeader className="">
            <TableRow>
              <TableCell className="font-semibold">Items</TableCell>
              <TableCell className="w-1/3 font-semibold">Qty</TableCell>
              <TableCell className="w-1/3 font-semibold">Amount</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems?.map((item) => (
              <TableRow key={item.id}>
                <TableCell key={item.id}>
                  {item.name} {/* Display the name */}
                </TableCell>
                <TableCell className="flex justify-center items-center">
                  <div
                    onClick={() => {
                      handleDecreaseQuantity(item);
                    }}
                  >
                    <LuChevronLeft />
                  </div>
                  <span className="w-16 text-center">{item.quantity}</span>
                  <div
                    onClick={() => {
                      handleIncreaseQuantity(item);
                    }}
                  >
                    <LuChevronRight />
                  </div>
                </TableCell>
                <TableCell>{item.quantity * item.price} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-4">
        <div className="flex justify-between my-3">
          <span>
            Subtotal <span className="opacity-40">(Total Items) : 5</span>
          </span>
          <span></span>
          <span>${calcSubtotal}</span>
        </div>
        <div className="flex justify-between my-3">
          <span>Tax</span>
          <Input
            type="number"
            placeholder="%14"
            className="w-1/3 placeholder:text-gray-400"
            value={tax}
            onChange={(e) => setTax(+e.target.value)}
            onFocus={(e) => {
              e.target.value = "";
            }}
          />
        </div>
        <div className="flex justify-between my-3">
          <span>Discount</span>
          <Input
            type="number"
            placeholder="%10"
            className="w-1/3 placeholder:text-gray-400 bg-gray-400"
            value={discount}
            onChange={(e) => setDiscount(+e.target.value)}
            onFocus={(e) => {
              e.target.value = "";
            }}
          />
        </div>
        <div className="flex justify-between my-3 w-full m-auto">
          <span className="block">Total</span>
          <span className="">${total}</span>
        </div>
        <Button className="w-full">Pay Now</Button>
      </div>
    </div>
  );
}

export { Cart };
