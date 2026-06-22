import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

function isConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!(url && url.startsWith("http"));
}

export function getClient(): SupabaseClient | null {
  if (!isConfigured()) return null;
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _client;
}

// Safe wrapper — falls back to local storage if not configured
export async function dbInsert(table: string, data: Record<string, unknown>) {
  const client = getClient();
  if (!client) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(table);
      const list = stored ? JSON.parse(stored) : [];
      const newRecord = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
        ...data,
        date_applied: data.date_applied || new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      list.push(newRecord);
      localStorage.setItem(table, JSON.stringify(list));
      return { data: newRecord, error: null };
    }
    return { data: null, error: new Error("Window not defined") };
  }
  return client.from(table).insert(data);
}

export async function dbSelect(table: string) {
  const client = getClient();
  if (!client) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(table);
      const list = stored ? JSON.parse(stored) : [];
      list.sort((a: any, b: any) => {
        const da = a.date_applied || a.created_at || "";
        const db = b.date_applied || b.created_at || "";
        return db.localeCompare(da);
      });
      return { data: list, error: null };
    }
    return { data: [], error: null };
  }
  return client.from(table).select("*").order("date_applied", { ascending: false });
}

export async function dbUpdate(table: string, id: string, data: Record<string, unknown>) {
  const client = getClient();
  if (!client) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(table);
      let list = stored ? JSON.parse(stored) : [];
      let updated: any = null;
      list = list.map((item: any) => {
        if (item.id === id) {
          updated = { ...item, ...data, updated_at: new Date().toISOString() };
          return updated;
        }
        return item;
      });
      localStorage.setItem(table, JSON.stringify(list));
      return { data: updated, error: null };
    }
    return { data: null, error: null };
  }
  return client.from(table).update(data).eq("id", id).select().single();
}

export type LoanApplication = {
  id?: string;
  customer_name: string;
  phone_number: string;
  email: string;
  loan_type: string;
  country?: string;
  loan_amount: string;
  date_applied?: string;
  status?: "pending" | "approved" | "rejected";
  form_data?: Record<string, unknown>;
};

export type ContactMessage = {
  id?: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  created_at?: string;
};

export type ContactInquiry = {
  id?: string;
  full_name: string;
  phone_number: string;
  email: string;
  country_interested: string;
  message: string;
  status?: "New" | "Contacted" | "Closed";
  created_at?: string;
};

export async function dbDelete(table: string, id: string) {
  const client = getClient();
  if (!client) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(table);
      let list = stored ? JSON.parse(stored) : [];
      list = list.filter((item: { id: string }) => item.id !== id);
      localStorage.setItem(table, JSON.stringify(list));
      return { error: null };
    }
    return { error: new Error("Window not defined") };
  }
  return client.from(table).delete().eq("id", id);
}
