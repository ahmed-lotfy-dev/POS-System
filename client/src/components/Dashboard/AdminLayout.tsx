import { AsideNav } from "../Home/Aside/AsideNav";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { notify } from "@/lib/toast";
import { useEffect } from "react";

const DashboardLayout = () => {
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user?.role === "CASHIER") {
      notify("Access Denied: Cashiers cannot access the dashboard", "error");
    }
  }, [user]);

  if (user?.role === "CASHIER") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="flex w-full h-screen">
        <AsideNav />
        <Outlet />
      </div>
    </div>
  );
};

export { DashboardLayout };
