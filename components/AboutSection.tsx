"use client";
import { motion } from "framer-motion";
import { BookOpen, HeartHandshake, Zap, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Education Loan Guidance",
    description: "Expert counselling to help you choose the right education loan for your study abroad dreams.",
    iconClass: "icon-blue",
  },
  {
    icon: HeartHandshake,
    title: "Loan Consultation",
    description: "One-on-one sessions to understand your financial needs and find the best solution for you.",
    iconClass: "icon-gold",
  },
  {
    icon: Zap,
    title: "Quick Processing",
    description: "Streamlined documentation and fast processing to get your loan approved faster than ever.",
    iconClass: "icon-orange",
  },
  {
    icon: Users,
    title: "Personalized Support",
    description: "Dedicated relationship managers who guide you every step from application to disbursal.",
    iconClass: "icon-green",
  },
];

const stats = [
  { value: "280+", label: "Students Successfully Funded", color: "#2563EB" },
  { value: "Multiple", label: "USA, Canada, UK & Australia", color: "#D4A017" },
  { value: "Maximum", label: "Unsecured Funding", color: "#10B981" },
  { value: "Complete", label: "Guidance", color: "#8B5CF6" },
];

export default function AboutSection() {
  return (
    <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            {/* Badge */}
            <span className="badge-pill mb-3 inline-flex">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--gold)" }}
              />
              About Us
            </span>

            <h2 className="section-title mb-6">
              What We Do at{" "}
              <span className="gradient-gold">SharadaAssociates</span>
            </h2>

            <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
              SharadaAssociates is a premier financial consultancy firm specializing in helping
              students and families secure the right loans for education abroad. We bring years of
              expertise, strong banking relationships, and a commitment to making the loan process
              simple and stress-free.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Beyond education loans, we offer a comprehensive suite of financial products including
              business, vehicle, housing, movie financing, and personal loans — all backed by expert
              guidance and transparent processes.
            </p>

            {/* Stats row */}
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map(({ value, label, color }) => (
                <div
                  key={label}
                  className="premium-card text-center p-5"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <p className="text-2xl font-bold" style={{ color }}>
                    {value}
                  </p>
                  <p className="text-xs font-medium mt-1" style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right – Feature Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="premium-card group cursor-default"
              >
                <div
                  className={`w-12 h-12 ${feature.iconClass} rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
