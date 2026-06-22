const fs = require('fs');

const formsData = {
  BusinessLoanForm: {
    type: "Business Loan",
    name: "BusinessLoanForm",
    specificFields: [
      { name: "businessName", label: "Business Name", type: "text" },
      { name: "businessType", label: "Business Type", type: "text" },
      { name: "yearsInBusiness", label: "Years in Business", type: "number" },
      { name: "annualRevenue", label: "Annual Revenue (₹)", type: "currency" }
    ]
  },
  VehicleLoanForm: {
    type: "Vehicle Loan",
    name: "VehicleLoanForm",
    specificFields: [
      { name: "vehicleType", label: "Vehicle Type", type: "text" },
      { name: "brand", label: "Brand", type: "text" },
      { name: "model", label: "Model", type: "text" },
      { name: "newOrUsed", label: "New or Used Vehicle", type: "select", options: ["New", "Used"] },
      { name: "vehiclePrice", label: "Vehicle Price (₹)", type: "currency" }
    ]
  },
  HousingLoanForm: {
    type: "Housing Loan",
    name: "HousingLoanForm",
    specificFields: [
      { name: "propertyType", label: "Property Type", type: "text" },
      { name: "propertyValue", label: "Property Value (₹)", type: "currency" },
      { name: "propertyLocation", label: "Property Location", type: "text" }
    ]
  },
  MovieFinancingForm: {
    type: "Movie Financing",
    name: "MovieFinancingForm",
    specificFields: [
      { name: "productionHouseName", label: "Production House Name", type: "text" },
      { name: "projectName", label: "Project Name", type: "text" },
      { name: "movieGenre", label: "Movie Genre", type: "text" },
      { name: "estimatedBudget", label: "Estimated Budget (₹)", type: "currency" }
    ]
  },
  PersonalLoanForm: {
    type: "Personal Loan",
    name: "PersonalLoanForm",
    specificFields: [
      { name: "occupation", label: "Occupation", type: "text" },
      { name: "monthlyIncome", label: "Monthly Income (₹)", type: "currency" },
      { name: "employerName", label: "Employer Name", type: "text" }
    ]
  },
  FundArrangementForm: {
    type: "Fund Arrangement",
    name: "FundArrangementForm",
    specificFields: [
      { name: "purposeOfFunds", label: "Purpose of Funds", type: "text" },
      { name: "description", label: "Description", type: "text" }
    ]
  },
  AdmissionAssistanceForm: {
    type: "Admission Assistance",
    name: "AdmissionAssistanceForm",
    specificFields: [
      { name: "desiredCountry", label: "Desired Country", type: "text" },
      { name: "courseName", label: "Course Name", type: "text" },
      { name: "preferredUniversity", label: "Preferred University", type: "text" },
      { name: "intakeYear", label: "Intake Year", type: "text" }
    ]
  }
};

const generateTemplate = (config) => {
  const specificFieldsJSX = config.specificFields.map(field => {
    if (field.type === "currency") {
      return `
        <div>
          <label className="label-text">${field.label} *</label>
          <Controller
            name="${field.name}"
            control={control}
            rules={{ required: "Required" }}
            render={({ field: f }) => (
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <input
                  {...f}
                  onChange={(e) => f.onChange(formatINR(e.target.value))}
                  placeholder="e.g. 5,00,000"
                  className={"input-field pl-9 rounded-xl " + (errors.${field.name} ? "border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500/20")}
                />
              </div>
            )}
          />
          <ErrorMsg error={errors.${field.name}} />
        </div>`;
    } else if (field.type === "select") {
      return `
        <div>
          <label className="label-text">${field.label} *</label>
          <select 
            {...register("${field.name}", { required: "Required" })} 
            className={"input-field rounded-xl " + (errors.${field.name} ? "border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500/20")}
          >
            <option value="">Select</option>
            ${field.options.map(o => `<option value="${o}">${o}</option>`).join('')}
          </select>
          <ErrorMsg error={errors.${field.name}} />
        </div>`;
    } else {
      let validation = `{ required: "Required" }`;
      if (field.type === "number") {
        validation = `{ required: "Required", pattern: { value: /^\\d+$/, message: "Numbers only" } }`;
      }
      return `
        <div>
          <label className="label-text">${field.label} *</label>
          <input
            {...register("${field.name}", ${validation})}
            placeholder="Enter ${field.label.toLowerCase()}" 
            className={"input-field rounded-xl " + (errors.${field.name} ? "border-red-500 focus:ring-red-500" : "focus:border-green-500 focus:ring-green-500/20")} 
          />
          <ErrorMsg error={errors.${field.name}} />
        </div>`;
    }
  }).join('');

  return `
"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, AlertCircle, Phone, Mail, Globe } from "lucide-react";
import { dbInsert } from "@/lib/supabase";

const formatINR = (value: string) => {
  const digits = value.replace(/\\D/g, "");
  if (!digits) return "";
  const num = parseInt(digits, 10);
  return new Intl.NumberFormat('en-IN').format(num);
};

const parseINR = (value: string) => {
  return value.replace(/\\D/g, "");
};

const nameRegex = /^[a-zA-Z\\s]+$/;
const phoneRegex = /^\\d{10}$/;

export default function ${config.name}() {
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
${config.specificFields.map(f => {
  if (f.type === "currency") return `      if (cleanData.${f.name}) cleanData.${f.name} = parseINR(cleanData.${f.name});`;
  return '';
}).join('\n')}

      const { error } = await dbInsert("loan_applications", {
        customer_name: cleanData.fullName,
        phone_number: cleanData.phone,
        email: cleanData.email,
        loan_type: "${config.type}",
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
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">${config.type} Application Submitted Successfully</h3>
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
        ${specificFieldsJSX}
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
            <>Apply for ${config.type}</>
          )}
        </button>
      </div>
    </form>
  );
}
`;
};

Object.values(formsData).forEach(config => {
  fs.writeFileSync(`components/forms/${config.name}.tsx`, generateTemplate(config));
  console.log(`Generated ${config.name}.tsx`);
});
