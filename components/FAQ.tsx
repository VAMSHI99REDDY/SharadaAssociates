"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Who can apply for an education loan?",
    a: "Any Indian student who has secured admission in a recognized university abroad can apply. You need to be at least 18 years old. Some lenders also consider co-applicants (parents/guardians) for better eligibility.",
  },
  {
    q: "Which countries are supported?",
    a: "We support educational loans for students going to USA, Canada, UK, Australia, Germany, New Zealand, Ireland, France, Singapore, UAE, and many more countries. Contact us to check support for your specific destination.",
  },
  {
    q: "Are collateral-free loans available?",
    a: "Yes! We offer both collateral (secured) and non-collateral (unsecured) education loans. Collateral-free loans are available up to certain amounts depending on the university and course. Our team will help you find the best option.",
  },
  {
    q: "How long does the approval process take?",
    a: "The approval process typically takes 7–15 working days depending on the loan type, amount, and completeness of documents. We work closely with banking partners to expedite the process wherever possible.",
  },
  {
    q: "What documents are required for an education loan?",
    a: "Generally required documents include: valid passport, Aadhaar card, PAN card, academic transcripts (10th, 12th, graduation), admission letter from university, fee structure, income proof of co-applicant, and bank statements. Our team will provide a personalized checklist.",
  },
  {
    q: "Do you charge any consultancy fees?",
    a: "Initial consultations are free. Our team will assess your profile and guide you at no cost. Service charges, if any, are transparently communicated upfront with no hidden fees.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="rounded-3xl overflow-hidden transition-all duration-300"
      style={{
        border: isOpen ? "1.5px solid rgba(37,99,235,0.2)" : "1px solid var(--border)",
        background: "var(--bg-primary)",
        boxShadow: isOpen ? "0 8px 32px rgba(37,99,235,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors"
        style={{
          background: isOpen ? "rgba(37,99,235,0.03)" : "transparent",
        }}
      >
        <div className="flex items-center gap-3 pr-4">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
            style={{
              background: isOpen ? "var(--royal-blue)" : "var(--bg-secondary)",
            }}
          >
            <span
              className="text-xs font-bold"
              style={{ color: isOpen ? "#fff" : "var(--text-secondary)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
            {faq.q}
          </span>
        </div>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: isOpen ? "var(--royal-blue)" : "var(--bg-secondary)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown
            className="w-4 h-4"
            style={{ color: isOpen ? "#fff" : "var(--text-secondary)" }}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="px-5 sm:px-6 pb-6 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)", paddingTop: "0" }}
            >
              <div className="ml-11">{faq.a}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="container-max">
        <div className="grid lg:grid-cols-5 gap-16 items-start">

          {/* Left – Sticky */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 lg:sticky lg:top-28"
          >
            <span className="badge-pill mb-3 inline-flex">FAQ</span>
            <h2 className="section-title mb-5">
              Frequently Asked{" "}
              <span className="gradient-gold">Questions</span>
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
              Have questions? We have answers. If you can&apos;t find what you&apos;re looking for,
              our team is always here to help.
            </p>
            <a href="/contact" className="btn-primary inline-flex">
              <HelpCircle className="w-4 h-4" />
              Ask a Question
            </a>

            {/* Mini stats */}
            <div
              className="mt-6 p-4 rounded-3xl"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>
                Still not sure?
              </p>
              <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                Talk to an Expert
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Our advisors respond within 2 hours on business days.
              </p>
            </div>
          </motion.div>

          {/* Right – Accordion */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
