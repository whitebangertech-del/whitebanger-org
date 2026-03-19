# Demo Login Credentials & Testing Guide

## ⚡ Quick Setup (RECOMMENDED)

**Automated Setup** - Create all demo users with one command:

```bash
npm run setup-demo
```

See **[QUICK_FIX_DEMO_LOGIN.md](QUICK_FIX_DEMO_LOGIN.md)** for the 3-step quick fix guide!

---

## Alternative: Manual Setup

If you prefer manual setup or the automated script doesn't work, follow these steps:

### How to Create Demo Users Manually

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** → **Users** in the left sidebar

### Step 2: Create Admin User
1. Click **"Add user"** → **"Create new user"**
2. Enter the following details:
   - **Email**: `admin@whitebanger.org`
   - **Password**: `Admin@123`
   - **Auto Confirm User**: ✓ (checked)
3. Click **"Create user"**
4. Copy the generated User ID (UUID)
5. Go to **Database** → **Table Editor** → `profiles` table
6. Insert a new row:
   - `id`: [paste the User ID from step 4]
   - `email`: `admin@whitebanger.org`
   - `name`: `Demo Admin`
   - `role`: `admin`
   - `phone`: `+91-9876543210`

### Step 3: Create Teacher User
1. Click **"Add user"** → **"Create new user"**
2. Enter the following details:
   - **Email**: `teacher@whitebanger.org`
   - **Password**: `Teacher@123`
   - **Auto Confirm User**: ✓ (checked)
3. Click **"Create user"**
4. Copy the generated User ID (UUID)
5. Go to **Database** → **Table Editor** → `profiles` table
6. Insert a new row:
   - `id`: [paste the User ID from step 4]
   - `email`: `teacher@whitebanger.org`
   - `name`: `Demo Teacher`
   - `role`: `teacher`
   - `phone`: `+91-9876543211`

### Step 3: Create Student User
1. Click **"Add user"** → **"Create new user"**
2. Enter the following details:
   - **Email**: `student@whitebanger.org`
   - **Password**: `Student@123`
   - **Auto Confirm User**: ✓ (checked)
3. Click **"Create user"**
4. Copy the generated User ID (UUID)
5. Go to **Database** → **Table Editor** → `profiles` table
6. Insert a new row:
   - `id`: [paste the User ID from step 4]
   - `email`: `student@whitebanger.org`
   - `name`: `Demo Student`
   - `role`: `student`
   - `phone`: `+91-9876543212`
