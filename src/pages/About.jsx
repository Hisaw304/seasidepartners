import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import heroImg from "../assets/hero.jpg";
import teamOtesile from "../assets/otesile.jpg";
import teamDavid from "../assets/team3.jpg";
import teamSalau from "../assets/team2.jpg";
import teamIjeoma from "../assets/team4.jpg";

const teamMembers = [
  {
    name: "Otesile Olamide",
    role: "Founder / Principal Partner",
    image: teamOtesile,
    bio: `Otesile Olamide is a legal professional with extensive experience in property transactions, corporate law, entertainment law, startup advisory, and tax compliance. He obtained his Bachelor of Laws (LL.B) degree from Olabisi Onabanjo University, Ogun State, and was subsequently called to the Nigerian Bar after completing his training at the Nigerian Law School.

As the Founder of Seaside Partners, Olamide has played a key role in shaping the firm’s vision of providing practical, business-oriented legal solutions. His work spans real estate transactions, commercial structuring, and tax advisory, where he combines legal insight with commercial understanding to help clients make informed decisions.

With a detail-oriented and strategic approach, he has advised clients on corporate restructuring, property development, investment documentation, startup structuring, and tax planning, helping individuals and businesses achieve compliance while minimizing legal and financial risks.

Olamide’s practice is guided by integrity, precision, and innovation. His growing interest in the intersection of law, technology, and sports continues to inform his advisory style, positioning him as a modern legal practitioner dedicated to excellence and long-term client success.`,
  },
  {
    name: "Salau Temidayo Isiaq",
    role: "Co-Founder / Associate",
    image: teamSalau,
    bio: `Salau Temidayo Isiaq is a dynamic legal professional whose practice spans tax advisory, property transactions, entertainment law, and startup advisory. He holds a Bachelor of Laws (LL.B) degree from Olabisi Onabanjo University, Ogun State, and was called to the Nigerian Bar after completing his training at the Nigerian Law School.

As the Co-Founder of Seaside Partners, Temidayo brings a modern, business-focused perspective to legal practice. He has advised clients across multiple sectors, from real estate developers and corporate entities to creatives and emerging tech founders, providing strategic counsel that balances compliance with commercial growth.

Temidayo’s experience covers tax planning and compliance, property documentation and due diligence, as well as contract negotiation and intellectual property protection for clients in the entertainment and digital innovation spaces. His unique blend of legal acumen and commercial insight allows him to bridge the gap between law, creativity, and technology—helping clients structure legally sound and scalable ventures.

Driven by innovation, integrity, and a results-oriented mindset, Temidayo continues to build a reputation as a forward-thinking lawyer with a deep understanding of Nigeria’s evolving legal and business landscape.`,
  },
  {
    name: "David Akintunde",
    role: "Legal Associate",
    image: teamDavid,
    bio: `David Akintunde is a legal professional with a robust background in law, dispute resolution, and corporate compliance. He obtained his Bachelor of Laws (LL.B) degree from Olabisi Onabanjo University, Ogun State, and was subsequently called to the Nigerian Bar after completing his training at the Nigerian Law School.

David began his legal career during his National Youth Service at the Department of Legal Drafting and Parliamentary Counseling, Oyo State Ministry of Justice, where he contributed to legislative and policy development initiatives. Over the years, he has gained versatile experience working across diverse sectors, including real estate and legal practice—handling major property transactions, litigation, and dispute resolution matters.

A certified dispute resolution practitioner, David combines legal expertise with a strong commitment to ethical compliance and effective problem-solving. He is currently pursuing a Master of Laws (LL.M) degree at the University of Hertfordshire, United Kingdom, with a focus on Compliance and Data Protection Law.`,
  },

  {
    name: "Ijeoma Ubochi",
    role: "Digital Management Lead",
    image: teamIjeoma,
    bio: `Ijeoma Ubochi is the Digital Management Lead, responsible for overseeing the firm’s online presence, brand communications, and digital strategy. She specializes in content development, social media management, and digital storytelling that strengthen client engagement and visibility.

With experience managing campaigns across diverse industries, Ijeoma combines creativity with data-driven insight to enhance the firm’s digital reputation and support its strategic objectives.`,
  },
];

export default function About() {
  const prefersReduced = useReducedMotion();

  const fade = prefersReduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 8 },
        show: (i = 0) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, delay: i * 0.06 },
        }),
      };

  return (
    <main className="w-full bg-[var(--white)] text-[var(--dark-blue)]">
      {/* HERO */}
      <section
        className="relative w-full min-h-[48vh] lg:min-h-[60vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(3,12,30,0.55), rgba(3,12,30,0.55)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="Meet our team hero"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={fade}
          className="z-10 px-6 max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-white">
            Meet Our Team
          </h1>
          <hr className="my-6 border-white/30 mx-auto w-24" />
          <p className="text-white/90 text-base md:text-lg leading-relaxed">
            A dedicated team of experienced Nigerian lawyers providing
            innovative legal solutions with integrity, precision, and
            professionalism.
          </p>
        </motion.div>
      </section>

      {/* TEAM SECTION */}
      <section className="max-w-6xl mx-auto px-6 lg:px-0 py-16">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fade}
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold mb-12 text-center"
        >
          Our Legal Experts
        </motion.h2>

        <div className="flex flex-col gap-14">
          {teamMembers.map((m, idx) => (
            <motion.article
              key={m.name}
              custom={idx}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.45 }}
              variants={{
                hidden: fade.hidden || { opacity: 0, y: 8 },
                show: (i) => (fade.show ? fade.show(i) : { opacity: 1, y: 0 }),
              }}
              className="group flex flex-col lg:flex-row items-stretch gap-6 rounded-2xl overflow-hidden border bg-[var(--white)] shadow-sm"
              style={{ borderColor: "rgba(11,55,119,0.06)" }}
            >
              {/* IMAGE PANEL */}
              <div className="relative w-full lg:w-[40%] flex items-center justify-center bg-[rgba(11,55,119,0.03)] p-6">
                <div className="w-full flex items-center justify-center max-h-[520px]">
                  <img
                    src={m.image}
                    alt={`${m.name} — ${m.role}`}
                    loading="lazy"
                    className="w-full h-auto max-h-[480px] lg:max-h-[520px] object-contain rounded-md"
                    style={{ display: "block" }}
                  />
                </div>

                {/* HOVER OVERLAY (desktop) */}
                <div
                  className="pointer-events-none lg:pointer-events-auto absolute inset-0 flex items-end justify-center px-6 pb-6"
                  aria-hidden="true"
                >
                  <div
                    className="transform translate-y-6 opacity-0 group-hover:translate-y-0 group-focus-within:translate-y-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 ease-out"
                    style={{
                      background: "rgba(3,12,30,0.56)",
                      padding: "8px 14px",
                      borderRadius: "10px",
                    }}
                  >
                    <span className="text-white text-sm font-medium tracking-wide">
                      {m.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* TEXT PANEL */}
              <div className="flex-1 p-6 lg:p-8">
                <h3 className="text-2xl font-serif font-semibold leading-tight mb-1">
                  {m.name}
                </h3>

                {/* ROLE ABOVE BIO - always visible */}
                <p className="mb-4 text-[var(--accent)] font-medium">
                  {m.role}
                </p>

                {/* Full bio (preserve paragraph breaks) */}
                <p className="text-base leading-relaxed text-[rgba(11,55,119,0.92)] whitespace-pre-line">
                  {m.bio}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
