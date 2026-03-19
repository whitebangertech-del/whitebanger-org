// =========================================================
//  WHITE BANGER ERP — SHARED SERVICES
//  API Integration Layer for Supabase
// =========================================================

// TODO: Uncomment when ready to use Supabase
// import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
// const supabase = createClient(
//   'https://0ec90b57d6e95fcbda19832f.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
// );

/**
 * Enquiry Service
 * Manages admission enquiries
 */
const EnquiryService = {
  /**
   * Create new enquiry
   * @param {Object} enquiryData - Enquiry form data
   * @returns {Promise<Object>} Created enquiry
   */
  async create(enquiryData) {
    // TODO: Replace with Supabase
    // const { data, error } = await supabase
    //   .from('enquiries')
    //   .insert([enquiryData])
    //   .select()
    //   .single();
    // if (error) throw error;
    // return data;

    // Mock implementation
    const enquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
    const newEnquiry = {
      id: 'ENQ' + String(enquiries.length + 1).padStart(4, '0'),
      ...enquiryData,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    enquiries.push(newEnquiry);
    localStorage.setItem('enquiries', JSON.stringify(enquiries));
    return newEnquiry;
  },

  /**
   * Get all enquiries with optional filters
   * @param {Object} filters - Filter criteria
   * @returns {Promise<Array>} List of enquiries
   */
  async getAll(filters = {}) {
    // TODO: Replace with Supabase
    // let query = supabase.from('enquiries').select('*');
    // if (filters.status) query = query.eq('status', filters.status);
    // if (filters.course) query = query.eq('courseApplying', filters.course);
    // const { data, error } = await query;
    // if (error) throw error;
    // return data;

    const enquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
    return enquiries.filter(enq => {
      if (filters.status && enq.status !== filters.status) return false;
      if (filters.course && enq.courseApplying !== filters.course) return false;
      return true;
    });
  },

  /**
   * Update enquiry status
   * @param {string} id - Enquiry ID
   * @param {string} status - New status
   */
  async updateStatus(id, status) {
    const enquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
    const index = enquiries.findIndex(e => e.id === id);
    if (index !== -1) {
      enquiries[index].status = status;
      enquiries[index].updatedAt = new Date().toISOString();
      localStorage.setItem('enquiries', JSON.stringify(enquiries));
    }
  }
};

/**
 * Payment Service
 * Handles online payments and transactions
 */
const PaymentService = {
  /**
   * Process payment
   * @param {Object} paymentData - Payment details
   * @returns {Promise<Object>} Payment result
   */
  async processPayment(paymentData) {
    // TODO: Integrate Razorpay/Stripe
    // const options = {
    //   key: 'YOUR_RAZORPAY_KEY',
    //   amount: paymentData.amount * 100,
    //   currency: 'INR',
    //   name: 'White Banger',
    //   description: paymentData.type,
    //   handler: function(response) {
    //     return response;
    //   }
    // };
    // const rzp = new Razorpay(options);
    // rzp.open();

    // Mock implementation
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const newPayment = {
      transactionId: 'TXN' + Date.now(),
      ...paymentData,
      status: 'success',
      date: new Date().toISOString()
    };
    payments.push(newPayment);
    localStorage.setItem('payments', JSON.stringify(payments));
    return newPayment;
  },

  /**
   * Get payment history
   * @param {string} studentId - Student ID (optional)
   * @returns {Promise<Array>} Payment history
   */
  async getHistory(studentId = null) {
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    if (studentId) {
      return payments.filter(p => p.studentId === studentId);
    }
    return payments;
  },

  /**
   * Generate payment receipt
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Receipt data
   */
  async generateReceipt(transactionId) {
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const payment = payments.find(p => p.transactionId === transactionId);
    if (!payment) throw new Error('Payment not found');

    return {
      ...payment,
      receiptNumber: 'RCP' + Date.now(),
      generatedAt: new Date().toISOString()
    };
  }
};

/**
 * Result Service
 * Manages exam results and marksheets
 */
const ResultService = {
  /**
   * Add exam result
   * @param {Object} resultData - Result details
   * @returns {Promise<Object>} Created result
   */
  async addResult(resultData) {
    // TODO: Replace with Supabase
    // const { data, error } = await supabase
    //   .from('exam_results')
    //   .insert([resultData])
    //   .select()
    //   .single();

    const results = JSON.parse(localStorage.getItem('exam_results') || '[]');
    const percentage = (resultData.marks / resultData.totalMarks) * 100;
    const newResult = {
      id: 'RES' + String(results.length + 1).padStart(4, '0'),
      ...resultData,
      percentage: percentage.toFixed(2),
      grade: this.calculateGrade(percentage),
      status: percentage >= 40 ? 'pass' : 'fail',
      createdAt: new Date().toISOString()
    };
    results.push(newResult);
    localStorage.setItem('exam_results', JSON.stringify(results));
    return newResult;
  },

  /**
   * Calculate grade based on percentage
   * @param {number} percentage - Percentage score
   * @returns {string} Grade
   */
  calculateGrade(percentage) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  },

  /**
   * Get student results
   * @param {string} studentId - Student ID
   * @returns {Promise<Array>} Student results
   */
  async getStudentResults(studentId) {
    const results = JSON.parse(localStorage.getItem('exam_results') || '[]');
    return results.filter(r => r.studentId === studentId);
  }
};

