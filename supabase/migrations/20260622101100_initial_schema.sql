-- SharadaAssociates Supabase Database Schema
-- Run this in the Supabase SQL Editor

-- Loan Applications Table
CREATE TABLE IF NOT EXISTS loan_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  loan_type TEXT NOT NULL,
  country TEXT,
  loan_amount TEXT,
  date_applied TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  form_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies: Allow insert for everyone (public form submissions)
DROP POLICY IF EXISTS "Allow public insert" ON loan_applications;
CREATE POLICY "Allow public insert" ON loan_applications
  FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public insert messages" ON contact_messages;
CREATE POLICY "Allow public insert messages" ON contact_messages
  FOR INSERT TO anon WITH CHECK (true);

-- Policies: Allow select/update for authenticated (admin)
DROP POLICY IF EXISTS "Allow authenticated read" ON loan_applications;
CREATE POLICY "Allow authenticated read" ON loan_applications
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated update" ON loan_applications;
CREATE POLICY "Allow authenticated update" ON loan_applications
  FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated read messages" ON contact_messages;
CREATE POLICY "Allow authenticated read messages" ON contact_messages
  FOR SELECT TO authenticated USING (true);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_loan_applications_status ON loan_applications(status);
CREATE INDEX IF NOT EXISTS idx_loan_applications_loan_type ON loan_applications(loan_type);
CREATE INDEX IF NOT EXISTS idx_loan_applications_date ON loan_applications(date_applied DESC);

-- ============================================================
-- Contact Inquiries Table (from Contact Us form)
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  country_interested TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Public can insert (contact form submissions)
DROP POLICY IF EXISTS "Allow public insert inquiries" ON contact_inquiries;
CREATE POLICY "Allow public insert inquiries" ON contact_inquiries
  FOR INSERT TO anon WITH CHECK (true);

-- Authenticated (admin) can read, update, delete
DROP POLICY IF EXISTS "Allow authenticated read inquiries" ON contact_inquiries;
CREATE POLICY "Allow authenticated read inquiries" ON contact_inquiries
  FOR SELECT TO authenticated USING (true);

-- Also allow anon to read (for API route using anon key as fallback)
DROP POLICY IF EXISTS "Allow anon read inquiries" ON contact_inquiries;
CREATE POLICY "Allow anon read inquiries" ON contact_inquiries
  FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Allow authenticated update inquiries" ON contact_inquiries;
CREATE POLICY "Allow authenticated update inquiries" ON contact_inquiries
  FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated delete inquiries" ON contact_inquiries;
CREATE POLICY "Allow authenticated delete inquiries" ON contact_inquiries
  FOR DELETE TO authenticated USING (true);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created ON contact_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);
