# ERP System - New Modules Documentation

## Overview

This document describes the 7 new modules added to the White Banger ERP system. All modules are integrated with the existing architecture and follow the same design patterns.

---

## 📋 Modules Added

### 1. Admission Enquiry Module
**File:** `admin-enquiry.html`
**Route:** `/erp/admin-enquiry.html`

**Features:**
- Complete enquiry form with validation
- Student and parent/guardian information capture
- Course selection from existing course catalog
- Source tracking (website, social media, referral, etc.)
- Enquiry status management (new, contacted, converted, rejected)
- Search and filter functionality
- One-click conversion to student

**Form Fields:**
- Student: Name, DOB, Gender, Previous School, Course Applying
- Parent: Name, Contact, Email, WhatsApp, Address
- Additional: Source, Preferred Mode, Notes

**Data Storage:**
Currently uses `localStorage` with key `enquiries`

**Supabase Integration Point:**
```javascript
// Line 178 in admin-enquiry.html
// TODO: Replace with Supabase insert
// const { data, error } = await supabase.from('enquiries').insert([enquiry]);
```

**Database Table Structure:**
```sql
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT NOT NULL,
  dob DATE NOT NULL,
  gender TEXT,
  prev_school TEXT,
  course_applying TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  address TEXT NOT NULL,
  source TEXT,
  mode TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new',
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 2. ID Card Module
**File:** `admin-id-card.html`
**Route:** `/erp/admin-id-card.html`

**Features:**
- Student selection with search
- Professional ID card design with gradient background
- Photo placeholder (avatar system)
- Student details display (ID, Name, Course, Validity)
- Download as PDF (using html2canvas + jsPDF)
- Print functionality
- Validity period calculation (1 year from enrollment)

**Libraries Used:**
- `html2canvas@1.4.1` - For capturing card as image
- `jspdf@2.5.1` - For PDF generation

**Customization:**
- Edit card design in lines 128-171 (id-card-template div)
- Modify colors, fonts, layout as needed
- Add QR code support if required

**Integration:**
Uses `ERP_DATA.students` from existing data structure

---

### 3. Admit Card Module
**File:** `admin-admit-card.html`
**Route:** `/erp/admin-admit-card.html`

**Features:**
- Exam and student selection dropdowns
- Professional admit card layout
- Student photo display
- Exam details (name, date, duration, marks)
- Examination center information
- Important instructions section
- Signature areas for student and principal
- Download as PDF
- Print functionality

**Libraries Used:**
- `html2canvas@1.4.1`
- `jspdf@2.5.1`

**Customization:**
- Modify admit card template in lines 95-190
- Add barcode/QR code for verification
- Customize instructions and format

---

### 4. Exam Results Module
**File:** `admin-results.html`
**Route:** `/erp/admin-results.html`

**Features:**
- Add exam results with validation
- Student and exam selection
- Automatic grade calculation (A+ to F)
- Percentage calculation
- Pass/Fail status determination
- Search and filter results
- View detailed marksheet
- Color-coded grade badges

**Grade System:**
- A+: 90-100%
- A: 80-89%
- B+: 70-79%
- B: 60-69%
- C: 50-59%
- D: 40-49%
- F: Below 40% (Fail)

**Data Storage:**
`localStorage` with key `exam_results`

**Supabase Integration:**
```javascript
// Refer to ResultService in erp-services.js
// Lines 156-189
```

---

### 5. Exam Schedule Module
**File:** `admin-exam-schedule.html`
**Route:** `/erp/admin-exam-schedule.html`

**Features:**
- Comprehensive exam timetable display
- Filter by course
- Status indicators (Upcoming, Today, Completed)
- Date, time, duration, venue, and marks display
- Print-friendly layout
- Automatic status calculation based on current date

**Data Source:**
Uses `ERP_DATA.exams` from existing exam data

**Enhancements:**
- Add calendar view option
- Export to PDF/Excel
- Email schedule to students

---

### 6. Certificate Verification Module
**File:** `certificate-verify.html`
**Route:** `/erp/certificate-verify.html`
**Type:** Standalone public page

**Features:**
- Public-facing certificate verification
- Beautiful gradient background design
- Certificate ID input with validation
- Real-time verification status
- Display certificate details (name, course, grade, date)
- Mobile-responsive design
- No login required (public access)

**Mock Data:**
Currently includes 3 sample certificates (lines 70-74)

**Supabase Integration:**
```javascript
// Line 86-90
// const { data, error } = await supabase
//   .from('certificates')
//   .select('*')
//   .eq('certificate_id', certId)
//   .single();
```

**Usage:**
Students/employers can verify certificates by entering the certificate ID directly at this page.

---

### 7. Online Payment Module
**File:** `admin-payments.html`
**Route:** `/erp/admin-payments.html`

**Features:**
- Payment processing form
- Multiple payment types (Tuition, Admission, Exam, Library, Other)
- Payment method selection (UPI, Card, Net Banking, Wallet)
- Payment statistics dashboard (Total Received, Pending, Success, Failed)
- Recent transactions widget
- Complete payment history table
- Success modal with receipt
- Download receipt functionality
- Search payments

**Payment Gateway Integration Point:**
```javascript
// Lines 231-238
// TODO: Integrate Razorpay/Stripe payment gateway here
// Example Razorpay integration:
// const options = {
//   key: 'YOUR_RAZORPAY_KEY',
//   amount: payment.amount * 100,
//   currency: 'INR',
//   ...
// };
```

**Data Storage:**
`localStorage` with key `payments`

**Security Notes:**
- Always process payments server-side
- Never store card details
- Use tokenization for recurring payments
- Implement proper webhook verification

---

## 🔧 Shared Services File

**File:** `erp-services.js`

A centralized service layer for all new modules containing:

### Services Included:
1. **EnquiryService** - Admission enquiry management
2. **PaymentService** - Payment processing and history
3. **ResultService** - Exam results and grading
4. **CertificateService** - Certificate generation and verification
5. **DocumentService** - ID cards and admit cards
6. **NotificationService** - Email/SMS notifications

### Usage Example:
```javascript
// Add enquiry
const enquiry = await EnquiryService.create(formData);

