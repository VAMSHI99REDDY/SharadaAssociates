import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || url === "your_supabase_url_here") return null;

  // Prefer service role key (bypasses RLS), fall back to anon key
  const key = serviceKey || anonKey;
  if (!key) return null;

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

// GET — fetch all inquiries newest first
export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables." },
      { status: 503 }
    );
  }
  const { data, error } = await supabase
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// POST — insert a new inquiry
export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  const body = await req.json();
  const { data, error } = await supabase
    .from("contact_inquiries")
    .insert({
      full_name: body.full_name,
      phone_number: body.phone_number,
      email: body.email,
      country_interested: body.country_interested,
      message: body.message,
      status: "New",
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

// PATCH — update status
export async function PATCH(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  const { id, status } = await req.json();
  const { data, error } = await supabase
    .from("contact_inquiries")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE — delete an inquiry
export async function DELETE(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  const { id } = await req.json();
  const { error } = await supabase.from("contact_inquiries").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
