# Setup Demo Users - Quick Guide

## Problem
Demo login credentials are not working because users don't exist in Supabase Auth yet.

## Solution
Run the automated setup script to create all demo users with one command.

---

## Step 1: Get Your Service Role Key

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **bskqcgmiuupsozllxmeq**
3. Click **Settings** (gear icon) in the left sidebar
4. Click **API** in the settings menu
5. Scroll down to **Project API keys**
6. Find the **service_role** key (secret)
7. Click to reveal and copy it

⚠️ **Important**: The service_role key is secret and should never be committed to Git!

---

## Step 2: Add Service Role Key to .env

Open the `.env` file in your project root and replace `YOUR_SERVICE_ROLE_KEY_HERE` with the actual key:

```env
VITE_SUPABASE_URL=https://bskqcgmiuupsozllxmeq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJza3FjZ21pdXVwc296bGx4bWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MDA2MDMsImV4cCI6MjA4OTQ3NjYwM30.eOMryl55xVRXIjpYCndseX7vwQtGT6jUYCE5N0H5ZzY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (paste your key here)
```

---

## Step 3: Install Dependencies

```bash
npm install
```

This will install the required `dotenv` package.

---

## Step 4: Run the Setup Script

```bash
npm run setup-demo
```

The script will:
- ✅ Create 3 demo users in Supabase Auth
- ✅ Create corresponding profile records
- ✅ Create a student record for the student user
- ✅ Create a demo certificate
- ✅ Create demo payment records
- ✅ Create demo CRM leads

---

## Expected Output

```
🚀 Setting up demo users for WhiteBanger ERP

==================================================

📝 Creating user: admin@whitebanger.org
   ✅ Auth user created
   ✅ Profile created
   ✅ Success: ADMIN user ready

📝 Creating user: teacher@whitebanger.org
   ✅ Auth user created
   ✅ Profile created
   ✅ Success: TEACHER user ready

📝 Creating user: student@whitebanger.org
   ✅ Auth user created
   ✅ Profile created
   ✅ Student record created
   ✅ Demo certificate created
   ✅ Demo payments created
   ✅ Success: STUDENT user ready

📝 Creating demo CRM leads
   ✅ Demo leads created

==================================================

📊 Summary:
   ✅ Successful: 3
   ❌ Failed: 0

🎉 All demo users created successfully!

📝 Login Credentials:
   ┌─────────────────────────────────────────────┐
   │ ADMIN                                       │
   │ Email: admin@whitebanger.org                │
   │ Password: Admin@123                         │
   ├─────────────────────────────────────────────┤
   │ TEACHER                                     │
   │ Email: teacher@whitebanger.org              │
   │ Password: Teacher@123                       │
   ├─────────────────────────────────────────────┤
   │ STUDENT                                     │
   │ Email: student@whitebanger.org              │
   │ Password: Student@123                       │
   └─────────────────────────────────────────────┘

🌐 Login at: /erp/login.html
```

---

## Step 5: Test Login

1. Open your browser and go to `/erp/login.html`
2. Try logging in with any of the credentials above
3. You should be redirected to the appropriate dashboard

### Admin Login
- Email: `admin@whitebanger.org`
- Password: `Admin@123`
- Redirects to: `/erp/admin-dashboard.html`

### Teacher Login
- Email: `teacher@whitebanger.org`
- Password: `Teacher@123`
- Redirects to: `/erp/teacher-dashboard.html`

### Student Login
- Email: `student@whitebanger.org`
- Password: `Student@123`
- Redirects to: `/erp/student-dashboard.html`

---

## Troubleshooting

### Error: Missing environment variables

**Problem**: Script can't find SUPABASE_SERVICE_ROLE_KEY

**Solution**:
1. Make sure you added the service role key to `.env` file
2. Ensure there are no spaces around the `=` sign
3. Restart your terminal after editing `.env`

### Error: Invalid JWT

**Problem**: Service role key is incorrect or expired

**Solution**:
1. Go back to Supabase Dashboard
2. Copy the service_role key again
3. Make sure you copied the entire key (they're very long)
4. Update `.env` file

### Error: User already exists

**Problem**: Users were already created in a previous run

**Solution**: This is actually fine! The script handles existing users gracefully. Just check the output - if it says "User already exists" but continues successfully, everything is working.

### Error: Permission denied

**Problem**: RLS policies might be blocking the operations

**Solution**: The script uses the service_role key which bypasses RLS, so this shouldn't happen. If it does, check your Supabase database logs for more details.

### Script runs but login still fails

**Problem**: Check browser console for errors

**Solution**:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try logging in
4. Look for error messages
5. Common issues:
   - CORS errors → Check Supabase project settings
   - Network errors → Check if Supabase URL is correct in .env
   - Auth errors → User might not have been created properly

---

## What Gets Created

### Auth Users (Supabase Auth)
- 3 user accounts with email/password authentication
- Email confirmation automatically enabled
- User metadata includes name and role

### Profiles Table
- 3 profile records linked to auth users
- Contains: id, email, name, role, phone

### Students Table (for student user only)
- 1 student record: `STU-2024-001`
- Linked to student auth user
- Includes course, fees, attendance data

### Certificates Table (for student user only)
- 1 demo certificate: `WB-2024-SD-00001`
- Can be verified at `/erp/certificate-verify.html`

### Payments Table (for student user only)
- 2 demo payment records
- Total: ₹50,000 (2 installments of ₹25,000)

### CRM Leads Table
- 3 sample inquiry leads for testing CRM module

---

## Running Again

You can run the script multiple times safely. It will:
- Skip users that already exist
- Skip profiles that already exist
- Skip student records that already exist
- Only create missing data

---

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit .env file to Git**
   - Already added to `.gitignore`
   - Service role key is extremely sensitive

2. **Change passwords in production**
   - Demo passwords are public in this documentation
   - Change them before deploying to production

3. **Service role key has full access**
   - Can bypass all RLS policies
   - Only use for admin operations
   - Never expose in client-side code

4. **Delete demo users in production**
   - These are for testing only
   - Remove before going live

---

## Alternative: Manual Setup

If you prefer to create users manually without the script:

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add user" → "Create new user"
3. Enter email and password
4. Check "Auto Confirm User"
5. Click "Create user"
6. Copy the generated User ID
7. Go to Database → Table Editor → profiles
8. Insert a new row with the User ID and details
9. For students, also insert into students table

This is more tedious but gives you full control.

---

## Next Steps

After creating demo users:

1. ✅ Test all three login types
2. ✅ Verify dashboard access for each role
3. ✅ Test form submissions
4. ✅ Test certificate verification
5. ✅ Test payment functionality
6. ✅ Explore all ERP modules

---

## Support

If you encounter issues not covered here:

1. Check the console output for specific error messages
2. Verify all environment variables are set correctly
3. Check Supabase Dashboard → Logs for database errors
4. Ensure your Supabase project is active and not paused

For more information:
- `DEMO_LOGIN.md` - Complete login guide
- `DATABASE_INTEGRATION.md` - Database setup details
- `ARCHITECTURE.md` - System architecture
