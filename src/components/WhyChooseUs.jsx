// src/components/WhyChooseUs.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaBalanceScale,
  FaHandshake,
  FaGavel,
  FaUsers,
  FaGlobe,
  FaShieldAlt,
} from "react-icons/fa";

/**
 * Senior-level redesign:
 * - Thick top border (accent) across the card.
 * - Thick right-side accent that spans the top half of the card.
 * - Glassy card surface (very subtle), deeper shadow, rounded 2xl.
 * - Icon badge uses accent stroke and subtle backdrop.
 * - Hover: lift, stronger shadow, accent glow.
 * - Accessibility: aria-labelledby and descriptive alt-text where helpful.
 */

const features = [
  {
    Icon: FaBalanceScale,
    title: "Proven Expertise",
    copy: "Litigation and advisory experience across core practice areas, providing seasoned legal judgment, strategic insight, and a proven record of guiding clients through complex disputes and high-stakes matters.",
  },
  {
    Icon: FaHandshake,
    title: "Client-First Approach",
    copy: "Personalized strategies and clear, direct communication at every stage. We take time to understand your goals, concerns, and priorities, ensuring you are informed, supported, and actively involved in key decisions — treated as a partner in the process, not a file in a system.",
  },
  {
    Icon: FaGavel,
    title: "High Success Rate",
    copy: "Consistently strong outcomes achieved through a disciplined approach to advocacy, strategic negotiation, and trial-ready preparation. Our history of favorable settlements and courtroom results reflects a commitment to rigorous analysis, thoughtful case strategy, and unwavering pursuit of client objectives.",
  },
  {
    Icon: FaUsers,
    title: "Dedicated Team",
    copy: "A senior-led team supported by focused associates and specialized professionals, ensuring meticulous attention to detail and efficient execution. We blend hands-on partner involvement with cost-effective support, delivering high-quality work without unnecessary layers or inefficiencies.",
  },
  {
    Icon: FaGlobe,
    title: "Local & Global Reach",
    copy: "Deep local insight paired with international perspective and network access for matters involving cross-border interests. Whether navigating regional issues or complex global considerations, we provide context-driven strategy supported by experience in internationally relevant legal and business environments.",
  },
  {
    Icon: FaShieldAlt,
    title: "Ethical & Discreet",
    copy: "Confidential and professional handling of sensitive matters, grounded in ethical practice and absolute discretion. Clients receive honest advice, transparent guidance, and representation built on trust, integrity, and the highest standards of legal conduct and personal respect.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, when: "beforeChildren" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.995 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  hover: { y: -6, scale: 1.01, transition: { duration: 0.25 } },
};

export default function WhyChooseUs() {
  return (
    <section aria-label="Why choose Seaside Partners" className="w-full mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-16">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold leading-tight"
            style={{ color: "var(--dark-blue)" }}
          >
            Why Choose Seaside Partners
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="mt-4 text-base md:text-lg"
            style={{ color: "var(--dark-blue)" }}
          >
            We combine sharp legal strategy with compassionate client care —
            proven results, transparent communication, and a team that will
            fight for you.
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {features.map(({ Icon, title, copy }, idx) => (
            <motion.article
              key={title}
              variants={itemVariants}
              whileHover="hover"
              aria-labelledby={`why-title-${idx}`}
              className="card-wrap relative rounded-[18px] overflow-visible min-h-[360px]" // ✅ equal height
              style={{ zIndex: 0 }}
            >
              <div
                className="card-inner p-6 rounded-[18px] flex flex-col h-full" // ✅ flex & full height
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.04)",
                  boxShadow:
                    "0 18px 44px rgba(3,12,30,0.28), inset 0 1px 0 rgba(255,255,255,0.02)",
                  position: "relative",
                  zIndex: 2,
                  transition:
                    "box-shadow 220ms cubic-bezier(.2,.9,.3,1), transform 220ms",
                }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                      border: "2px solid rgba(255,255,255,0.06)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.02), 0 8px 18px rgba(3,12,30,0.18)",
                      color: "var(--color-accent)",
                    }}
                    aria-hidden
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex flex-col h-full">
                    <h3
                      id={`why-title-${idx}`}
                      className="text-lg font-semibold"
                      style={{ color: "var(--dark-blue)" }}
                    >
                      {title}
                    </h3>

                    <p
                      className="mt-2 text-sm leading-relaxed max-w-md flex-grow" // ✅ expands evenly
                      style={{ color: "rgba(3,12,30,0.7)" }}
                    >
                      {copy}
                    </p>

                    <div className="mt-4 hidden sm:flex sm:items-center sm:gap-3">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md"
                        style={{
                          color: "var(--color-accent)",
                          background: "transparent",
                          border: "1px solid rgba(72,172,186,0.08)",
                        }}
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent pseudo-elements + hover (moved to CSS so they align precisely) */}
              <style jsx>{`
                .card-wrap {
                  /* radius must match .card-inner */
                  border-radius: 18px;
                }

                .card-wrap::before,
                .card-wrap::after {
                  content: "";
                  position: absolute;
                  background: var(--color-accent);
                  z-index: 1; /* behind .card-inner (z-index:2) */
                  box-shadow: 0 8px 22px rgba(72, 172, 186, 0.14);
                  will-change: transform, box-shadow;
                  -webkit-backface-visibility: hidden;
                  backface-visibility: hidden;
                  pointer-events: none;
                }

                /* top accent bar — aligned to the outer edge of the card */
                .card-wrap::before {
                  height: 12px;
                  left: 0;
                  right: 0;
                  top: 0;
                  border-bottom-left-radius: 18px;
                  border-bottom-right-radius: 18px;
                  transform: translateY(0);
                  box-sizing: border-box;
                }

                /* left accent bar — flush to left edge, extends down */
                .card-wrap::after {
                  width: 14px;
                  left: 0;
                  top: 0;
                  height: 60%;
                  border-top-right-radius: 14px;
                  border-bottom-right-radius: 14px;
                  transform: translateX(0);
                  box-sizing: border-box;
                }

                /* Hover lift fallback if motion not applied */
                .card-wrap:hover .card-inner {
                  box-shadow: 0 26px 56px rgba(3, 12, 30, 0.36),
                    inset 0 1px 0 rgba(255, 255, 255, 0.02);
                  transform: translateY(-4px);
                }

                /* small retina fix: force integer composite on accent edges */
                @supports (-webkit-overflow-scrolling: touch) {
                  .card-wrap::before,
                  .card-wrap::after {
                    transform: translate3d(0, 0, 0);
                  }
                }
              `}</style>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
