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
      href: "https://www.instagram.com/theseasidepartners?igsh=MWIzMWplb3kyeTd3ZA==",
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
      name: "TikTok",
      href: "https://www.tiktok.com/@theseasidepartners?_r=1&_t=ZS-917QdpLuEC2",
      svg: (
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
        >
          <path d="M448,209.9a210,210,0,0,1-122.77-39.32V349.14A162.86,162.86,0,1,1,185,188.08v83.62a79.27,79.27,0,1,0,55.23,75V0h85a123.31,123.31,0,0,0,123,123Z" />
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
            Seaside Partners is a Lagos and Abuja-based law firm offering
            corporate, property, IP, and entertainment legal services with a
            client-first approach.
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
              <a href="mailto:info@seasidepartner.org" className="footer-link">
                info@seasidepartner.org
              </a>
            </div>
            <div>
              phone:{" "}
              <a href="tel:+2349013916630" className="footer-link">
                +234 (0) 901 391 6630
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
