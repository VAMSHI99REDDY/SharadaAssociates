"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Eye, Users, Award, Shield, TrendingUp } from "lucide-react";
import Testimonials from "@/components/Testimonials";
import founderImg from "@/components/images/Founder.jpeg";

const values = [
  { icon: Shield, title: "Trust & Transparency", description: "No hidden fees. Clear communication at every step of your loan journey." },
  { icon: Users, title: "Customer First", description: "Every decision we make is centred around what's best for our clients." },
  { icon: TrendingUp, title: "Expert Guidance", description: "Our team of financial experts brings years of banking and consultancy experience." },
  { icon: Award, title: "Excellence", description: "We strive for the highest standards in service quality and loan processing." },
];



export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl lg:text-5xl font-bold mb-4">
            About SharadaAssociates
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Empowering Dreams Through Smart Financial Solutions since our founding.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                <p>
                  SharadaAssociates was founded with a singular mission: to make financial services
                  accessible, transparent, and stress-free for every Indian family. We started
                  specializing in education loans because we believed that no student should have to
                  give up their dream of studying abroad due to financial constraints.
                </p>
                <p>
                  Today, we have successfully funded over 280+ students and helped families navigate the complex world
                  of educational financing. Our partnerships with leading public and private sector
                  banks and NBFCs allow us to offer competitive interest rates, flexible repayment options, and
                  both collateral and non-collateral loan products.
                </p>
                <p>
                  Beyond education, we have expanded our services to cover business loans, vehicle
                  loans, housing loans, movie financing, and personal loans — becoming a one-stop
                  financial consultancy for all your needs.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { icon: Target, label: "Our Mission", value: "Make financial dreams achievable for every individual." },
                  { icon: Eye, label: "Our Vision", value: "To be India's most trusted financial consultancy." },
                  { icon: Users, label: "Our Clients", value: "280+ students successfully funded across India and abroad." },
                  { icon: Award, label: "Our Expertise", value: "10+ years of combined financial consultancy experience." },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="p-5 bg-[#F5F5F5] dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <Icon className="w-6 h-6 text-zinc-800 dark:text-zinc-200 mb-3" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{label}</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-max">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F2EDE7] dark:bg-zinc-900/80 rounded-[2.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden"
          >

            
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="lg:col-span-5 flex justify-center"
              >
                <div className="relative group w-full max-w-sm">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#D4A017] to-amber-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
                  <div className="relative p-10 bg-white dark:bg-zinc-800 rounded-[2rem] shadow-xl flex flex-col items-center justify-center min-h-[320px]">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#D4A017] to-[#F59E0B] flex items-center justify-center shadow-gold mb-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <Image src={founderImg} alt="G. Dilip Reddy" fill className="object-cover" />
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">G. Dilip Reddy</h3>
                    <p className="text-sm font-bold uppercase tracking-widest text-[#D4A017] mt-2">Founder</p>
                  </div>
                </div>
              </motion.div>

              <div className="lg:col-span-7 space-y-8">
                <div>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-800 text-[#D4A017] font-semibold text-sm mb-6 shadow-sm"
                  >
                    <Award className="w-4 h-4" />
                    <span>Leadership</span>
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
                  >
                    Dedicated to Your <span className="text-[#D4A017]">Financial Success</span>
                  </motion.h2>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  <p>
                    As the founder of SharadaAssociates, <strong className="text-gray-900 dark:text-white">G. Dilip Reddy</strong> is dedicated to helping students and families achieve their educational and financial goals. With a customer-first approach, he ensures every client receives tailored solutions.
                  </p>
                  <p>
                    Through strong banking relationships and deep industry knowledge, he has built a consultancy that prioritizes expert financial guidance, personalized support, and trusted service at every step.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="grid sm:grid-cols-3 gap-4 pt-4"
                >
                  {[
                    { icon: Target, text: "Expert Financial Guidance" },
                    { icon: Users, text: "Personalized Support" },
                    { icon: Shield, text: "Trusted Service" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center sm:items-start p-4 bg-white/60 dark:bg-zinc-800/60 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[#F2EDE7] dark:bg-zinc-900 flex items-center justify-center mb-3 text-[#D4A017]">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white text-center sm:text-left text-sm">{item.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#F5F5F5] dark:bg-gray-900">
        <div className="container-max">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Our Core Values</h2>
            <p className="text-gray-500 dark:text-gray-400">The principles that guide everything we do.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-center hover:shadow-card transition-all"
              >
                <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-zinc-200/50 dark:border-zinc-700/50">
                  <v.icon className="w-7 h-7 text-zinc-800 dark:text-zinc-200" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <div id="testimonials">
        <Testimonials />
      </div>

    </div>
  );
}
