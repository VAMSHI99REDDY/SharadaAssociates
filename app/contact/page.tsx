"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Phone, Mail, MapPin, Clock, CheckCircle, Loader2, Send, User, GraduationCap } from "lucide-react";

type ContactForm = {
  full_name: string;
  phone_number: string;
  email: string;
  country_interested: string;
  message: string;
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "SR Nagar, Hyderabad, Telangana",
    href: "https://maps.app.goo.gl/nE4s72eKLGd3F63J9",
    color: "bg-zinc-50 dark:bg-zinc-800/50",
    iconColor: "text-zinc-800 dark:text-zinc-200",
  },
  {
    icon: Mail,
    label: "Email",
    value: "dilipreddy99@gmail.com",
    href: "mailto:dilipreddy99@gmail.com",
    color: "bg-zinc-50 dark:bg-zinc-800/50",
    iconColor: "text-zinc-800 dark:text-zinc-200",
  },
  {
    icon: User,
    label: "Contact Person",
    value: "G. Dilip Reddy",
    href: null,
    color: "bg-zinc-50 dark:bg-zinc-800/50",
    iconColor: "text-zinc-800 dark:text-zinc-200",
  },
  {
    icon: GraduationCap,
    label: "Service",
    value: "Education Consultancy & Loan Assistance",
    href: null,
    color: "bg-zinc-50 dark:bg-zinc-800/50",
    iconColor: "text-zinc-800 dark:text-zinc-200",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }
      setSubmitted(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong. Please try again.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl lg:text-5xl font-bold mb-4">
            Get In Touch With Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-zinc-400 text-lg max-w-2xl mx-auto">
            We are here to guide students and families with trusted education loan and financial solutions. Feel free to contact us for personalized assistance.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">SHARADA ASSOCIATES</h2>
                <p className="text-[#D4A017] font-semibold text-sm uppercase tracking-wider mb-6">Education Consultancy</p>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  <p><strong className="text-gray-900 dark:text-white">Contact Person:</strong> G. Dilip Reddy</p>
                  <p><strong className="text-gray-900 dark:text-white">Office Address:</strong><br />H No: 7-1-321/S<br />Satya Sai Apartment<br />Flat No: 206, 2nd Floor<br />Srinivasa Nagar Colony<br />SR Nagar, Hyderabad – 500038<br />Telangana, India</p>
                  <p><strong className="text-gray-900 dark:text-white">Office Hours:</strong><br />Monday – Saturday: 9:00 AM – 7:00 PM<br />Sunday: Closed</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {contactInfo.map(({ icon: Icon, label, value, href, color, iconColor }) => (
                  <div key={label} className={`flex items-start gap-4 p-4 rounded-2xl ${color} border border-zinc-200/50 dark:border-zinc-800`}>
                    <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-zinc-200/40 dark:border-zinc-700/40">
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="font-medium text-gray-800 dark:text-gray-200 hover:text-zinc-950 dark:hover:text-white transition-colors underline decoration-zinc-300 dark:decoration-zinc-700">
                          {value}
                        </a>
                      ) : (
                        <p className="font-medium text-gray-800 dark:text-gray-200">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div id="map" className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-lg group">
                <div className="p-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 relative z-10">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#D4A017]" />
                    <a href="https://maps.app.goo.gl/nE4s72eKLGd3F63J9" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A017] transition-colors hover:underline">
                      Find Us On Map
                    </a>
                  </h3>
                </div>
                <a href="https://maps.app.goo.gl/nE4s72eKLGd3F63J9" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label="Open in Google Maps"></a>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6669915848523!2d78.44185791487687!3d17.43983228804689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c5c562dc69%3A0x6b8db7c0401b38f8!2sSatya%20Sai%20Apartments%2C%20Srinivasa%20Nagar%20Colony%2C%20Sanjeeva%20Reddy%20Nagar%2C%20Hyderabad%2C%20Telangana%20500038!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-[#F5F5F5] dark:bg-gray-900 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="text-5xl mb-4">🎉</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Inquiry Submitted Successfully</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                      Thank you for contacting Sharada Associates.<br />
                      Our team will review your message and contact you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {/* Full Name */}
                    <div>
                      <label className="label-text">Full Name *</label>
                      <input
                        {...register("full_name", {
                          required: "Full name is required",
                          pattern: {
                            value: /^[a-zA-Z\s]+$/,
                            message: "Name can only contain letters and spaces",
                          },
                        })}
                        placeholder="Your full name"
                        className="input-field"
                      />
                      {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="label-text">Phone Number *</label>
                      <input
                        {...register("phone_number", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Enter a valid 10-digit phone number",
                          },
                        })}
                        placeholder="+91 XXXXX XXXXX"
                        className="input-field"
                        type="tel"
                      />
                      {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="label-text">Email Address *</label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                        type="email"
                        placeholder="your@email.com"
                        className="input-field"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Country Interested In */}
                    <div>
                      <label className="label-text">Country Interested In *</label>
                      <input
                        {...register("country_interested", {
                          required: "Country is required",
                          pattern: {
                            value: /^[a-zA-Z,\s]+$/,
                            message: "Only letters and commas allowed (e.g. USA, Canada)",
                          },
                        })}
                        placeholder="e.g. USA, UK, Canada"
                        className="input-field"
                      />
                      {errors.country_interested && <p className="text-red-500 text-xs mt-1">{errors.country_interested.message}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="label-text">Message *</label>
                      <textarea
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 20,
                            message: "Message must be at least 20 characters",
                          },
                          maxLength: {
                            value: 1000,
                            message: "Message cannot exceed 1000 characters",
                          },
                        })}
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        className="input-field resize-none"
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    {serverError && (
                      <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
                        {serverError}
                      </p>
                    )}

                    <button type="submit" disabled={loading} className="w-full btn-primary justify-center py-4">
                      {loading ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="w-5 h-5" /> Send Inquiry</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-[#F5F5F5] dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container-max">
          <div className="premium-card p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Start Your Study Abroad Journey Today</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">Connect with Sharada Associates for expert admission guidance and education loan assistance.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="tel:+919985111136" className="btn-primary">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a href="mailto:dilipreddy99@gmail.com" className="btn-outline" style={{ background: "var(--bg-primary)" }}>
                <Mail className="w-5 h-5" />
                Send Email
              </a>
              <a href="https://wa.me/919876543210?text=Hello%20Sharada%20Associates,%20I%20would%20like%20to%20know%20more%20about%20Education%20Loans%20and%20Admission%20Assistance." target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50" style={{ background: "var(--bg-primary)" }}>
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
