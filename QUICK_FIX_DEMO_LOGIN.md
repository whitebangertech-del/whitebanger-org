# Quick Fix: Demo Login Not Working

## The Issue
Demo credentials are not working because demo users don't exist in Supabase Auth yet.

## Quick 3-Step Fix

### 1️⃣ Get Your Service Role Key

Go to: [Supabase Dashboard](https://supabase.com/dashboard) → **Settings** → **API** → Copy **service_role** key

### 2️⃣ Add to .env File

Open `.env` and replace `YOUR_SERVICE_ROLE_KEY_HERE` with your actual service role key:

```env
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
```

### 3️⃣ Run Setup Command

```bash
npm run setup-demo
```

That's it! Demo users will be created automatically.

---

## Login Credentials

After running the setup:

**Admin**
- Email: `admin@whitebanger.org`
- Password: `Admin@123`

**Teacher**
- Email: `teacher@whitebanger.org`
- Password: `Teacher@123`

**Student**
- Email: `student@whitebanger.org`
- Password: `Student@123`

Login URL: `/erp/login.html`

---

## What if it doesn't work?

1. **Check console output** - Look for error messages
2. **Verify .env file** - Make sure service role key is correct
3. **Check browser console** - Open DevTools (F12) and check for errors
4. **See SETUP_DEMO_USERS.md** - Full troubleshooting guide

---

## Files Created

- ✅ `setup-demo-users.js` - Automated setup script
- ✅ `SETUP_DEMO_USERS.md` - Detailed guide
- ✅ `.env` - Updated with service role key placeholder
- ✅ `package.json` - Added `setup-demo` command

---

## Why This Happened

Supabase users can only be created through the Supabase Auth API, not through SQL migrations. The automated script uses your service role key to create users properly in Supabase Auth, then creates corresponding records in your database tables.

---

## Security Note

⚠️ The service role key has full admin access to your database. Never:
- Commit it to Git (already in .gitignore)
- Share it publicly
- Use it in client-side code
- Expose it in your frontend

It's only for server-side admin operations like this setup script.
