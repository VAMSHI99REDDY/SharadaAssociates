"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoImage from "@/components/images/LOGO.png";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/loans", label: "Loans" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHero = pathname === "/";
  // Show white text only on hero page when not scrolled
  const whiteNav = isHero && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        scrolled
          ? "bg-white/97 backdrop-blur-lg shadow-sm border-b border-black/5"
          : isHero
          ? "bg-gradient-to-b from-black/30 to-transparent"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 lg:h-20 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src={logoImage}
              alt="Sharada Associates Logo"
              width={60}
              height={60}
              className="object-contain h-12 w-12 rounded-xl group-hover:scale-105 transition-transform duration-300"
              priority
            />
            <div>
              <span
                className="font-bold text-lg leading-none block transition-colors duration-300"
                style={{ color: whiteNav ? "#fff" : "var(--text-primary)" }}
              >
                Sharada
              </span>
              <span
                className="text-xs font-semibold leading-none transition-colors duration-300"
                style={{ color: whiteNav ? "rgba(255,255,255,0.75)" : "var(--gold)" }}
              >
                Associates
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                  pathname === link.href
                    ? whiteNav
                      ? "bg-white/20 text-white backdrop-blur-sm"
                      : "bg-[#111827] text-white"
                    : whiteNav
                    ? "text-white hover:bg-white/15 hover:text-white"
                    : "text-gray-600 hover:bg-[#F2EDE7] hover:text-gray-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">


            <Link
              href="/loans"
              className={cn(
                "hidden sm:inline-flex items-center gap-2 font-semibold text-sm py-2.5 px-5 rounded-2xl transition-all duration-300",
                whiteNav
                  ? "bg-white text-[#111827] hover:bg-white/90 shadow-lg"
                  : "btn-primary"
              )}
            >
              Apply Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>

            <button
              className={cn(
                "lg:hidden p-2 rounded-xl transition-colors",
                whiteNav ? "hover:bg-white/20" : "hover:bg-[#F2EDE7] dark:hover:bg-[#1E293B]"
              )}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? (
                <X className="w-5 h-5" style={{ color: whiteNav ? "#fff" : "var(--text-primary)" }} />
              ) : (
                <Menu className="w-5 h-5" style={{ color: whiteNav ? "#fff" : "var(--text-primary)" }} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white dark:bg-[#0F172A] border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-2xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-[#111827] dark:bg-[#F8FAFC] text-white dark:text-[#0F172A] font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-[#F2EDE7] dark:hover:bg-[#1E293B]"
                  )}
                >
                  {link.label}
                </Link>
              ))}



              <Link
                href="/loans"
                onClick={() => setOpen(false)}
                className="block mt-3 btn-primary text-center text-sm justify-center"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
