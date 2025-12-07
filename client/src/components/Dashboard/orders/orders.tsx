import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectMonth } from "@/components/ui/select-month/select-month";
import { AllDataResponse } from "@/types/globals";
import { addDays } from "date-fns/addDays";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Link, useRouteLoaderData } from "react-router-dom";
import {
  TbCalendar,
  TbClock,
  TbReceipt,
  TbCurrencyDollar,
} from "react-icons/tb";

type Props = {};

const Orders = ({}: Props) => {
  const { orders } = useRouteLoaderData("root") as AllDataResponse;

  const [date, setDate] = useState<Date>();

  const filteredOrders = orders.filter((order) => {
    const { orderDate } = order;
    if (date) {
      return new Date(orderDate) > new Date(date);
    }
    return true;
  });

  function formatTimeWithLeadingZero(value: number) {
    return value < 10 ? `0${value}` : `${value}`;
  }

  // Calculate total revenue
  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  return (
    <div className="w-full h-full overflow-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Orders
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and track all your orders
          </p>
        </div>
        <SelectMonth date={date} setDate={setDate} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">
                Total Orders
              </p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {filteredOrders.length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <TbReceipt
                size={24}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 dark:text-green-300 text-sm font-medium uppercase">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-green-800 dark:text-green-100 mt-2">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-200 dark:bg-green-700 rounded-full">
              <TbCurrencyDollar
                size={24}
                className="text-green-700 dark:text-green-200"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">
                Average Order
              </p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                $
                {filteredOrders.length > 0
                  ? (totalRevenue / filteredOrders.length).toFixed(2)
                  : "0.00"}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <TbReceipt
                size={24}
                className="text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          Order List
        </h2>
        {filteredOrders && filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredOrders.map((order) => (
              <Link
                key={order.orderNumber}
                to={`/dashboard/orders/${order.orderNumber}`}
                className="group"
              >
                <Card className="p-5 h-full hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                  <div className="space-y-3">
                    {/* Order Number */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Order
                      </span>
                      <TbReceipt
                        className="text-gray-400 dark:text-gray-500"
                        size={18}
                      />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      #{order.orderNumber}
                    </h3>

                    {/* Time */}
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <TbClock
                        size={16}
                        className="text-gray-400 dark:text-gray-500"
                      />
                      <span className="text-sm">
                        {`${formatTimeWithLeadingZero(
                          new Date(order.orderDate).getHours()
                        )}:${formatTimeWithLeadingZero(
                          new Date(order.orderDate).getMinutes()
                        )}`}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <TbCalendar
                        size={16}
                        className="text-gray-400 dark:text-gray-500"
                      />
                      <span className="text-sm">
                        {new Date(order.orderDate).toLocaleDateString("en-UK")}
                      </span>
                    </div>

                    {/* Amount */}
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Total
                        </span>
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                          ${order.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <TbReceipt
              size={48}
              className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {date
                ? "No orders found for the selected date filter"
                : "There are no orders yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { Orders };
