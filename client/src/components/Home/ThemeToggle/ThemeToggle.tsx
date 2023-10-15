import { useDispatch } from "react-redux";
import { toggleTheme } from "../../../store/features/theme/themeSlice";
import { Switch } from "@/components/ui/switch";

const ThemeToggle = () => {
  const dispatch = useDispatch();

  const handleChangeTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex mx-6 py-3">
      <Switch onChange={handleChangeTheme} />
    </div>
  );
};

export default ThemeToggle;
