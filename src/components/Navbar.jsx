import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", to: "/" },
    { label: "Articles", to: "/articles" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Sea Side Partner logo"
                className="h-10 w-10 object-contain"
              />
              <div className="text-[var(--color-dark-blue)] font-semibold text-lg leading-tight select-none">
                SeaSide Partners
              </div>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="nav-link text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-label="Toggle navigation"
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)]"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          open ? "block" : "hidden"
        } border-t border-transparent`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block py-2 px-2 rounded-md nav-link-mobile font-medium"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
