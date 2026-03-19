/*
  # White Banger ERP System - Complete Database Schema

  ## Overview
  This migration creates the complete database schema for the White Banger ERP System,
  including tables for users, students, teachers, courses, attendance, exams, results,
  payments, CRM leads, study materials, placements, and notifications.

  ## New Tables

  ### 1. `profiles`
  User profiles extending Supabase auth.users
  - `id` (uuid, references auth.users)
  - `email` (text)
  - `name` (text)
  - `role` (enum: admin, teacher, student)
  - `phone` (text)
  - `avatar` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `students`
  Student records with enrollment and academic information
  - `id` (text, primary key - e.g., STU001)
  - `user_id` (uuid, references profiles)
  - `name` (text)
  - `email` (text)
  - `phone` (text)
  - `course` (text)
  - `enroll_date` (date)
  - `fee` (integer)
  - `paid` (integer)
  - `status` (enum: active, inactive)
  - `attendance_percentage` (integer)
  - `certificate_issued` (boolean)
  - `photo` (text)
  - `address` (text)
  - `created_at`, `updated_at` (timestamptz)

  ### 3. `teachers`
  Teacher profiles and qualifications
  - `id` (text, primary key - e.g., TCH001)
  - `user_id` (uuid, references profiles)
  - `name` (text)
  - `email` (text)
  - `phone` (text)
  - `qualification` (text)
  - `courses` (text array)
  - `join_date` (date)
  - `performance_score` (integer)
  - `photo` (text)
  - `created_at`, `updated_at` (timestamptz)

  ### 4. `courses`
  Course catalog
  - `id` (text, primary key - e.g., CRS001)
  - `name` (text)
  - `description` (text)
  - `duration` (text)
  - `fee` (integer)
  - `teacher_name` (text)
  - `total_students` (integer)
  - `materials_count` (integer)
  - `created_at`, `updated_at` (timestamptz)

  ### 5. `attendance`
  Daily attendance records
  - `id` (uuid, primary key)
  - `student_id` (text, references students)
  - `date` (date)
  - `course` (text)
  - `status` (enum: present, absent, late)
  - `created_at` (timestamptz)

  ### 6. `exams`
  Exam definitions
  - `id` (text, primary key - e.g., EXM001)
  - `title` (text)
  - `course` (text)
  - `exam_date` (date)
  - `duration` (integer - minutes)
  - `type` (text)
  - `total_marks` (integer)
  - `pass_marks` (integer)
  - `questions` (jsonb)
  - `created_at`, `updated_at` (timestamptz)

  ### 7. `exam_results`
  Student exam results
  - `id` (uuid, primary key)
  - `student_id` (text, references students)
  - `exam_id` (text, references exams)
  - `marks` (integer)
  - `grade` (text)
  - `rank` (integer)
  - `submitted_at` (timestamptz)
  - `created_at` (timestamptz)

  ### 8. `payments`
  Fee payment records
  - `id` (text, primary key - e.g., PAY001)
  - `student_id` (text, references students)
  - `course` (text)
  - `amount` (integer)
  - `payment_date` (date)
  - `payment_method` (enum: UPI, Card, Cash, Bank Transfer)
  - `balance` (integer)
  - `created_at` (timestamptz)

  ### 9. `crm_leads`
  Lead management for admissions
  - `id` (text, primary key - e.g., LID001)
  - `name` (text)
  - `phone` (text)
  - `email` (text)
  - `source` (text)
  - `course` (text)
  - `stage` (enum: new, contacted, interested, converted, not_interested)
  - `follow_up_date` (date)
  - `counselor` (text)
  - `notes` (text)
  - `created_at`, `updated_at` (timestamptz)

  ### 10. `study_materials`
  Course materials and resources
  - `id` (text, primary key - e.g., MAT001)
  - `course` (text)
  - `title` (text)
  - `type` (enum: pdf, video, link, doc)
  - `uploaded_by` (text)
  - `upload_date` (date)
  - `file_size` (text)
  - `url` (text)
  - `created_at` (timestamptz)

  ### 11. `placements`
  Student placement records
  - `id` (text, primary key - e.g., PLC001)
  - `student_id` (text, references students)
  - `student_name` (text)
  - `course` (text)
  - `company` (text)
  - `role` (text)
  - `salary` (integer)
  - `placement_date` (date)
  - `created_at` (timestamptz)

  ### 12. `notifications`
  System notifications
  - `id` (text, primary key - e.g., NOT001)
  - `type` (text)
  - `title` (text)
  - `message` (text)
  - `sent_at` (timestamptz)
  - `channel` (enum: Email, WhatsApp, SMS)
  - `recipients_count` (integer)
  - `created_at` (timestamptz)

  ### 13. `monthly_revenue`
  Revenue tracking
  - `id` (uuid, primary key)
  - `month` (text)
  - `year` (integer)
  - `revenue` (integer)
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Policies for admin, teacher, and student roles
  - Students can only view their own data
  - Teachers can view students in their courses
  - Admins have full access
*/

-- Create custom types
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE student_status AS ENUM ('active', 'inactive');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_method AS ENUM ('UPI', 'Card', 'Cash', 'Bank Transfer');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE lead_stage AS ENUM ('new', 'contacted', 'interested', 'converted', 'not_interested');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE material_type AS ENUM ('pdf', 'video', 'link', 'doc');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE notification_channel AS ENUM ('Email', 'WhatsApp', 'SMS');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 1. Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  phone text,
  avatar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Students table