7. Go to **Database** → **Table Editor** → `students` table
8. Insert a new row:
   - `id`: `STU-2024-001`
   - `user_id`: [paste the User ID from step 4]
   - `name`: `Demo Student`
   - `email`: `student@whitebanger.org`
   - `phone`: `+91-9876543212`
   - `course`: `Software Development`
   - `enroll_date`: [today's date]
   - `fee`: `50000`
   - `paid`: `50000`
   - `status`: `active`
   - `attendance_percentage`: `95`
   - `certificate_issued`: `true`
   - `address`: `123 Demo Street, City, State, 123456`

---

## Demo Login Credentials

Once you've created the users above, you can login with these credentials:

### 🔴 Admin Portal
- **URL**: `/erp/login.html`
- **Email**: `admin@whitebanger.org`
- **Password**: `Admin@123`
- **Access**: Full system access, can manage students, teachers, courses, fees, exams, certificates

### 🟢 Teacher Portal
- **URL**: `/erp/login.html`
- **Email**: `teacher@whitebanger.org`
- **Password**: `Teacher@123`
- **Access**: View students, manage attendance, upload study materials, enter exam results

### 🔵 Student Portal
- **URL**: `/erp/login.html`
- **Email**: `student@whitebanger.org`
- **Password**: `Student@123`
- **Access**: View own attendance, exam results, fee payments, download certificates, access study materials

---

## Testing Forms

### 1. Contact/Inquiry Form
- **Location**: `/contact.html`
- **Tests**: Submit inquiry through main website
- **Database Table**: `crm_leads`
- **Status**: ✅ Connected to Supabase

### 2. Floating Inquiry Modal
- **Location**: All pages (floating button)
- **Tests**: Click "Inquiry" button, fill form
- **Database Table**: `crm_leads`
- **Status**: ✅ Connected to Supabase

### 3. Internship Application
- **Location**: `/internship-form.html`
- **Tests**: Submit internship application
- **Database Table**: `crm_leads` (source: 'internship_application')
- **Status**: ✅ Connected to Supabase

### 4. Certificate Verification
- **Location**: `/erp/certificate-verify.html`
- **Tests**: Enter certificate number `WB-2024-SD-00001`
- **Database Table**: `certificates`
- **Status**: ✅ Connected to Supabase
- **Note**: You'll need to manually insert a demo certificate record

### 5. Admin Forms (requires admin login)
- **Enquiry Form**: `/erp/admin-enquiry.html`
- **Add Payment**: `/erp/admin-payments.html`
- **Add Result**: `/erp/admin-results.html`
- **Status**: ✅ All connected to Supabase

### 6. Student Forms (requires student login)
- **Fee Payment**: `/erp/student-fee-payment.html`
- **Status**: ✅ Connected to Supabase

---

## Database Tables

All forms save to these Supabase tables:

| Table | Purpose | Used By |
|-------|---------|---------|
| `crm_leads` | Contact inquiries, internship applications | Contact form, Inquiry modal, Internship form, Admin enquiry |
| `certificates` | Student certificates | Certificate verification, Admin certificates |
| `payments` | Fee payments | Admin payments, Student fee payment |
| `exam_results` | Exam results | Admin results |
| `students` | Student records | All student-related modules |
| `profiles` | User authentication profiles | Login system |

---

## Testing Certificate Verification

### Create a Demo Certificate

After creating the demo student, add a certificate:

1. Go to Supabase Dashboard → **Database** → **Table Editor**
2. Select `certificates` table
3. Click **"Insert row"**
4. Enter:
   - `certificate_number`: `WB-2024-SD-00001`
   - `student_id`: `STU-2024-001`
   - `student_name`: `Demo Student`
   - `course_id`: `SD101`
   - `course_name`: `Software Development`
   - `issue_date`: [30 days ago]
   - `grade`: `A+`
   - `status`: `active`
5. Click **"Save"**

Now you can test certificate verification:
1. Go to `/erp/certificate-verify.html`
2. Enter: `WB-2024-SD-00001`
3. Should display valid certificate with student details

---

## Mobile Testing

### Devices to Test On

- **iPhone SE (375px)** - Smallest modern iPhone
- **iPhone 12/13 (390px)** - Standard iPhone
- **iPad Mini (768px)** - Tablet breakpoint
- **Android phones (360px-414px)** - Various Android devices

### Mobile-Specific Features to Test

1. **Navigation**
   - Hamburger menu opens/closes smoothly
   - All links accessible
   - Touch targets minimum 44x44px

2. **Forms**
   - Input fields don't cause page zoom (16px font size)
   - All fields accessible
   - Submit buttons easy to tap

3. **Tables**
   - Horizontal scroll works smoothly
   - First column sticky for easy reading
   - Data readable at mobile size

4. **Modals**
   - Open properly on mobile
   - Close button accessible
   - Content doesn't overflow

5. **ERP Sidebar**
   - Opens from left on mobile
   - Overlay appears behind
   - Closes when clicking outside

---

## Troubleshooting

### Login Not Working
1. Verify user created in Supabase Auth
2. Check `profiles` table has matching record
3. Ensure email is confirmed in Auth dashboard
4. Check browser console for errors

### Forms Not Saving
1. Check `.env` file has correct Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```
2. Check browser console for errors
3. Verify RLS policies in Supabase dashboard
4. Check Network tab for failed requests

### Certificate Verification Not Working
1. Ensure certificate record exists in database
2. Check `status` field is 'active'
3. Verify `certificate_number` matches exactly (case-sensitive)
4. Check browser console for errors

### Mobile Issues
1. Clear browser cache
2. Test in incognito/private mode
3. Check viewport meta tag present
4. Verify responsive CSS loaded

---

## Production Checklist

Before deploying to production:

- [ ] Change all demo passwords
- [ ] Remove demo user accounts
- [ ] Enable email verification
- [ ] Set up proper RLS policies
- [ ] Configure environment variables
- [ ] Test on real devices
- [ ] Run security audit
- [ ] Enable 2FA for admin accounts
- [ ] Set up backup strategy
- [ ] Configure monitoring and logging

---

## Support

If you encounter issues:

1. Check browser console for errors
2. Verify Supabase connection in Network tab
3. Check RLS policies in Supabase dashboard
4. Review migration logs for any failures

For further assistance, check the project documentation:
- `ARCHITECTURE.md` - System architecture
- `DATABASE_INTEGRATION.md` - Database setup
- `IMPROVEMENTS.md` - Known issues and roadmap