// Process payment
const payment = await PaymentService.processPayment(paymentData);

// Add exam result
const result = await ResultService.addResult(resultData);

// Verify certificate
const cert = await CertificateService.verify(certId);
```

---

## 🔌 Integration Steps

### Step 1: Update Sidebar Navigation

Add these navigation items to existing ERP pages:

```html
<!-- Admissions & Finance Section -->
<div class="erp-nav-section">
  <div class="erp-nav-label">Admissions & Finance</div>
  <a href="admin-enquiry.html" class="erp-nav-link">
    <span class="erp-nav-icon"><!-- SVG icon --></span>
    <span class="erp-nav-text">Admission Enquiry</span>
  </a>
  <a href="admin-payments.html" class="erp-nav-link">
    <span class="erp-nav-icon"><!-- SVG icon --></span>
    <span class="erp-nav-text">Online Payments</span>
  </a>
</div>

<!-- Documents & Verification Section -->
<div class="erp-nav-section">
  <div class="erp-nav-label">Documents & Verification</div>
  <a href="admin-id-card.html" class="erp-nav-link">
    <span class="erp-nav-icon"><!-- SVG icon --></span>
    <span class="erp-nav-text">ID Cards</span>
  </a>
  <a href="admin-admit-card.html" class="erp-nav-link">
    <span class="erp-nav-icon"><!-- SVG icon --></span>
    <span class="erp-nav-text">Admit Cards</span>
  </a>
  <a href="certificate-verify.html" class="erp-nav-link" target="_blank">
    <span class="erp-nav-icon"><!-- SVG icon --></span>
    <span class="erp-nav-text">Verify Certificate</span>
  </a>
