import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import { setUser } from "../../../store/features/user/userSlice";

import { TbBrandGoogleHome, TbLayoutDashboard, TbLogout } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { GiWeight } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

function AsideNav() {
  const user = useSelector((state: RootState) => state.user);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <nav className="rounded-box gap-6 bg-gray-300 dark:bg-slate-600 rounded-r-none rounded-t-none rounded-l-xl flex flex-col justify-between h-full">
      <div className="p-5 text-5xl font-extrabold">
        <h1>P</h1>
      </div>
      <ul className="flex flex-col justify-start items-start space-y-8 p-4 grow">
        <div className="flex space-x-2 cursor-pointer">
          <TbBrandGoogleHome size={25} color={`${theme ? "white" : "black"}`} />
          <Link className="cursor-pointer" to="/">
            Home
          </Link>
        </div>
        {user.user?.isAdmin ? (
          <div className="flex space-x-2 cursor-pointer">
            <TbLayoutDashboard
              size={25}
              color={`${theme ? "white" : "black"}`}
            />
            <Link to="/dashboard">Dashboard</Link>
          </div>
        ) : null}
        {location.includes("dashboard") ? (
          <>
            <div className="flex space-x-2 cursor-pointer">
              <BsBoxSeam size={25} color={`${theme ? "white" : "black"}`} />
              <Link className="cursor-pointer" to="/dashboard/categories">
                Categories
              </Link>
            </div>
            <div className="flex space-x-2 cursor-pointer">
              <BsBoxSeam size={25} color={`${theme ? "white" : "black"}`} />
              <Link className="cursor-pointer" to="/dashboard/products">
                Products
              </Link>
            </div>
            <div className="flex space-x-2 cursor-pointer">
              <GiWeight size={25} color={`${theme ? "white" : "black"}`} />
              <Link className="cursor-pointer" to="/dashboard/units">
                Units
              </Link>
            </div>
          </>
        ) : (
          ""
        )}
      </ul>
      <ThemeToggle />

      <div className="px-4 cursor-pointer">
        {user.user ? (
          <div
            className="flex space-x-2 mb-5 cursor-pointer"
            onClick={handleLogout}
          >
            <div className="cursor-pointer">
              <TbLogout size={25} color={`${theme ? "white" : "black"}`} />
            </div>
            <span className="cursor-pointer">LogOut</span>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export { AsideNav };
