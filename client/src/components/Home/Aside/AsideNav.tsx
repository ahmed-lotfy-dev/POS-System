import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { NavItem } from "./NavItem";
import {
  TbShoppingCart,
  TbHome,
  TbLayoutDashboard,
  TbCategory,
  TbPackage,
  TbScale,
  TbShoppingBag,
} from "react-icons/tb";
import { Divider } from "@heroui/react";
import { ThemeSwitcher } from "../../shared/ThemeSwitcher";
import { UserProfile } from "../../shared/UserProfile";

export function AsideNav() {
  const user = useSelector((state: any) => state.user);
  const location = useLocation().pathname;

  return (
    <nav className="w-[420px] h-screen sticky top-0 bg-background border-r border-divider flex flex-col overflow-y-auto">
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
      <div className="flex-1 px-4 py-6 space-y-2">
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
