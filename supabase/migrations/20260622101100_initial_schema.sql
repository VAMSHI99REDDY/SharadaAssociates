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
