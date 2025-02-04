/*
  # Create contact form table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `company` (text)
      - `message` (text)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for authenticated users to read submissions
    - Add policy for anon users to insert submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);