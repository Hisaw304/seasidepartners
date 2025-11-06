// src/pages/ArticlesPage.jsx
import React, { useEffect, useState } from "react";
import { client } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import heroImg from "../assets/contact-hero.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PAGE_SIZE = 9; // change to 10 if you want 10 per page

const cardVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.995 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.45, ease: "easeOut" },
  }),
};

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  useEffect(() => {
    let cancelled = false;

    async function fetchCount() {
      try {
        const c = await client.fetch(
          'count(*[_type == "article" && defined(date)])'
        );
        if (!cancelled) setCount(c);
      } catch (err) {
        console.error("Sanity count error:", err);
        if (!cancelled) setError(err);
      }
    }

    fetchCount();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    async function fetchPage() {
      try {
        // start index is 0-based
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        // GROQ range is inclusive-exclusive: [start...end]
        const q = `*[_type == "article" && defined(date)] | order(date desc)[${start}...${end}]{
          _id,
          title,
          excerpt,
          date,
          "image": image.asset->url,
          "slug": slug.current
        }`;

        const res = await client.fetch(q);
        if (!cancelled) {
          setArticles(res || []);
          setLoading(false);
        }
      } catch (err) {
        console.error("Sanity fetch error:", err);
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      }
    }

    fetchPage();

    return () => {
      cancelled = true;
    };
  }, [page]);

  function formatDate(iso) {
    if (!iso) return "";
    try {
      return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  }

  return (
    <main className="w-full">
      {/* HERO */}
      <section
        aria-label="Articles hero"
        className="relative w-full min-h-[48vh] lg:min-h-[56vh] flex items-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(3,12,30,0.45), rgba(3,12,30,0.45)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          color: "var(--color-white)",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-serif font-extrabold leading-tight"
              style={{ color: "var(--white)" }}
            >
              Legal Insights & Articles
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="mt-4 text-base md:text-lg text-white/90 max-w-2xl"
            >
              Stay informed with the latest legal updates, expert commentary,
              and practical guides from our team of attorneys.
            </motion.p>
            {/* 
            <div className="mt-6 flex gap-3">
              <a
                href="#articles-grid"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full font-semibold text-white"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Browse articles
              </a>
            </div> */}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section id="articles-grid" className="w-full bg-[var(--color-white)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2
                className="text-2xl font-semibold"
                style={{ color: "var(--dark-blue)" }}
              >
                Latest Articles
              </h2>
              <p
                className="text-sm text-muted mt-1"
                style={{ color: "rgba(3,12,30,0.7)" }}
              >
                Showing {articles.length} of {count} published articles
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm" style={{ color: "rgba(3,12,30,0.7)" }}>
                Page
              </div>
              <nav aria-label="Pagination" className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1 || loading}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md border"
                  aria-label="Previous page"
                >
                  <FaChevronLeft className="w-3 h-3" />
                </button>

                <div
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-white/80 border"
                  style={{ color: "var(--dark-blue)" }}
                >
                  <span className="font-medium">{page}</span>
                  <span className="text-sm text-muted">/ {totalPages}</span>
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages || loading}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md border"
                  aria-label="Next page"
                >
                  <FaChevronRight className="w-3 h-3" />
                </button>
              </nav>
            </div>
          </div>

          {/* Grid */}
          {error ? (
            <div className="rounded-md p-6 bg-red-50 text-red-700">
              Error loading articles. Check your Sanity client config.
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse h-60 rounded-xl bg-slate-100"
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {articles.map((a, idx) => (
                <motion.article
                  key={a._id}
                  custom={(idx % 6) * 0.04}
                  variants={cardVariants}
                  className="rounded-2xl overflow-hidden bg-white shadow-lg border"
                  style={{ borderColor: "rgba(2,6,23,0.04)" }}
                >
                  <div className="relative">
                    {a.image ? (
                      <img
                        src={a.image}
                        alt={a.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-r from-slate-100 to-slate-200" />
                    )}
                    <div
                      className="absolute left-4 top-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.9)" }}
                    >
                      <span
                        className="text-xs font-medium"
                        style={{ color: "var(--dark-blue)" }}
                      >
                        {formatDate(a.date)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col h-full">
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--dark-blue)" }}
                    >
                      {a.title}
                    </h3>

                    <p
                      className="text-sm text-muted mb-4"
                      style={{ color: "rgba(3,12,30,0.7)" }}
                    >
                      {a.excerpt || ""}
                    </p>

                    <div className="mt-auto pt-3">
                      <a
                        href={`/articles/${a.slug || a._id}`}
                        className="inline-flex items-center gap-2 text-sm font-medium"
                        style={{ color: "var(--color-accent)" }}
                      >
                        Read article
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
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
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* Pagination controls bottom */}
          <div className="mt-8 flex items-center justify-between">
            <div
              className="text-sm text-muted"
              style={{ color: "rgba(3,12,30,0.7)" }}
            >
              Showing {(page - 1) * PAGE_SIZE + 1} —{" "}
              {Math.min(page * PAGE_SIZE, count)} of {count} articles
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1 || loading}
                className="px-3 py-2 rounded-md border"
              >
                Prev
              </button>

              <div className="px-3 py-2 bg-white/80 border rounded-md">
                Page {page} / {totalPages}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages || loading}
                className="px-3 py-2 rounded-md border"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
