/*
  # Add Certificates Table

  ## Overview
  This migration adds the missing certificates table for certificate verification functionality.

  ## New Tables
  
  ### 1. certificates
  - `id` (uuid, primary key) - Certificate unique identifier
  - `certificate_number` (text, unique) - Human-readable certificate number for verification
  - `student_id` (text, foreign key) - References students table
  - `student_name` (text) - Student name on certificate
  - `course_id` (text, nullable) - Course code
  - `course_name` (text) - Course name on certificate
  - `issue_date` (date) - Date certificate was issued
  - `valid_until` (date, nullable) - Expiry date if applicable
  - `grade` (text) - Final grade/result
  - `status` (text) - active, revoked, expired
  - `qr_code_url` (text, nullable) - QR code image URL for verification
  - `pdf_url` (text, nullable) - Link to downloadable certificate PDF
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - RLS enabled on certificates table
  - Students can view own certificates
  - Teachers can view all certificates
  - Admins can manage all certificates
  - Public (anonymous users) can verify certificates by certificate_number (read-only)

  ## Important Notes
  - Certificates table supports public verification for authenticity checks
  - QR code and PDF URL fields ready for future enhancements
  - Status field allows for certificate revocation if fraud detected
  - Includes proper indexes for fast lookups by certificate number
*/

-- ============================================================================
-- 1. CREATE CERTIFICATES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_number text UNIQUE NOT NULL,
  student_id text REFERENCES public.students(id) ON DELETE CASCADE,
  student_name text NOT NULL,
  course_id text,
  course_name text NOT NULL,
  issue_date date NOT NULL DEFAULT CURRENT_DATE,
  valid_until date,
  grade text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired')),
  qr_code_url text,
  pdf_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 2. ADD INDEXES FOR PERFORMANCE
-- ============================================================================

-- Index for quick lookups by certificate number (primary use case)
CREATE INDEX IF NOT EXISTS idx_certificates_number 
ON public.certificates(certificate_number);

-- Index for student lookups
CREATE INDEX IF NOT EXISTS idx_certificates_student_id 
ON public.certificates(student_id);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_certificates_status 
ON public.certificates(status);

-- ============================================================================
-- 3. ADD UPDATED_AT TRIGGER
-- ============================================================================

DROP TRIGGER IF EXISTS update_certificates_updated_at ON public.certificates;
CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON public.certificates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- 4. ENABLE RLS ON CERTIFICATES TABLE
-- ============================================================================

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Public (anonymous) can verify active certificates by certificate number
CREATE POLICY "Anyone can verify active certificates"
  ON public.certificates FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

-- Students can view their own certificates
CREATE POLICY "Students can view own certificates"
  ON public.certificates FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM public.students 
      WHERE user_id = (select auth.uid())
    )
  );

-- Teachers can view all certificates
CREATE POLICY "Teachers can view all certificates"
  ON public.certificates FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'teacher'
    )
  );

-- Admins can manage all certificates (create, update, delete)
CREATE POLICY "Admins can manage certificates"
  ON public.certificates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'admin'
    )
  );
