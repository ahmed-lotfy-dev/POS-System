import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import { setUser } from "../../../store/features/user/userSlice";

import { TbBrandGoogleHome, TbLayoutDashboard, TbLogout } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { GiWeight } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle/theme-toggle";

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
    <nav className="w-[300px] h-full gap-6 bg-gray-200 flex flex-col justify-between border-r-2 border-gray-300">
      <div className="p-5 text-5xl font-extrabold">
        <h1>P</h1>
      </div>
      <ul className="flex flex-col justify-start items-start space-y-8 p-4 grow">
        <div className="flex space-x-2 cursor-pointer">
          <TbBrandGoogleHome
            size={25}
            color={`${theme ? "white" : "black"}`}
            className="m-auto"
          />
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending cursor-pointer font-bold"
                : isActive
                ? "text-orange-700 cursor-pointer font-bold"
                : ""
            }
            to="/"
          >
            Home
          </NavLink>
        </div>
        {user.user?.isAdmin ? (
          <div className="flex space-x-2 cursor-pointer">
            <TbLayoutDashboard
              size={25}
              color={`${theme ? "white" : "black"}`}
              className="m-auto"
            />
            <NavLink
              to="/dashboard"
              end
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending cursor-pointer font-bold"
                  : isActive
                  ? "text-orange-700 cursor-pointer font-bold"
                  : ""
              }
            >
              Dashboard
            </NavLink>
          </div>
        ) : null}
        {location.includes("dashboard") ? (
          <>
            <div className="flex space-x-2 cursor-pointer">
              <BsBoxSeam
                size={25}
                color={`${theme ? "white" : "black"}`}
                className="m-auto"
              />
              <NavLink
                to="/dashboard/categories"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending cursor-pointer font-bold"
                    : isActive
                    ? "text-orange-700 cursor-pointer font-bold"
                    : ""
                }
              >
                Categories
              </NavLink>
            </div>
            <div className="flex space-x-2 cursor-pointer">
              <BsBoxSeam
                size={25}
                color={`${theme ? "white" : "black"}`}
                className="m-auto"
              />
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending cursor-pointer font-bold"
                    : isActive
                    ? "text-orange-700 cursor-pointer font-bold"
                    : ""
                }
                to="/dashboard/products"
              >
                Products
              </NavLink>
            </div>
            <div className="flex space-x-2 cursor-pointer">
              <GiWeight
                size={25}
                color={`${theme ? "white" : "black"}`}
                className="m-auto"
              />
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending cursor-pointer font-bold"
                    : isActive
                    ? "text-orange-700 cursor-pointer font-bold"
                    : ""
                }
                to="/dashboard/units"
              >
                Units
              </NavLink>
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
            <div className="cursor-pointer font-bold">
              <TbLogout size={25} color={`${theme ? "white" : "black"}`} />
            </div>
            <span className="cursor-pointer font-bold">LogOut</span>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export { AsideNav };
