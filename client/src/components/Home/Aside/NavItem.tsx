import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  icon: any;
  label: string;
  end?: boolean;
};

const NavItem = ({ to, icon: Icon, label, end = false }: NavItemProps) => {
  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
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
};

export { NavItem };
