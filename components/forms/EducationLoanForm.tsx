"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react";
import { dbInsert } from "@/lib/supabase";

// Indian states
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
];

// Helper: Format Indian Rupee (e.g., 2500000 -> 25,00,000)
const formatINR = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  const num = parseInt(digits, 10);
  return new Intl.NumberFormat('en-IN').format(num);
};

const parseINR = (value: string) => {
  return value.replace(/\D/g, "");
};

// Age validation
const validateAge = (dob: string) => {
  const birthDate = new Date(dob);
  const today = new Date();
  if (birthDate > today) return "Future dates are not allowed.";
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 16 || age > 45) return "Age should be between 16 and 45 years.";
  return true;
};

// Validation patterns
const alphaSpaceRegex = /^[a-zA-Z\s]+$/;
const courseRegex = /^[a-zA-Z\s,.]+$/;
const phoneRegex = /^\d{10}$/;

type FormData = {
  fullName: string; phone: string; email: string; dob: string;
  country: string; state: string; city: string; address: string;
  currentQualification: string; degreeType: string; courseName: string;
  studyCountry: string; universityName: string; intakeYear: string;
  loanType: string; loanAmount: string;
  parentName: string; parentPhone: string; annualIncome: string;
};

const steps = [
  { id: 1, title: "Personal", fields: ["fullName", "phone", "email", "dob"] },
  { id: 2, title: "Address", fields: ["country", "state", "city", "address"] },
  { id: 3, title: "Education", fields: ["currentQualification", "degreeType", "courseName"] },
  { id: 4, title: "Destination", fields: ["studyCountry", "universityName", "intakeYear"] },
  { id: 5, title: "Loan", fields: ["loanType", "loanAmount"] },
  { id: 6, title: "Family", fields: ["parentName", "parentPhone", "annualIncome"] },
];