/**
 * Certificate Service
 * Manages certificates and verification
 */
const CertificateService = {
  /**
   * Verify certificate
   * @param {string} certificateId - Certificate ID
   * @returns {Promise<Object|null>} Certificate data or null
   */
  async verify(certificateId) {
    // TODO: Replace with Supabase
    // const { data, error } = await supabase
    //   .from('certificates')
    //   .select('*')
    //   .eq('certificate_id', certificateId)
    //   .single();

    // Mock data
    const certificates = [
      {
        id: 'CERT2024-001',
        studentName: 'Rajesh Kumar',
        course: 'Digital Marketing',
        issueDate: '2024-01-15',
        grade: 'A+',
        status: 'valid'
      },
      {
        id: 'CERT2024-002',
        studentName: 'Priya Sharma',
        course: 'Software Development',
        issueDate: '2024-02-20',
        grade: 'A',
        status: 'valid'
      }
    ];

    return certificates.find(c => c.id === certificateId) || null;
  },

  /**
   * Generate certificate
   * @param {string} studentId - Student ID
   * @param {string} courseId - Course ID
   * @returns {Promise<Object>} Certificate data
   */
  async generate(studentId, courseId) {
    // TODO: Implement certificate generation logic
    const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    const newCert = {
      id: 'CERT' + new Date().getFullYear() + '-' + String(certificates.length + 1).padStart(3, '0'),
      studentId,
      courseId,
      issueDate: new Date().toISOString().split('T')[0],
      status: 'valid',
      createdAt: new Date().toISOString()
    };
    certificates.push(newCert);
    localStorage.setItem('certificates', JSON.stringify(certificates));
    return newCert;
  }
};

/**
 * Document Service
 * Handles ID cards, admit cards, etc.
 */
const DocumentService = {
  /**
   * Generate ID card data
   * @param {string} studentId - Student ID
   * @returns {Promise<Object>} ID card data
   */
  async generateIDCard(studentId) {
    const student = ERP_DATA.students.find(s => s.id === studentId);
    if (!student) throw new Error('Student not found');

    const validity = new Date(student.enroll);
    validity.setFullYear(validity.getFullYear() + 1);

    return {
      studentId: student.id,
      name: student.name,
      course: student.course,
      photo: student.avatar,
      validUntil: validity.toISOString().split('T')[0],
      bloodGroup: 'O+',
      contact: '+91 97283-20132'
    };
  },

  /**
   * Generate admit card data
   * @param {string} studentId - Student ID
   * @param {string} examId - Exam ID
   * @returns {Promise<Object>} Admit card data
   */
  async generateAdmitCard(studentId, examId) {
    const student = ERP_DATA.students.find(s => s.id === studentId);
    const exam = ERP_DATA.exams.find(e => e.id === examId);

    if (!student || !exam) throw new Error('Student or Exam not found');

    return {
      studentId: student.id,
      studentName: student.name,
      course: student.course,
      examId: exam.id,
      examName: exam.name,
      examDate: exam.date,
      duration: exam.duration,
      totalMarks: exam.totalMarks,
      center: 'White Banger Main Campus',
      photo: student.avatar
    };
  }
};

/**
 * Notification Service
 * Send notifications via email/SMS/WhatsApp
 */
const NotificationService = {
  /**
   * Send notification
   * @param {Object} notificationData - Notification details
   * @returns {Promise<Object>} Send result
   */
  async send(notificationData) {
    // TODO: Integrate with email service (SendGrid/AWS SES) and SMS gateway
    console.log('Sending notification:', notificationData);

    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const newNotification = {
      id: 'NOT' + String(notifications.length + 1).padStart(4, '0'),
      ...notificationData,
      status: 'sent',
      sentAt: new Date().toISOString()
    };
    notifications.push(newNotification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    return newNotification;
  }
};

// Export services
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EnquiryService,
    PaymentService,
    ResultService,
    CertificateService,
    DocumentService,
    NotificationService
  };
}
