// src/pages/ContactPage.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import Contact from "../components/Contact";
import heroImg from "../assets/contact-hero.jpg";

const pinHtml = (label = "") => `
  <div style="
    display:flex;align-items:center;justify-content:center;
    width:34px;height:34px;border-radius:10px;
    background:linear-gradient(180deg,var(--color-accent), rgba(0,0,0,0.06));
    box-shadow:0 6px 18px rgba(3,12,30,0.28);
    color: white; font-weight:700; font-size:12px;
    border: 2px solid rgba(255,255,255,0.12)
  ">
    ${label}
  </div>
`;

const makeIcon = (label) =>
  L.divIcon({
    html: pinHtml(label),
    className: "",
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32],
  });

const markers = [
  {
    id: "ikeja",
    label: "A",
    title: "Allen, Ikeja",
    address: "14, Allen Avenue, Ikeja, Lagos State",
    position: [6.604718, 3.350299],
  },
  {
    id: "gwarinpa",
    label: "B",
    title: "Gwarinpa",
    address: "C Close 194, Kafe Garden, Gwarinpa, Abuja",
    position: [9.1099, 7.4042],
  },
];

function FitBounds({ markersList, padding = [40, 40] }) {
  const map = useMap();
  useMemo(() => {
    if (!map || !markersList || markersList.length === 0) return;
    const latlngs = markersList.map((m) =>
      L.latLng(m.position[0], m.position[1])
    );
    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding, maxZoom: 15 });
  }, [map, markersList, padding]);
  return null;
}

export default function ContactPage() {
  return (
    <main className="w-full">
      <section
        aria-label="Contact hero"
        className="relative w-full min-h-[56vh] lg:min-h-[64vh] flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(3,12,30,0.45), rgba(3,12,30,0.45)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          color: "var(--color-white)",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              className="lg:col-span-7"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold leading-tight mb-4">
                Contact Seaside Partners
              </h1>
              <p className="text-white/90 max-w-2xl text-base md:text-lg">
                Reach our offices in Lagos or Abuja. Call, message, or drop a
                note — our team responds promptly and with the discretion your
                matter deserves.
              </p>
            </motion.div>
            <motion.aside
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              className="lg:col-span-5 hidden lg:flex items-center justify-end"
            >
              <div className="w-full max-w-xs text-right">
                <a
                  href="#contact"
                  className="inline-block px-5 py-3 rounded-full font-semibold text-white"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  Book an Appointment
                </a>
                <div className="mt-4 text-right">
                  <div className="text-sm text-white/80">Call us</div>
                  <a
                    href="tel:+23408037160410"
                    className="text-white font-semibold"
                  >
                    +234 (0) 901 391 6630
                  </a>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        </div>
      </section>

      <section
        aria-label="Contact details & form"
        className="w-full bg-[var(--color-white)]"
      >
        <div>
          <Contact />
        </div>
      </section>

      <section aria-label="Office locations map" className="w-full mt-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--dark-blue)" }}
          >
            Our locations
          </motion.h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {markers.map((m) => (
                <div
                  key={m.id}
                  className="rounded-2xl p-4 bg-white shadow-sm border"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center"
                      style={{ background: "var(--color-accent)" }}
                    >
                      <span className="text-white font-semibold">
                        {m.label}
                      </span>
                    </div>
                    <div>
                      <div
                        className="text-sm"
                        style={{ color: "rgba(3,12,30,0.7)" }}
                      >
                        {m.title}
                      </div>
                      <div
                        className="font-semibold"
                        style={{ color: "var(--dark-blue)" }}
                      >
                        {m.address}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map (right) — single map with both pins */}
            <div
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: "rgba(0,0,0,0.06)" }}
            >
              <MapContainer
                center={markers[0].position}
                zoom={13}
                scrollWheelZoom={false}
                className="w-full h-[420px]"
                whenCreated={(map) => {}}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FitBounds markersList={markers} padding={[60, 60]} />

                {markers.map((m) => (
                  <Marker
                    key={m.id}
                    position={m.position}
                    icon={makeIcon(m.label)}
                  >
                    <Popup>
                      <strong>{m.title}</strong>
                      <br />
                      {m.address}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