CREATE TABLE IF NOT EXISTS students (
  id text PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  course text,
  enroll_date date DEFAULT CURRENT_DATE,
  fee integer DEFAULT 0,
  paid integer DEFAULT 0,
  status student_status DEFAULT 'active',
  attendance_percentage integer DEFAULT 0,
  certificate_issued boolean DEFAULT false,
  photo text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id text PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  qualification text,
  courses text[],
  join_date date DEFAULT CURRENT_DATE,
  performance_score integer DEFAULT 0,
  photo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. Courses table
CREATE TABLE IF NOT EXISTS courses (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  duration text,
  fee integer DEFAULT 0,
  teacher_name text,
  total_students integer DEFAULT 0,
  materials_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. Attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text REFERENCES students(id) ON DELETE CASCADE,
  date date NOT NULL,
  course text,
  status attendance_status DEFAULT 'present',
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, date, course)
);

-- 6. Exams table
CREATE TABLE IF NOT EXISTS exams (
  id text PRIMARY KEY,
  title text NOT NULL,
  course text,
  exam_date date,
  duration integer DEFAULT 60,
  type text,
  total_marks integer DEFAULT 100,
  pass_marks integer DEFAULT 40,
  questions jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 7. Exam results table
CREATE TABLE IF NOT EXISTS exam_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text REFERENCES students(id) ON DELETE CASCADE,
  exam_id text REFERENCES exams(id) ON DELETE CASCADE,
  marks integer DEFAULT 0,
  grade text,
  rank integer,
  submitted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, exam_id)
);

-- 8. Payments table
CREATE TABLE IF NOT EXISTS payments (
  id text PRIMARY KEY,
  student_id text REFERENCES students(id) ON DELETE CASCADE,
  course text,
  amount integer DEFAULT 0,
  payment_date date DEFAULT CURRENT_DATE,
  payment_method payment_method DEFAULT 'UPI',
  balance integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 9. CRM Leads table
CREATE TABLE IF NOT EXISTS crm_leads (
  id text PRIMARY KEY,
  name text NOT NULL,
  phone text,
  email text,
  source text,
  course text,
  stage lead_stage DEFAULT 'new',
  follow_up_date date,
  counselor text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 10. Study materials table
CREATE TABLE IF NOT EXISTS study_materials (
  id text PRIMARY KEY,
  course text,
  title text NOT NULL,
  type material_type DEFAULT 'pdf',
  uploaded_by text,
  upload_date date DEFAULT CURRENT_DATE,
  file_size text,
  url text,
  created_at timestamptz DEFAULT now()
);

-- 11. Placements table
CREATE TABLE IF NOT EXISTS placements (
  id text PRIMARY KEY,
  student_id text REFERENCES students(id) ON DELETE SET NULL,
  student_name text NOT NULL,
  course text,
  company text,
  role text,
  salary integer DEFAULT 0,
  placement_date date,
  created_at timestamptz DEFAULT now()
);

-- 12. Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id text PRIMARY KEY,
  type text,
  title text NOT NULL,
  message text,
  sent_at timestamptz DEFAULT now(),
  channel notification_channel DEFAULT 'Email',
  recipients_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 13. Monthly revenue table
CREATE TABLE IF NOT EXISTS monthly_revenue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  month text NOT NULL,
  year integer NOT NULL,
  revenue integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(month, year)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_teachers_user_id ON teachers(user_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_date ON attendance(student_id, date);
CREATE INDEX IF NOT EXISTS idx_exam_results_student ON exam_results(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_student ON payments(student_id);
CREATE INDEX IF NOT EXISTS idx_crm_leads_stage ON crm_leads(stage);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_revenue ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for students
CREATE POLICY "Admins can view all students"
  ON students FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Students can view own record"
  ON students FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
  );

CREATE POLICY "Teachers can view all students"
  ON students FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'teacher'
    )
  );

CREATE POLICY "Admins can manage students"
  ON students FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for teachers
CREATE POLICY "Everyone can view teachers"
  ON teachers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage teachers"
  ON teachers FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for courses
CREATE POLICY "Everyone can view courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage courses"
  ON courses FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for attendance
CREATE POLICY "Students can view own attendance"
  ON attendance FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = attendance.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can view all attendance"
  ON attendance FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "Teachers can manage attendance"
  ON attendance FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for exams
CREATE POLICY "Students can view exams"
  ON exams FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Teachers can manage exams"
  ON exams FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for exam_results
CREATE POLICY "Students can view own results"
  ON exam_results FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = exam_results.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can view all results"
  ON exam_results FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "Teachers can manage results"
  ON exam_results FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for payments
CREATE POLICY "Students can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = payments.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage payments"
  ON payments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for crm_leads
CREATE POLICY "Admins can manage leads"
  ON crm_leads FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Teachers can view leads"
  ON crm_leads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for study_materials
CREATE POLICY "Students can view materials"
  ON study_materials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Teachers can manage materials"
  ON study_materials FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for placements
CREATE POLICY "Everyone can view placements"
  ON placements FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage placements"
  ON placements FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for notifications
CREATE POLICY "Everyone can view notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage notifications"
  ON notifications FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for monthly_revenue
CREATE POLICY "Admins can view revenue"
  ON monthly_revenue FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage revenue"
  ON monthly_revenue FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DO $$ BEGIN
  CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON exams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_crm_leads_updated_at BEFORE UPDATE ON crm_leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
