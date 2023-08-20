import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AsideNav } from "../Home/Aside/AsideNav";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div
      className={`w-full h-full border-[3px] border-primary rounded-xl ${
        theme ? "dark" : ""
      }`}
    >
      <div className="flex w-full h-full">
        <AsideNav />
        <Outlet />
      </div>
    </div>
  );
};

export { DashboardLayout };
