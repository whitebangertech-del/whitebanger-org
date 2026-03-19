// Secure Authentication Service using Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = 'https://0ec90b57d6e95fcbda19832f.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw';

const supabase = createClient(supabaseUrl, supabaseKey);

export const AuthService = {
  async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      return {
        user: data.user,
        profile: profile,
        session: data.session
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    localStorage.removeItem('erp_user');
    window.location.href = 'login.html';
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    return { user, profile };
  },

  async checkAuth(requiredRole = null) {
    const currentUser = await this.getCurrentUser();

    if (!currentUser) {
      window.location.href = 'login.html';
      return null;
    }

    if (requiredRole && currentUser.profile.role !== requiredRole) {
      const roleMap = {
        admin: 'admin-dashboard.html',
        teacher: 'teacher-dashboard.html',
        student: 'student-dashboard.html'
      };
      window.location.href = roleMap[currentUser.profile.role] || 'login.html';
      return null;
    }

    return currentUser;
  }
};
