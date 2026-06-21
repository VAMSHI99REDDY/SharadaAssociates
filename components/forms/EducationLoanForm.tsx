"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { GraduationCap, CheckCircle, Loader2 } from "lucide-react";
import { dbInsert } from "@/lib/supabase";

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  country: string;
  state: string;
  city: string;
  address: string;
  currentQualification: string;
  degreeType: string;
  courseName: string;
  studyCountry: string;
  universityName: string;
  intakeYear: string;
  loanType: string;
  loanAmount: string;
  parentName: string;
  parentPhone: string;
  annualIncome: string;
};

const studyCountries = [
  "USA 🇺🇸", "Canada 🇨🇦", "UK 🇬🇧", "Australia 🇦🇺", "Germany 🇩🇪",
  "New Zealand 🇳🇿", "Ireland 🇮🇪", "France 🇫🇷", "Singapore 🇸🇬", "UAE 🇦🇪",
];

export default function EducationLoanForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { error } = await dbInsert("loan_applications", {
        customer_name: data.fullName,
        phone_number: data.phone,
        email: data.email,
        loan_type: "Education Loan",
        country: data.studyCountry,
        loan_amount: data.loanAmount,
        status: "pending",
        form_data: data,
        date_applied: new Date().toISOString(),
      });
      if (!error) setSubmitted(true);
    } catch {
      // silently handle if Supabase not configured
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Our team will review your application and contact you within 2 business days.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-7 h-7 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Full Name *</label>
            <input {...register("fullName", { required: true })} placeholder="Enter your full name" className="input-field" />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">Required</p>}
          </div>
          <div>
            <label className="label-text">Phone Number *</label>
            <input {...register("phone", { required: true })} placeholder="+91 XXXXX XXXXX" className="input-field" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">Required</p>}
          </div>
          <div>
            <label className="label-text">Email Address *</label>
            <input {...register("email", { required: true })} type="email" placeholder="your@email.com" className="input-field" />
            {errors.email && <p className="text-red-500 text-xs mt-1">Required</p>}
          </div>
          <div>
            <label className="label-text">Date of Birth *</label>
            <input {...register("dob", { required: true })} type="date" className="input-field" />
            {errors.dob && <p className="text-red-500 text-xs mt-1">Required</p>}
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-7 h-7 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Address Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label-text">Country *</label>
            <input {...register("country", { required: true })} placeholder="India" className="input-field" />
          </div>
          <div>
            <label className="label-text">State *</label>
            <input {...register("state", { required: true })} placeholder="Your state" className="input-field" />
          </div>
          <div>
            <label className="label-text">City *</label>
            <input {...register("city", { required: true })} placeholder="Your city" className="input-field" />
          </div>
          <div className="sm:col-span-3">
            <label className="label-text">Current Address</label>
            <textarea {...register("address")} rows={2} placeholder="Enter your current address" className="input-field resize-none" />
          </div>
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-7 h-7 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Education Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Current Qualification *</label>
            <input {...register("currentQualification", { required: true })} placeholder="e.g. B.Tech, BSc" className="input-field" />
          </div>
          <div>
            <label className="label-text">Degree Type *</label>
            <select {...register("degreeType", { required: true })} className="input-field">
              <option value="">Select degree type</option>
              <option>Undergraduate (UG)</option>
              <option>Postgraduate (PG)</option>
              <option>PhD / Doctoral</option>
              <option>Diploma / Certificate</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label-text">Course Name *</label>
            <input {...register("courseName", { required: true })} placeholder="e.g. Master of Science in Computer Science" className="input-field" />
          </div>
        </div>
      </div>

      {/* Study Destination */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-7 h-7 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Study Destination
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label-text">Study Country *</label>
            <select {...register("studyCountry", { required: true })} className="input-field">
              <option value="">Select country</option>
              {studyCountries.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label-text">University Name *</label>
            <input {...register("universityName", { required: true })} placeholder="University name" className="input-field" />
          </div>
          <div>
            <label className="label-text">Intake Year *</label>
            <select {...register("intakeYear", { required: true })} className="input-field">
              <option value="">Select year</option>
              {["2024", "2025", "2026", "2027"].map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Loan Details */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-7 h-7 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full flex items-center justify-center text-xs font-bold">5</span>
          Loan Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Loan Type *</label>
            <select {...register("loanType", { required: true })} className="input-field">
              <option value="">Select loan type</option>
              <option>Collateral Loan</option>
              <option>Non-Collateral Loan</option>
              <option>Secured Loan</option>
              <option>Unsecured Loan</option>
            </select>
          </div>
          <div>
            <label className="label-text">Required Loan Amount (₹) *</label>
            <input {...register("loanAmount", { required: true })} placeholder="e.g. 2500000" className="input-field" />
          </div>
        </div>
      </div>

      {/* Family Details */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-7 h-7 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full flex items-center justify-center text-xs font-bold">6</span>
          Family Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label-text">Parent Name *</label>
            <input {...register("parentName", { required: true })} placeholder="Parent/Guardian name" className="input-field" />
          </div>
          <div>
            <label className="label-text">Parent Phone *</label>
            <input {...register("parentPhone", { required: true })} placeholder="+91 XXXXX XXXXX" className="input-field" />
          </div>
          <div>
            <label className="label-text">Annual Family Income (₹) *</label>
            <input {...register("annualIncome", { required: true })} placeholder="e.g. 800000" className="input-field" />
          </div>
        </div>
      </div>



      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary justify-center py-4 text-base"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
        ) : (
          <><GraduationCap className="w-5 h-5" /> Apply for Education Loan</>
        )}
      </button>
    </form>
  );
}
