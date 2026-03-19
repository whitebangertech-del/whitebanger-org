# White Banger Platform - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**
The `.env` file is already configured with Supabase credentials.

3. **Setup Database**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste contents of `supabase/schema.sql`
   - Execute the SQL script

4. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
white-banger/
├── index.html                 # Main landing page
├── config.js                  # Central configuration
├── package.json               # Dependencies & scripts
│
├── css/                       # Modular stylesheets
│   ├── variables.css          # Design tokens
│   └── utilities.css          # Utility classes
│
├── js/                        # JavaScript modules
│   ├── performance.js         # Performance utilities
│   └── accessibility.js       # Accessibility features
│
├── erp/                       # ERP System
│   ├── login.html            # Login page
│   ├── admin-dashboard.html  # Admin portal
│   ├── teacher-dashboard.html # Teacher portal
│   ├── student-dashboard.html # Student portal
│   ├── auth-service.js       # Authentication
│   ├── erp-script.js         # ERP functionality
│   ├── erp-data.js           # Sample data
│   └── erp-style.css         # ERP styles
│
└── supabase/
    └── schema.sql            # Database schema
```

---

## 🔑 Key Features

### Public Website
- Course catalog with 8+ courses
- Multilingual support (EN, HI, PA)
- Testimonials and placements showcase
- Contact and inquiry forms
- Mobile-responsive design

### ERP System
- **Admin Portal:** Complete management dashboard
  - Student/teacher management
  - Fee collection tracking
  - Attendance monitoring
  - CRM for lead management
  - Analytics and reporting

- **Teacher Portal:**
  - Attendance marking
  - Study materials upload
  - Exam management
  - Student progress tracking

- **Student Portal:**
  - Course materials access
  - Exam schedules and results
  - Fee payment tracking
  - Certificate downloads

---

## 🎨 Design System

The platform uses a comprehensive design system defined in `css/variables.css`:

- **Colors:** Primary, semantic, neutral scales
- **Typography:** Inter font family with 9 size scales
- **Spacing:** 8px base grid system
- **Shadows:** 4-level shadow system
- **Transitions:** Predefined easing curves

---

## 🔒 Authentication & Demo Setup

### ⚡ Quick Setup (3 Steps)

**Step 1:** Get your Supabase service role key
- Dashboard → Settings → API → Copy **service_role** key

**Step 2:** Add to `.env` file
```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Step 3:** Run automated setup
```bash
npm run setup-demo
```

### Demo Accounts (After Setup)

**Admin:**
- Email: admin@whitebanger.org
- Password: Admin@123

**Teacher:**
- Email: teacher@whitebanger.org
- Password: Teacher@123

**Student:**
- Email: student@whitebanger.org
- Password: Student@123

> 📖 **Detailed Guide:** See [QUICK_FIX_DEMO_LOGIN.md](QUICK_FIX_DEMO_LOGIN.md)

> ⚠️ **Important:** Change these credentials before production deployment!

### Production Setup
1. Delete demo users from Supabase Auth
2. Change all demo passwords
3. Implement password reset functionality
4. Enable email verification

---

## 🏗️ Build Process

### Development
```bash
npm run dev        # Start dev server on port 3000
```

### Production Build
```bash
npm run build      # Minify CSS and JS
npm run preview    # Preview production build
```

The build process:
1. Minifies `wb-style.css` → `wb-style.min.css` (46KB)
2. Minifies `wb-script.js` → `wb-script.min.js` (14KB)
3. Minifies `wb-translations.js` → `wb-translations.min.js` (64KB)

---

## 🌐 Deployment

### Recommended Hosting
- **Static Site:** Netlify, Vercel, Cloudflare Pages
- **Database:** Supabase (included)
- **CDN:** Cloudflare

### Deployment Steps
1. Build the project: `npm run build`
2. Deploy `dist/` folder to hosting service
3. Configure environment variables in hosting dashboard
4. Set up custom domain and SSL

---

## 🔧 Configuration

Edit `config.js` to customize:

```javascript
export const Config = {
  app: {
    name: 'White Banger',
    version: '1.0.0'
  },
  contact: {
    phone: '+91 97283-20132',
    whatsapp: '919728320132',
    email: 'prikshit@whitebanger.org'
  },
  features: {
    enableAnalytics: false,
    enableChat: true,
    lazyLoadImages: true
  }
};
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Forms submit successfully
- [ ] ERP login works for all roles
- [ ] Mobile responsive design
- [ ] Accessibility (keyboard navigation)
- [ ] Performance (Lighthouse score 90+)

### Browser Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 📊 Performance

### Optimization Features
- Lazy loading images with IntersectionObserver
- Minified CSS and JavaScript
- Debounced scroll/resize handlers
- Request Idle Callback for non-critical tasks
- Preloading critical resources

### Expected Metrics
- **First Contentful Paint:** <1s
- **Time to Interactive:** <2.5s
- **Lighthouse Score:** 92+

---

## ♿ Accessibility

### Features
- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- Screen reader friendly
- ARIA labels and live regions
- Skip to content link
- Focus management in modals

---

## 🐛 Troubleshooting

### Common Issues

**Build fails:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Supabase connection error:**
- Verify credentials in `.env`
- Check Supabase project is active
- Confirm database schema is deployed

**Images not loading:**
- Ensure images are in correct folders
- Check file paths in HTML
- Verify lazy loading is working

**ERP login not working:**
- Deploy database schema first
- Check browser console for errors
- Verify Supabase Auth is enabled

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Web Accessibility Guide](https://www.w3.org/WAI/WCAG21/quickref/)
- [Performance Best Practices](https://web.dev/fast/)

---

## 🤝 Support

For issues or questions:
- Email: prikshit@whitebanger.org
- WhatsApp: +91 97283-20132

---

## 📄 License

Copyright © 2026 White Banger Tech Private Limited
All rights reserved.

---

**Last Updated:** 2026-03-19
**Version:** 1.0.0
