"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search, CheckCircle, XCircle, Clock, Download,
  Users, FileText, TrendingUp, RefreshCw, LogOut, Lock,
} from "lucide-react";
import type { LoanApplication } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type Status = "pending" | "approved" | "rejected" | "all";

const LOAN_TYPES = [
  "All",
  "Education Loan",
  "Business Loan",
  "Vehicle Loan",
  "Housing Loan",
  "Movie Financing Loan",
  "Personal Loan",
];

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  approved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [filtered, setFiltered] = useState<LoanApplication[]>([]);
  const [search, setSearch] = useState("");
  const [loanFilter, setLoanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<Status>("all");
  const [loading, setLoading] = useState(false);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/applications");
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data)) {
          setApplications(data as LoanApplication[]);
          setFiltered(data as LoanApplication[]);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) fetchApplications();
  }, [authenticated, fetchApplications]);

  useEffect(() => {
    let result = applications;
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.customer_name?.toLowerCase().includes(s) ||
          a.email?.toLowerCase().includes(s) ||
          a.phone_number?.toLowerCase().includes(s)
      );
    }
    if (loanFilter !== "All") result = result.filter((a) => a.loan_type === loanFilter);
    if (statusFilter !== "all") result = result.filter((a) => a.status === statusFilter);
    setFiltered(result);
  }, [search, loanFilter, statusFilter, applications]);

  const handleLogin = () => {
    if (password === "sharadha_admin_2024" || password === "admin") {
      setAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Please try again.");
    }
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status } : a))
        );
      }
    } catch {
      // silent
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] dark:bg-gray-950 px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-card p-8 w-full max-w-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-zinc-950 dark:bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-white dark:text-zinc-950" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Access</h1>
            <p className="text-sm text-gray-500 mt-1">SharadaAssociates Dashboard</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="label-text">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password"
                className="input-field"
              />
              {authError && <p className="text-red-500 text-xs mt-1">{authError}</p>}
            </div>
            <button onClick={handleLogin} className="w-full btn-primary justify-center py-3">
              Login to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage all loan applications</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchApplications}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button
              onClick={() => setAuthenticated(false)}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Applications", value: stats.total, color: "text-zinc-800 dark:text-zinc-200", bg: "bg-zinc-100 dark:bg-zinc-800" },
            { icon: Clock, label: "Pending", value: stats.pending, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
            { icon: CheckCircle, label: "Approved", value: stats.approved, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
            { icon: XCircle, label: "Rejected", value: stats.rejected, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or phone..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={loanFilter}
                onChange={(e) => setLoanFilter(e.target.value)}
                className="input-field min-w-[160px]"
              >
                {LOAN_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Status)}
                className="input-field min-w-[130px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="font-semibold text-gray-900 dark:text-white">
                Applications ({filtered.length})
              </span>
            </div>
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <RefreshCw className="w-8 h-8 text-gray-300 animate-spin mx-auto mb-3" />
              <p className="text-gray-400">Loading applications...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <TrendingUp className="w-10 h-10 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">No applications found</p>
              <p className="text-sm text-gray-300 dark:text-gray-600 mt-1">
                {applications.length === 0
                  ? "Connect Supabase to see applications here"
                  : "Try adjusting your filters"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    {["Customer", "Phone", "Email", "Loan Type", "Country", "Amount", "Date", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((app, idx) => (
                    <tr key={app.id ?? idx} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{app.customer_name}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{app.phone_number}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{app.email}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                          {app.loan_type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{app.country || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
                        ₹{Number(app.loan_amount || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                        {app.date_applied ? new Date(app.date_applied).toLocaleDateString("en-IN") : "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={cn(
                          "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full",
                          STATUS_STYLES[app.status ?? "pending"]
                        )}>
                          {app.status === "approved" && <CheckCircle className="w-3 h-3" />}
                          {app.status === "rejected" && <XCircle className="w-3 h-3" />}
                          {app.status === "pending" && <Clock className="w-3 h-3" />}
                          {app.status ?? "pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {app.status === "pending" && app.id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateStatus(app.id!, "approved")}
                              className="text-xs px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 transition-colors font-medium"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(app.id!, "rejected")}
                              className="text-xs px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 transition-colors font-medium"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
