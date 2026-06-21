"use client";
import { motion } from "framer-motion";

const countries = [
  { name: "United States", flag: "https://flagcdn.com/w40/us.png" },
  { name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
  { name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
  { name: "Australia", flag: "https://flagcdn.com/w40/au.png" },
];

export default function CountriesSection() {
  return (
    <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="badge-pill mb-5 inline-flex">Destinations</span>
          <h2 className="section-title mx-auto">
            Supported <span className="gradient-gold">Destinations</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Helping students achieve their dream of studying abroad.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {countries.map((country, i) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-6 text-center group hover:border-[#D4A017]/30 transition-colors"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform flex justify-center">
                <img src={country.flag} alt={country.name} className="w-10 h-auto rounded shadow-sm" />
              </div>
              <h3 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{country.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
