"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const universityData = [
  {
    country: "USA",
    flag: "https://flagcdn.com/w40/us.png",
    universities: [
      "State University of New York (SUNY)",
      "New Jersey Institute of Technology",
      "Governors State University",
      "Clark University",
      "University of Illinois Springfield",
      "University of Texas",
      "Oregon State University",
      "University of Denver",
      "University of Colorado Boulder",
      "University of Northern Colorado",
      "Texas A&M University",
    ],
  },
  {
    country: "Canada",
    flag: "https://flagcdn.com/w40/ca.png",
    universities: [
      "Pace University",
      "University of Windsor",
      "Fleming College, Toronto",
      "Algoma University",
      "University of Pacific",
    ],
  },
  {
    country: "United Kingdom",
    flag: "https://flagcdn.com/w40/gb.png",
    universities: [
      "University of Bradford",
      "University of Hertfordshire",
      "University of East London",
      "Newcastle University",
    ],
  },
  {
    country: "Australia",
    flag: "https://flagcdn.com/w40/au.png",
    universities: [
      "Melbourne Institute of Technology",
      "Deakin University",
      "Griffith University",
    ],
  },
];

export default function UniversitiesSection() {
  return (
    <section className="section-padding bg-section-alt">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge-pill mb-5 inline-flex">Success Stories</span>
          <h2 className="section-title mx-auto">
            Universities Where We Successfully <br className="hidden md:block" />
            <span className="gradient-gold">Arranged Student Funding</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {universityData.map((data, i) => (
            <motion.div
              key={data.country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="premium-card h-full"
              style={{ background: "var(--bg-primary)" }}
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
                <img src={data.flag} alt={data.country} className="w-8 h-auto rounded-sm shadow-sm" />
                <h3 className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>
                  {data.country}
                </h3>
              </div>
              <ul className="space-y-3">
                {data.universities.map((uni, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--emerald)" }} />
                    <span className="text-sm leading-snug" style={{ color: "var(--text-secondary)" }}>
                      {uni}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
