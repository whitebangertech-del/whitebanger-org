# Student Portal - Frontend Modules Documentation

## Overview

The Student Portal provides self-service access to all documents and information. Students can log in with their Student ID and access their personalized data fetched from the backend.

---

## 🎓 Student Modules Created

### 1. My ID Card (`student-id-card.html`)
**Route:** `/erp/student-id-card.html`

**Features:**
- Automatic loading of student's ID card on login
- Professional gradient card design
- Student photo (avatar), name, ID, course display
- Auto-calculated validity period (1 year from enrollment)
- Download as PDF functionality
- Print option
- Mobile responsive

**Data Fetched:**
- Student profile from `ERP_DATA.students` (filtered by logged-in user ID)
- Displays: Name, Student ID, Course, Enrollment Date, Avatar

**Supabase Integration:**
```javascript
// Line 121
// const { data: student, error } = await supabase
//   .from('students')
//   .select('*, profiles(*)')
//   .eq('student_id', currentUser.id)
//   .single();
```

---

### 2. My Admit Card (`student-admit-card.html`)
**Route:** `/erp/student-admit-card.html`

**Features:**
- Dropdown to select upcoming exams
- Auto-generated admit card with student details
- Exam information (date, time, duration, marks, venue)
- Important instructions section
- Signature areas
- Download PDF & Print options
- Only shows exams scheduled in the future

**Data Fetched:**
- Student data: Name, ID, Course, Photo
- Exam data: Filtered upcoming exams from `ERP_DATA.exams`
- Auto-fills exam center as "White Banger Main Campus"

**User Flow:**
1. Student logs in
2. System fetches upcoming exams
3. Student selects an exam from dropdown
4. Admit card is generated instantly
5. Student can download/print

---

### 3. My Results (`student-results.html`)
**Route:** `/erp/student-results.html`

**Features:**
- Performance dashboard with statistics:
  - Total exams taken
  - Average percentage
  - Pass/Fail count
- Complete results table with:
  - Exam name & date
  - Marks obtained / Total marks
  - Percentage calculation
  - Auto-calculated grade (A+ to F)
  - Pass/Fail status
- Detailed marksheet modal popup
- Color-coded grade badges
- Professional marksheet view with principal signature

**Grade System:**
- A+: 90-100% (Green)
- A: 80-89% (Green)
- B+: 70-79% (Blue)
- B: 60-69% (Blue)
- C: 50-59% (Orange)
- D: 40-49% (Orange)
- F: Below 40% (Red - Fail)

**Data Fetched:**
```javascript
// From localStorage (to be replaced with Supabase)
const allResults = JSON.parse(localStorage.getItem('exam_results') || '[]');
const myResults = allResults.filter(r => r.studentId === currentUser.id);
```

**Supabase Integration:**
```javascript
// const { data: results, error } = await supabase
//   .from('exam_results')
//   .select('*, exams(*)')
//   .eq('student_id', currentUser.id);
```

---

### 4. Exam Schedule (`student-exam-schedule.html`)
**Route:** `/erp/student-exam-schedule.html`

**Features:**
- Complete examination timetable
- Filtered by student's course
- Smart status indicators:
  - "Completed" - Past exams (gray)
  - "Today" - Today's exam (red)
  - "In X days" - Upcoming within 7 days (orange)
  - "Upcoming" - Future exams (blue)
- Day-wise breakdown with weekday display
- Venue and timing information
- Print-friendly layout
- Automatic upcoming exam alerts

**Special Features:**
- **Alert System:** Shows warning banner if exams are within next 7 days
- **Course Filtering:** Automatically shows only relevant exams for student's course
- **Day Calculation:** Real-time countdown to exam dates

**Data Fetched:**
```javascript
// Filters exams by student's course
let exams = ERP_DATA.exams.filter(e =>
  !e.course || e.course === student.course || e.course === 'General'
);
```

---

### 5. Fee Payment (`student-fee-payment.html`)
**Route:** `/erp/student-fee-payment.html`

**Features:**
- **Fee Dashboard:**
  - Total fee amount
  - Total paid amount
  - Outstanding balance (color-coded red if pending)

- **Make Payment Section:**
  - Payment type selection (Tuition, Exam, Library, Other)
  - Amount input
  - Payment method (UPI, Card, Net Banking, Wallet)
  - Notes/reference field
  - One-click payment processing

