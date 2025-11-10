// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaPhoneAlt,
  FaTiktok,
} from "react-icons/fa";
import seaside from "../assets/seasidepartners.jpg";
import seasideHero from "../assets/seaside-hero.jpg";

/* Animation variants */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
};
const slideInLeft = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { ease: "easeOut", duration: 0.7 } },
};
const statsSlide = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 16, duration: 0.6 },
  },
};

export default function Hero() {
  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      aria-label="Hero section"
      className="
    relative w-full bg-white overflow-hidden
    flex flex-col
    min-h-[auto] 
    md:min-h-[auto] 
    lg:min-h-screen
    pb-24 sm:pb-28 lg:pb-0
  "
      style={{
        backgroundImage: `url(${seasideHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        color: "var(--color-white)",
      }}
    >
      {/* Overlay — dark blue with reduced intensity */}
      <div className="absolute inset-0 bg-[var(--color-dark-blue)]/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          initial="hidden"
          animate="show"
          variants={container}
        >
          {/* Left content */}
          <div className="lg:col-span-7">
            {/* TOP PILL (no white bg) */}
            <motion.p
              variants={fadeUp}
              className="inline-block mb-4 text-sm uppercase tracking-wider font-medium text-[var(--color-accent)] border-l-4 border-[var(--color-accent)] pl-3"
            >
              Solicitors • Advocates • ARBITRATORS
            </motion.p>

            <motion.h1
              variants={slideInLeft}
              className="text-white font-serif font-extrabold leading-tight text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6"
            >
              Strategic legal solutions for a changing world, Driven by
              integrity and Defined by results. Your vision, our legal strength.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/90 text-base md:text-lg max-w-2xl mb-8"
            >
              At Seaside Partners, we go beyond traditional legal practice,
              combining deep legal expertise with strategic business insight.
              Our approach is modern, tech-conscious, and client-focused,
              helping individuals and organizations navigate complex issues in
              property, corporate, tax, entertainment, and startup law with
              clarity and confidence. We don’t just provide legal solutions, we
              build lasting partnerships that drive growth, compliance, and
              innovation.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold shadow-lg transform-gpu hover:-translate-y-0.5 focus:outline-none focus:ring-4"
                style={{
                  backgroundColor: "var(--color-accent)",
                  boxShadow: "0 12px 30px rgba(72,172,186,0.16)",
                }}
                aria-label="Book an appointment"
              >
                Book an Appointment
              </button>

              <a
                href="tel:+23408037160410"
                className="inline-flex items-center gap-3 text-white/90 hover:text-white transition rounded-md px-3 py-2"
                aria-label="Call us"
              >
                <FaPhoneAlt className="w-4 h-4" />
                <span className="font-medium">+234 (0) 901 391 6630</span>
              </a>
            </motion.div>

            {/* Social + micro info */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex items-center gap-6 flex-wrap"
            >
              <div className="flex items-center gap-4">
                <span className="text-white/70 text-sm">Follow us</span>
                <nav
                  aria-label="Social links"
                  className="flex items-center gap-3"
                >
                  <a
                    href="https://www.instagram.com/theseasidepartners?igsh=MWIzMWplb3kyeTd3ZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/6 hover:bg-white/12 transition"
                    aria-label="Instagram"
                    style={{ color: "var(--white)" }}
                  >
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@theseasidepartners?_r=1&_t=ZS-917QdpLuEC2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/6 hover:bg-white/12 transition"
                    aria-label="TikTok"
                    style={{ color: "var(--white)" }}
                  >
                    <FaTiktok className="w-4 h-4" />
                  </a>
                </nav>
              </div>

              {/* Desktop location */}
              <div className="hidden sm:flex sm:items-center sm:gap-4 border-l border-white/6 pl-6">
                <div className="text-sm text-white/70">Our Location</div>
                <div className="text-white font-semibold">
                  Allen, Ikeja • Gwarinpa, Abuja
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Image card — SHOW ONLY ON LARGE (lg and up) */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              variants={fadeUp}
              className="w-full rounded-2xl overflow-hidden shadow-2xl"
              style={{
                border: "1px solid rgba(255,255,255,0.04)",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))",
              }}
            >
              <img
                src={seaside}
                alt="Seaside Partners — office and team"
                className="w-full h-[420px] object-cover block"
              />

              <div className="p-6 bg-gradient-to-t from-black/40 to-transparent">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">100+</div>
                    <div className="text-sm text-white/80 mt-1">
                      Consultations
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl font-bold text-white">90%+</div>
                    <div className="text-sm text-white/80 mt-1">
                      Goals achieved
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl font-bold text-white">
                      4.7<span className="text-sm">/5.0</span>
                    </div>
                    <div className="text-sm text-white/80 mt-1">Avg Rating</div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <a
                    href="tel:+23408037160410"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/8 text-white hover:bg-white/12 transition text-sm font-medium"
                    aria-label="Call now"
                  >
                    <FaPhoneAlt className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="block lg:hidden mt-10 px-4 pb-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={statsSlide}
      >
        <div className="relative p-4 rounded-xl bg-gradient-to-t from-black/70 to-transparent shadow-2xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">100+</div>
              <div className="text-sm text-white/80 mt-1">Consultations</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-white">90%+</div>
              <div className="text-sm text-white/80 mt-1">Goals achieved</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-white">
                4.7<span className="text-sm">/5.0</span>
              </div>
              <div className="text-sm text-white/80 mt-1">Avg Rating</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
