// Central Configuration Management
export const Config = {
  app: {
    name: 'White Banger',
    version: '1.0.0',
    description: 'India\'s No.1 Skill Development Platform'
  },

  supabase: {
    url: 'https://0ec90b57d6e95fcbda19832f.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw'
  },

  contact: {
    phone: '+91 97283-20132',
    whatsapp: '919728320132',
    email: 'prikshit@whitebanger.org'
  },

  features: {
    enableAnalytics: false,
    enableChat: true,
    enableNotifications: true,
    lazyLoadImages: true,
    enablePWA: false
  },

  performance: {
    imageOptimization: true,
    lazyLoad: true,
    minifyAssets: true
  }
};
