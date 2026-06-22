"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, CheckCircle, XCircle, Clock, Download,
  Users, FileText, TrendingUp, RefreshCw, LogOut, Lock,
  MessageSquare, Trash2, ChevronDown, AlertTriangle,
} from "lucide-react";
import type { LoanApplication, ContactInquiry } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type AppStatus = "pending" | "approved" | "rejected" | "all";
type InquiryStatus = "New" | "Contacted" | "Closed" | "all";
type ActiveTab = "applications" | "inquiries";
type SortOrder = "newest" | "oldest";

const LOAN_TYPES = [
  "All", "Education Loan", "Business Loan", "Vehicle Loan",
  "Housing Loan", "Movie Financing Loan", "Personal Loan",
];

const APP_STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  approved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const INQ_STATUS_STYLES: Record<string, string> = {
  New: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Contacted: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Closed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("applications");

  // ─── Loan Applications state ────────────────────────────────────────────────
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [filteredApps, setFilteredApps] = useState<LoanApplication[]>([]);
  const [appSearch, setAppSearch] = useState("");
  const [loanFilter, setLoanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<AppStatus>("all");
  const [appLoading, setAppLoading] = useState(false);

  // ─── Contact Inquiries state ─────────────────────────────────────────────────
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<ContactInquiry[]>([]);
  const [inqSearch, setInqSearch] = useState("");
  const [inqStatusFilter, setInqStatusFilter] = useState<InquiryStatus>("all");
  const [inqSort, setInqSort] = useState<SortOrder>("newest");
  const [inqLoading, setInqLoading] = useState(false);
  const [inqError, setInqError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // ─── Fetch applications ───────────────────────────────────────────────────
  const fetchApplications = useCallback(async () => {
    setAppLoading(true);
    try {
      const res = await fetch("/api/applications");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setApplications(data as LoanApplication[]);
          setFilteredApps(data as LoanApplication[]);
        }
      }
    } finally {
      setAppLoading(false);
    }
  }, []);

  // ─── Fetch inquiries ──────────────────────────────────────────────────────
  const fetchInquiries = useCallback(async () => {
    setInqLoading(true);
    setInqError("");
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (!res.ok) {
        setInqError(data?.error || `API error ${res.status}`);
        return;
      }
      if (Array.isArray(data)) setInquiries(data as ContactInquiry[]);
    } catch (e) {
      setInqError(e instanceof Error ? e.message : "Network error");
    } finally {
      setInqLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchApplications();
      fetchInquiries();
    }
  }, [authenticated, fetchApplications, fetchInquiries]);

  // ─── Filter applications ─────────────────────────────────────────────────
  useEffect(() => {
    let result = applications;
    if (appSearch) {
      const s = appSearch.toLowerCase();
      result = result.filter(
        (a) =>
          a.customer_name?.toLowerCase().includes(s) ||
          a.email?.toLowerCase().includes(s) ||
          a.phone_number?.toLowerCase().includes(s)
      );
    }
    if (loanFilter !== "All") result = result.filter((a) => a.loan_type === loanFilter);
    if (statusFilter !== "all") result = result.filter((a) => a.status === statusFilter);
    setFilteredApps(result);
  }, [appSearch, loanFilter, statusFilter, applications]);

  // ─── Filter & sort inquiries ─────────────────────────────────────────────
  useEffect(() => {
    let result = [...inquiries];
    if (inqSearch) {
      const s = inqSearch.toLowerCase();
      result = result.filter(
        (i) =>
          i.full_name?.toLowerCase().includes(s) ||
          i.email?.toLowerCase().includes(s) ||
          i.phone_number?.toLowerCase().includes(s)
      );
    }
    if (inqStatusFilter !== "all") result = result.filter((i) => i.status === inqStatusFilter);
    result.sort((a, b) => {
      const da = new Date(a.created_at || "").getTime();
      const db = new Date(b.created_at || "").getTime();
      return inqSort === "newest" ? db - da : da - db;
    });
    setFilteredInquiries(result);
  }, [inqSearch, inqStatusFilter, inqSort, inquiries]);

  // ─── Auth ─────────────────────────────────────────────────────────────────
  const handleLogin = () => {
    if (password === "Sharadaassociates2026" || password === "Shareddy@1136") {
      setAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Please try again.");
    }
  };

  // ─── Application actions ─────────────────────────────────────────────────
  const updateAppStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      }
    } catch { /* silent */ }
  };

  // ─── Inquiry actions ──────────────────────────────────────────────────────
  const updateInquiryStatus = async (id: string, status: "New" | "Contacted" | "Closed") => {
    setUpdatingStatus(id);
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      }
    } finally {
      setUpdatingStatus(null);
    }
  };

  const deleteInquiry = async (id: string) => {
    try {
      await fetch("/api/inquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } finally {
      setDeleteConfirm(null);
    }
  };

  // ─── Stats ────────────────────────────────────────────────────────────────
  const appStats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  const inqStats = {
    total: inquiries.length,
    newCount: inquiries.filter((i) => i.status === "New").length,
    contacted: inquiries.filter((i) => i.status === "Contacted").length,
    closed: inquiries.filter((i) => i.status === "Closed").length,
  };

  // ─── Login screen ─────────────────────────────────────────────────────────
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

  // ─── Dashboard ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage applications and contact inquiries</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { fetchApplications(); fetchInquiries(); }}
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

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8 bg-white dark:bg-gray-900 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-700 w-fit">
          <button
            onClick={() => setActiveTab("applications")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
              activeTab === "applications"
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            )}
          >
            <FileText className="w-4 h-4" />
            Loan Applications
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-bold",
              activeTab === "applications" ? "bg-white/20 dark:bg-black/20 text-white dark:text-zinc-900" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            )}>
              {appStats.total}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
              activeTab === "inquiries"
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            )}
          >
            <MessageSquare className="w-4 h-4" />
            Contact Inquiries
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-bold",
              activeTab === "inquiries" ? "bg-white/20 dark:bg-black/20 text-white dark:text-zinc-900" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            )}>
              {inqStats.total}
            </span>
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            TAB: LOAN APPLICATIONS
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === "applications" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Users, label: "Total Applications", value: appStats.total, color: "text-zinc-800 dark:text-zinc-200", bg: "bg-zinc-100 dark:bg-zinc-800" },
                { icon: Clock, label: "Pending", value: appStats.pending, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
                { icon: CheckCircle, label: "Approved", value: appStats.approved, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
                { icon: XCircle, label: "Rejected", value: appStats.rejected, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" },
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
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    placeholder="Search by name, email, or phone..."
                    className="input-field pl-10"
                  />
                </div>
                <div className="flex gap-3">
                  <select value={loanFilter} onChange={(e) => setLoanFilter(e.target.value)} className="input-field min-w-[160px]">
                    {LOAN_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as AppStatus)} className="input-field min-w-[130px]">
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
                  <span className="font-semibold text-gray-900 dark:text-white">Applications ({filteredApps.length})</span>
                </div>
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>

              {appLoading ? (
                <div className="py-20 text-center">
                  <RefreshCw className="w-8 h-8 text-gray-300 animate-spin mx-auto mb-3" />
                  <p className="text-gray-400">Loading applications...</p>
                </div>
              ) : filteredApps.length === 0 ? (
                <div className="py-20 text-center">
                  <TrendingUp className="w-10 h-10 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No applications found</p>
                  <p className="text-sm text-gray-300 dark:text-gray-600 mt-1">
                    {applications.length === 0 ? "Connect Supabase to see applications here" : "Try adjusting your filters"}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        {["Customer", "Phone", "Email", "Loan Type", "Country", "Amount", "Date", "Status", "Actions"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApps.map((app, idx) => (
                        <tr key={app.id ?? idx} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{app.customer_name}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{app.phone_number}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{app.email}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">{app.loan_type}</span>
                          </td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{app.country || "—"}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
                            ₹{Number(app.loan_amount || 0).toLocaleString("en-IN")}
                          </td>
                          <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                            {app.date_applied ? new Date(app.date_applied).toLocaleDateString("en-IN") : "—"}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={cn("inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full", APP_STATUS_STYLES[app.status ?? "pending"])}>
                              {app.status === "approved" && <CheckCircle className="w-3 h-3" />}
                              {app.status === "rejected" && <XCircle className="w-3 h-3" />}
                              {app.status === "pending" && <Clock className="w-3 h-3" />}
                              {app.status ?? "pending"}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {app.status === "pending" && app.id ? (
                              <div className="flex gap-2">
                                <button onClick={() => updateAppStatus(app.id!, "approved")} className="text-xs px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 transition-colors font-medium">Approve</button>
                                <button onClick={() => updateAppStatus(app.id!, "rejected")} className="text-xs px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 transition-colors font-medium">Reject</button>
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
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB: CONTACT INQUIRIES
        ═══════════════════════════════════════════════════════════════ */}
        {activeTab === "inquiries" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: MessageSquare, label: "Total Inquiries", value: inqStats.total, color: "text-zinc-800 dark:text-zinc-200", bg: "bg-zinc-100 dark:bg-zinc-800" },
                { icon: Clock, label: "New", value: inqStats.newCount, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
                { icon: CheckCircle, label: "Contacted", value: inqStats.contacted, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
                { icon: XCircle, label: "Closed", value: inqStats.closed, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
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
                    value={inqSearch}
                    onChange={(e) => setInqSearch(e.target.value)}
                    placeholder="Search by name, email, or phone..."
                    className="input-field pl-10"
                  />
                </div>
                <div className="flex gap-3 flex-wrap">
                  <select value={inqStatusFilter} onChange={(e) => setInqStatusFilter(e.target.value as InquiryStatus)} className="input-field min-w-[130px]">
                    <option value="all">All Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <select value={inqSort} onChange={(e) => setInqSort(e.target.value as SortOrder)} className="input-field min-w-[150px]">
                    <option value="newest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">Contact Inquiries ({filteredInquiries.length})</span>
                </div>
              </div>

              {inqLoading ? (
                <div className="py-20 text-center">
                  <RefreshCw className="w-8 h-8 text-gray-300 animate-spin mx-auto mb-3" />
                  <p className="text-gray-400">Loading inquiries...</p>
                </div>
              ) : inqError ? (
                <div className="py-20 text-center">
                  <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                  <p className="text-red-500 font-medium">Failed to load inquiries</p>
                  <p className="text-sm text-red-400 mt-1 max-w-md mx-auto">{inqError}</p>
                </div>
              ) : filteredInquiries.length === 0 ? (
                <div className="py-20 text-center">
                  <MessageSquare className="w-10 h-10 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No inquiries found</p>
                  <p className="text-sm text-gray-300 dark:text-gray-600 mt-1">
                    {inquiries.length === 0 ? "Inquiries submitted via the Contact Us form will appear here" : "Try adjusting your filters"}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        {["Full Name", "Phone", "Email", "Country", "Message", "Date", "Status", "Actions"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInquiries.map((inq, idx) => (
                        <tr key={inq.id ?? idx} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{inq.full_name}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{inq.phone_number}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{inq.email}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{inq.country_interested}</td>
                          <td className="px-4 py-3 text-gray-500 max-w-[240px]">
                            <span className="line-clamp-2 block" title={inq.message}>{inq.message}</span>
                          </td>
                          <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                            {inq.created_at ? new Date(inq.created_at).toLocaleDateString("en-IN") : "—"}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="relative">
                              <select
                                value={inq.status ?? "New"}
                                disabled={updatingStatus === inq.id}
                                onChange={(e) => inq.id && updateInquiryStatus(inq.id, e.target.value as "New" | "Contacted" | "Closed")}
                                className={cn(
                                  "text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer appearance-none pr-6 focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-colors",
                                  INQ_STATUS_STYLES[inq.status ?? "New"]
                                )}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Closed">Closed</option>
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 opacity-60" />
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <button
                              onClick={() => setDeleteConfirm(inq.id ?? null)}
                              className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 transition-colors font-medium"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

      </div>

      {/* ─── Delete Confirmation Modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-sm border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Delete Inquiry</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                Are you sure you want to delete this inquiry? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteConfirm && deleteInquiry(deleteConfirm)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
