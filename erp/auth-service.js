// Secure Authentication Service using Supabase
import { supabase } from './supabase-client.js';

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
        .eq('id', data.user.id)
        .maybeSingle();

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
      .eq('id', user.id)
      .maybeSingle();

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
