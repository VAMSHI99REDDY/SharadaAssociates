"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ShieldCheck, Award, Users2, Layers, History } from "lucide-react";

function Counter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
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
    <span ref={ref} className="font-bold text-3xl lg:text-4xl text-zinc-900 dark:text-white">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const stats = [
    { value: 25, suffix: "+", label: "Years of Trusted Expertise", icon: Award, color: "text-blue-600 dark:text-blue-400" },
    { value: 1000, suffix: "+", label: "Satisfied Clients", icon: Users2, color: "text-emerald-600 dark:text-emerald-400" },
    { value: 7, suffix: "+", label: "Financial Services", icon: Layers, color: "text-amber-600 dark:text-amber-400" },
    { value: 2001, prefix: "Since ", label: "Building Long-Term Relationships", icon: History, color: "text-purple-600 dark:text-purple-400" }
  ];

  return (
    <section className="section-padding bg-zinc-50/50 dark:bg-gray-950/50 border-y border-zinc-100 dark:border-zinc-900 overflow-hidden">
      <div className="container-max">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="badge-pill inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Our Story
            </span>
            
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              A Legacy of Trust <span className="gradient-gold">Since 2001</span>
            </h2>

            <div className="space-y-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                For over 25 years, Sharada Associates has been helping students, families, entrepreneurs, and businesses secure education loans, business funding, property loans, vehicle financing, and other financial solutions with confidence.
              </p>
              <p>
                Our commitment to transparency, personalized guidance, and customer satisfaction has made us a trusted financial partner for generations.
              </p>
            </div>

            {/* Supporting Text Box */}
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 dark:bg-amber-500/5 dark:border-amber-500/20">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300 leading-relaxed italic">
                "Helping clients turn aspirations into achievements through reliable financial solutions and professional guidance for more than two decades."
              </p>
            </div>
          </motion.div>

          {/* Right Column - Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="premium-card p-5 flex flex-col items-center text-center justify-center min-h-[160px] h-full group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className={`w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-center items-baseline gap-0.5">
                    <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
