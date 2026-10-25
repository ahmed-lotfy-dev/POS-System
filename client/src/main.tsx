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
import { ToastProvider } from "@heroui/react";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";

import {
  createRoutesFromElements,
  createBrowserRouter,
  redirect,
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
  // allSettled: one failing endpoint returns an empty list instead of
  // rejecting the whole navigation
  const settled = await Promise.allSettled([
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
    categories:
      settled[0].status === "fulfilled" ? normalizeData(settled[0].value.data) : [],
    products:
      settled[1].status === "fulfilled" ? normalizeData(settled[1].value.data) : [],
    units:
      settled[2].status === "fulfilled" ? normalizeData(settled[2].value.data) : [],
    orders:
      settled[3].status === "fulfilled" ? normalizeData(settled[3].value.data) : [],
  };
};

const EMPTY_DATA: AllDataResponse = {
  categories: [],
  products: [],
  units: [],
  orders: [],
};

// Dashboard route data: catalog + stats all fetched CONCURRENTLY in one wave.
export type DashboardLoaderData = AllDataResponse & {
  dashboardStats?: unknown;
};

const dashboardData = async (): Promise<DashboardLoaderData> => {
  const [data, stats] = await Promise.allSettled([
    allData(),
    axios.get("/dashboard/stats?period=all"),
  ]);

  return {
    ...(data.status === "fulfilled" ? data.value : EMPTY_DATA),
    dashboardStats:
      stats.status === "fulfilled"
        ? stats.value.data.data || stats.value.data
        : undefined,
  };
};

// Loader-level auth gate: runs BEFORE child loaders, so an unauthenticated
// visit to a protected route redirects to /signin WITHOUT firing data calls.
const authGuard = () => {
  const token = localStorage.getItem("user");
  let valid: any = token;
  if (typeof token === "string") {
    try {
      valid = JSON.parse(token);
    } catch {
      valid = null;
    }
  }
  if (!token || !valid) {
    return redirect("/signin");
  }
  return null;
};

// Shown while the auth/dashboard loaders run on the very first mount —
// replaces the previous blank-screen-pause + the react-router
// "No HydrateFallback element provided" console warning.
const BootFallback = () => (
  <div className="flex min-h-screen w-full items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-600" />
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      id="root"
      hydrateFallbackElement={<BootFallback />}
      element={<Outlet />}
      errorElement={<ErrorBoundary />}
    >
      {/* Public routes — fetch NOTHING */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route loader={authGuard} element={<ProtectedRoute />}>
        {/* "/" branch serves its own catalog wave (Home/Products/Categories read
            it via useRouteLoaderData("home-data"); the parent authGuard has
            already run, so these fetches only happen for authenticated users) */}
        <Route path="/" id="home-data" loader={allData} element={<Root />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        {/* One loader = one concurrent wave: catalog + stats in parallel */}
        <Route path="/dashboard" id="data-root" loader={dashboardData} element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/categories" element={<AdminCategories />} />
          <Route path="/dashboard/products" element={<AdminProducts />} />
          <Route path="/dashboard/units" element={<AdminUnits />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route
            path="/dashboard/orders/:id"
            element={<OrderItems />}
            loader={async ({ params }) => {
              const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/order/get/${params.id}`
              );
              // Backend returns { msg: 'order not found' } when order doesn't exist
              if (data && typeof data === "object" && "msg" in data) {
                return null;
              }
              // Backend wraps response in { code, message, data }
              // Return the actual order data
              return data.data || data;
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
        </Provider>
      </ThemeProvider>
      <ToastProvider />
    </HeroUIProvider>
  </React.StrictMode>
);
