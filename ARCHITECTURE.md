# White Banger Platform - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     WHITE BANGER PLATFORM                        │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐    ┌──────────────────────────────┐
│   PUBLIC WEBSITE             │    │   ERP SYSTEM                 │
├──────────────────────────────┤    ├──────────────────────────────┤
│                              │    │                              │
│  • Course Catalog            │    │  Admin Portal:               │
│  • Testimonials              │    │    • Dashboard               │
│  • Placements                │    │    • Student Management      │
│  • Contact Forms             │    │    • Fee Tracking            │
│  • Multilingual (EN/HI/PA)   │    │    • CRM                     │
│  • Mobile Responsive         │    │    • Reports                 │
│                              │    │                              │
│                              │    │  Teacher Portal:             │
│                              │    │    • Attendance              │
│                              │    │    • Materials               │
│                              │    │    • Exams                   │
│                              │    │                              │
│                              │    │  Student Portal:             │
│                              │    │    • Materials Access        │
│                              │    │    • Results                 │
│                              │    │    • Certificates            │
└──────────────┬───────────────┘    └──────────────┬───────────────┘
               │                                   │
               └───────────────┬───────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   SHARED MODULES    │
                    ├─────────────────────┤
                    │ • config.js         │
                    │ • performance.js    │
                    │ • accessibility.js  │
                    │ • Design System     │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   SUPABASE          │
                    ├─────────────────────┤
                    │ • Authentication    │
                    │ • PostgreSQL DB     │
                    │ • Row Level Security│
                    │ • Real-time Updates │
                    │ • Storage           │
                    └─────────────────────┘
```

## Data Flow

```
User Request
     │
     ▼
┌─────────────────────┐
│   Browser/Client    │
│   • HTML/CSS/JS     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Authentication     │
│  • auth-service.js  │
│  • Supabase Auth    │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌─────────┐  ┌─────────┐
│ Public  │  │   ERP   │
│  Site   │  │ Portal  │
└────┬────┘  └────┬────┘
     │            │
     └─────┬──────┘
           │
           ▼
┌─────────────────────┐
│   Supabase API      │
│   • REST API        │
│   • Real-time       │
│   • Storage API     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  PostgreSQL DB      │
│  • 12 Tables        │
│  • RLS Policies     │
│  • Triggers         │
└─────────────────────┘
```

## Database Schema

```
┌────────────────┐
│   profiles     │
├────────────────┤
│ id (PK)        │
│ user_id (FK)   │──┐
│ name           │  │
│ email          │  │
│ role           │  │
│ phone          │  │
└────────────────┘  │
                    │
        ┌───────────┴───────────┬───────────────┐
        │                       │               │
        ▼                       ▼               ▼
┌────────────────┐    ┌────────────────┐  ┌────────────────┐
│   students     │    │   teachers     │  │     leads      │
├────────────────┤    ├────────────────┤  ├────────────────┤
│ id (PK)        │    │ id (PK)        │  │ id (PK)        │
│ profile_id (FK)│    │ profile_id (FK)│  │ name           │
│ student_id     │    │ teacher_id     │  │ phone          │
│ course_id (FK) │─┐  │ qualification  │  │ email          │
└────────────────┘ │  └────────────────┘  │ stage          │
                   │                      │ counselor_id(FK)│
        ┌──────────┴────────┐             └────────────────┘
        │                   │
        ▼                   ▼
┌────────────────┐  ┌────────────────┐
│   courses      │  │  attendance    │
├────────────────┤  ├────────────────┤
│ id (PK)        │  │ id (PK)        │
│ name           │  │ student_id (FK)│
│ duration       │  │ date           │
│ fee            │  │ status         │
│ teacher_id (FK)│  └────────────────┘
└────────┬───────┘
         │
         ├────────┬────────┬────────────┐
         │        │        │            │
         ▼        ▼        ▼            ▼
┌──────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
│ payments │ │ exams  │ │results │ │materials │
└──────────┘ └────────┘ └────────┘ └──────────┘
```

## Security Layers

```
┌─────────────────────────────────────────────┐
│          SECURITY ARCHITECTURE              │
└─────────────────────────────────────────────┘

Layer 1: Client-Side
├── Input Validation
├── HTTPS Enforcement
└── XSS Prevention

