"use client";
import { motion } from "framer-motion";
import { Building2, Landmark, ShieldCheck, Globe, PiggyBank, CreditCard, CheckCircle } from "lucide-react";

const partners = [
  { name: "Credila Financial Services", icon: Building2 },
  { name: "Avanse Financial Services", icon: Landmark },
  { name: "Auxilo Finance", icon: ShieldCheck },
  { name: "InCred Finance", icon: CreditCard },
  { name: "Private Banks", icon: PiggyBank },
  { name: "NBFC Institutions", icon: CheckCircle },
  { name: "International Funding Partners", icon: Globe },
];

export default function FinancialPartners() {
  return (
    <section className="section-padding bg-section-alt">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="badge-pill mb-5 inline-flex">Partners</span>
          <h2 className="section-title mx-auto">
            Our Trusted <span className="gradient-gold">Financial Partners</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Working with trusted financial institutions to secure maximum funding for students.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 justify-center">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="premium-card group text-center flex flex-col items-center justify-center gap-3"
              style={{ background: "var(--bg-primary)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <partner.icon className="w-6 h-6" />
              </div>
              <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                {partner.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
