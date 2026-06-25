"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Lightbulb, Timer, LayoutGrid, BadgeCheck } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "280+",
    label: "Successful Student Cases",
    iconClass: "icon-blue",
    description: "Students successfully funded for their dreams",
  },
  {
    icon: TrendingUp,
    value: "Maximum",
    label: "Unsecured Loan Support",
    iconClass: "icon-green",
    description: "High approval rates for unsecured loans",
  },
  {
    icon: Lightbulb,
    value: "Expert",
    label: "Admission Guidance",
    iconClass: "icon-gold",
    description: "Complete support for university admissions",
  },
  {
    icon: Timer,
    value: "Fast",
    label: "Documentation Process",
    iconClass: "icon-orange",
    description: "Quick turnaround for loan approvals",
  },
  {
    icon: LayoutGrid,
    value: "Strong",
    label: "Banking Network",
    iconClass: "icon-purple",
    description: "Associated with top banks and NBFCs",
  },
  {
    icon: BadgeCheck,
    value: "Personalized",
    label: "Support for Every Student",
    iconClass: "icon-blue",
    description: "Dedicated assistance throughout your journey",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="container-max">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="badge-pill mb-5 inline-flex">Why Us</span>
          <h2 className="section-title mx-auto">
            Why Choose{" "}
            <span className="gradient-gold">SharadaAssociates?</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            We combine expertise, speed, and genuine care to make your financial journey smooth.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="premium-card group text-center overflow-hidden relative"
              style={{ background: "var(--bg-secondary)" }}
            >
              {/* Background icon watermark */}
              <div className="absolute -bottom-5 -right-5 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300">
                <stat.icon className="w-24 h-24" style={{ color: "var(--text-primary)" }} />
              </div>

              {/* Icon */}
              <div
                className={`w-14 h-14 ${stat.iconClass} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110`}
              >
                <stat.icon className="w-7 h-7" />
              </div>

              <p className="text-2xl lg:text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                {stat.value}
              </p>
              <p className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                {stat.label}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
