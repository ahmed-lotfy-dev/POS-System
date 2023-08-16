import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AsideNav } from "../Home/Aside/AsideNav";
import { Outlet } from "react-router-dom";
import { HomeNav } from "../HomeNav/HomeNav";

const DashboardLayout = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div
      className={`w-full h-full border-[3px] border-primary rounded-xl ${
        theme ? "dark" : ""
      }`}
    >
      <HomeNav />
      <div className="flex">
        <AsideNav />
        <Outlet />
      </div>
    </div>
  );
};

export { DashboardLayout };
