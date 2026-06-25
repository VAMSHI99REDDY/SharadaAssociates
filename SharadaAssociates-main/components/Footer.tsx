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
              Expert Financial Guidance & Comprehensive Loan Solutions. Your trusted partner for
              education and financial growth.
            </p>


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
                <a href="tel:+919985111136" className="text-sm hover:underline" style={{ color: "var(--text-secondary)" }}>+91 9985111136</a>
              </li>
              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--gold-light)" }}
                >
                  <Mail className="w-4 h-4" style={{ color: "var(--gold)" }} />
                </div>
                <a href="mailto:dilipreddy99@gmail.com?subject=Inquiry%20from%20Website&body=Hello%20Sharada%20Associates,%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20services.%0A%0AThank%20you." className="text-sm hover:underline break-all" style={{ color: "var(--text-secondary)" }}>dilipreddy99@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--emerald-light)" }}
                >
                  <MapPin className="w-4 h-4 mt-1" style={{ color: "var(--emerald)" }} />
                </div>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  H No: 7-1-321/S, Satya Sai Apartment,<br/>
                  Flat No: 206, 2nd Floor, Srinivasa Nagar Colony,<br/>
                  SR Nagar, Hyderabad – 500038
                </span>
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
