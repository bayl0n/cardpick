"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";

const links = [
  { href: "#guides", label: "Guides" },
  { href: "#picks", label: "Top picks" },
  { href: "#newsletter", label: "Newsletter" },
];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="navigation">
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((open) => !open)}
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
        {links.map((link) => (
          <a
            href={link.href}
            key={link.href}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <ThemeToggle />
      </nav>
    </div>
  );
}
