import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { AllDataResponse } from "./types/globals.js";

import { ThemeProvider } from "@/components/ThemeToggle/theme-provider.js";
import { ToastContainer } from "react-toastify";

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
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

const allData = async (): Promise<AllDataResponse> => {
  const response = await Promise.all([
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/category/getAll`),
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/getAll`),
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/unit/getAll`),
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/order/getAll`),
  ]);

  const [category, product, unit, order] = response;

  return {
    categories: category.data,
    products: product.data,
    units: unit.data,
    orders: order.data,
  };
};

// const orderData = async ({ }) => {
//   console.log("order OrderItems");
// };

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route id="root" loader={allData} element={<ProtectedRoute />}>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
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
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
