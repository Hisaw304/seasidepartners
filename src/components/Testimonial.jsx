import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Quote, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
const container = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.06 },
  },
};
const testimonials = [
  {
    quote:
      "Seaside Partners handled my case with professionalism and compassion. I felt supported every step of the way.",
    name: "Olumide Ade",
    role: "Client — Lagos",
    rating: 5,
  },
  {
    quote:
      "Clear, practical advice that helped us negotiate a favourable settlement — the team is strategic and relentless in the best way.",
    name: "Chinaza Okeke",
    role: "Founder — Lagos",
    rating: 4.5,
  },
  {
    quote:
      "Working with Seaside Partners has been amazing! Got everything signed and handed over the document smoothly - real progress all the way. I truly appreciate the effort; you are too much! I'm even considering paying two months upfront just to keep things moving faster.",
    name: "Mr. Kolawole Disu",
    role: "House Owner — Lagos",
    rating: 5,
  },
  {
    quote:
      "We appreciated the transparency on fees and options — nothing was left unclear. Results-oriented and respectful.",
    name: "Aisha Bello",
    role: "Client — Abuja",
    rating: 4,
  },
];

function initialsFromName(name = "") {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function renderStars(rating) {
  const stars = [];
  let rem = rating;
  for (let i = 0; i < 5; i += 1) {
    if (rem >= 1) {
      stars.push(<FaStar key={i} className="text-yellow-400 w-4 h-4" />);
    } else if (rem >= 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 w-4 h-4" />);
    } else {
      stars.push(<FaStar key={i} className="text-gray-300 w-4 h-4" />);
    }
    rem -= 1;
  }
  return stars;
}

export default function Testimonials() {
  const splideOptions = {
    type: "loop",
    perPage: 3,
    gap: "2rem",
    autoplay: true,
    interval: 5000,
    pauseOnHover: true,
    arrows: true,
    pagination: false,
    breakpoints: {
      1024: { perPage: 2 },
      640: { perPage: 1 },
    },
  };

  return (
    <section className="py-16 bg-[var(--light-bg)]" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <div className="max-w-3xl mb-8">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={container}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold leading-tight"
            style={{ color: "var(--dark-blue)" }}
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-4 text-base md:text-lg"
            style={{ color: "var(--dark-blue)" }}
          >
            Real stories from our clients — honest feedback that speaks to the
            dedication and results we deliver.
          </motion.p>
        </div>

        <Splide options={splideOptions} aria-label="Client Testimonials">
          {testimonials.map((t, i) => (
            <SplideSlide key={i}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-between h-full max-w-sm mx-auto"
              >
                {/* Quote icon */}
                <Quote
                  className="w-10 h-10 mb-4 text-[var(--color-accent)]"
                  strokeWidth={2}
                />

                {/* Quote text */}
                <p
                  className="text-gray-700 italic text-[15px] leading-relaxed mb-6"
                  style={{ color: "rgba(3,12,30,0.8)" }}
                >
                  “{t.quote}”
                </p>

                {/* Avatar initials */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-3 border-2"
                  style={{
                    borderColor: "var(--color-accent)",
                    color: "var(--color-accent)",
                    background: "rgba(3,12,30,0.03)",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  {initialsFromName(t.name)}
                </div>

                {/* Name + role */}
                <div className="mb-2">
                  <h4 className="font-semibold text-[var(--dark-blue)]">
                    {t.name}
                  </h4>
                  <p className="text-sm" style={{ color: "rgba(3,12,30,0.6)" }}>
                    {t.role}
                  </p>
                </div>

                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-2">
                  {renderStars(t.rating)}
                </div>

                {/* Verified */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <CheckCircle
                    className="w-3.5 h-3.5 text-[var(--color-accent)]"
                    strokeWidth={2}
                  />
                  <span>Verified client</span>
                </div>
              </motion.div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}