</div>

<!-- Updated Academics Section -->
<div class="erp-nav-section">
  <div class="erp-nav-label">Academics</div>
  <!-- Existing items -->
  <a href="admin-exam-schedule.html" class="erp-nav-link">
    <span class="erp-nav-icon"><!-- SVG icon --></span>
    <span class="erp-nav-text">Exam Schedule</span>
  </a>
  <a href="admin-results.html" class="erp-nav-link">
    <span class="erp-nav-icon"><!-- SVG icon --></span>
    <span class="erp-nav-text">Results</span>
  </a>
</div>
```

### Step 2: Database Setup (Supabase)

Run these migrations in Supabase SQL Editor:

```sql
-- Enquiries Table
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT NOT NULL,
  dob DATE NOT NULL,
  gender TEXT,
  course_applying TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Exam Results Table (extends existing)
CREATE TABLE IF NOT EXISTS exam_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id),
  exam_id UUID REFERENCES exams(id),
  marks NUMERIC NOT NULL,
  total_marks NUMERIC NOT NULL,
  percentage NUMERIC,
  grade TEXT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certificates Table
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certificate_id TEXT UNIQUE NOT NULL,
  student_id UUID REFERENCES students(id),
  course_id UUID REFERENCES courses(id),
  issue_date DATE DEFAULT CURRENT_DATE,
  grade TEXT,
  status TEXT DEFAULT 'valid',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Step 3: Replace Mock Data

Search for `localStorage` in each file and replace with Supabase calls:

**Example:**
```javascript
// OLD (localStorage)
const enquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');

// NEW (Supabase)
const { data: enquiries, error } = await supabase
  .from('enquiries')
  .select('*');
```

---

## 🎨 Customization Guide

### Changing Colors
All modules use CSS variables from `erp-style.css`:
- `--primary`: Primary brand color
- `--success`: Success/positive actions
- `--warning`: Warning states
- `--danger`: Error/negative actions

### Modifying Layouts
- ID Card: Lines 128-171 in `admin-id-card.html`
- Admit Card: Lines 95-190 in `admin-admit-card.html`
- Certificate Verify: Lines 14-47 in `certificate-verify.html`

### Adding Fields
1. Add HTML input in form section
2. Capture value in form submit handler
3. Add to data object
4. Update Supabase table schema

---

## 🧪 Testing Checklist

- [ ] Enquiry form submission and validation
- [ ] ID card generation and PDF download
- [ ] Admit card generation with correct exam data
- [ ] Result addition with automatic grading
- [ ] Exam schedule filtering
- [ ] Certificate verification (valid and invalid IDs)
- [ ] Payment processing and receipt generation
- [ ] Search functionality in all modules
- [ ] Mobile responsiveness
- [ ] Print functionality

---

## 📊 Data Flow Diagram

```
User Input (Forms)
    ↓
Validation (Client-side)
    ↓
Service Layer (erp-services.js)
    ↓
Data Persistence
    ├→ localStorage (Current - Development)
    └→ Supabase (Production - To be implemented)
    ↓
UI Update
```

---

## 🚀 Deployment Notes

1. **Before Production:**
   - Replace all `localStorage` with Supabase
   - Set up proper authentication
   - Enable RLS policies
   - Test payment gateway integration
   - Add proper error handling
   - Implement loading states

2. **Environment Variables:**
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   RAZORPAY_KEY_ID=your_razorpay_key (if using Razorpay)
   ```

3. **Security:**
   - Never commit API keys
   - Use environment variables
   - Implement CORS properly
   - Validate all inputs server-side
   - Use prepared statements for queries

---

## 📞 Support

For issues or questions about these modules:
- Email: prikshit@whitebanger.org
- WhatsApp: +91 97283-20132

---

**Last Updated:** 2026-03-19
**Version:** 1.0.0
**Author:** Claude (Anthropic)
