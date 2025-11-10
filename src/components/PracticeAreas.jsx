// src/components/PracticeAreas.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaGavel,
  FaBuilding,
  FaBriefcase,
  FaFileContract,
  FaLightbulb,
  FaUsers,
  FaBook,
} from "react-icons/fa";
import seasideHero from "../assets/seaside-hero.jpg";

const areas = [
  {
    Icon: FaGavel,
    title: "Litigation",
    lines: ["Civil Litigation", "Commercial Litigation", "Criminal Litigation"],
  },
  {
    Icon: FaBuilding,
    title: "Corporate & Commercial Law",
    lines: [
      "Restructuring",
      "Project Finance",
      "Governance & Compliance",
      "Company formation",
      "Corporate compliance",
      "Debt recovery",
    ],
  },
  {
    Icon: FaBriefcase,
    title: "Employment",
    lines: ["Employment contracts", "Unfair dismissal", "Staff handbook"],
  },
  {
    Icon: FaFileContract,
    title: "Will & Estates",
    lines: [
      "Will drafting",
      "Estate administration",
      "Enduring powers of attorney",
    ],
  },
  {
    Icon: FaLightbulb,
    title: "Intellectual Property",
    lines: ["Trademarks", "Patents & designs"],
  },
  {
    Icon: FaUsers,
    title: "Entertainment & Media Law",
    lines: ["Creators", "Corporatecompliance", "Debt recovery"],
  },
];

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PracticeAreas() {
  return (
    <section aria-label="Our Practice Areas" className="w-full mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold leading-tight"
            style={{ color: "var(--dark-blue)" }}
          >
            Our Practice Areas
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="mt-4 text-base md:text-lg"
            style={{ color: "var(--dark-blue)" }}
          >
            We provide focused, practical legal support across sectors — from
            high-stakes commercial deals to everyday personal matters.
          </motion.p>
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${seasideHero})` }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-black/66 pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            variants={gridContainer}
          >
            {areas.map(({ Icon, title, lines }, idx) => (
              <motion.article
                key={title}
                variants={cardItem}
                tabIndex={0}
                aria-labelledby={`area-title-${idx}`}
                className={`
                  relative rounded-2xl overflow-hidden
                  focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/20
                `}
                style={{
                  // subtle outer border glow using accent, and glassy dark background
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                  boxShadow: "0 18px 40px rgba(2,6,23,0.34)",
                  borderRadius: 18,
                }}
              >
                {/* Accent border + card surface */}
                <div
                  className="
                    relative rounded-2xl border
                    p-6 flex flex-col h-full
                    transition-all duration-300
                  "
                  style={{
                    borderColor: "rgba(255,255,255,0.04)",
                    background:
                      "linear-gradient(180deg, rgba(3,12,30,0.70), rgba(3,12,30,0.60))",
                  }}
                >
                  {/* Accent bar on top (subtle) */}
                  <div
                    aria-hidden
                    className="absolute left-0 right-0 top-0 h-2 bg-[var(--color-accent)]/30"
                    style={{
                      borderBottomLeftRadius: 18,
                      borderBottomRightRadius: 18,
                    }}
                  />

                  {/* Icon (top) */}
                  <div className="mt-4 mb-4 flex items-center justify-center">
                    <div
                      className="w-14 h-14 rounded-[12px] flex items-center justify-center transform-gpu transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                        border: "1px solid rgba(255,255,255,0.04)",
                        boxShadow:
                          "0 8px 20px rgba(2,6,23,0.32), inset 0 1px 0 rgba(255,255,255,0.02)",
                        color: "var(--color-accent)",
                      }}
                    >
                      <Icon className="w-6 h-6" aria-hidden />
                    </div>
                  </div>

                  {/* Content: title + paragraph/lines */}
                  <div className="flex-1 flex flex-col">
                    <h3
                      id={`area-title-${idx}`}
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-white)" }}
                    >
                      {title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      {/* join lines into a friendly short paragraph for consistency */}
                      {lines.join(" · ")}
                    </p>

                    {/* Optional detail area with subtle arrow — kept at bottom so cards are visually consistent */}
                    <div className="mt-auto pt-3">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md transition"
                        style={{
                          color: "var(--color-accent)",
                          background: "transparent",
                          border: "1px solid rgba(72,172,186,0.08)",
                        }}
                        aria-label={`Learn more about ${title}`}
                      >
                        Learn more
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline-block"
                          aria-hidden
                        >
                          <path
                            d="M5 12h14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Lighting sweep overlay (will animate on hover/focus) */}
                  <div
                    aria-hidden
                    className="absolute -left-[120%] top-0 h-full w-[60%] opacity-0 transform-gpu rotate-12 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03), rgba(255,255,255,0))",
                      transition:
                        "transform 650ms cubic-bezier(.22,1,.36,1), opacity 420ms ease",
                    }}
                  />
                </div>

                {/* Hover/focus visual effects (non-inline to keep transitions smooth) */}
                <style jsx>{`
                  article:focus .absolute,
                  -left-[120%] {
                  }
                  article:focus,
                  article:hover {
                    transform: translateY(-6px);
                  }

                  article:hover .w-14,
                  article:focus .w-14 {
                    transform: translateY(-4px) scale(1.02);
                  }

                  article:hover .absolute.-left\\[120\\%],
                  article:focus .absolute.-left\\[120\\%] {
                    opacity: 1;
                    transform: translateX(220%) rotate(12deg);
                  }

                  /* Slight icon color flip */
                  article:hover svg,
                  article:focus svg {
                    color: var(--color-dark-blue);
                  }

                  /* make sure card keeps even visual height across grid */
                  @media (min-width: 1024px) {
                    article > div {
                      min-height: 260px;
                    }
                  }
                `}</style>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
