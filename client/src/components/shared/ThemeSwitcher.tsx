import { Button, ButtonGroup } from "@heroui/react";
import { TbSun, TbMoon, TbDeviceDesktop } from "react-icons/tb";
import { useTheme } from "@/components/ThemeToggle/theme-provider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-4">
      <p className="text-xs font-semibold text-default-500 uppercase tracking-wide mb-3">
        Appearance
      </p>
      <ButtonGroup fullWidth size="md" variant="flat">
        <Button
          onPress={() => setTheme("light")}
          color={theme === "light" ? "primary" : "default"}
          startContent={<TbSun size={18} />}
          className="font-medium"
        >
          Light
        </Button>
        <Button
          onPress={() => setTheme("dark")}
          color={theme === "dark" ? "primary" : "default"}
          startContent={<TbMoon size={18} />}
          className="font-medium"
        >
          Dark
        </Button>
        <Button
          onPress={() => setTheme("system")}
          color={theme === "system" ? "primary" : "default"}
          startContent={<TbDeviceDesktop size={18} />}
          className="font-medium"
        >
          System
        </Button>
      </ButtonGroup>
    </div>
  );
}