Layer 2: Authentication
├── Supabase Auth (JWT)
├── Password Hashing (bcrypt)
├── Session Management
└── Role-Based Access Control

Layer 3: Database
├── Row Level Security (RLS)
├── Foreign Key Constraints
├── Check Constraints
└── Audit Triggers

Layer 4: Network
├── CORS Configuration
├── Rate Limiting
├── DDoS Protection (Cloudflare)
└── API Gateway
```

## Component Hierarchy

```
App Root
│
├── Public Website
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   └── Language Switcher
│   │
│   ├── Hero Section
│   │   ├── Video Background
│   │   └── CTA Buttons
│   │
│   ├── Courses Section
│   │   └── Course Cards (x8)
│   │
│   ├── Testimonials
│   │   └── Video Grid
│   │
│   └── Footer
│       ├── Contact Info
│       ├── Quick Links
│       └── Social Media
│
└── ERP System
    ├── Login Page
    │   └── Auth Form
    │
    ├── Admin Dashboard
    │   ├── Sidebar Navigation
    │   ├── Top Bar
    │   ├── Stats Cards
    │   ├── Charts
    │   └── Data Tables
    │
    ├── Teacher Dashboard
    │   ├── Sidebar Navigation
    │   ├── Attendance Module
    │   ├── Materials Module
    │   └── Exams Module
    │
    └── Student Dashboard
        ├── Sidebar Navigation
        ├── My Courses
        ├── Exam Results
        └── Certificates
```

## Performance Optimization Flow

```
User Request
     │
     ▼
┌─────────────────────┐
│   Browser Cache     │
│   • Check cached    │
│     resources       │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     │ Cached?   │
     └─────┬─────┘
      Yes  │  No
      │    │
      │    ▼
      │  ┌─────────────────────┐
      │  │   CDN/Server        │
      │  │   • Static assets   │
      │  └──────────┬──────────┘
      │             │
      │             ▼
      │  ┌─────────────────────┐
      │  │   Lazy Loading      │
      │  │   • Images          │
      │  │   • Components      │
      │  └──────────┬──────────┘
      │             │
      └─────┬───────┘
            │
            ▼
┌─────────────────────┐
│   Render Page       │
│   • Critical CSS    │
│   • Defer non-crit  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Idle Tasks        │
│   • Analytics       │
│   • Non-critical JS │
└─────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────┐
│              PRODUCTION SETUP                │
└─────────────────────────────────────────────┘

┌──────────────┐
│    GitHub    │
│  Repository  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Netlify/   │
│   Vercel     │
│   (Build)    │
└──────┬───────┘
       │
       ├────────────┬────────────┐
       ▼            ▼            ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│   CDN    │  │ Supabase │  │Cloudflare│
│ (Assets) │  │   (DB)   │  │  (DNS)   │
└──────────┘  └──────────┘  └──────────┘
       │            │            │
       └────────────┴────────────┘
                    │
                    ▼
              ┌──────────┐
              │  Users   │
              └──────────┘
```

## Technology Stack

```
Frontend
├── HTML5
├── CSS3 (Custom Properties)
├── Vanilla JavaScript (ES6+)
└── Chart.js (for analytics)

Backend
├── Supabase
│   ├── PostgreSQL 14
│   ├── PostgREST API
│   ├── GoTrue Auth
│   └── Realtime (WebSockets)

Build Tools
├── Node.js
├── npm scripts
└── Custom minification

Hosting
├── Netlify/Vercel (Static)
├── Supabase (Database)
└── Cloudflare (CDN + DNS)

Development
├── VS Code
├── Browser DevTools
└── Git/GitHub
```

## Module Dependencies

```
index.html
├── wb-style.min.css
│   ├── css/variables.css (imported)
│   └── css/utilities.css (imported)
│
├── wb-script.min.js
│   ├── js/performance.js (imported)
│   └── js/accessibility.js (imported)
│
└── wb-translations.min.js

erp/*.html
├── erp-style.css
│   └── css/variables.css (imported)
│
├── erp-script.js
│   ├── config.js (imported)
│   ├── auth-service.js (imported)
│   └── erp-data.js (imported)
│
└── @supabase/supabase-js
```

---

**Last Updated:** 2026-03-19
**Version:** 1.0.0
