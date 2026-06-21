"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Briefcase, Car, Home, Film, Wallet, ArrowRight } from "lucide-react";

const loans = [
  {
    icon: GraduationCap,
    title: "International Education Loans",
    description: "Helping students secure higher education funding abroad with maximum unsecured loan options.",
    iconClass: "icon-blue",
    badge: "Main Service",
    href: "/loans#international",
    featured: true,
  },
  {
    icon: GraduationCap,
    title: "National Education Loans",
    description: "Education financing solutions for students studying in India.",
    iconClass: "icon-green",
    href: "/loans#national",
  },
  {
    icon: Wallet,
    title: "Fund Arrangement Services",
    description: "Professional assistance for financial fund arrangements.",
    iconClass: "icon-gold",
    href: "/loans#fund",
  },
  {
    icon: GraduationCap,
    title: "Admission Assistance",
    description: "Complete support for university admissions.",
    iconClass: "icon-purple",
    href: "/loans#admission",
  },
  {
    icon: Car,
    title: "4 Wheeler Funding",
    description: "Financing solutions for cars and vehicles.",
    iconClass: "icon-orange",
    href: "/loans#4wheeler",
  },
  {
    icon: Home,
    title: "Property Loans",
    description: "Easy and reliable property financing.",
    iconClass: "icon-blue",
    href: "/loans#property",
  },
  {
    icon: Briefcase,
    title: "Project Loans",
    description: "Funding support for business and project requirements.",
    iconClass: "icon-gold",
    href: "/loans#project",
  },
  {
    icon: Briefcase,
    title: "And Much More",
    description: "Customized financial solutions according to customer needs.",
    iconClass: "icon-green",
    href: "/loans#more",
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
