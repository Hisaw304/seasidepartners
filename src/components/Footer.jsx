import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const nav = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Articles", to: "/articles" },
  ];

  const socials = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      svg: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <path d="M17.5 6.5h.01" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      svg: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 2a4.5 4.5 0 00-4.47 5.5A12.94 12.94 0 013 4s-4 9 5 13a13 13 0 01-8 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      svg: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Sea Side Partner"
              className="h-12 w-12 object-contain"
            />
            <div>
              <div
                className="font-semibold text-lg"
                style={{ color: "var(--color-dark-blue)" }}
              >
                SeaSide Partners
              </div>
            </div>
          </Link>

          <p className="text-sm" style={{ color: "var(--color-dark-blue)" }}>
            Sea Side Partner is a law firm dedicated to providing excellent
            legal services with a personal touch. We handle a broad range of
            legal matters with professionalism and care.
          </p>
        </div>

        <div>
          <h4
            className="text-sm font-semibold mb-3"
            style={{ color: "var(--color-dark-blue)" }}
          >
            Contact
          </h4>
          <address className="not-italic text-sm space-y-1">
            <div style={{ color: "var(--color-dark-blue)" }}>
              14, Allen Avenue
            </div>
            <div style={{ color: "var(--color-dark-blue)" }}>
              Ikeja, Lagos State
            </div>
            <br />
            <div style={{ color: "var(--color-dark-blue)" }}>
              C Close 194, Kafe Garden
            </div>
            <div style={{ color: "var(--color-dark-blue)" }}>
              Gwarinpa, Abuja
            </div>
            <br />
            <div>
              email:{" "}
              <a href="mailto:info@seasidepartner.com" className="footer-link">
                info@seasidepartner.com
              </a>
            </div>
            <div>
              phone:{" "}
              <a href="tel:+1234567890" className="footer-link">
                +1 (234) 567-890
              </a>
            </div>
          </address>
        </div>

        <div>
          <h4
            className="text-sm font-semibold mb-3"
            style={{ color: "var(--color-dark-blue)" }}
          >
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="footer-link block">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="social-link p-2 rounded-md inline-flex items-center justify-center border border-transparent"
                target="_blank"
                rel="noreferrer"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="bg-white text-center py-4 text-xs"
        style={{ color: "var(--color-dark-blue)" }}
      >
        Sea Side Partner • All rights reserved © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
