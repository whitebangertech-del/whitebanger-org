// Seed Data Migration Script
// Run this to populate the database with initial demo data

import { supabase } from './supabase-client.js';

const SEED_DATA = {
  courses: [
    { id: 'CRS001', name: 'Digital Marketing', description: 'SEO, SEM, Social Media, Email Marketing, Analytics', duration: '6 months', fee: 25000, teacher_name: 'Ravi Kumar', total_students: 42, materials_count: 18 },
    { id: 'CRS002', name: 'AI & Automation', description: 'Machine Learning, ChatGPT, n8n Automation, AI Tools', duration: '4 months', fee: 30000, teacher_name: 'Ravi Kumar', total_students: 28, materials_count: 22 },
    { id: 'CRS003', name: 'Banking & Finance', description: 'Stock Market, Taxation, CA Foundation, BFSI Sector', duration: '6 months', fee: 20000, teacher_name: 'Sunita Devi', total_students: 35, materials_count: 14 },
    { id: 'CRS004', name: 'Software Development', description: 'Python, Full Stack, Django, React, Machine Learning', duration: '8 months', fee: 35000, teacher_name: 'Aakash Pandey', total_students: 31, materials_count: 26 },
    { id: 'CRS005', name: 'Cloud Management', description: 'AWS, Azure, GCP, DevOps, Docker, Kubernetes', duration: '4 months', fee: 32000, teacher_name: 'Aakash Pandey', total_students: 19, materials_count: 20 },
    { id: 'CRS006', name: 'UI/UX Design', description: 'Figma, Wireframing, Prototyping, User Research, Usability', duration: '5 months', fee: 22000, teacher_name: 'Meera Nair', total_students: 24, materials_count: 15 },
    { id: 'CRS007', name: 'Graphic Design', description: 'Photoshop, Illustrator, Typography, Brand Identity', duration: '4 months', fee: 18000, teacher_name: 'Meera Nair', total_students: 22, materials_count: 16 },
    { id: 'CRS008', name: 'Web Development', description: 'HTML, CSS, JavaScript, React, Node.js, MongoDB', duration: '6 months', fee: 28000, teacher_name: 'Rohan Bhatt', total_students: 38, materials_count: 24 },
  ],

  students: [
    { id: 'STU001', name: 'Elite Student', email: 'student@gmail.com', phone: '+91 91234 56789', course: 'Digital Marketing', enroll_date: '2025-01-15', fee: 25000, paid: 25000, status: 'active', attendance_percentage: 88, certificate_issued: true, photo: 'ST', address: 'Delhi' },
    { id: 'STU002', name: 'Amit Singh', email: 'amit@student.wb.com', phone: '+91 90001 11222', course: 'AI & Automation', enroll_date: '2025-02-01', fee: 30000, paid: 20000, status: 'active', attendance_percentage: 76, certificate_issued: false, photo: 'AS', address: 'Noida' },
    { id: 'STU003', name: 'Pooja Sharma', email: 'pooja@student.wb.com', phone: '+91 88001 22333', course: 'UI/UX Design', enroll_date: '2025-01-20', fee: 22000, paid: 22000, status: 'active', attendance_percentage: 95, certificate_issued: true, photo: 'PS', address: 'Gurgaon' },
    { id: 'STU004', name: 'Rahul Gupta', email: 'rahul@student.wb.com', phone: '+91 77001 33444', course: 'Banking & Finance', enroll_date: '2025-03-01', fee: 20000, paid: 5000, status: 'active', attendance_percentage: 62, certificate_issued: false, photo: 'RG', address: 'Faridabad' },
    { id: 'STU005', name: 'Neha Patel', email: 'neha@student.wb.com', phone: '+91 66001 44555', course: 'Software Development', enroll_date: '2025-02-15', fee: 35000, paid: 35000, status: 'active', attendance_percentage: 91, certificate_issued: true, photo: 'NP', address: 'Chandigarh' },
  ],

  teachers: [
    { id: 'TCH001', name: 'Master Teacher', email: 'teacher@gmail.com', phone: '+91 98765 43210', qualification: 'MBA, Google Certified', courses: ['Digital Marketing', 'AI & Automation'], join_date: '2024-06-01', performance_score: 92, photo: 'TR' },
    { id: 'TCH002', name: 'Sunita Devi', email: 'sunita@whitebanger.com', phone: '+91 87654 32109', qualification: 'B.Com, CFA Level 2', courses: ['Banking & Finance'], join_date: '2024-07-15', performance_score: 88, photo: 'SD' },
    { id: 'TCH003', name: 'Aakash Pandey', email: 'aakash@whitebanger.com', phone: '+91 76543 21098', qualification: 'B.Tech, AWS Certified', courses: ['Software Development', 'Cloud Management'], join_date: '2024-08-01', performance_score: 95, photo: 'AP' },
  ],

  materials: [
    { id: 'MAT001', course: 'Digital Marketing', title: 'Module 1 - SEO Basics', type: 'pdf', uploaded_by: 'Ravi Kumar', upload_date: '2026-02-01', file_size: '2.4 MB', url: '#' },
    { id: 'MAT002', course: 'Digital Marketing', title: 'Module 2 - Social Media Ads', type: 'pdf', uploaded_by: 'Ravi Kumar', upload_date: '2026-02-08', file_size: '3.1 MB', url: '#' },
    { id: 'MAT003', course: 'AI & Automation', title: 'Intro to ChatGPT Prompting', type: 'pdf', uploaded_by: 'Ravi Kumar', upload_date: '2026-02-10', file_size: '1.8 MB', url: '#' },
    { id: 'MAT004', course: 'UI/UX Design', title: 'Figma Essentials Handbook', type: 'pdf', uploaded_by: 'Meera Nair', upload_date: '2026-01-25', file_size: '2.9 MB', url: '#' },
  ],

  placements: [
    { id: 'PLC001', student_id: 'STU001', student_name: 'Elite Student', course: 'Digital Marketing', company: 'Publicis Sapient', role: 'Digital Marketing Executive', salary: 420000, placement_date: '2025-12-15' },
    { id: 'PLC002', student_id: 'STU003', student_name: 'Pooja Sharma', course: 'UI/UX Design', company: 'Infosys BPM', role: 'UI Designer', salary: 380000, placement_date: '2026-01-10' },
    { id: 'PLC003', student_id: 'STU005', student_name: 'Neha Patel', course: 'Software Development', company: 'TCS', role: 'Software Engineer', salary: 550000, placement_date: '2026-02-01' },
  ],

  monthlyRevenue: [
    { month: 'Jan', year: 2026, revenue: 820000 },
    { month: 'Feb', year: 2026, revenue: 760000 },
    { month: 'Mar', year: 2026, revenue: 540000 },
  ]
};

