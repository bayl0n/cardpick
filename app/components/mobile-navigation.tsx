"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./theme-toggle";

type NavigationLink = {
  href: string;
  label: string;
};

type NavigationItem =
  | NavigationLink
  | {
      label: string;
      children: NavigationLink[];
    };

const navigationItems: NavigationItem[] = [
  {
    label: "Beginner",
    children: [
      {
        href: "/articles/what-card-is-right-for-you",
        label: "Things you must know",
      },
    ],
  },
  {
    href: "/articles/what-card-is-right-for-you",
    label: "Pick your best cards",
  },
  {
    label: "Credit cards",
    children: [
      {
        href: "/articles/best-cashback-commbank",
        label: "Bank rewards",
      },
      { href: "/#guides", label: "Qantas" },
      { href: "/#guides", label: "Velocity" },
    ],
  },
  {
    label: "Updates",
    children: [
      {
        href: "/articles/credit-card-devaluations-2026",
        label: "Devaluations",
      },
    ],
  },
  {
    href: "/articles/best-lounge-access-cards",
    label: "Cards for lounge",
  },
];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navigationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");

    if (!header) {
      return;
    }

    function updateHeader() {
      header?.setAttribute("data-scrolled", String(window.scrollY > 24));
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setOpenGroup(null);
      }
    }

    function closeOnOutsideClick(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !navigationRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
        setOpenGroup(null);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, []);

  function closeNavigation() {
    setIsOpen(false);
    setOpenGroup(null);
  }

  return (
    <div className="navigation" ref={navigationRef}>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => {
          setIsOpen((open) => !open);
          setOpenGroup(null);
        }}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <nav
        className="primary-nav"
        id="primary-navigation"
        aria-label="Primary navigation"
        data-open={isOpen}
      >
        {navigationItems.map((item) => {
          if ("href" in item) {
            return (
              <Link
                className="nav-link"
                href={item.href}
                key={item.label}
                onClick={closeNavigation}
              >
                {item.label}
              </Link>
            );
          }

          const isGroupOpen = openGroup === item.label;
          const submenuId = `submenu-${item.label
            .toLowerCase()
            .replaceAll(" ", "-")}`;

          return (
            <div
              className="nav-group"
              data-open={isGroupOpen}
              key={item.label}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setOpenGroup((current) =>
                    current === item.label ? null : current,
                  );
                }
              }}
            >
              <button
                className="nav-group-toggle"
                type="button"
                aria-controls={submenuId}
                aria-expanded={isGroupOpen}
                onClick={() =>
                  setOpenGroup((current) =>
                    current === item.label ? null : item.label,
                  )
                }
              >
                {item.label}
                <span className="nav-chevron" aria-hidden="true" />
              </button>
              <div className="nav-submenu" id={submenuId}>
                {item.children.map((child) => (
                  <Link
                    href={child.href}
                    key={child.label}
                    onClick={closeNavigation}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        <ThemeToggle />
      </nav>
    </div>
  );
}
