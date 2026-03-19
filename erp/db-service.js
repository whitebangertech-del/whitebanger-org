// Database Service Layer for ERP System
import { supabase } from './supabase-client.js';

// =====================================================
// AUTHENTICATION SERVICE
// =====================================================
export const AuthService = {
  async signUp(email, password, userData) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            role: userData.role || 'student',
            phone: userData.phone
          }
        }
      });

      if (authError) throw authError;

      // Create profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          email: email,
          name: userData.name,
          role: userData.role || 'student',
          phone: userData.phone,
          avatar: userData.avatar || email.substring(0, 2).toUpperCase()
        }])
        .select()
        .single();

      if (profileError) throw profileError;

      return { user: authData.user, profile };
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      return { user: data.user, session: data.session, profile };
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async getUserProfile() {
    const user = await this.getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }
};

// =====================================================
// STUDENTS SERVICE
// =====================================================
export const StudentsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getByUserId(userId) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async create(studentData) {
    const { data, error } = await supabase
      .from('students')
      .insert([studentData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// =====================================================
// TEACHERS SERVICE
// =====================================================
export const TeachersService = {
  async getAll() {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async create(teacherData) {
    const { data, error } = await supabase
      .from('teachers')
      .insert([teacherData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('teachers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// =====================================================
// COURSES SERVICE
// =====================================================
export const CoursesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async create(courseData) {
    const { data, error } = await supabase
      .from('courses')
      .insert([courseData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// =====================================================
// ATTENDANCE SERVICE
// =====================================================
export const AttendanceService = {
  async getByStudent(studentId) {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('student_id', studentId)
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getByDate(date) {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('date', date);

    if (error) throw error;
    return data || [];
  },

  async mark(attendanceData) {
    const { data, error } = await supabase
      .from('attendance')
      .upsert([attendanceData], { onConflict: 'student_id,date,course' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async bulkMark(attendanceRecords) {
    const { data, error } = await supabase
      .from('attendance')
      .upsert(attendanceRecords, { onConflict: 'student_id,date,course' })
      .select();

    if (error) throw error;
    return data;
  }
};

// =====================================================
// EXAMS SERVICE
// =====================================================
export const ExamsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .order('exam_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getByCourse(course) {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('course', course)
      .order('exam_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(examData) {
    const { data, error } = await supabase
      .from('exams')
      .insert([examData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('exams')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// =====================================================
// EXAM RESULTS SERVICE
// =====================================================
export const ResultsService = {
  async getByStudent(studentId) {
    const { data, error } = await supabase
      .from('exam_results')
      .select(`
        *,
        exams (
          title,
          course,
          total_marks,
          exam_date
        )
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getByExam(examId) {
    const { data, error } = await supabase
      .from('exam_results')
      .select('*')
      .eq('exam_id', examId)
      .order('marks', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async submit(resultData) {
    const { data, error } = await supabase
      .from('exam_results')
      .upsert([resultData], { onConflict: 'student_id,exam_id' })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// =====================================================
// PAYMENTS SERVICE
// =====================================================
export const PaymentsService = {
  async getByStudent(studentId) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('student_id', studentId)
      .order('payment_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getAll() {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('payment_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(paymentData) {
    const { data, error } = await supabase
      .from('payments')
      .insert([paymentData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// =====================================================
// CRM LEADS SERVICE
// =====================================================
export const LeadsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('crm_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getByStage(stage) {
    const { data, error } = await supabase
      .from('crm_leads')
      .select('*')
      .eq('stage', stage)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(leadData) {
    const { data, error } = await supabase
      .from('crm_leads')
      .insert([leadData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('crm_leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// =====================================================
// STUDY MATERIALS SERVICE
// =====================================================
export const MaterialsService = {
  async getByCourse(course) {
    const { data, error } = await supabase
      .from('study_materials')
      .select('*')
      .eq('course', course)
      .order('upload_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getAll() {
    const { data, error } = await supabase
      .from('study_materials')
      .select('*')
      .order('upload_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(materialData) {
    const { data, error } = await supabase
      .from('study_materials')
      .insert([materialData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('study_materials')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// =====================================================
// PLACEMENTS SERVICE
// =====================================================
export const PlacementsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('placements')
      .select('*')
      .order('placement_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(placementData) {
    const { data, error } = await supabase
      .from('placements')
      .insert([placementData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// =====================================================
// NOTIFICATIONS SERVICE
// =====================================================
export const NotificationsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('sent_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(notificationData) {
    const { data, error } = await supabase
      .from('notifications')
      .insert([notificationData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// =====================================================
// REVENUE SERVICE
// =====================================================
export const RevenueService = {
  async getMonthlyRevenue() {
    const { data, error } = await supabase
      .from('monthly_revenue')
      .select('*')
      .order('year', { ascending: false })
      .order('month', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async upsertRevenue(month, year, revenue) {
    const { data, error } = await supabase
      .from('monthly_revenue')
      .upsert([{ month, year, revenue }], { onConflict: 'month,year' })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// Export all services
export default {
  Auth: AuthService,
  Students: StudentsService,
  Teachers: TeachersService,
  Courses: CoursesService,
  Attendance: AttendanceService,
  Exams: ExamsService,
  Results: ResultsService,
  Payments: PaymentsService,
  Leads: LeadsService,
  Materials: MaterialsService,
  Placements: PlacementsService,
  Notifications: NotificationsService,
  Revenue: RevenueService
};