export async function seedDatabase() {
  console.log('Starting database seed...');

  try {
    // Seed courses
    console.log('Seeding courses...');
    const { error: coursesError } = await supabase
      .from('courses')
      .upsert(SEED_DATA.courses, { onConflict: 'id' });
    if (coursesError) throw coursesError;
    console.log('✓ Courses seeded');

    // Seed students
    console.log('Seeding students...');
    const { error: studentsError } = await supabase
      .from('students')
      .upsert(SEED_DATA.students, { onConflict: 'id' });
    if (studentsError) throw studentsError;
    console.log('✓ Students seeded');

    // Seed teachers
    console.log('Seeding teachers...');
    const { error: teachersError } = await supabase
      .from('teachers')
      .upsert(SEED_DATA.teachers, { onConflict: 'id' });
    if (teachersError) throw teachersError;
    console.log('✓ Teachers seeded');

    // Seed materials
    console.log('Seeding study materials...');
    const { error: materialsError } = await supabase
      .from('study_materials')
      .upsert(SEED_DATA.materials, { onConflict: 'id' });
    if (materialsError) throw materialsError;
    console.log('✓ Study materials seeded');

    // Seed placements
    console.log('Seeding placements...');
    const { error: placementsError } = await supabase
      .from('placements')
      .upsert(SEED_DATA.placements, { onConflict: 'id' });
    if (placementsError) throw placementsError;
    console.log('✓ Placements seeded');

    // Seed monthly revenue
    console.log('Seeding revenue data...');
    const { error: revenueError } = await supabase
      .from('monthly_revenue')
      .upsert(SEED_DATA.monthlyRevenue, { onConflict: 'month,year' });
    if (revenueError) throw revenueError;
    console.log('✓ Revenue data seeded');

    console.log('✅ Database seeding completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Auto-run if script is executed directly
if (typeof window !== 'undefined') {
  window.seedDatabase = seedDatabase;
}

export default seedDatabase;
