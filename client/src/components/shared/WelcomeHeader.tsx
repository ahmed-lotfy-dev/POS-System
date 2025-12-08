import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { TbUser, TbSun, TbMoon, TbSunset } from "react-icons/tb";

type WelcomeHeaderProps = {
  title?: string;
  subtitle?: string;
  showTimeGreeting?: boolean;
};

const WelcomeHeader = ({
  title,
  subtitle,
  showTimeGreeting = true,
}: WelcomeHeaderProps) => {
  const user = useSelector((state: RootState) => state.user.user);

  // Get time-based greeting
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good Morning", icon: TbSun };
    if (hour < 18) return { text: "Good Afternoon", icon: TbSunset };
    return { text: "Good Evening", icon: TbMoon };
  };

  const greeting = getTimeGreeting();
  const GreetingIcon = greeting.icon;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 p-6 mb-6">
      <div className="flex items-center gap-4">
        {/* User Avatar/Icon */}
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
          <TbUser size={32} className="text-blue-600 dark:text-blue-400" />
        </div>

        {/* Greeting Content */}
        <div className="flex-1">
          {showTimeGreeting && (
            <div className="flex items-center gap-2 mb-1">
              <GreetingIcon
                size={20}
                className="text-gray-600 dark:text-gray-400"
              />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {greeting.text}
              </p>
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title || `Welcome back, ${user?.username || "User"}!`}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export { WelcomeHeader };
