import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AsideNav } from "../components/Home/Aside/AsideNav";

const Root = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div className={`w-full h-screen flex bg-gray-200 ${theme ? "dark" : ""}`}>
      <AsideNav />
      <Outlet />
    </div>
  );
};

export { Root };
