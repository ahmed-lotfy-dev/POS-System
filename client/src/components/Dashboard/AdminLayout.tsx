import { AsideNav } from "../Home/Aside/AsideNav";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
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
