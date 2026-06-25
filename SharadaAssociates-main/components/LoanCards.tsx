"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Briefcase, Car, Home, Film, Wallet, ArrowRight } from "lucide-react";

const loans = [
  {
    icon: GraduationCap,
    title: "Education Loans",
    description: "Maximum unsecured loan options for National & International studies.",
    iconClass: "icon-blue",
    badge: "Main Service",
    href: "/loans#education",
    featured: true,
  },
  {
    icon: Briefcase,
    title: "Business Loans",
    description: "Financing for your business growth and expansion.",
    iconClass: "icon-green",
    href: "/loans#business",
  },
  {
    icon: Car,
    title: "Vehicle Loans",
    description: "Drive your dream with flexible vehicle financing.",
    iconClass: "icon-orange",
    href: "/loans#vehicle",
  },
  {
    icon: Home,
    title: "Housing Loans",
    description: "Build or buy your dream home affordably.",
    iconClass: "icon-blue",
    href: "/loans#housing",
  },
  {
    icon: Film,
    title: "Movie Financing",
    description: "Bring your cinematic vision to life with reliable funding.",
    iconClass: "icon-purple",
    href: "/loans#movie",
  },
  {
    icon: Wallet, // Replaced User with Wallet to keep imports simple since User isn't imported
    title: "Personal Loans",
    description: "Flexible personal financing for every need.",
    iconClass: "icon-gold",
    href: "/loans#personal",
  },
  {
    icon: Wallet,
    title: "Fund Arrangement",
    description: "Professional assistance for financial fund arrangements.",
    iconClass: "icon-green",
    href: "/loans",
  },
  {
    icon: GraduationCap,
    title: "Admission Assistance",
    description: "Complete support for university admissions.",
    iconClass: "icon-blue",
    href: "/loans",
  },
];

export default function LoanCards() {
  return (
    <section className="section-padding bg-section-alt">
      <div className="container-max">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="badge-pill mb-5 inline-flex">Our Services</span>
          <h2 className="section-title mx-auto">Loan Categories</h2>
          <p className="section-subtitle mx-auto text-center">
            Comprehensive financial solutions tailored to every life goal.
          </p>
        </motion.div>

        {/* 4×2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loans.map((loan, i) => (
            <motion.div
              key={loan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={loan.href} className="block h-full">
                <div
                  className={`relative h-full premium-card group ${
                    loan.featured
                      ? "ring-2 ring-[#2563EB]/20"
                      : ""
                  }`}
                  style={{ background: "var(--bg-primary)" }}
                >
                  {/* Featured badge */}
                  {loan.badge && (
                    <span
                      className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: "var(--royal-blue)", color: "#fff" }}
                    >
                      {loan.badge}
                    </span>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 ${loan.iconClass} rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <loan.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                    {loan.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                    {loan.description}
                  </p>

                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                    style={{ color: "var(--royal-blue)" }}
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