- **Payment History:**
  - Complete transaction history
  - Transaction ID, type, amount, method
  - Status badges (Success/Failed/Pending)
  - Date of payment
  - View receipt option

- **Success Modal:**
  - Payment confirmation
  - Receipt display with all details
  - Professional layout

**Special Features:**
- **Auto-hide Payment Form:** If balance is ₹0, shows congratulations message instead
- **Real-time Balance:** Updates immediately after payment
- **Receipt System:** Every payment generates a viewable receipt

**Payment Gateway Integration Point:**
```javascript
// Line 197
// TODO: Integrate Razorpay/Stripe payment gateway
// const options = {
//   key: 'YOUR_RAZORPAY_KEY',
//   amount: paymentData.amount * 100,
//   currency: 'INR',
//   ...
// };
```

---

## 🔐 Authentication & Security

### Student Login
All student modules use role-based authentication:

```javascript
const currentUser = ERPAuth.guard('student');
```

This ensures:
- Only logged-in students can access
- Automatically redirects to login if not authenticated
- Redirects to correct dashboard if logged in as admin/teacher
- Fetches only data belonging to the logged-in student

### Data Isolation
Each module filters data by `currentUser.id`:

```javascript
// Example from results page
const myResults = allResults.filter(r => r.studentId === currentUser.id);

// Example from payments page
payments = allPayments.filter(p => p.studentId === currentUser.id);
```

This ensures students can only see their own data, never other students' information.

---

## 🎨 UI/UX Features

### Consistent Navigation
All pages share the same sidebar structure:
- **Main:** Dashboard link
- **My Documents:** ID Card, Admit Card, Results, Certificates
- **Academics:** Exam Schedule, Exams, Study Materials
- **Finance:** Fee Payments

### User Profile Display
Top-right avatar shows:
- Student's avatar (first letters)
- Student's full name
- Role: "Student"

### Responsive Design
- Mobile-first approach
- Sidebar collapses on mobile
- Tables scroll horizontally on small screens
- Touch-friendly buttons

### Color-Coded Information
- **Success (Green):** Passed exams, successful payments, active status
- **Warning (Orange):** Upcoming exams, pending status, low grades
- **Danger (Red):** Failed exams, overdue items, critical alerts
- **Primary (Blue):** General information, links, default states

---

## 📊 Data Flow Architecture

```
Student Logs In
    ↓
Authentication Guard (erp-data.js → ERPAuth.guard('student'))
    ↓
Get Current User Data (student.id, student.name, etc.)
    ↓
Fetch Student-Specific Data
    ├─ ID Card: Student profile
    ├─ Admit Card: Upcoming exams
    ├─ Results: Exam results filtered by student ID
    ├─ Schedule: Exams filtered by course
    └─ Payments: Transactions filtered by student ID
    ↓
Render Page with Personalized Data
    ↓
User Actions (Download, Print, View, Pay)
```

---

## 🔌 Backend Integration Guide

### Step 1: Replace localStorage with Supabase

**ID Card:**
```javascript
// student-id-card.html Line 121
const { data: student, error } = await supabase
  .from('students')
  .select('*, profiles(*)')
  .eq('student_id', currentUser.id)
  .single();
```

**Results:**
```javascript
// student-results.html Line 91
const { data: results, error } = await supabase
  .from('exam_results')
  .select('*, exams(*)')
  .eq('student_id', currentUser.id)
  .order('created_at', { ascending: false });
```

**Payments:**
```javascript
// student-fee-payment.html Line 118
const { data: payments, error } = await supabase
  .from('payments')
  .select('*')
  .eq('student_id', currentUser.id)
  .eq('status', 'success')
  .order('date', { ascending: false });
```

### Step 2: Implement Real Payment Gateway

**Razorpay Integration Example:**
```javascript
// In student-fee-payment.html
const options = {
  key: 'YOUR_RAZORPAY_KEY_ID',
  amount: amount * 100, // Amount in paise
  currency: 'INR',
  name: 'White Banger',
  description: paymentType,
  handler: async function(response) {
    // Save payment to database
    const { data, error } = await supabase
      .from('payments')
      .insert([{
        transaction_id: response.razorpay_payment_id,
        student_id: currentUser.id,
        amount: amount,
        status: 'success',
        method: 'razorpay',
        type: paymentType
      }]);
  },
  prefill: {
    name: student.name,
    email: student.email,
    contact: student.phone
  }
};

const rzp = new Razorpay(options);
rzp.open();
```

