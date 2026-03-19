// =========================================================
//  WHITE BANGER ERP — EMAIL SERVER (Node.js + Nodemailer)
//  Google Workspace SMTP backend
//
//  SETUP:
//    npm init -y
//    npm install express nodemailer cors
//    node email-server.js
//
//  Then visit http://localhost:3001 to confirm it's running.
//  The ERP front-end posts to http://localhost:3001/api/send-email
// =========================================================

const express   = require('express');
const nodemailer = require('nodemailer');
const cors      = require('cors');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── MIDDLEWARE ────────────────────────────────────────────
app.use(express.json());
app.use(cors({
  // Allow only your ERP domain in production
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'https://whitebanger.com'],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// ── GOOGLE WORKSPACE SMTP CONFIG ─────────────────────────
//  Steps to get credentials:
//  1. Log in to your Google Workspace admin account (admin.google.com)
//  2. Go to Security → Less Secure Apps  OR  use an App Password:
//     myaccount.google.com → Security → App Passwords
//     (Recommended: use App Password, not your real password)
//  3. Fill in values below. NEVER commit real credentials to git.

const transporter = nodemailer.createTransport({
  host:   'smtp.gmail.com',    // Google Workspace uses Gmail's SMTP
  port:   587,                 // TLS port (recommended)
  secure: false,               // true only for port 465
  auth: {
    user: process.env.SMTP_USER || 'noreply@whitebanger.com',   // ← your Google Workspace email
    pass: process.env.SMTP_PASS || 'your-app-password-here',    // ← App Password (NOT your real password)
  },
  tls: {
    rejectUnauthorized: true,  // set to false only for local testing
  }
});

// ── VERIFY CONNECTION ON STARTUP ─────────────────────────
transporter.verify((err, success) => {
  if (err) {
    console.error('❌ SMTP Connection Failed:', err.message);
    console.error('   Check SMTP_USER, SMTP_PASS, and Google App Password settings.');
  } else {
    console.log('✅ Google Workspace SMTP Connected — Ready to send emails!');
  }
});

// ── SEND EMAIL ENDPOINT ───────────────────────────────────
app.post('/api/send-email', async (req, res) => {
  const { from, to, subject, text, html } = req.body;

  // Basic validation
  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ success: false, message: 'Missing required fields: to, subject, and text or html.' });
  }

  const mailOptions = {
    from:    from || `White Banger Tech <noreply@whitebanger.com>`,
    to,
    subject,
    ...(html ? { html } : { text }),
    // Optional: include both
    ...(html && text ? { text } : {}),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to} | Message ID: ${info.messageId}`);
    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('❌ Send Error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── BULK EMAIL ENDPOINT ───────────────────────────────────
app.post('/api/send-bulk-email', async (req, res) => {
  const { recipients, subject, templateText, templateHtml } = req.body;
  // recipients = [{ name, email }]
  if (!Array.isArray(recipients) || !subject) {
    return res.status(400).json({ success: false, message: 'recipients[] and subject required.' });
  }
  let sent = 0, failed = 0, errors = [];
  for (const r of recipients) {
    try {
      await transporter.sendMail({
        from:    `White Banger Tech <noreply@whitebanger.com>`,
        to:      r.email,
        subject,
        ...(templateHtml ? { html: templateHtml.replace('{{name}}', r.name) } : {}),
        ...(templateText ? { text: templateText.replace('{{name}}', r.name) } : {}),
      });
      sent++;
    } catch (e) {
      failed++;
      errors.push({ email: r.email, error: e.message });
    }
  }
  res.json({ success: true, sent, failed, errors });
});

// ── HEALTH CHECK ──────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'White Banger ERP Email Server', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🚀 White Banger Email Server running at http://localhost:${PORT}`);
  console.log(`   POST /api/send-email       → single email`);
  console.log(`   POST /api/send-bulk-email  → bulk email`);
  console.log(`   GET  /                     → health check\n`);
});
