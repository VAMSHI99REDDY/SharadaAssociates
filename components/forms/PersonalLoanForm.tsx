"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { User, CheckCircle, Loader2 } from "lucide-react";
import { dbInsert } from "@/lib/supabase";

type FormData = {
  name: string;
  phone: string;
  email: string;
  purpose: string;
  monthlyIncome: string;
  loanAmount: string;
};

export default function PersonalLoanForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await dbInsert("loan_applications", {
        customer_name: data.name,
        phone_number: data.phone,
        email: data.email,
        loan_type: "Personal Loan",
        loan_amount: data.loanAmount,
        status: "pending",
        form_data: data,
        date_applied: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
      <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h3>
      <p className="text-gray-500">We&apos;ll contact you within 2 business days.</p>
    </motion.div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-text">Full Name *</label>
          <input {...register("name", { required: true })} placeholder="Your full name" className="input-field" />
          {errors.name && <p className="text-red-500 text-xs mt-1">Required</p>}
        </div>
        <div>
          <label className="label-text">Phone Number *</label>
          <input {...register("phone", { required: true })} placeholder="+91 XXXXX XXXXX" className="input-field" />
        </div>
        <div className="sm:col-span-2">
          <label className="label-text">Email Address *</label>
          <input {...register("email", { required: true })} type="email" placeholder="your@email.com" className="input-field" />
        </div>
        <div className="sm:col-span-2">
          <label className="label-text">Purpose of Loan *</label>
          <select {...register("purpose", { required: true })} className="input-field">
            <option value="">Select purpose</option>
            <option>Medical Emergency</option>
            <option>Wedding / Marriage</option>
            <option>Travel</option>
            <option>Home Renovation</option>
            <option>Education (Domestic)</option>
            <option>Debt Consolidation</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="label-text">Monthly Income (₹) *</label>
          <input {...register("monthlyIncome", { required: true })} placeholder="Your monthly income" className="input-field" />
        </div>
        <div>
          <label className="label-text">Required Loan Amount (₹) *</label>
          <input {...register("loanAmount", { required: true })} placeholder="e.g. 500000" className="input-field" />
        </div>
      </div>
      <button type="submit" disabled={loading} className="w-full btn-primary justify-center py-4">
        {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : <><User className="w-5 h-5" /> Apply for Personal Loan</>}
      </button>
    </form>
  );
}
