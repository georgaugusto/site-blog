"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

export function ThemeToggler() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div>
      {resolvedTheme === "light" ? (
        <IconMoonFilled
          size={20}
          cursor={"pointer"}
          onClick={() => handleThemeChange("dark")}
        />
      ) : (
        <IconSunFilled
          size={20}
          cursor={"pointer"}
          onClick={() => handleThemeChange("light")}
        />
      )}
    </div>
  );
}
