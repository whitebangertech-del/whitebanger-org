// Supabase Client Configuration for ERP System
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = 'https://lmucnfccvqmtmolkmlqb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtdWNuZmNjdnFtdG1vbGttbHFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTk3NjUsImV4cCI6MjA1NzI5NTc2NX0.Q-0sBfuCdZxwG1oF_s_wv_bCh0FFW3gZlSwCDGQGweo';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Real-time subscription manager
export class RealtimeManager {
  constructor() {
    this.subscriptions = new Map();
  }

  subscribe(table, callback) {
    const channel = supabase
      .channel(`${table}-changes`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: table },
        (payload) => {
          console.log(`${table} change:`, payload);
          callback(payload);
        }
      )
      .subscribe();

    this.subscriptions.set(table, channel);
    return channel;
  }

  unsubscribe(table) {
    const channel = this.subscriptions.get(table);
    if (channel) {
      supabase.removeChannel(channel);
      this.subscriptions.delete(table);
    }
  }

  unsubscribeAll() {
    this.subscriptions.forEach((channel) => {
      supabase.removeChannel(channel);
    });
    this.subscriptions.clear();
  }
}

// Export singleton instance
export const realtimeManager = new RealtimeManager();

// Helper to check if user is authenticated
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  return user;
}

// Helper to get user profile with role
export async function getUserProfile(userId = null) {
  try {
    const uid = userId || (await getCurrentUser())?.id;
    if (!uid) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

// Helper to check user role
export async function checkUserRole(requiredRole) {
  const profile = await getUserProfile();
  return profile && profile.role === requiredRole;
}

export default supabase;
