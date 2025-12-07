import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "@/lib/axios";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import {
  Category,
  Product,
  Unit,
  Order,
  AllDataResponse,
} from "./types/globals.js";
import { ApiResponse } from "./types/api.js";
import { HeroUIProvider } from "@heroui/react";

import { ThemeProvider } from "@/components/ThemeToggle/theme-provider.js";
import { ToastContainer } from "react-toastify";

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import { ProtectedRoute } from "./routes/ProtectedRoute.js";
import { Root } from "./routes/Root.js";
import { Home } from "./components/Home/Home.js";
import { SignIn } from "./routes/SignIn.js";
import { SignUp } from "./routes/SignUp.js";
import { DashboardLayout } from "./components/Dashboard/AdminLayout.js";
import { NoMatch } from "./routes/NoMatch.js";
import { Dashboard } from "./components/Dashboard/AdminHome.js";
import { AdminProducts } from "./components/Dashboard/products/AdminProducts.js";
import { AdminCategories } from "./components/Dashboard/categories/AdminCategories.js";
import { AdminUnits } from "./components/Dashboard/units/AdminUnits.js";
import { Orders } from "./components/Dashboard/orders/orders.js";
import { OrderItems } from "./components/Dashboard/orderItems/OrderItems.tsx";

const normalizeData = <T,>(res: any): T[] => {
  console.log("normalizeData res:", res);
  if (Array.isArray(res)) return res;
  return res.data || [];
};

const allData = async (): Promise<AllDataResponse> => {
  const [category, product, unit, order] = await Promise.all([
    axios.get<ApiResponse<Category[]>>(
      `${import.meta.env.VITE_BACKEND_URL}/category/getAll`
    ),
    axios.get<ApiResponse<Product[]>>(
      `${import.meta.env.VITE_BACKEND_URL}/product/getAll`
    ),
    axios.get<ApiResponse<Unit[]>>(
      `${import.meta.env.VITE_BACKEND_URL}/unit/getAll`
    ),
    axios.get<ApiResponse<Order[]>>(
      `${import.meta.env.VITE_BACKEND_URL}/order/getAll`
    ),
  ]);

  return {
    categories: normalizeData(category.data),
    products: normalizeData(product.data),
    units: normalizeData(unit.data),
    orders: normalizeData(order.data),
  };
};
// const orderData = async ({ }) => {
//   console.log("order OrderItems");
// };

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route id="root" loader={allData} element={<Outlet />}>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={<Dashboard />}
            loader={async () => {
              const { data } = await axios.get("/dashboard/stats?period=all");
              return { dashboardStats: data.data || data };
            }}
          />
          <Route path="/dashboard/categories" element={<AdminCategories />} />
          <Route path="/dashboard/products" element={<AdminProducts />} />
          <Route path="/dashboard/units" element={<AdminUnits />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route
            path="/dashboard/orders/:id"
            element={<OrderItems />}
            loader={async ({ params }) => {
              console.log(params.id);
              const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/order/get/${params.id}`
              );
              console.log(data);
              return { orderItems: data.orderItems };
            }}
          />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HeroUIProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Provider store={store}>
          <RouterProvider router={router} />
          <ToastContainer />
        </Provider>
      </ThemeProvider>
    </HeroUIProvider>
  </React.StrictMode>
);
