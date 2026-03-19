/*
  # Fix Database Security and Performance Issues

  ## Overview
  This migration addresses critical security and performance issues identified by Supabase.

  ## Changes Made

  ### 1. Missing Foreign Key Indexes (Performance)
  - Add index on `exam_results.exam_id`
  - Add index on `placements.student_id`

  ### 2. RLS Auth Function Optimization (Performance at Scale)
  All RLS policies updated to use `(select auth.uid())` instead of `auth.uid()` 
  to prevent re-evaluation for each row. This significantly improves query performance.
  
  Tables affected:
  - profiles (2 policies)
  - students (4 policies)
  - teachers (1 policy)
  - attendance (3 policies)
  - exams (1 policy)
  - exam_results (3 policies)
  - payments (3 policies)
  - study_materials (1 policy)
  - placements (1 policy)
  - notifications (1 policy)
  - monthly_revenue (2 policies)
  - courses (1 policy)
  - crm_leads (2 policies)

  ### 3. Function Search Path Fix (Security)
  - Fix `update_updated_at_column()` function to have immutable search_path

  ## Security Notes
  - All RLS policies remain functionally identical but now execute more efficiently
  - Auth function calls are now evaluated once per query instead of once per row
  - This prevents performance degradation as tables grow in size
*/

-- ============================================================================
-- 1. ADD MISSING FOREIGN KEY INDEXES
-- ============================================================================

-- Index for exam_results.exam_id foreign key
CREATE INDEX IF NOT EXISTS idx_exam_results_exam_id 
ON public.exam_results(exam_id);

-- Index for placements.student_id foreign key
CREATE INDEX IF NOT EXISTS idx_placements_student_id 
ON public.placements(student_id);

-- ============================================================================
-- 2. OPTIMIZE RLS POLICIES - PROFILES TABLE
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Recreate with optimized auth function calls
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()));

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

-- ============================================================================
-- 3. OPTIMIZE RLS POLICIES - STUDENTS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Students can view own record" ON public.students;
DROP POLICY IF EXISTS "Admins can view all students" ON public.students;
DROP POLICY IF EXISTS "Teachers can view all students" ON public.students;
DROP POLICY IF EXISTS "Admins can manage students" ON public.students;

CREATE POLICY "Students can view own record"
  ON public.students FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Admins can view all students"
  ON public.students FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'admin'
    )
  );

CREATE POLICY "Teachers can view all students"
  ON public.students FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'teacher'
    )
  );

CREATE POLICY "Admins can manage students"
  ON public.students FOR ALL
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

-- ============================================================================
-- 4. OPTIMIZE RLS POLICIES - TEACHERS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admins can manage teachers" ON public.teachers;

CREATE POLICY "Admins can manage teachers"
  ON public.teachers FOR ALL
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

-- ============================================================================
-- 5. OPTIMIZE RLS POLICIES - ATTENDANCE TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Students can view own attendance" ON public.attendance;
DROP POLICY IF EXISTS "Teachers can view all attendance" ON public.attendance;
DROP POLICY IF EXISTS "Teachers can manage attendance" ON public.attendance;

CREATE POLICY "Students can view own attendance"
  ON public.attendance FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM public.students 
      WHERE user_id = (select auth.uid())
    )
  );

CREATE POLICY "Teachers can view all attendance"
  ON public.attendance FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'teacher'
    )
  );

CREATE POLICY "Teachers can manage attendance"
  ON public.attendance FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'teacher'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'teacher'
    )
  );

-- ============================================================================
-- 6. OPTIMIZE RLS POLICIES - EXAMS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Teachers can manage exams" ON public.exams;

CREATE POLICY "Teachers can manage exams"
  ON public.exams FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'teacher'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'teacher'
    )
  );

-- ============================================================================
-- 7. OPTIMIZE RLS POLICIES - EXAM_RESULTS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Students can view own results" ON public.exam_results;
DROP POLICY IF EXISTS "Teachers can view all results" ON public.exam_results;
DROP POLICY IF EXISTS "Teachers can manage results" ON public.exam_results;

CREATE POLICY "Students can view own results"
  ON public.exam_results FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM public.students 
      WHERE user_id = (select auth.uid())
    )
  );

CREATE POLICY "Teachers can view all results"
  ON public.exam_results FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'teacher'
    )
  );

CREATE POLICY "Teachers can manage results"
  ON public.exam_results FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'teacher'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'teacher'
    )
  );

-- ============================================================================
-- 8. OPTIMIZE RLS POLICIES - PAYMENTS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Students can view own payments" ON public.payments;
DROP POLICY IF EXISTS "Admins can view all payments" ON public.payments;
DROP POLICY IF EXISTS "Admins can manage payments" ON public.payments;

CREATE POLICY "Students can view own payments"
  ON public.payments FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM public.students 
      WHERE user_id = (select auth.uid())
    )
  );

CREATE POLICY "Admins can view all payments"
  ON public.payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage payments"
  ON public.payments FOR ALL
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

-- ============================================================================
-- 9. OPTIMIZE RLS POLICIES - STUDY_MATERIALS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Teachers can manage materials" ON public.study_materials;

CREATE POLICY "Teachers can manage materials"
  ON public.study_materials FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'teacher'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'teacher'
    )
  );

-- ============================================================================
-- 10. OPTIMIZE RLS POLICIES - PLACEMENTS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admins can manage placements" ON public.placements;

CREATE POLICY "Admins can manage placements"
  ON public.placements FOR ALL
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

-- ============================================================================
-- 11. OPTIMIZE RLS POLICIES - NOTIFICATIONS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admins can manage notifications" ON public.notifications;

CREATE POLICY "Admins can manage notifications"
  ON public.notifications FOR ALL
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

-- ============================================================================
-- 12. OPTIMIZE RLS POLICIES - MONTHLY_REVENUE TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admins can view revenue" ON public.monthly_revenue;
DROP POLICY IF EXISTS "Admins can manage revenue" ON public.monthly_revenue;

CREATE POLICY "Admins can view revenue"
  ON public.monthly_revenue FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage revenue"
  ON public.monthly_revenue FOR ALL
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

-- ============================================================================
-- 13. OPTIMIZE RLS POLICIES - COURSES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admins can manage courses" ON public.courses;

CREATE POLICY "Admins can manage courses"
  ON public.courses FOR ALL
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

-- ============================================================================
-- 14. OPTIMIZE RLS POLICIES - CRM_LEADS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admins can manage leads" ON public.crm_leads;
DROP POLICY IF EXISTS "Teachers can view leads" ON public.crm_leads;

CREATE POLICY "Admins can manage leads"
  ON public.crm_leads FOR ALL
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

CREATE POLICY "Teachers can view leads"
  ON public.crm_leads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = (select auth.uid()) AND role = 'teacher'
    )
  );

-- ============================================================================
-- 15. FIX FUNCTION SEARCH PATH (Security Fix)
-- ============================================================================

-- Drop and recreate the function with secure search_path
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Re-add the triggers that use this function
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN 
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    AND EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = tables.table_name 
      AND column_name = 'updated_at'
    )
  LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS update_%I_updated_at ON public.%I;
      CREATE TRIGGER update_%I_updated_at
        BEFORE UPDATE ON public.%I
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    ', r.table_name, r.table_name, r.table_name, r.table_name);
  END LOOP;
END $$;
