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
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

function Cart({}: Props) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // console.log(cartItems);
  // const dispatch = useDispatch()

  return (
    <div className=" h-full w-[400px] bg-gray-200 rounded-none border-l-2 border-gray-300 flex flex-col justify-between">
      <h1 className="p-4 font-bold">Cart Component</h1>
      <div className="flex-1">
        <Table className="w-full">
          <TableHeader className="">
            <TableRow>
              <TableCell className="font-semibold">Items</TableCell>
              <TableCell className="w-1/3 font-semibold">Qty</TableCell>
              <TableCell className="w-1/3 font-semibold">Amount</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems?.map((item) => (
              <TableRow>
                <TableCell key={item.id}>
                  {item.name} {/* Display the name */}
                </TableCell>
                <TableCell>{item.quantity} </TableCell>
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
          <span>$858</span>
        </div>
        <div className="flex justify-between my-3">
          <span>Tax</span>
          <Input
            type="number"
            placeholder="%14"
            className="w-1/3 placeholder:text-gray-400"
          />
        </div>
        <div className="flex justify-between my-3">
          <span>Discount</span>
          <Input
            type="number"
            placeholder="%10"
            className="w-1/3 placeholder:text-gray-400"
          />
        </div>
        <Button className="flex justify-between my-3 w-full m-auto">
          <span className="block">Total</span>
          <span className="">$1250</span>
        </Button>
      </div>
    </div>
  );
}

export { Cart };
