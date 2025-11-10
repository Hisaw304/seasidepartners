// src/components/Faq.jsx
import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaSearch } from "react-icons/fa";

/**
 * Faq (modern, accessible)
 * - Heading + sub-paragraph use var(--accent)
 * - Inherits page background (no component bg)
 * - Searchable accordion, keyboard accessible
 * - Requires: framer-motion, react-icons
 *
 * Usage: <Faq />
 */

const FAQ_ITEMS = [
  {
    q: "How do I book a consultation?",
    a: "You can book a consultation by clicking 'Book an Appointment' in the header or by calling our office at +234 (0) 901 391 6630. We offer in-person and virtual consultations.",
  },
  {
    q: "What should I bring to my first meeting?",
    a: "Bring any documents relevant to your matter (contracts, letters, medical reports, ID). If you're unsure, email a short summary to our intake team before the meeting.",
  },
  {
    q: "Do you handle cases Nation wide / internationally?",
    a: "Yes — we advise on matters across Nigeria and on cross-border issues.",
  },
  {
    q: "How are fees structured?",
    a: "Fee structure depends on the matter: we offer fixed-fee retainers for defined work, hourly billing for advisory work, and contingency arrangements in select litigation matters. We discuss fees upfront.",
  },
  {
    q: "How long does a typical case take?",
    a: "Timelines vary widely by practice area and complexity. During your first consultation we can provide a realistic estimate and milestones.",
  },
  {
    q: "How do you protect client confidentiality?",
    a: "We maintain strict confidentiality through secure file handling, NDAs where appropriate, and limited access to client files internally. We operate to professional ethical standards at all times.",
  },
];

const container = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function Faq() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const searchRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_ITEMS;
    return FAQ_ITEMS.filter(
      (item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [query]);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  const onKeyToggle = (e, i) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(i);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(FAQ_ITEMS.length - 1, i + 1);
      document.getElementById(`faq-button-${next}`)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(0, i - 1);
      document.getElementById(`faq-button-${prev}`)?.focus();
    }
  };

  return (
    <section aria-label="Frequently asked questions" className="w-full mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
        {/* Heading */}
        <div className="max-w-3xl mb-8">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={container}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold leading-tight"
            style={{ color: "var(--dark-blue)" }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-4 text-base md:text-lg"
            style={{ color: "var(--dark-blue)" }}
          >
            Quick answers to the questions we hear most. If you don’t see what
            you need, please contact us for a personalised response.
          </motion.p>
        </div>

        {/* Search */}
        <div className="max-w-2xl">
          <label htmlFor="faq-search" className="sr-only">
            Search frequently asked questions
          </label>
          <div
            className="relative rounded-full"
            style={{
              background: "rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaSearch
                className="w-4 h-4"
                style={{ color: "var(--accent)" }}
              />
            </div>
            <input
              id="faq-search"
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions, topics or keywords..."
              className="w-full pl-12 pr-4 py-3 rounded-full text-sm focus:outline-none"
              style={{
                background: "transparent",
                color: "var(--dark-blue)",
                border: "none",
                // ensure placeholder uses subtle accent
                caretColor: "var(--accent)",
              }}
            />
          </div>
        </div>

        {/* Accordion list */}
        <motion.dl
          className="mt-12 grid gap-4 px-4 py-10 rounded-2xl shadow-md"
          style={{
            background: "var(--color-dark-blue)",
            color: "var(--color-white)",
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {filtered.length === 0 && (
            <motion.div
              variants={item}
              className="text-sm text-gray-200 text-center"
            >
              No results found. Try a different keyword.
            </motion.div>
          )}

          {filtered.map((it, i) => {
            const originalIndex = FAQ_ITEMS.indexOf(it);
            const isOpen = openIndex === originalIndex;

            return (
              <motion.div
                key={it.q}
                variants={item}
                className="border rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300"
                style={{
                  border: isOpen
                    ? "1px solid var(--color-white)"
                    : "1px solid rgba(255,255,255,0.2)",
                  background: isOpen
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.03)",
                }}
              >
                {/* Question */}
                <div
                  id={`faq-button-${originalIndex}`}
                  role="button"
                  tabIndex={0}
                  aria-controls={`faq-panel-${originalIndex}`}
                  aria-expanded={isOpen}
                  onClick={() => toggle(originalIndex)}
                  onKeyDown={(e) => onKeyToggle(e, originalIndex)}
                  className="flex items-center justify-between gap-4 px-4 py-4 cursor-pointer transition-all hover:bg-[rgba(255,255,255,0.06)]"
                >
                  <div className="text-left">
                    <h3
                      className="text-base font-medium"
                      style={{
                        color: "var(--color-white)",
                      }}
                    >
                      {it.q}
                    </h3>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="ml-3 flex-shrink-0"
                    aria-hidden
                    style={{ color: "var(--color-accent)" }}
                  >
                    <FaChevronDown />
                  </motion.span>
                </div>

                {/* Answer panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      id={`faq-panel-${originalIndex}`}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                      className="px-4 pb-4"
                    >
                      <div className="prose max-w-none">
                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            color: "rgba(255,255,255,0.9)",
                          }}
                        >
                          {it.a}
                        </p>
                      </div>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.dl>

        {/* CTA under FAQ */}
        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold"
              style={{
                background: "var(--accent)",
                color: "var(--white)",
                boxShadow: "0 10px 30px rgba(72,172,186,0.12)",
              }}
            >
              Still have questions? Contact us
            </a>

            <button
              onClick={() => {
                setQuery("");
                setOpenIndex(null);
                searchRef.current?.focus();
              }}
              className="text-sm underline underline-offset-4"
              style={{ color: "var(--dark-blue)" }}
            >
              Clear search
            </button>
          </motion.div>
        </div>
      </div>

      <style>{`
        /* small utilities preserved inline to keep this component self-contained */
        .prose p { margin: 0; }
        /* keyboard focus ring */
        [role="button"]:focus { box-shadow: 0 0 0 4px rgba(72,172,186,0.12); border-radius: 12px; }
      `}</style>
    </section>
  );
}
