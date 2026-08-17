"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const options: { label: string; value: Theme }[] = [
  { label: "Light mode", value: "light" },
  { label: "Dark mode", value: "dark" },
];

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "light") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.4 15.3A8.5 8.5 0 0 1 8.7 3.6 8.5 8.5 0 1 0 20.4 15.3Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme;
    setTheme(currentTheme === "dark" ? "dark" : "light");
  }, []);

  function selectTheme(nextTheme: Theme) {
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    try {
      localStorage.setItem("cardpick-theme", nextTheme);
    } catch {
      // The visual preference still applies when storage is unavailable.
    }
    setTheme(nextTheme);
  }

  return (
    <div className="theme-toggle" role="group" aria-label="Colour theme">
      {options.map((option) => (
        <button
          className="theme-option"
          data-theme-choice={option.value}
          type="button"
          aria-label={`Use ${option.label.toLowerCase()}`}
          aria-pressed={theme === option.value}
          title={option.label}
          key={option.value}
          onClick={() => selectTheme(option.value)}
        >
          <ThemeIcon theme={option.value} />
        </button>
      ))}
    </div>
  );
}
