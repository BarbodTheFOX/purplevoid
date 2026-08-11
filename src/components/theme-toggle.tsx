"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "purple-void:theme";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    setReady(true);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // The visual preference still applies for this page when storage is unavailable.
    }
    setTheme(nextTheme);
  }

  const isDark = theme === "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "فعال‌کردن تم روشن" : "فعال‌کردن تم تیره"}
      title={isDark ? "تم روشن" : "تم تیره"}
      data-ready={ready ? "true" : "false"}
      disabled={!ready}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <i className="theme-toggle-thumb">{isDark ? "☾" : "☀"}</i>
      </span>
      <span className="theme-toggle-label">{isDark ? "روشن" : "تیره"}</span>
    </button>
  );
}
