// =========================================================
//  WHITE BANGER ERP — MOCK DATA
// =========================================================

const ERP_DATA = {

  // ---- USERS / AUTH ----
  users: [
    { id: 'admin',   name: 'System Admin',     email: 'admin@gmail.com',   password: '123', role: 'admin',   avatar: 'AD', phone: '+91 97283 20132' },
    { id: 'teacher', name: 'Master Teacher',   email: 'teacher@gmail.com', password: '123', role: 'teacher', avatar: 'TR', phone: '+91 98765 43210' },
    { id: 'student', name: 'Elite Student',    email: 'student@gmail.com', password: '123', role: 'student', avatar: 'ST', phone: '+91 91234 56789' },
  ],

  // ---- STUDENTS ----
  students: [
    { id: 'STU001', name: 'Elite Student',  email: 'student@gmail.com',  phone: '+91 91234 56789', course: 'Digital Marketing',     enrollDate: '2025-01-15', fee: 25000, paid: 25000, status: 'active',   attendance: 88, cert: true,  photo: 'ST', address: 'Delhi' },
    { id: 'STU002', name: 'Amit Singh',     email: 'amit@student.wb.com',    phone: '+91 90001 11222', course: 'AI & Automation',        enrollDate: '2025-02-01', fee: 30000, paid: 20000, status: 'active',   attendance: 76, cert: false, photo: 'AS', address: 'Noida' },
    { id: 'STU003', name: 'Pooja Sharma',   email: 'pooja@student.wb.com',   phone: '+91 88001 22333', course: 'UI/UX Design',           enrollDate: '2025-01-20', fee: 22000, paid: 22000, status: 'active',   attendance: 95, cert: true,  photo: 'PS', address: 'Gurgaon' },
    { id: 'STU004', name: 'Rahul Gupta',    email: 'rahul@student.wb.com',   phone: '+91 77001 33444', course: 'Banking & Finance',      enrollDate: '2025-03-01', fee: 20000, paid:  5000, status: 'active',   attendance: 62, cert: false, photo: 'RG', address: 'Faridabad' },
    { id: 'STU005', name: 'Neha Patel',     email: 'neha@student.wb.com',    phone: '+91 66001 44555', course: 'Software Development',   enrollDate: '2025-02-15', fee: 35000, paid: 35000, status: 'active',   attendance: 91, cert: true,  photo: 'NP', address: 'Chandigarh' },
    { id: 'STU006', name: 'Karan Mehta',    email: 'karan@student.wb.com',   phone: '+91 55001 55666', course: 'Graphic Design',         enrollDate: '2025-01-10', fee: 18000, paid: 18000, status: 'inactive', attendance: 45, cert: false, photo: 'KM', address: 'Ludhiana' },
    { id: 'STU007', name: 'Divya Rao',      email: 'divya@student.wb.com',   phone: '+91 44001 66777', course: 'Digital Marketing',     enrollDate: '2025-03-05', fee: 25000, paid: 12500, status: 'active',   attendance: 80, cert: false, photo: 'DR', address: 'Bangalore' },
    { id: 'STU008', name: 'Vikram Joshi',   email: 'vikram@student.wb.com',  phone: '+91 33001 77888', course: 'Web Development',        enrollDate: '2025-02-20', fee: 28000, paid: 28000, status: 'active',   attendance: 85, cert: false, photo: 'VJ', address: 'Hyderabad' },
    { id: 'STU009', name: 'Priya Mishra',   email: 'priya@student.wb.com',   phone: '+91 22001 88999', course: 'Cloud Management',       enrollDate: '2025-01-25', fee: 32000, paid: 16000, status: 'active',   attendance: 72, cert: false, photo: 'PM', address: 'Pune' },
    { id: 'STU010', name: 'Arjun Kapoor',   email: 'arjun@student.wb.com',   phone: '+91 11001 99000', course: 'AI & Automation',        enrollDate: '2025-03-10', fee: 30000, paid: 30000, status: 'active',   attendance: 93, cert: false, photo: 'AK', address: 'Mumbai' },
  ],

  // ---- TEACHERS ----
  teachers: [
    { id: 'TCH001', name: 'Master Teacher',  email: 'teacher@gmail.com',  phone: '+91 98765 43210', qualification: 'MBA, Google Certified', courses: ['Digital Marketing', 'AI & Automation'], joinDate: '2024-06-01', performance: 92, photo: 'TR' },
    { id: 'TCH002', name: 'Sunita Devi',     email: 'sunita@whitebanger.com', phone: '+91 87654 32109', qualification: 'B.Com, CFA Level 2',    courses: ['Banking & Finance'],                   joinDate: '2024-07-15', performance: 88, photo: 'SD' },
    { id: 'TCH003', name: 'Aakash Pandey',   email: 'aakash@whitebanger.com', phone: '+91 76543 21098', qualification: 'B.Tech, AWS Certified',  courses: ['Software Development', 'Cloud Management'], joinDate: '2024-08-01', performance: 95, photo: 'AP' },
    { id: 'TCH004', name: 'Meera Nair',      email: 'meera@whitebanger.com',  phone: '+91 65432 10987', qualification: 'MFA, Figma Expert',      courses: ['UI/UX Design', 'Graphic Design'],     joinDate: '2024-09-01', performance: 91, photo: 'MN' },
    { id: 'TCH005', name: 'Rohan Bhatt',     email: 'rohan@whitebanger.com',  phone: '+91 54321 09876', qualification: 'BCA, Full Stack Dev',    courses: ['Web Development'],                    joinDate: '2024-10-01', performance: 87, photo: 'RB' },
  ],

  // ---- COURSES ----
  courses: [
    { id: 'CRS001', name: 'Digital Marketing',   desc: 'SEO, SEM, Social Media, Email Marketing, Analytics',     duration: '6 months',  fee: 25000, teacher: 'Ravi Kumar',    students: 42, materials: 18 },
    { id: 'CRS002', name: 'AI & Automation',     desc: 'Machine Learning, ChatGPT, n8n Automation, AI Tools',     duration: '4 months',  fee: 30000, teacher: 'Ravi Kumar',    students: 28, materials: 22 },
    { id: 'CRS003', name: 'Banking & Finance',   desc: 'Stock Market, Taxation, CA Foundation, BFSI Sector',     duration: '6 months',  fee: 20000, teacher: 'Sunita Devi',   students: 35, materials: 14 },
    { id: 'CRS004', name: 'Software Development',desc: 'Python, Full Stack, Django, React, Machine Learning',     duration: '8 months',  fee: 35000, teacher: 'Aakash Pandey', students: 31, materials: 26 },
    { id: 'CRS005', name: 'Cloud Management',    desc: 'AWS, Azure, GCP, DevOps, Docker, Kubernetes',             duration: '4 months',  fee: 32000, teacher: 'Aakash Pandey', students: 19, materials: 20 },
    { id: 'CRS006', name: 'UI/UX Design',        desc: 'Figma, Wireframing, Prototyping, User Research, Usability', duration: '5 months', fee: 22000, teacher: 'Meera Nair',    students: 24, materials: 15 },
    { id: 'CRS007', name: 'Graphic Design',      desc: 'Photoshop, Illustrator, Typography, Brand Identity',      duration: '4 months',  fee: 18000, teacher: 'Meera Nair',    students: 22, materials: 16 },
    { id: 'CRS008', name: 'Web Development',     desc: 'HTML, CSS, JavaScript, React, Node.js, MongoDB',          duration: '6 months',  fee: 28000, teacher: 'Rohan Bhatt',   students: 38, materials: 24 },
  ],

  // ---- ATTENDANCE ----
  attendance: [
    { studentId: 'STU001', date: '2026-03-16', course: 'Digital Marketing',   status: 'present' },
    { studentId: 'STU002', date: '2026-03-16', course: 'AI & Automation',     status: 'absent'  },
    { studentId: 'STU003', date: '2026-03-16', course: 'UI/UX Design',        status: 'present' },
    { studentId: 'STU004', date: '2026-03-16', course: 'Banking & Finance',   status: 'present' },
    { studentId: 'STU005', date: '2026-03-16', course: 'Software Development', status: 'present' },
    { studentId: 'STU006', date: '2026-03-16', course: 'Graphic Design',      status: 'absent'  },
    { studentId: 'STU007', date: '2026-03-16', course: 'Digital Marketing',   status: 'present' },
    { studentId: 'STU008', date: '2026-03-16', course: 'Web Development',     status: 'present' },
    { studentId: 'STU009', date: '2026-03-16', course: 'Cloud Management',    status: 'late'    },
    { studentId: 'STU010', date: '2026-03-16', course: 'AI & Automation',     status: 'present' },
  ],

  // ---- EXAMS ----
  exams: [
    {
      id: 'EXM001', title: 'Digital Marketing Mid Term', course: 'Digital Marketing',
      date: '2026-03-20', duration: 60, type: 'MCQ', totalMarks: 100, passMark: 40,
      questions: [
        { q: 'What does SEO stand for?', options: ['Search Engine Optimization','Search Engine Operation','Site Engine Optimization','Social Engagement Optimization'], answer: 0 },
        { q: 'Which tool is used for keyword research?', options: ['Photoshop','Google Analytics','SEMrush','Canva'], answer: 2 },
        { q: 'What is CTR?', options: ['Click Through Rate','Cost To Revenue','Conversion Track Record','Current Traffic Rate'], answer: 0 },
        { q: 'Which platform is best for B2B marketing?', options: ['Instagram','TikTok','LinkedIn','Pinterest'], answer: 2 },
        { q: 'What is a backlink?', options: ['A broken link','A link from another site to yours','An internal link','A paid advertisement'], answer: 1 },
      ]
    },
    {
      id: 'EXM002', title: 'AI & Automation Final', course: 'AI & Automation',
      date: '2026-03-25', duration: 90, type: 'MCQ', totalMarks: 100, passMark: 40,
      questions: [
        { q: 'What does AI stand for?', options: ['Automated Interface','Artificial Intelligence','Advanced Integration','Applied Informatics'], answer: 1 },
        { q: 'Which company created ChatGPT?', options: ['Google','Meta','OpenAI','Microsoft'], answer: 2 },
        { q: 'What is n8n used for?', options: ['Photo Editing','Workflow Automation','Database Management','Video Editing'], answer: 1 },
        { q: 'What is a neural network?', options: ['A computer virus','A type of database','A system inspired by the brain','A social media algorithm'], answer: 2 },
        { q: 'Which is NOT a machine learning type?', options: ['Supervised','Unsupervised','Hypothetical','Reinforcement'], answer: 2 },
      ]
    },
    {
      id: 'EXM003', title: 'UI/UX Design Quiz', course: 'UI/UX Design',
      date: '2026-03-18', duration: 45, type: 'MCQ', totalMarks: 50, passMark: 20,
      questions: [
        { q: 'What is Figma primarily used for?', options: ['Video Editing','UI/UX Design','3D Modeling','Code Compilation'], answer: 1 },
        { q: 'What does UX stand for?', options: ['User Extension','User Experience','Universal Export','Unique Exchange'], answer: 1 },
        { q: 'What is a wireframe?', options: ['A 3D structure','A low-fidelity UI blueprint','A final design','A color palette'], answer: 1 },
      ]
    },
  ],

  // ---- EXAM RESULTS ----
  results: [
    { studentId: 'STU001', examId: 'EXM001', marks: 82, grade: 'A', rank: 1, submitted: '2026-03-15' },
    { studentId: 'STU002', examId: 'EXM002', marks: 54, grade: 'C', rank: 3, submitted: '2026-03-15' },
    { studentId: 'STU003', examId: 'EXM003', marks: 44, grade: 'A', rank: 1, submitted: '2026-03-15' },
    { studentId: 'STU005', examId: 'EXM001', marks: 91, grade: 'A+', rank: 1, submitted: '2026-03-15' },
    { studentId: 'STU007', examId: 'EXM001', marks: 68, grade: 'B', rank: 2, submitted: '2026-03-15' },
  ],

  // ---- FEES / PAYMENTS ----
  payments: [
    { id: 'PAY001', studentId: 'STU001', course: 'Digital Marketing',   amount: 12500, date: '2026-01-10', method: 'UPI',          balance: 0     },
    { id: 'PAY002', studentId: 'STU001', course: 'Digital Marketing',   amount: 12500, date: '2026-02-10', method: 'UPI',          balance: 0     },
    { id: 'PAY003', studentId: 'STU002', course: 'AI & Automation',     amount: 20000, date: '2026-02-01', method: 'Bank Transfer', balance: 10000 },
    { id: 'PAY004', studentId: 'STU003', course: 'UI/UX Design',        amount: 22000, date: '2026-01-20', method: 'Card',         balance: 0     },
    { id: 'PAY005', studentId: 'STU004', course: 'Banking & Finance',   amount:  5000, date: '2026-03-01', method: 'Cash',         balance: 15000 },
    { id: 'PAY006', studentId: 'STU005', course: 'Software Development', amount: 35000, date: '2026-02-15', method: 'UPI',         balance: 0     },
    { id: 'PAY007', studentId: 'STU007', course: 'Digital Marketing',   amount: 12500, date: '2026-03-05', method: 'UPI',          balance: 12500 },
    { id: 'PAY008', studentId: 'STU008', course: 'Web Development',     amount: 28000, date: '2026-02-20', method: 'Card',         balance: 0     },
    { id: 'PAY009', studentId: 'STU009', course: 'Cloud Management',    amount: 16000, date: '2026-01-25', method: 'Bank Transfer', balance: 16000 },
    { id: 'PAY010', studentId: 'STU010', course: 'AI & Automation',     amount: 30000, date: '2026-03-10', method: 'UPI',          balance: 0     },
  ],

  // ---- CRM LEADS ----
  leads: [
    { id: 'LID001', name: 'Tanisha Roy',    phone: '9876543210', email: 'tanisha@example.com', source: 'Instagram', course: 'Digital Marketing',   stage: 'new',          followUp: '2026-03-18', counselor: 'Admin Priya', notes: 'Interested in combo batch' },
    { id: 'LID002', name: 'Saurav Pandey',  phone: '8765432109', email: 'saurav@example.com',  source: 'Website',   course: 'Software Development', stage: 'contacted',    followUp: '2026-03-17', counselor: 'Admin Priya', notes: 'Called once. Callback needed.' },
    { id: 'LID003', name: 'Meenakshi Das',  phone: '7654321098', email: 'meenakshi@example.com',source: 'Referral', course: 'UI/UX Design',        stage: 'interested',   followUp: '2026-03-19', counselor: 'Admin Priya', notes: 'Trial class attended' },
    { id: 'LID004', name: 'Raj Tiwari',     phone: '6543210987', email: 'raj@example.com',     source: 'Website',   course: 'Banking & Finance',   stage: 'converted',    followUp: '2026-03-16', counselor: 'Admin Priya', notes: 'Fee paid. Enrolled.' },
    { id: 'LID005', name: 'Simran Kaur',    phone: '5432109876', email: 'simran@example.com',  source: 'Instagram', course: 'Graphic Design',      stage: 'not_interested',followUp: '2026-03-20', counselor: 'Admin Priya', notes: 'Budget constraints' },
    { id: 'LID006', name: 'Dev Malhotra',   phone: '4321098765', email: 'dev@example.com',     source: 'Referral',  course: 'AI & Automation',     stage: 'new',          followUp: '2026-03-21', counselor: 'Admin Priya', notes: 'Walk-in enquiry' },
    { id: 'LID007', name: 'Ankita Shukla',  phone: '3210987654', email: 'ankita@example.com',  source: 'Website',   course: 'Cloud Management',    stage: 'interested',   followUp: '2026-03-22', counselor: 'Admin Priya', notes: 'Wants scholarship info' },
    { id: 'LID008', name: 'Mohit Singhania',phone: '2109876543', email: 'mohit@example.com',   source: 'Instagram', course: 'Web Development',     stage: 'contacted',    followUp: '2026-03-23', counselor: 'Admin Priya', notes: 'Sent brochure via email' },
  ],

  // ---- STUDY MATERIALS ----
  materials: [
    { id: 'MAT001', course: 'Digital Marketing',   title: 'Module 1 - SEO Basics',       type: 'pdf',   uploadedBy: 'Ravi Kumar',    date: '2026-02-01', size: '2.4 MB', url: '#' },
    { id: 'MAT002', course: 'Digital Marketing',   title: 'Module 2 - Social Media Ads', type: 'pdf',   uploadedBy: 'Ravi Kumar',    date: '2026-02-08', size: '3.1 MB', url: '#' },
    { id: 'MAT003', course: 'Digital Marketing',   title: 'Google Ads Tutorial',         type: 'video', uploadedBy: 'Ravi Kumar',    date: '2026-02-15', size: 'Link',   url: 'https://youtube.com' },
    { id: 'MAT004', course: 'AI & Automation',     title: 'Intro to ChatGPT Prompting',  type: 'pdf',   uploadedBy: 'Ravi Kumar',    date: '2026-02-10', size: '1.8 MB', url: '#' },
    { id: 'MAT005', course: 'AI & Automation',     title: 'n8n Workflow Setup Guide',    type: 'pdf',   uploadedBy: 'Ravi Kumar',    date: '2026-02-17', size: '4.2 MB', url: '#' },
    { id: 'MAT006', course: 'UI/UX Design',        title: 'Figma Essentials Handbook',   type: 'pdf',   uploadedBy: 'Meera Nair',    date: '2026-01-25', size: '2.9 MB', url: '#' },
    { id: 'MAT007', course: 'UI/UX Design',        title: 'User Research Methods',       type: 'pdf',   uploadedBy: 'Meera Nair',    date: '2026-02-05', size: '1.5 MB', url: '#' },
    { id: 'MAT008', course: 'Software Development',title: 'Python Cheat Sheet',          type: 'pdf',   uploadedBy: 'Aakash Pandey', date: '2026-02-12', size: '0.8 MB', url: '#' },
    { id: 'MAT009', course: 'Web Development',     title: 'React Hooks Reference',       type: 'pdf',   uploadedBy: 'Rohan Bhatt',   date: '2026-02-20', size: '1.2 MB', url: '#' },
    { id: 'MAT010', course: 'Banking & Finance',   title: 'Stock Market Beginner Guide', type: 'pdf',   uploadedBy: 'Sunita Devi',   date: '2026-01-30', size: '3.5 MB', url: '#' },
  ],

  // ---- PLACEMENTS ----
  placements: [
    { id: 'PLC001', studentId: 'STU001', student: 'Sneha Verma',  course: 'Digital Marketing',   company: 'Publicis Sapient',  role: 'Digital Marketing Executive', salary: 420000,  date: '2025-12-15' },
    { id: 'PLC002', studentId: 'STU003', student: 'Pooja Sharma', course: 'UI/UX Design',        company: 'Infosys BPM',       role: 'UI Designer',                  salary: 380000,  date: '2026-01-10' },
    { id: 'PLC003', studentId: 'STU005', student: 'Neha Patel',   course: 'Software Development', company: 'TCS',              role: 'Software Engineer',            salary: 550000,  date: '2026-02-01' },
    { id: 'PLC004', studentId: 'STU008', student: 'Vikram Joshi', course: 'Web Development',     company: 'Wipro',             role: 'Frontend Developer',           salary: 480000,  date: '2026-02-20' },
    { id: 'PLC005', studentId: 'STU010', student: 'Arjun Kapoor', course: 'AI & Automation',     company: 'Accenture',         role: 'AI Analyst',                   salary: 650000,  date: '2026-03-05' },
  ],

  // ---- NOTIFICATIONS ----
  notifications: [
    { id: 'NOT001', type: 'fee_reminder',     title: 'Fee Reminder',         message: 'Your fee payment of ₹10,000 is due on 20th March 2026.',  sent: '2026-03-15', channel: 'WhatsApp', recipients: 3 },
    { id: 'NOT002', type: 'exam_schedule',    title: 'Exam Schedule Alert',  message: 'Digital Marketing Mid Term exam is on 20th March at 10AM.', sent: '2026-03-14', channel: 'Email',    recipients: 42 },
    { id: 'NOT003', type: 'attendance_alert', title: 'Low Attendance Alert', message: 'Your attendance is below 75%. Please attend classes regularly.', sent: '2026-03-13', channel: 'WhatsApp', recipients: 2 },
    { id: 'NOT004', type: 'admission_followup',title: 'Admission Follow-up', message: 'Hi! We noticed you enquired about our Digital Marketing course.'  , sent: '2026-03-12', channel: 'WhatsApp', recipients: 5 },
  ],

  // ---- REVENUE (monthly) ----
  monthlyRevenue: [
    { month: 'Apr', revenue: 320000 }, { month: 'May', revenue: 480000 },
    { month: 'Jun', revenue: 390000 }, { month: 'Jul', revenue: 520000 },
    { month: 'Aug', revenue: 610000 }, { month: 'Sep', revenue: 450000 },
    { month: 'Oct', revenue: 580000 }, { month: 'Nov', revenue: 700000 },
    { month: 'Dec', revenue: 650000 }, { month: 'Jan', revenue: 820000 },
    { month: 'Feb', revenue: 760000 }, { month: 'Mar', revenue: 540000 },
  ],
};

// ---- SESSION HELPERS ----
const ERPAuth = {
  login(email, password) {
    const user = ERP_DATA.users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('erp_user', JSON.stringify(user));
      return user;
    }
    return null;
  },
  logout() { localStorage.removeItem('erp_user'); window.location.href = 'login.html'; },
  current() { try { return JSON.parse(localStorage.getItem('erp_user')); } catch { return null; } },
  guard(expectedRole) {
    const user = this.current();
    if (!user) { window.location.href = 'login.html'; return null; }
    if (expectedRole && user.role !== expectedRole) {
      const roleMap = { admin: 'admin-dashboard.html', teacher: 'teacher-dashboard.html', student: 'student-dashboard.html' };
      window.location.href = roleMap[user.role] || 'login.html';
      return null;
    }
    return user;
  }
};
