import { AsideNav } from "../Home/Aside/AsideNav";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="flex w-full h-full">
        <AsideNav />
        <Outlet />
      </div>
    </div>
  );
};

export { DashboardLayout };
