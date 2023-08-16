import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { setUser } from "../../store/features/user/userSlice";
import ThemeToggle from "../Home/ThemeToggle/ThemeToggle";

import { TbBrandGoogleHome, TbLayoutDashboard, TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";

function HomeNav() {
  const user = useSelector((state: RootState) => state.user);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center w-full bg-slate-100 dark:bg-gray-600 rounded-t-lg px-10 py-2">
      <nav className="w-full justify-between items-center">
        <ul className="menu rounded-box flex flex-row gap-6 justify-end">
          <div className="flex space-x-2">
            <TbBrandGoogleHome
              size={25}
              color={`${theme ? "white" : "black"}`}
            />
            <Link to={"/"}>Home</Link>
          </div>
          {user.user?.isAdmin ? (
            <div className="flex space-x-2">
              <TbLayoutDashboard
                size={25}
                color={`${theme ? "white" : "black"}`}
              />
              <Link to="/dashboard">Dashboard</Link>
            </div>
          ) : null}
          {user.user ? (
            <div className="flex space-x-2" onClick={handleLogout}>
              <TbLogout size={25} color={`${theme ? "white" : "black"}`} />
              <button>Logout</button>
            </div>
          ) : null}
        </ul>
      </nav>
      <ThemeToggle />
    </div>
  );
}

export { HomeNav };
