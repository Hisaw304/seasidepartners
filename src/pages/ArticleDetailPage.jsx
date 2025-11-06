import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const query = `*[_type == "article" && slug.current == $slug][0]{
          title,
          date,
          excerpt,
          content,
          "image": image.asset->url
        }`;
        const result = await client.fetch(query, { slug });
        setArticle(result);
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
        Loading article...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-red-600">
        Article not found.
      </div>
    );
  }

  return (
    <main className="w-full bg-white">
      {/* HERO */}
      <section
        className="relative w-full min-h-[50vh] flex items-end"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(3,12,30,0.55), rgba(3,12,30,0.65)), url(${article.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          color: "var(--color-white)",
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 py-20">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-serif leading-tight"
          >
            {article.title}
          </motion.h1>
          <p className="mt-3 text-sm text-white/80">
            {new Date(article.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        {article.excerpt && (
          <p className="text-lg italic mb-6 text-slate-600">
            “{article.excerpt}”
          </p>
        )}
        <div className="prose prose-lg max-w-none text-slate-800">
          <PortableText value={article.content} />
        </div>
      </section>
    </main>
  );
}
