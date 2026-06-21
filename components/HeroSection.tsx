"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Clock, Award, GraduationCap, MessageCircle, Mail, ArrowDown } from "lucide-react";
import heroBg from "./images/herobackground.jpeg";

const badges = [
  { icon: Shield, label: "Max Unsecured Education Loans",   color: "#2563EB", bg: "#EFF6FF" },
  { icon: Award,  label: "National & Intl. Loan Experts",      color: "#10B981", bg: "#ECFDF5" },
  { icon: Clock,  label: "Associated with Leading Banks",     color: "#D4A017", bg: "#FEF3C7" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#F9F8F5] dark:bg-[#0B0F19] transition-colors duration-300" style={{ overflow: "hidden" }}>

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Modern skyscraper office building representing corporate growth"
          fill
          priority
          className="object-cover object-right dark:opacity-20 transition-opacity duration-300"
          style={{ opacity: 1, filter: "brightness(1.9) contrast(1.02) saturate(1.1)" }}
        />
        {/* Black shadow overlay */}
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {/* Flowing line */}
        <svg
          className="absolute right-0 bottom-0 w-full h-[60%] opacity-10 fill-none"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          stroke="#D4A017"
        >
          <path d="M0,450 C300,400 600,500 900,300 C1100,180 1300,100 1440,50" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M0,480 C320,430 620,530 920,330 C1120,200 1320,120 1440,70" strokeWidth="1.5" />
        </svg>

        {/* Dot grid top right */}
        <div className="absolute top-12 right-12 grid grid-cols-5 gap-2.5 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "#D4A017" }} />
          ))}
        </div>
        {/* Dot grid bottom right */}
        <div className="absolute bottom-12 right-12 grid grid-cols-4 gap-2.5 opacity-15">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "#2563EB" }} />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 pb-24 z-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left content ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Trust pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-6 mx-auto lg:mx-0"
              style={{
                background: "#FEF3C7",
                color: "#92400E",
                border: "1px solid #FDE68A",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#D4A017" }}
              />
              Trusted by 280+ Students Successfully Funded
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-md"
              style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
            >
              Empowering Dreams Through{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #FDE047, #F59E0B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Smart
              </span>{" "}
              Financial{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #93C5FD, #3B82F6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Solutions
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed max-w-lg mb-8 font-medium"
              style={{ color: "#FFFFFF" }}
            >
              Sharada Associates provides National and International Education Loans, Admission Assistance, 
              Fund Arrangements, Vehicle Finance, Property Loans, Project Loans, and many more financial 
              solutions for students and families.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap w-full sm:w-auto gap-4 mb-10 justify-center lg:justify-start"
            >
              <a 
                href="https://wa.me/919985111136?text=Hello%20Sharada%20Associates,%20I%20would%20like%20to%20know%20more%20about%20Education%20Loans%20and%20Admission%20Assistance." 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary gap-2 w-full sm:w-auto justify-center hover:scale-105 transition-transform"
                style={{ background: "#25D366", borderColor: "#25D366", color: "#fff" }}
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                WhatsApp Us
              </a>
              <a 
                href="mailto:dilipreddy99@gmail.com?subject=Inquiry%20from%20Website&body=Hello%20Sharada%20Associates,%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20services.%0A%0AThank%20you." 
                className="btn-outline gap-2 w-full sm:w-auto justify-center hover:scale-105 transition-transform"
                style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
              <Link 
                href="/contact" 
                className="btn-outline w-full sm:w-auto justify-center hover:scale-105 transition-transform"
                style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
              >
                Get Free Consultation
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              {badges.map(({ icon: Icon, label, color, bg }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-xl"
                  style={{ background: bg, color }}
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: color + "20" }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                  </div>
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right – Glassmorphic Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative w-full max-w-sm sm:max-w-md mx-auto mt-4 lg:mt-0 lg:ml-auto"
          >
            <div className="relative p-4 sm:p-8 hover:scale-[1.02] transition-transform duration-500">
              {/* Main card */}
              <div className="glass-card p-6 sm:p-8 relative z-10 w-full shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #D4A017, #F59E0B)" }}
                  >
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm sm:text-base" style={{ color: "var(--text-primary)" }}>Loan Approved!</p>
                    <p className="text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>Education Loan – ₹35 Lakhs</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Student Name", value: "Priya Sharma" },
                    { label: "University",   value: "University of Toronto" },
                    { label: "Country",      value: "Canada 🇨🇦" },
                    { label: "Status",       value: "✅ Approved" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center text-xs sm:text-sm py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                      <span style={{ color: "var(--text-secondary)" }}>{label}</span>
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-[10px] sm:text-xs mb-2" style={{ color: "var(--text-secondary)" }}>
                    <span>Processing Progress</span>
                    <span className="font-semibold" style={{ color: "var(--emerald)" }}>100%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "var(--bg-secondary)" }}>
                    <div
                      className="h-2 rounded-full"
                      style={{ width: "100%", background: "linear-gradient(90deg, #10B981, #34D399)" }}
                    />
                  </div>
                </div>
              </div>

              {/* Floating badge – top right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -right-2 sm:top-0 sm:right-0 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center w-28 sm:w-36 z-20 shadow-gold scale-90 sm:scale-100"
                style={{
                  background: "linear-gradient(135deg, #D4A017, #F59E0B)",
                  color: "#fff",
                }}
              >
                <p className="text-xl sm:text-2xl font-bold">280+</p>
                <p className="text-[8px] sm:text-[10px] uppercase tracking-wider font-semibold opacity-90 mt-1">Students Funded</p>
              </motion.div>

              {/* Floating badge – bottom left */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-2 sm:bottom-0 sm:left-[20px] p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center w-32 sm:w-40 z-20 shadow-card scale-90 sm:scale-100"
                style={{
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border)",
                }}
              >
                <p className="text-base sm:text-lg font-bold" style={{ color: "var(--royal-blue)" }}>7–15</p>
                <p className="text-[8px] sm:text-[10px] uppercase tracking-wider font-semibold mt-1" style={{ color: "var(--text-secondary)" }}>
                  Working Days
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30 cursor-pointer backdrop-blur-sm bg-black/20 px-3 py-2 sm:px-4 sm:py-3 rounded-3xl border border-white/10"
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
      >
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[#D4AF37]"
        >
          <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4" />
        </motion.div>

        <span
          className="text-[9px] sm:text-[10px] font-semibold tracking-[2px] uppercase text-white"
        >
          Scroll Down
        </span>

        {/* Mouse shell with glow */}
        <div className="relative mt-1">
          <div className="absolute inset-0 bg-[#D4AF37] blur-md opacity-40 rounded-full animate-pulse"></div>
          <div
            className="w-4 h-7 sm:w-5 sm:h-8 rounded-full flex justify-center pt-1.5 relative z-10"
            style={{
              border: "2px solid #D4AF37",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            {/* Inner dot with gold color + pulse */}
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-1 h-1.5 sm:w-1.5 sm:h-1.5 rounded-full"
              style={{ background: "#D4AF37" }}
            />
          </div>
        </div>

        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[#D4AF37] mt-1"
        >
          <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
