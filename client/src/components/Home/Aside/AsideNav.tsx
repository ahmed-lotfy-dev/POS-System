import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../store/store";
import { Divider } from "@heroui/react";
import {
  TbHome,
  TbLayoutDashboard,
  TbCategory,
  TbPackage,
  TbScale,
  TbShoppingBag,
  TbShoppingCart,
} from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher";
import { UserProfile } from "@/components/shared/UserProfile";

function AsideNav() {
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation().pathname;

  const NavItem = ({
    to,
    icon: Icon,
    label,
    end = false,
  }: {
    to: string;
    icon: any;
    label: string;
    end?: boolean;
  }) => (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive
              ? "bg-primary text-primary-foreground shadow-md"
              : "hover:bg-default-100 text-foreground"
          }`}
        >
          <Icon size={22} />
          <span className="font-medium">{label}</span>
        </div>
      )}
    </NavLink>
  );

  return (
    <nav className="w-[420px] h-screen sticky top-0 bg-background border-r border-divider flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <TbShoppingCart size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">POS System</h1>
            <p className="text-xs text-default-500">Point of Sale</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        <NavItem to="/" icon={TbHome} label="Home" end />

        {user.user && (
          <>
            <NavItem
              to="/dashboard"
              icon={TbLayoutDashboard}
              label="Dashboard"
              end
            />

            {location.includes("dashboard") && (
              <>
                <Divider className="my-4" />
                <p className="text-xs font-semibold text-default-500 px-4 mb-2">
                  MANAGEMENT
                </p>
                <NavItem
                  to="/dashboard/categories"
                  icon={TbCategory}
                  label="Categories"
                />
                <NavItem
                  to="/dashboard/products"
                  icon={TbPackage}
                  label="Products"
                />
                <NavItem to="/dashboard/units" icon={TbScale} label="Units" />
                <NavItem
                  to="/dashboard/orders"
                  icon={TbShoppingBag}
                  label="Orders"
                />
              </>
            )}
          </>
        )}
      </div>

      <Divider />

      {/* Theme Switcher Component */}
      <ThemeSwitcher />

      <Divider />

      {/* User Profile Component */}
      <UserProfile />
    </nav>
  );
}

export { AsideNav };
