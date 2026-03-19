# ERP System - Supabase Database Integration

This document explains how the ERP system is integrated with Supabase for real-time data synchronization.

## Architecture Overview

The ERP system uses Supabase as the backend database with real-time capabilities. All data is synced in real-time across all connected clients.

### Key Components

1. **supabase-client.js** - Supabase client configuration and real-time manager
2. **db-service.js** - Service layer for all database operations
3. **auth-service.js** - Authentication service using Supabase Auth
4. **seed-data.js** - Initial data seeding script

## Database Schema

The system includes the following tables:

- `profiles` - User profiles with roles (admin, teacher, student)
- `students` - Student records
- `teachers` - Teacher profiles
- `courses` - Course catalog
- `attendance` - Daily attendance records
- `exams` - Exam definitions
- `exam_results` - Student exam results
- `payments` - Fee payment records
- `crm_leads` - Lead management
- `study_materials` - Course materials
- `placements` - Student placements
- `notifications` - System notifications
- `monthly_revenue` - Revenue tracking

## Getting Started

### 1. Initial Setup

The database schema has already been created. To populate it with demo data:

1. Open your browser console on any ERP page
2. Run: `window.seedDatabase()` (if available)
3. Or manually import and run the seed-data.js script

### 2. Using the Services

Import the services you need:

```javascript
import { AuthService, StudentsService, CoursesService } from './db-service.js';

// Example: Get all students
const students = await StudentsService.getAll();

// Example: Get student by ID
const student = await StudentsService.getById('STU001');

// Example: Create new student
const newStudent = await StudentsService.create({
  id: 'STU011',
  name: 'John Doe',
  email: 'john@example.com',
  // ... other fields
});
```

### 3. Real-time Subscriptions

Subscribe to table changes for live updates:

```javascript
import { realtimeManager } from './supabase-client.js';

// Subscribe to students table
realtimeManager.subscribe('students', (payload) => {
  console.log('Student data changed:', payload);
  // Update UI accordingly
});

// Unsubscribe when done
realtimeManager.unsubscribe('students');
```

## Authentication

### Login Flow

1. User enters email and password
2. System authenticates via Supabase Auth
3. User profile is fetched from `profiles` table
4. Session is maintained automatically

### Role-Based Access

The system supports three roles:

- **Admin** - Full access to all features
- **Teacher** - Access to teaching-related features
- **Student** - Access to student portal only

Row Level Security (RLS) policies ensure users can only access authorized data.

## Migration to Supabase

The ERP system is being migrated from localStorage to Supabase. Here's the migration strategy:

### Phase 1: Dual Mode (Current)
- Old code still uses `erp-data.js` (localStorage)
- New code uses `db-service.js` (Supabase)
- Both systems can coexist during migration

### Phase 2: Full Migration
- Replace all localStorage calls with Supabase service calls
- Remove `erp-data.js` dependency
- Enable real-time features across all modules

### Phase 3: Enhancement
- Add real-time notifications
- Implement collaborative features
- Add offline support with sync

## Services API Reference

### AuthService
- `signUp(email, password, userData)` - Register new user
- `signIn(email, password)` - Login user
- `signOut()` - Logout user
- `getCurrentUser()` - Get current authenticated user
- `getUserProfile()` - Get user profile with role

### StudentsService
- `getAll()` - Get all students
- `getById(id)` - Get student by ID
- `getByUserId(userId)` - Get student by user ID
- `create(data)` - Create new student
- `update(id, data)` - Update student
- `delete(id)` - Delete student

### TeachersService
- `getAll()` - Get all teachers
- `getById(id)` - Get teacher by ID
- `create(data)` - Create new teacher
- `update(id, data)` - Update teacher

### CoursesService
- `getAll()` - Get all courses
- `getById(id)` - Get course by ID
- `create(data)` - Create new course
- `update(id, data)` - Update course

### AttendanceService
- `getByStudent(studentId)` - Get student attendance
- `getByDate(date)` - Get attendance for date
- `mark(data)` - Mark single attendance
- `bulkMark(records)` - Mark multiple attendance

### ExamsService
- `getAll()` - Get all exams
- `getById(id)` - Get exam by ID
- `getByCourse(course)` - Get exams for course
- `create(data)` - Create new exam
- `update(id, data)` - Update exam

### ResultsService
- `getByStudent(studentId)` - Get student results
- `getByExam(examId)` - Get all results for exam
- `submit(data)` - Submit exam result

### PaymentsService
- `getByStudent(studentId)` - Get student payments
- `getAll()` - Get all payments
- `create(data)` - Record new payment

### LeadsService
- `getAll()` - Get all leads
- `getByStage(stage)` - Get leads by stage
- `create(data)` - Create new lead
- `update(id, data)` - Update lead

### MaterialsService
- `getByCourse(course)` - Get materials for course
- `getAll()` - Get all materials
- `create(data)` - Upload new material
- `delete(id)` - Delete material

### PlacementsService
- `getAll()` - Get all placements
- `create(data)` - Record new placement

### NotificationsService
- `getAll()` - Get all notifications
- `create(data)` - Create new notification

### RevenueService
- `getMonthlyRevenue()` - Get monthly revenue data
- `upsertRevenue(month, year, revenue)` - Update revenue

## Security

All tables have Row Level Security (RLS) enabled with policies that:

- Students can only view/edit their own data
- Teachers can view all students but cannot delete
- Admins have full access to all data
- Authentication is required for all operations

## Best Practices

1. **Always use services** - Don't query Supabase directly
2. **Handle errors** - All service methods can throw errors
3. **Check authentication** - Use `AuthService.checkAuth()` before rendering protected pages
4. **Subscribe to changes** - Use real-time subscriptions for live data
5. **Batch operations** - Use bulk methods when updating multiple records

## Troubleshooting

### Authentication Issues
- Clear localStorage and try again
- Check browser console for errors
- Verify Supabase credentials

### Data Not Syncing
- Check network connection
- Verify RLS policies
- Check browser console for errors

### Real-time Not Working
- Verify subscription is active
- Check Supabase dashboard for connection
- Ensure table has RLS policies allowing reads

## Next Steps

1. Migrate existing pages to use Supabase services
2. Add real-time updates to dashboards
3. Implement offline support
4. Add file upload for student photos and materials
5. Add email notifications via Supabase Edge Functions
