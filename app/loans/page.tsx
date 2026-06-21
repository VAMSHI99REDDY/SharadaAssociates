"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Briefcase, Car, Home, Film, User, X,
} from "lucide-react";
import EducationLoanForm from "@/components/forms/EducationLoanForm";
import BusinessLoanForm from "@/components/forms/BusinessLoanForm";
import VehicleLoanForm from "@/components/forms/VehicleLoanForm";
import HousingLoanForm from "@/components/forms/HousingLoanForm";
import MovieFinancingForm from "@/components/forms/MovieFinancingForm";
import PersonalLoanForm from "@/components/forms/PersonalLoanForm";

const studyCountries = [
  { name: "USA", flag: "🇺🇸" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "UAE", flag: "🇦🇪" },
];

const otherLoans = [
  { id: "business", icon: Briefcase, title: "Business Loan", description: "Financing for your business growth and expansion.", color: "hover:bg-zinc-50 dark:hover:bg-zinc-800/20", iconColor: "text-zinc-800 dark:text-zinc-200", form: BusinessLoanForm },
  { id: "vehicle", icon: Car, title: "Vehicle Loan", description: "Drive your dream with flexible vehicle financing.", color: "hover:bg-zinc-50 dark:hover:bg-zinc-800/20", iconColor: "text-zinc-800 dark:text-zinc-200", form: VehicleLoanForm },
  { id: "housing", icon: Home, title: "Housing Loan", description: "Build or buy your dream home affordably.", color: "hover:bg-zinc-50 dark:hover:bg-zinc-800/20", iconColor: "text-zinc-800 dark:text-zinc-200", form: HousingLoanForm },
  { id: "movie", icon: Film, title: "Movie Financing", description: "Bring your cinematic vision to life.", color: "hover:bg-zinc-50 dark:hover:bg-zinc-800/20", iconColor: "text-zinc-800 dark:text-zinc-200", form: MovieFinancingForm },
  { id: "personal", icon: User, title: "Personal Loan", description: "Flexible personal financing for every need.", color: "hover:bg-zinc-50 dark:hover:bg-zinc-800/20", iconColor: "text-zinc-800 dark:text-zinc-200", form: PersonalLoanForm },
];

type LoanType = typeof otherLoans[0] | null;

export default function LoansPage() {
  const [activeModal, setActiveModal] = useState<LoanType>(null);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white py-16 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-5xl font-bold mb-4"
          >
            Our Loan Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            From education to business to personal needs — we have the right loan for every dream.
          </motion.p>
        </div>
      </section>

      {/* Education Loans – Primary */}
      <section id="education" className="section-padding bg-white dark:bg-gray-950">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-200/50 dark:border-zinc-700/50">
                <GraduationCap className="w-6 h-6 text-zinc-900 dark:text-zinc-105" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-full">Main Service</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Educational Loans</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
              We specialize in education loans for students going abroad. Our partnerships with leading banks ensure competitive interest rates and smooth processing.
            </p>
          </motion.div>

          {/* Countries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Supported Study Destinations</h3>
            <div className="flex flex-wrap gap-3">
              {studyCountries.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2 px-4 py-2 bg-[#F5F5F5] dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-zinc-550 hover:shadow-sm transition-all"
                >
                  <span className="text-xl">{c.flag}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{c.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#F5F5F5] dark:bg-gray-900 rounded-2xl p-6 lg:p-10 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Apply for Education Loan</h3>
            <EducationLoanForm />
          </motion.div>
        </div>
      </section>

      {/* Other Loans */}
      <section className="section-padding bg-[#F5F5F5] dark:bg-gray-900">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Other Financial Services</h2>
            <p className="text-gray-500 dark:text-gray-400">Click on any loan category to apply instantly.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherLoans.map((loan, i) => (
              <motion.div
                key={loan.id}
                id={loan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  onClick={() => setActiveModal(loan)}
                  className={`w-full text-left p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group ${loan.color}`}
                >
                  <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <loan.icon className={`w-6 h-6 ${loan.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{loan.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{loan.description}</p>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 group-hover:underline">
                    Apply Now →
                  </span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white dark:bg-gray-900 p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <activeModal.icon className={`w-6 h-6 ${activeModal.iconColor}`} />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Apply for {activeModal.title}</h2>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6">
                <activeModal.form />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
