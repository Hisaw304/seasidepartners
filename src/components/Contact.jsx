// src/components/Contact.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTwitter,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

/**
 * Contact.jsx
 * - Modern contact component
 * - Uses root CSS variables: --accent, --dark-blue, --white, --light-gray (if present)
 * - Submits JSON to /api/contact (serverless function - nodemailer)
 */

const container = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { ok: true/false, msg: '' }

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.phone.trim()) e.phone = "Please enter a phone number.";
    if (!form.message.trim()) e.message = "Please briefly describe your case.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (k) => (ev) => {
    setForm((s) => ({ ...s, [k]: ev.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setResult({
          ok: true,
          msg: json.message || "Message sent — we will contact you shortly.",
        });
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setResult({
          ok: false,
          msg: json.error || "Something went wrong. Please try again later.",
        });
      }
    } catch (err) {
      setResult({
        ok: false,
        msg: "Network error — please check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Seaside Partners"
      className="w-full mt-16"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <motion.h2
            initial="hidden"
            whileInView="show"
            variants={container}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold leading-tight"
            style={{ color: "var(--dark-blue)" }}
          >
            Contact Seaside Partners. Expert Legal Advice in Lagos and Abuja.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04 }}
            className="mt-4 text-base md:text-lg"
            style={{ color: "var(--dark-blue)" }}
          >
            Tell us about your matter — we’ll review and respond promptly. Use
            the form below or reach us directly using the contact details to the
            right.
          </motion.p>
        </div>

        {/* Content grid: form + contact info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form (left / main) */}
          <div className="lg:col-span-7">
            <motion.form
              initial="hidden"
              whileInView="show"
              variants={container}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 shadow-lg"
              aria-label="Contact form"
            >
              {/* success / error banner */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className={`mb-4 rounded-md px-4 py-3 text-sm ${
                      result.ok
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                    style={{
                      border: "1px solid rgba(0,0,0,0.04)",
                    }}
                    role="status"
                  >
                    <strong
                      style={{
                        color: result.ok
                          ? "var(--dark-blue)"
                          : "var(--dark-blue)",
                      }}
                    >
                      {result.ok ? "Success — " : "Error — "}
                    </strong>{" "}
                    <span style={{ color: "var(--dark-blue)" }}>
                      {result.msg}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--dark-blue)" }}
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    value={form.name}
                    onChange={handleChange("name")}
                    className="w-full rounded-lg px-3 py-2 border focus:ring-2 focus:outline-none"
                    style={{
                      border: "1px solid rgba(2,6,23,0.06)",
                      color: "var(--dark-blue)",
                    }}
                    placeholder="Adams T"
                    aria-invalid={!!errors.name}
                    required
                  />
                  {errors.name && (
                    <div className="mt-1 text-xs" style={{ color: "#e03e3e" }}>
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--dark-blue)" }}
                  >
                    Your email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    className="w-full rounded-lg px-3 py-2 border focus:ring-2 focus:outline-none"
                    style={{
                      border: "1px solid rgba(2,6,23,0.06)",
                      color: "var(--dark-blue)",
                    }}
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                    required
                  />
                  {errors.email && (
                    <div className="mt-1 text-xs" style={{ color: "#e03e3e" }}>
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--dark-blue)" }}
                  >
                    Your phone
                  </label>
                  <input
                    id="contact-phone"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className="w-full rounded-lg px-3 py-2 border focus:ring-2 focus:outline-none"
                    style={{
                      border: "1px solid rgba(2,6,23,0.06)",
                      color: "var(--dark-blue)",
                    }}
                    placeholder="+234 (0) 901 391 6630"
                    aria-invalid={!!errors.phone}
                    required
                  />
                  {errors.phone && (
                    <div className="mt-1 text-xs" style={{ color: "#e03e3e" }}>
                      {errors.phone}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--dark-blue)" }}
                  >
                    Case description
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange("message")}
                    className="w-full rounded-lg px-3 py-2 border focus:ring-2 focus:outline-none resize-none"
                    style={{
                      border: "1px solid rgba(2,6,23,0.06)",
                      color: "var(--dark-blue)",
                    }}
                    placeholder="Briefly describe your situation, relevant dates, and what outcome you're seeking..."
                    aria-invalid={!!errors.message}
                    required
                  />
                  {errors.message && (
                    <div className="mt-1 text-xs" style={{ color: "#e03e3e" }}>
                      {errors.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold focus:outline-none"
                  style={{
                    background: "var(--accent)",
                    color: "var(--white)",
                    boxShadow: "0 12px 30px rgba(72,172,186,0.12)",
                  }}
                >
                  {loading ? (
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth="4"
                      />
                      <path
                        d="M22 12a10 10 0 00-10-10"
                        stroke="var(--white)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : null}
                  <span>{loading ? "Sending..." : "Submit your case"}</span>
                </button>

                {/* <button
                  type="button"
                  onClick={() => {
                    setForm({ name: "", email: "", phone: "", message: "" });
                    setErrors({});
                    setResult(null);
                  }}
                  className="text-sm underline underline-offset-4"
                  style={{ color: "var(--dark-blue)" }}
                >
                  Reset
                </button> */}
              </div>
            </motion.form>
          </div>

          {/* Contact info (right) */}
          <aside className="lg:col-span-5">
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={container}
              className="rounded-2xl p-6 shadow-lg"
              style={{ background: "var(--dark-blue)", color: "var(--white)" }}
            >
              <div className="flex items-start gap-4">
                <div>
                  <h4
                    className="text-lg font-semibold"
                    style={{ color: "var(--white)" }}
                  >
                    Contact Information
                  </h4>
                  <p className="text-sm mt-2 text-white/90">
                    We typically respond within 24–48 hours.
                  </p>

                  <div className="mt-6 space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt
                        className="mt-1 w-5 h-5"
                        style={{ color: "var(--accent)" }}
                      />
                      <div>
                        <div className="font-medium text-white">
                          Head Office
                        </div>
                        <div className="text-white/90">
                          14, Allen Avenue, Ikeja, Lagos State
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt
                        className="mt-1 w-5 h-5"
                        style={{ color: "var(--accent)" }}
                      />
                      <div>
                        <div className="font-medium text-white">
                          C Close Office
                        </div>
                        <div className="text-white/90">
                          194 Kafe Garden, Gwarinpa, Abuja
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaEnvelope style={{ color: "var(--accent)" }} />
                      <a
                        href="mailto:info@seasidepartners.org"
                        className="text-white/90 hover:text-white"
                      >
                        info@seasidepartners.org
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaPhoneAlt style={{ color: "var(--accent)" }} />
                      <a
                        href="tel:+2349013916630"
                        className="text-white/90 hover:text-white"
                      >
                        +234 (0) 901 391 6630
                      </a>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaClock style={{ color: "var(--accent)" }} />
                      <div>
                        <div className="font-medium text-white">
                          Working hours
                        </div>
                        <div className="text-white/90">
                          Mon — Fri: 9:00 AM — 6:00 PM
                          <br />
                          Sat: 10:00 AM — 2:00 PM
                          <br />
                          Sun: Closed / Emergency by appointment
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-sm text-white/80 mb-3">Follow us</div>
                    <nav className="flex items-center gap-3">
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
                </div>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
}