---

## 🧪 Testing Guide

### Test Scenario 1: ID Card
1. Login as student (use existing demo login)
2. Navigate to "My ID Card"
3. Verify card displays correct student info
4. Click "Download PDF" - should download
5. Click "Print" - should open print dialog

### Test Scenario 2: Admit Card
1. Login as student
2. Navigate to "Admit Card"
3. Select an upcoming exam from dropdown
4. Verify admit card generates with:
   - Student name & photo
   - Exam details
   - Instructions
5. Test download and print

### Test Scenario 3: Results
1. Login as student
2. Navigate to "My Results"
3. Verify statistics show correctly:
   - Total exams
   - Average percentage
   - Pass/Fail count
4. Click "View Marksheet" on any result
5. Verify modal shows detailed marksheet

### Test Scenario 4: Exam Schedule
1. Login as student
2. Navigate to "Exam Schedule"
3. Verify only student's course exams show
4. Check status indicators are correct
5. If exam within 7 days, verify alert banner shows

### Test Scenario 5: Fee Payment
1. Login as student
2. Navigate to "Fee Payments"
3. Verify dashboard shows:
   - Total fee
   - Paid amount
   - Balance
4. Fill payment form and submit
5. Verify success modal shows
6. Check payment appears in history
7. Verify balance updates

---

## 📱 Mobile Experience

All student modules are fully responsive:

- **Breakpoint:** 768px
- **Mobile Navigation:** Hamburger menu with overlay
- **Tables:** Horizontal scroll with touch support
- **Modals:** Full-screen on mobile
- **Forms:** Stack vertically on small screens
- **Cards:** Single column layout on mobile

---

## 🚀 Deployment Checklist

- [ ] Replace all `localStorage` calls with Supabase queries
- [ ] Set up proper RLS policies in Supabase
- [ ] Integrate Razorpay/Stripe for real payments
- [ ] Test authentication flow end-to-end
- [ ] Verify all data filtering by student ID works
- [ ] Test PDF download on different browsers
- [ ] Test print functionality
- [ ] Verify mobile responsiveness
- [ ] Add loading states for async operations
- [ ] Implement proper error handling
- [ ] Test with real student data
- [ ] Security audit: Ensure no cross-student data leakage

---

## 🔗 Navigation Links

### Update Student Dashboard
Add these links to `student-dashboard.html`:

```html
<!-- Quick Actions -->
<div class="quick-actions">
  <a href="student-id-card.html" class="action-card">
    <div class="action-icon">🎫</div>
    <div class="action-title">My ID Card</div>
  </a>
  <a href="student-admit-card.html" class="action-card">
    <div class="action-icon">📄</div>
    <div class="action-title">Admit Card</div>
  </a>
  <a href="student-results.html" class="action-card">
    <div class="action-icon">📊</div>
    <div class="action-title">My Results</div>
  </a>
  <a href="student-fee-payment.html" class="action-card">
    <div class="action-icon">💳</div>
    <div class="action-title">Pay Fees</div>
  </a>
</div>
```

---

## 🎯 Key Benefits

### For Students:
✅ **24/7 Access** - View documents anytime, anywhere
✅ **Self-Service** - No need to visit office for routine documents
✅ **Instant Download** - Get PDFs immediately
✅ **Payment Tracking** - Complete transaction history
✅ **Exam Preparation** - Easy access to schedule and previous results

### For Administration:
✅ **Reduced Workload** - Less manual document generation
✅ **Automated Processes** - Auto-calculation of grades, percentages
✅ **Digital Records** - All transactions recorded
✅ **Better Communication** - Students stay informed about exams
✅ **Payment Transparency** - Clear fee tracking

---

## 📞 Support

For technical issues or questions:
- Email: prikshit@whitebanger.org
- WhatsApp: +91 97283-20132

---

**Last Updated:** 2026-03-19
**Version:** 1.0.0
**Total Student Modules:** 5
**Authentication:** Role-based (Student only)
**Status:** Production Ready (after Supabase integration)
