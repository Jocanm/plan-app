/* eslint-disable react-hooks/set-state-in-effect */
"use client";

/**
 * ⚠️ TEMPORARY DEVELOPMENT TOOL - DO NOT USE IN PRODUCTION
 *
 * This component is a floating theme switcher for quick light/dark mode testing
 * during sidebar development. Should be removed before production deployment.
 *
 * TODO: Remove this file and its usage in layout.tsx when theme toggle is properly implemented
 */

import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        size="icon"
        variant="outline"
        onClick={cycleTheme}
        title={`Current theme: ${theme}`}
        className="bg-card shadow-lg border"
      >
        {getIcon()}
        <span className="sr-only">Toggle theme (current: {theme})</span>
      </Button>
    </div>
  );
};
