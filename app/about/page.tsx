"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import Image from "next/image";
import { Target, Eye, Users, Award, Shield, TrendingUp } from "lucide-react";
import Testimonials from "@/components/Testimonials";
import founderImg from "@/components/images/Founder.jpeg";

function Counter({ value, suffix = "", prefix = "" }: { value: number | string; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState<number | string>(typeof value === "number" ? 0 : value);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (typeof value === "number" && isInView) {
      const controls = animate(0, value, {
        duration: 2.0,
        ease: "easeOut",
        onUpdate(latest) {
          setCount(Math.round(latest));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-bold text-2xl lg:text-3xl text-zinc-900 dark:text-white block text-center w-full">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

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
            Providing Expert Financial Guidance & Comprehensive Loan Solutions since our founding.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      {/* Story */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column - Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-6"
            >
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white">
                A Legacy of Trust <span className="gradient-gold">Since 2001</span>
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                <p>
                  For over 25 years, Sharada Associates has been helping students, families, entrepreneurs, and businesses secure education loans, business funding, property loans, vehicle financing, and other financial solutions with confidence.
                </p>
                <p>
                  Our commitment to transparency, personalized guidance, and customer satisfaction has made us a trusted financial partner for generations.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 dark:bg-amber-500/5 dark:border-amber-500/20">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300 leading-relaxed italic">
                  &quot;Helping clients turn aspirations into achievements through reliable financial solutions and professional guidance for more than two decades.&quot;
                </p>
              </div>
            </motion.div>

            {/* Right Column - Stats Grid with Counter */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="lg:col-span-5 w-full"
            >
              <div className="grid grid-cols-2 gap-5 w-full">
                {[
                  { value: 25, suffix: "+", label: "Years of Trusted Expertise", color: "text-blue-600 dark:text-blue-400" },
                  { value: 1000, suffix: "+", label: "Satisfied Clients", color: "text-emerald-600 dark:text-emerald-400" },
                  { value: 7, suffix: "+", label: "Financial Services", color: "text-amber-600 dark:text-amber-400" },
                  { value: 2001, prefix: "Since ", label: "Building Long-Term Relationships", color: "text-purple-600 dark:text-purple-400" },
                ].map((stat, i) => {
                  return (
                    <div key={stat.label} className="premium-card p-5 flex flex-col items-center text-center justify-center min-h-[150px] w-full">
                      <div className="space-y-1 w-full flex flex-col items-center justify-center">
                        <div className="w-full flex justify-center items-center text-center">
                          <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                        </div>
                        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-center w-full block mt-2">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </div>
      </section>n>

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
