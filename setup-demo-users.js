#!/usr/bin/env node

/**
 * Setup Demo Users for ERP System
 *
 * This script creates demo users in Supabase Auth and their corresponding profiles.
 * Run this once to set up demo login credentials.
 *
 * Usage: node setup-demo-users.js
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing environment variables');
  console.error('   Please ensure .env file contains:');
  console.error('   - VITE_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role key (has admin privileges)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const demoUsers = [
  {
    email: 'admin@whitebanger.org',
    password: 'Admin@123',
    role: 'admin',
    name: 'Demo Admin',
    phone: '+91-9876543210'
  },
  {
    email: 'teacher@whitebanger.org',
    password: 'Teacher@123',
    role: 'teacher',
    name: 'Demo Teacher',
    phone: '+91-9876543211'
  },
  {
    email: 'student@whitebanger.org',
    password: 'Student@123',
    role: 'student',
    name: 'Demo Student',
    phone: '+91-9876543212'
  }
];

async function createDemoUser(userInfo) {
  console.log(`\n📝 Creating user: ${userInfo.email}`);

  try {
    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers.users.find(u => u.email === userInfo.email);

    let userId;

    if (existingUser) {
      console.log(`   ℹ️  User already exists`);
      userId = existingUser.id;
    } else {
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: userInfo.email,
        password: userInfo.password,
        email_confirm: true,
        user_metadata: {
          name: userInfo.name,
          role: userInfo.role
        }
      });

      if (authError) {
        throw authError;
      }

      userId = authData.user.id;
      console.log(`   ✅ Auth user created`);
    }

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (!existingProfile) {
      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: userInfo.email,
          name: userInfo.name,
          role: userInfo.role,
          phone: userInfo.phone
        });

      if (profileError) {
        throw profileError;
      }
      console.log(`   ✅ Profile created`);
    } else {
      console.log(`   ℹ️  Profile already exists`);
    }

    // If student, create student record
    if (userInfo.role === 'student') {
      const { data: existingStudent } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (!existingStudent) {
        const { error: studentError } = await supabase
          .from('students')
          .insert({
            id: 'STU-2024-001',
            user_id: userId,
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
            course: 'Software Development',
            enroll_date: new Date().toISOString().split('T')[0],
            fee: 50000,
            paid: 50000,
            status: 'active',
            attendance_percentage: 95,
            certificate_issued: true,
            address: '123 Demo Street, City, State, 123456'
          });

        if (studentError && studentError.code !== '23505') { // Ignore duplicate key error
          throw studentError;
        }
        console.log(`   ✅ Student record created`);
      } else {
        console.log(`   ℹ️  Student record already exists`);
      }

      // Create a demo certificate
      const { data: existingCert } = await supabase
        .from('certificates')
        .select('id')
        .eq('certificate_number', 'WB-2024-SD-00001')
        .maybeSingle();

      if (!existingCert) {
        const { error: certError } = await supabase
          .from('certificates')
          .insert({
            certificate_number: 'WB-2024-SD-00001',
            student_id: 'STU-2024-001',
            student_name: userInfo.name,
            course_id: 'SD101',
            course_name: 'Software Development',
            issue_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            grade: 'A+',
            status: 'active'
          });

        if (certError && certError.code !== '23505') {
          throw certError;
        }
        console.log(`   ✅ Demo certificate created`);
      } else {
        console.log(`   ℹ️  Certificate already exists`);
      }

      // Create demo payments
      const { data: existingPayments } = await supabase
        .from('payments')
        .select('id')
        .eq('student_id', 'STU-2024-001')
        .limit(1);

      if (!existingPayments || existingPayments.length === 0) {
        const { error: paymentError } = await supabase
          .from('payments')
          .insert([
            {
              student_id: 'STU-2024-001',
              amount: 25000,
              payment_type: 'tuition_fee',
              payment_method: 'upi',
              transaction_id: `TXN${Date.now()}`,
              status: 'completed',
              payment_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            },
            {
              student_id: 'STU-2024-001',
              amount: 25000,
              payment_type: 'tuition_fee',
              payment_method: 'card',
              transaction_id: `TXN${Date.now() + 1}`,
              status: 'completed',
              payment_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            }
          ]);

        if (paymentError) {
          throw paymentError;
        }
        console.log(`   ✅ Demo payments created`);
      } else {
        console.log(`   ℹ️  Payments already exist`);
      }
    }

    console.log(`   ✅ Success: ${userInfo.role.toUpperCase()} user ready`);
    return { success: true, userId };

  } catch (error) {
    console.error(`   ❌ Error creating ${userInfo.email}:`, error.message);
    return { success: false, error };
  }
}

async function createDemoLeads() {
  console.log(`\n📝 Creating demo CRM leads`);

  const { data: existingLeads } = await supabase
    .from('crm_leads')
    .select('id')
    .limit(1);

  if (existingLeads && existingLeads.length > 0) {
    console.log(`   ℹ️  Demo leads already exist`);
    return;
  }

  const leads = [
    {
      id: `LEAD-${Date.now()}-1`,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91-9876543213',
      course: 'Digital Marketing',
      source: 'website',
      stage: 'new',
      notes: 'Interested in weekend batch'
    },
    {
      id: `LEAD-${Date.now()}-2`,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+91-9876543214',
      course: 'UI/UX Design',
      source: 'instagram',
      stage: 'contacted',
      notes: 'Prefers online classes'
    },
    {
      id: `LEAD-${Date.now()}-3`,
      name: 'Raj Kumar',
      email: 'raj.kumar@example.com',
      phone: '+91-9876543215',
      course: 'Software Development',
      source: 'facebook',
      stage: 'new',
      notes: 'Looking for placement support'
    }
  ];

  const { error } = await supabase
    .from('crm_leads')
    .insert(leads);

  if (error && error.code !== '23505') {
    console.error(`   ❌ Error creating leads:`, error.message);
  } else {
    console.log(`   ✅ Demo leads created`);
  }
}

async function main() {
  console.log('🚀 Setting up demo users for WhiteBanger ERP\n');
  console.log('=' .repeat(50));

  const results = [];

  for (const userInfo of demoUsers) {
    const result = await createDemoUser(userInfo);
    results.push(result);
  }

  await createDemoLeads();

  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Summary:');
  console.log(`   ✅ Successful: ${results.filter(r => r.success).length}`);
  console.log(`   ❌ Failed: ${results.filter(r => !r.success).length}`);

  if (results.every(r => r.success)) {
    console.log('\n🎉 All demo users created successfully!\n');
    console.log('📝 Login Credentials:');
    console.log('   ┌─────────────────────────────────────────────┐');
    console.log('   │ ADMIN                                       │');
    console.log('   │ Email: admin@whitebanger.org                │');
    console.log('   │ Password: Admin@123                         │');
    console.log('   ├─────────────────────────────────────────────┤');
    console.log('   │ TEACHER                                     │');
    console.log('   │ Email: teacher@whitebanger.org              │');
    console.log('   │ Password: Teacher@123                       │');
    console.log('   ├─────────────────────────────────────────────┤');
    console.log('   │ STUDENT                                     │');
    console.log('   │ Email: student@whitebanger.org              │');
    console.log('   │ Password: Student@123                       │');
    console.log('   └─────────────────────────────────────────────┘\n');
    console.log('🌐 Login at: /erp/login.html\n');
  } else {
    console.log('\n⚠️  Some users failed to create. Check errors above.\n');
  }
}

main().catch(console.error);
