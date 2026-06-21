"use client";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/components/images/LOGO.png";
import { Phone, Mail, MapPin } from "lucide-react";

const loanLinks = [
  { href: "/loans#education", label: "Education Loans" },
  { href: "/loans#business",  label: "Business Loans" },
  { href: "/loans#vehicle",   label: "Vehicle Loans" },
  { href: "/loans#housing",   label: "Housing Loans" },
  { href: "/loans#movie",     label: "Movie Financing" },
  { href: "/loans#personal",  label: "Personal Loans" },
];

const quickLinks = [
  { href: "/",            label: "Home" },
  { href: "/about",       label: "About Us" },
  { href: "/faq",         label: "FAQ" },
  { href: "/contact",     label: "Contact Us" },
];

const socials = [
  {
    label: "Facebook",
    color: "#1877F2",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    color: "#E1306C",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    color: "#0A66C2",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Twitter/X",
    color: "#000000",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand ── */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={logoImage}
                alt="Sharada Associates Logo"
                width={60}
                height={60}
                className="object-contain h-12 w-12 rounded-xl"
              />
              <div>
                <span className="font-bold text-lg leading-none block" style={{ color: "var(--text-primary)" }}>
                  SharadaAssociates
                </span>
                <span className="text-xs font-semibold" style={{ color: "var(--gold)" }}>
                  Financial Consultancy
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
              Empowering Dreams Through Smart Financial Solutions. Your trusted partner for
              education and financial growth.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md"
                  style={{ background: "var(--bg-secondary)", color: s.color }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Our Loans ── */}
          <div>
            <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Our Loans</h3>
            <ul className="space-y-2.5">
              {loanLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Contact Information</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--royal-blue-light)" }}
                >
                  <Phone className="w-4 h-4" style={{ color: "var(--royal-blue)" }} />
                </div>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--gold-light)" }}
                >
                  <Mail className="w-4 h-4" style={{ color: "var(--gold)" }} />
                </div>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>info@sharadaassociates.com</span>
              </li>
              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--emerald-light)" }}
                >
                  <MapPin className="w-4 h-4" style={{ color: "var(--emerald)" }} />
                </div>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Office Address, City, State – PIN</span>
              </li>
            </ul>

            <div
              className="p-4 rounded-2xl"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-secondary)" }}>
                Working Hours
              </p>
              <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                Mon – Sat: 9:00 AM – 7:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            © 2026 SharadaAssociates. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Trusted Financial Consultancy · Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}
