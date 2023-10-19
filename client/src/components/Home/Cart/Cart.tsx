import { Button } from "@/components/ui/button";
import { Table, TableHead } from "@/components/ui/table";
import React from "react";

type Props = {};

function Cart({}: Props) {
  return (
    <div className=" h-full w-[400px] bg-gray-200 rounded-none border-l-2 border-gray-300 flex flex-col justify-between">
      <h1 className="p-4 font-bold">Cart Component</h1>
      <div className="flex-1">
        <Table className="flex justify-between">
          <TableHead className="flex-auto w-2/3">Items</TableHead>
          <TableHead className="w-1/3">Qty</TableHead>
          <TableHead className="w-1/3">Amount</TableHead>
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
          <span>$858</span>
        </div>
        <div className="flex justify-between my-3">
          <span>Discount</span>
          <span>$858</span>
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
