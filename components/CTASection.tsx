"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section-padding bg-section-alt relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="absolute top-0 left-[-80px] w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gold)" }}
      />
      <div
        className="absolute bottom-0 right-[-80px] w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--royal-blue)" }}
      />

      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left – Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-pill mb-3 inline-flex">Our Achievement</span>
            <h2 className="section-title mb-5">
              280+ Students{" "}
              <span className="gradient-gold">Successfully Funded</span>
            </h2>
            <p className="mb-8 leading-relaxed text-lg" style={{ color: "var(--text-secondary)" }}>
              We help students achieve their study abroad dreams with maximum unsecured education loan support and complete admission guidance.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/loans" className="btn-primary">
                Apply for a Loan
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-outline">
                <PhoneCall className="w-4 h-4" />
                Get Free Consultation
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-6 flex flex-wrap gap-6">
              {[
                { label: "280+ Students Funded", color: "var(--royal-blue)" },
                { label: "Multiple Countries", color: "var(--gold)" },
                { label: "Zero Hidden Fees", color: "var(--emerald)" },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – Illustration / Info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative hidden lg:flex justify-center"
          >
            {/* Main card */}
            <div className="glass-card p-8 w-full max-w-sm relative z-10 shadow-card-hover">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #D4A017, #F59E0B)" }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold" style={{ color: "var(--text-primary)" }}>Education Loan</p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Quick & Simple Process</p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {[
                  { step: "01", title: "Apply Online", done: true },
                  { step: "02", title: "Document Verification", done: true },
                  { step: "03", title: "Loan Sanctioned", active: true },
                  { step: "04", title: "Disbursal", done: false },
                ].map(({ step, title, done, active }) => (
                  <div key={step} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: done
                          ? "var(--emerald)"
                          : active
                          ? "var(--royal-blue)"
                          : "var(--bg-secondary)",
                        color: done || active ? "#fff" : "var(--text-secondary)",
                      }}
                    >
                      {done ? "✓" : step}
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: active ? "var(--royal-blue)" : done ? "var(--text-primary)" : "var(--text-secondary)" }}
                    >
                      {title}
                    </span>
                    {active && (
                      <span
                        className="ml-auto text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                        style={{ background: "var(--royal-blue-light)", color: "var(--royal-blue)" }}
                      >
                        Active
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 z-20 rounded-2xl p-4 shadow-card text-center"
              style={{ background: "var(--bg-primary)", border: "1px solid var(--border)" }}
            >
              <p className="text-xl font-bold" style={{ color: "var(--gold)" }}>₹35L</p>
              <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-secondary)" }}>
                Max Loan
              </p>
            </motion.div>

            {/* Second floating badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 z-20 rounded-2xl px-4 py-3 shadow-card flex items-center gap-2"
              style={{ background: "var(--bg-primary)", border: "1px solid var(--border)" }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--emerald-light)" }}>
                <svg className="w-4 h-4" style={{ color: "var(--emerald)" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>Approved!</p>
                <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>7 working days</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