export default function EducationLoanForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, trigger, control, formState: { errors } } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { country: "India" }
  });

  const nextStep = async () => {
    const fieldsToValidate = steps[currentStep - 1].fields as any;
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Auto-scroll to first error
      const firstErrorElement = document.querySelector('.error-ring');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Clean up numbers
      const cleanData = {
        ...data,
        loanAmount: parseINR(data.loanAmount),
        annualIncome: parseINR(data.annualIncome)
      };

      const { error } = await dbInsert("loan_applications", {
        customer_name: cleanData.fullName,
        phone_number: cleanData.phone,
        email: cleanData.email,
        loan_type: cleanData.loanType,
        country: cleanData.studyCountry,
        loan_amount: cleanData.loanAmount,
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
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🎉</span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Application Submitted Successfully</h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">Thank you for choosing Sharada Associates.</p>
        <p className="text-gray-500 dark:text-gray-500">Our team will review your details and contact you shortly regarding your education loan process.</p>
      </motion.div>
    );
  }

  // A helper component for Inputs to keep JSX clean
  const ErrorMsg = ({ error }: { error: any }) => {
    if (!error) return null;
    return (
      <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
        <AlertCircle className="w-4 h-4" /> {error.message}
      </p>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Sticky Progress Indicator */}
      <div className="sticky top-20 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 mb-8 hidden md:block">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full -z-10">
            <div 
              className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-2 bg-transparent">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                currentStep >= step.id 
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md" 
                  : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
              }`}>
                {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
              </div>
              <span className={`text-xs font-semibold ${currentStep >= step.id ? "text-zinc-900 dark:text-zinc-100" : "text-gray-400 dark:text-gray-600"}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {currentStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white dark:bg-gray-900/50 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Step 1: Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="label-text">Full Name *</label>
                  <input
                    {...register("fullName", { 
                      required: "Please enter your full name.", 
                      minLength: { value: 3, message: "Minimum 3 characters required." },
                      pattern: { value: alphaSpaceRegex, message: "Please enter a valid name using letters only." }
                    })}
                    placeholder="Enter your full name" 
                    className={`input-field ${errors.fullName ? 'border-red-500 focus:ring-red-500 error-ring' : 'focus:border-green-500 focus:ring-green-500/20'} rounded-xl`} 
                  />
                  <ErrorMsg error={errors.fullName} />
                </div>
                <div>
                  <label className="label-text">Phone Number *</label>
                  <input
                    {...register("phone", { 
                      required: "Please enter your mobile number.", 
                      pattern: { value: phoneRegex, message: "Please enter a valid 10-digit mobile number." }
                    })}
                    placeholder="+91 XXXXX XXXXX" 
                    className={`input-field ${errors.phone ? 'border-red-500 focus:ring-red-500 error-ring' : 'focus:border-green-500 focus:ring-green-500/20'} rounded-xl`} 
                  />
                  <ErrorMsg error={errors.phone} />
                </div>
                <div>
                  <label className="label-text">Email Address *</label>
                  <input
                    {...register("email", { 
                      required: "Please enter your email address.", 
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Please enter a valid email address." }
                    })}
                    type="email" placeholder="your@email.com" 
                    className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500 error-ring' : 'focus:border-green-500 focus:ring-green-500/20'} rounded-xl`} 
                  />
                  <ErrorMsg error={errors.email} />
                </div>
                <div>
                  <label className="label-text">Date of Birth *</label>
                  <input
                    {...register("dob", { 
                      required: "Please select your date of birth.", 
                      validate: validateAge
                    })}
                    type="date" 
                    className={`input-field ${errors.dob ? 'border-red-500 focus:ring-red-500 error-ring' : 'focus:border-green-500 focus:ring-green-500/20'} rounded-xl`} 
                  />
                  <ErrorMsg error={errors.dob} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white dark:bg-gray-900/50 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Step 2: Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="label-text">Country *</label>
                  <select {...register("country", { required: "Please select your country." })} className={`input-field rounded-xl ${errors.country ? 'border-red-500 error-ring' : ''}`}>
                    <option value="India">India</option>
                  </select>
                  <ErrorMsg error={errors.country} />
                </div>
                <div>
                  <label className="label-text">State *</label>
                  <select {...register("state", { required: "Please select your state." })} className={`input-field rounded-xl ${errors.state ? 'border-red-500 error-ring' : ''}`}>
                    <option value="">Select State</option>
                    {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ErrorMsg error={errors.state} />
                </div>
                <div>
                  <label className="label-text">City *</label>
                  <input
                    {...register("city", { 
                      required: "Please enter your city.", 
                      pattern: { value: alphaSpaceRegex, message: "Please enter a valid city name." }
                    })}
                    placeholder="Enter your city" 
                    className={`input-field ${errors.city ? 'border-red-500 error-ring' : ''} rounded-xl`} 
                  />
                  <ErrorMsg error={errors.city} />
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="label-text">Current Address *</label>
                  <textarea
                    {...register("address", { 
                      required: "Please enter your complete address.",
                      minLength: { value: 10, message: "Minimum 10 characters required." },
                      maxLength: { value: 250, message: "Maximum 250 characters allowed." }
                    })}
                    rows={3} placeholder="Enter your full street address" 
                    className={`input-field resize-none ${errors.address ? 'border-red-500 error-ring' : ''} rounded-xl`} 
                  />
                  <ErrorMsg error={errors.address} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white dark:bg-gray-900/50 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Step 3: Education Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="label-text">Current Qualification *</label>
                  <select {...register("currentQualification", { required: "Please select your qualification." })} className={`input-field rounded-xl ${errors.currentQualification ? 'border-red-500 error-ring' : ''}`}>
                    <option value="">Select qualification</option>
                    <option>Intermediate</option>
                    <option>Diploma</option>
                    <option>B.Tech</option>
                    <option>B.Sc</option>
                    <option>B.Com</option>
                    <option>MBA</option>
                    <option>M.Tech</option>
                    <option>MBBS</option>
                    <option>Other</option>
                  </select>
                  <ErrorMsg error={errors.currentQualification} />
                </div>
                <div>
                  <label className="label-text">Degree Type *</label>
                  <select {...register("degreeType", { required: "Please select degree type." })} className={`input-field rounded-xl ${errors.degreeType ? 'border-red-500 error-ring' : ''}`}>
                    <option value="">Select degree type</option>
                    <option>Undergraduate</option>
                    <option>Postgraduate</option>
                    <option>Doctorate</option>
                    <option>Diploma</option>
                  </select>
                  <ErrorMsg error={errors.degreeType} />
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="label-text">Course Name *</label>
                  <input
                    {...register("courseName", { 
                      required: "Please enter your course name.", 
                      pattern: { value: courseRegex, message: "Please enter a valid course name (letters and punctuation only)." }
                    })}
                    placeholder="e.g. Master of Science in Computer Science" 
                    className={`input-field ${errors.courseName ? 'border-red-500 error-ring' : ''} rounded-xl`} 
                  />
                  <ErrorMsg error={errors.courseName} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white dark:bg-gray-900/50 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Step 4: Study Destination</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="label-text">Study Country *</label>
                  <select {...register("studyCountry", { required: "Please select study country." })} className={`input-field rounded-xl ${errors.studyCountry ? 'border-red-500 error-ring' : ''}`}>
                    <option value="">Select country</option>
                    {["USA", "Canada", "UK", "Australia", "Germany", "Ireland", "New Zealand", "Singapore"].map(c => <option key={c}>{c}</option>)}
                  </select>
                  <ErrorMsg error={errors.studyCountry} />
                </div>
                <div>
                  <label className="label-text">Intake Year *</label>
                  <select {...register("intakeYear", { required: "Please select intake year." })} className={`input-field rounded-xl ${errors.intakeYear ? 'border-red-500 error-ring' : ''}`}>
                    <option value="">Select year</option>
                    {[2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035].map(y => <option key={y}>{y}</option>)}
                  </select>
                  <ErrorMsg error={errors.intakeYear} />
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="label-text">University Name *</label>
                  <input
                    {...register("universityName", { 
                      required: "Please enter your university name.",
                      minLength: { value: 3, message: "Minimum 3 characters required." },
                      pattern: { value: alphaSpaceRegex, message: "Please enter a valid university name (letters only)." }
                    })}
                    placeholder="Enter University name" 
                    className={`input-field ${errors.universityName ? 'border-red-500 error-ring' : ''} rounded-xl`} 
                  />
                  <ErrorMsg error={errors.universityName} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5 */}
          {currentStep === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white dark:bg-gray-900/50 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Step 5: Loan Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="label-text">Loan Type *</label>
                  <select {...register("loanType", { required: "Please select loan type." })} className={`input-field rounded-xl ${errors.loanType ? 'border-red-500 error-ring' : ''}`}>
                    <option value="">Select loan type</option>
                    <option>Education Loan</option>
                    <option>Property Loan</option>
                    <option>Vehicle Loan</option>
                    <option>Project Loan</option>
                  </select>
                  <ErrorMsg error={errors.loanType} />
                </div>
                <div className="md:col-span-2 lg:col-span-2">
                  <label className="label-text">Required Loan Amount (₹) *</label>
                  <Controller
                    name="loanAmount"
                    control={control}
                    rules={{
                      required: "Please enter loan amount.",
                      validate: (val) => {
                        const num = parseInt(parseINR(val), 10);
                        if (isNaN(num)) return "Please enter loan amount using numbers only.";
                        if (num < 100000) return "Minimum loan amount is ₹1,00,000.";
                        if (num > 20000000) return "Maximum loan amount is ₹2,00,00,000.";
                        return true;
                      }
                    }}
                    render={({ field }) => (
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                        <input
                          {...field}
                          onChange={(e) => field.onChange(formatINR(e.target.value))}
                          placeholder="25,00,000"
                          className={`input-field pl-9 rounded-xl ${errors.loanAmount ? 'border-red-500 error-ring' : ''}`}
                        />
                      </div>
                    )}
                  />
                  <p className="text-xs text-gray-500 mt-2 ml-1">Minimum ₹1,00,000</p>
                  <ErrorMsg error={errors.loanAmount} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 6 */}
          {currentStep === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white dark:bg-gray-900/50 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Step 6: Family Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="label-text">Parent/Guardian Name *</label>
                  <input
                    {...register("parentName", { 
                      required: "Please enter parent/guardian name.",
                      minLength: { value: 3, message: "Minimum 3 characters required." },
                      pattern: { value: alphaSpaceRegex, message: "Please enter a valid parent name (letters only)." }
                    })}
                    placeholder="Enter name" 
                    className={`input-field rounded-xl ${errors.parentName ? 'border-red-500 error-ring' : ''}`} 
                  />
                  <ErrorMsg error={errors.parentName} />
                </div>
                <div>
                  <label className="label-text">Parent Phone *</label>
                  <input
                    {...register("parentPhone", { 
                      required: "Please enter parent mobile number.", 
                      pattern: { value: phoneRegex, message: "Please enter a valid 10-digit mobile number." }
                    })}
                    placeholder="+91 XXXXX XXXXX" 
                    className={`input-field rounded-xl ${errors.parentPhone ? 'border-red-500 error-ring' : ''}`} 
                  />
                  <ErrorMsg error={errors.parentPhone} />
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="label-text">Annual Family Income (₹) *</label>
                  <Controller
                    name="annualIncome"
                    control={control}
                    rules={{
                      required: "Please enter annual family income.",
                      validate: (val) => {
                        const num = parseInt(parseINR(val), 10);
                        if (isNaN(num)) return "Please enter annual income using numbers only.";
                        if (num < 50000) return "Minimum income is ₹50,000.";
                        if (num > 50000000) return "Maximum income is ₹5,00,00,000.";
                        return true;
                      }
                    }}
                    render={({ field }) => (
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                        <input
                          {...field}
                          onChange={(e) => field.onChange(formatINR(e.target.value))}
                          placeholder="8,00,000"
                          className={`input-field pl-9 rounded-xl ${errors.annualIncome ? 'border-red-500 error-ring' : ''}`}
                        />
                      </div>
                    )}
                  />
                  <ErrorMsg error={errors.annualIncome} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1 || loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-zinc-600 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-gray-800'
            }`}
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-primary flex items-center gap-2 px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center gap-2 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
              ) : (
                <>Submit Application <CheckCircle className="w-5 h-5 ml-1" /></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
