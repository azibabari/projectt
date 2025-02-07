/*
  # RiceVest Investment Tables

  1. New Tables
    - `investment_packages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `rice_type` (text)
      - `weight_kg` (integer)
      - `investment_amount` (integer)
      - `duration_months` (integer)
      - `roi_percentage` (numeric)
      - `available_units` (integer)
      - `created_at` (timestamptz)
      - `active` (boolean)

    - `investments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `package_id` (uuid, references investment_packages)
      - `amount_invested` (integer)
      - `units` (integer)
      - `start_date` (timestamptz)
      - `maturity_date` (timestamptz)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create investment_packages table
CREATE TABLE IF NOT EXISTS investment_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  rice_type text NOT NULL,
  weight_kg integer NOT NULL,
  investment_amount integer NOT NULL,
  duration_months integer NOT NULL,
  roi_percentage numeric NOT NULL,
  available_units integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  active boolean DEFAULT true
);

-- Create investments table
CREATE TABLE IF NOT EXISTS investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  package_id uuid REFERENCES investment_packages(id) NOT NULL,
  amount_invested integer NOT NULL,
  units integer NOT NULL,
  start_date timestamptz DEFAULT now(),
  maturity_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE investment_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;

-- Policies for investment_packages
CREATE POLICY "Anyone can view active investment packages"
  ON investment_packages FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can insert investment packages"
  ON investment_packages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT id FROM profiles WHERE email LIKE '%@azfaeats.com'
  ));

-- Policies for investments
CREATE POLICY "Users can view own investments"
  ON investments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create investments"
  ON investments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert some initial investment packages
INSERT INTO investment_packages (
  name,
  description,
  rice_type,
  weight_kg,
  investment_amount,
  duration_months,
  roi_percentage,
  available_units
) VALUES
(
  'Premium Ofada Starter',
  'Start your rice investment journey with our premium Ofada rice package. Perfect for small investors.',
  'Ofada',
  25,
  50000,
  3,
  15,
  100
),
(
  'Jasmine Gold',
  'Medium-term investment in premium Jasmine rice with attractive returns.',
  'Jasmine',
  50,
  100000,
  6,
  25,
  50
),
(
  'Rice Baron',
  'High-yield investment package for serious investors. Includes premium foreign rice varieties.',
  'Mixed Premium',
  100,
  250000,
  12,
  40,
  25
);