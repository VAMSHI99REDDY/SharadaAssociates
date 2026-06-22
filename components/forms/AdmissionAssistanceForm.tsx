
"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, AlertCircle, Phone, Mail, Globe } from "lucide-react";
import { dbInsert } from "@/lib/supabase";

const formatINR = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  const num = parseInt(digits, 10);
  return new Intl.NumberFormat('en-IN').format(num);
};

const parseINR = (value: string) => {
  return value.replace(/\D/g, "");
};

const nameRegex = /^[a-zA-Z\s]+$/;
const phoneRegex = /^\d{10}$/;

export default function AdmissionAssistanceForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    mode: "onChange"
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Parse any currency fields back to numbers
      const cleanData = { ...data };
      if (cleanData.loanAmount) cleanData.loanAmount = parseINR(cleanData.loanAmount);





      const { error } = await dbInsert("loan_applications", {
        customer_name: cleanData.fullName,
        phone_number: cleanData.phone,
        email: cleanData.email,
        loan_type: "Admission Assistance",
        loan_amount: cleanData.loanAmount || "0",
        status: "pending",
        form_data: cleanData,
        date_applied: new Date().toISOString(),
      });
      if (!error) setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 px-4">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🎉</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Admission Assistance Application Submitted Successfully</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 font-medium">Thank you for choosing Sharada Associates.</p>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Our team will review your application and contact you shortly.
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 text-left max-w-sm mx-auto mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4 text-gray-600 dark:text-gray-300">
            <Phone className="w-5 h-5 text-blue-500" />
            <span>+91 94943 38166</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <Mail className="w-5 h-5 text-blue-500" />
            <a href="mailto:info@sharadaassociates.com" className="hover:text-blue-500 transition-colors">info@sharadaassociates.com</a>
          </div>
        </div>

        <button 
          onClick={() => window.location.reload()} 
          className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-semibold hover:underline"
        >
          Back to Home
        </button>
      </motion.div>
    );
  }

  const ErrorMsg = ({ error }: { error: any }) => {
    if (!error) return null;
    return (
      <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
        <AlertCircle className="w-4 h-4" /> {error.message}
      </p>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* COMMON FIELDS */}
        <div>
          <label className="label-text">Full Name *</label>
          <input
            {...register("fullName", { 
              required: "Letters and spaces only.", 
              pattern: { value: nameRegex, message: "Letters and spaces only." }
            })}
            placeholder="Your full name" 
            className={"input-field rounded-xl " + (errors.fullName ? "border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500/20")} 
          />
          <ErrorMsg error={errors.fullName} />
        </div>
        
        <div>
          <label className="label-text">Phone Number *</label>
          <input
            {...register("phone", { 
              required: "Exactly 10 digits.", 
              pattern: { value: phoneRegex, message: "Exactly 10 digits." }
            })}
            placeholder="10 digit number" 
            className={"input-field rounded-xl " + (errors.phone ? "border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500/20")} 
          />
          <ErrorMsg error={errors.phone} />
        </div>

        <div>
          <label className="label-text">Email Address *</label>
          <input
            {...register("email", { required: "Valid email required." })}
            type="email" placeholder="your@email.com" 
            className={"input-field rounded-xl " + (errors.email ? "border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500/20")} 
          />
          <ErrorMsg error={errors.email} />
        </div>

        <div>
          <label className="label-text">Required Amount (₹) *</label>
          <Controller
            name="loanAmount"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <input
                  {...field}
                  onChange={(e) => field.onChange(formatINR(e.target.value))}
                  placeholder="e.g. 5,00,000"
                  className={"input-field pl-9 rounded-xl " + (errors.loanAmount ? "border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500/20")}
                />
              </div>
            )}
          />
          <ErrorMsg error={errors.loanAmount} />
        </div>

        {/* SPECIFIC FIELDS */}
        
        <div>
          <label className="label-text">Desired Country *</label>
          <input
            {...register("desiredCountry", { required: "Required" })}
            placeholder="Enter desired country" 
            className={"input-field rounded-xl " + (errors.desiredCountry ? "border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500/20")} 
          />
          <ErrorMsg error={errors.desiredCountry} />
        </div>
        <div>
          <label className="label-text">Course Name *</label>
          <input
            {...register("courseName", { required: "Required" })}
            placeholder="Enter course name" 
            className={"input-field rounded-xl " + (errors.courseName ? "border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500/20")} 
          />
          <ErrorMsg error={errors.courseName} />
        </div>
        <div>
          <label className="label-text">Preferred University *</label>
          <input
            {...register("preferredUniversity", { required: "Required" })}
            placeholder="Enter preferred university" 
            className={"input-field rounded-xl " + (errors.preferredUniversity ? "border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500/20")} 
          />
          <ErrorMsg error={errors.preferredUniversity} />
        </div>
        <div>
          <label className="label-text">Intake Year *</label>
          <input
            {...register("intakeYear", { required: "Required" })}
            placeholder="Enter intake year" 
            className={"input-field rounded-xl " + (errors.intakeYear ? "border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500/20")} 
          />
          <ErrorMsg error={errors.intakeYear} />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="w-full lg:w-auto px-8 btn-primary flex items-center justify-center gap-2 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed mx-auto"
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
          ) : (
            <>Apply for Admission Assistance</>
          )}
        </button>
      </div>
    </form>
  );
}
