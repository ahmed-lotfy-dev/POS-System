import { useLoaderData, useNavigate } from "react-router-dom";
import {
  TbArrowLeft,
  TbReceipt,
  TbCalendar,
  TbClock,
  TbUser,
  TbCurrencyDollar,
  TbPackage,
} from "react-icons/tb";

type Props = {};

const OrderItems = ({}: Props) => {
  const navigate = useNavigate();
  const order = useLoaderData() as any;

  // Debug: Log the order data
  console.log("📦 Order data received:", order);
  console.log("📦 Order keys:", Object.keys(order || {}));
  console.log("📦 Full order JSON:", JSON.stringify(order, null, 2));

  // Safety check - if order is empty object or null
  if (!order || Object.keys(order).length === 0) {
    return (
      <div className="w-full h-full overflow-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-10">
          <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
            Order not found
          </h2>
          <button
            onClick={() => navigate("/dashboard/orders")}
            className="mt-4 mx-auto block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  function formatTimeWithLeadingZero(value: number) {
    return value < 10 ? `0${value}` : `${value}`;
  }

  // Use orderDate if it exists, otherwise use createdAt, otherwise use current date
  const dateField =
    order.orderDate ||
    order.createdAt ||
    order.created_at ||
    new Date().toISOString();
  const orderDate = new Date(dateField);
  const formattedTime = `${formatTimeWithLeadingZero(
    orderDate.getHours()
  )}:${formatTimeWithLeadingZero(orderDate.getMinutes())}`;
  const formattedDate = orderDate.toLocaleDateString("en-UK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const orderItems = order.orderItems || order.order_items || [];

  return (
    <div className="w-full h-full overflow-auto p-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/orders")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <TbArrowLeft size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Order Details
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Order #{order.orderNumber || order.order_number || order.id}
          </p>
        </div>
      </div>

      {/* Order Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Order Number */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <TbReceipt
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
              Order Number
            </span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            #{order.orderNumber || order.order_number || order.id}
          </p>
        </div>

        {/* Date */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <TbCalendar
                size={20}
                className="text-purple-600 dark:text-purple-400"
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
              Date
            </span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {formattedDate}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {formattedTime}
          </p>
        </div>

        {/* Customer */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
              <TbUser
                size={20}
                className="text-indigo-600 dark:text-indigo-400"
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
              Customer
            </span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {order.user?.username || "N/A"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
            {order.user?.email || "N/A"}
          </p>
        </div>

        {/* Total Amount */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-green-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-200 dark:bg-green-700 rounded-lg">
              <TbCurrencyDollar
                size={20}
                className="text-green-700 dark:text-green-200"
              />
            </div>
            <span className="text-sm font-medium text-green-700 dark:text-green-300 uppercase">
              Total Amount
            </span>
          </div>
          <p className="text-2xl font-bold text-green-800 dark:text-green-100">
            ${(order.totalAmount || order.total_amount || 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Order Items Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <TbPackage size={24} className="text-gray-700 dark:text-gray-300" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Order Items ({orderItems.length})
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orderItems.map((item: any) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product?.image || "/placeholder.png"}
                        alt={item.product?.name || "Product"}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.product?.name || "Unknown Product"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">
                    #{item.product?.code || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
                    ${item.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white uppercase"
                >
                  Total:
                </td>
                <td className="px-6 py-4 text-right font-bold text-2xl text-green-600 dark:text-green-400">
                  $
                  {(
                    order.totalAmount ||
                    order.total_amount ||
                    0
                  ).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export { OrderItems };
