// =========================================================
//  WHITE BANGER ERP — EMAIL CONFIG & HELPER
//  Front-end side: posts to /api/send-email
//  Backend: see email-server.js (Node.js + Nodemailer)
// =========================================================

const ERPEmailConfig = {
  // ↓ Update this to match where you run email-server.js
  API_ENDPOINT: 'http://localhost:3001/api/send-email',

  // Default sender (must match Google Workspace account)
  FROM_NAME:  'White Banger Tech',
  FROM_EMAIL: 'noreply@whitebanger.com',
};

const ERPEmail = {
  /**
   * Send an email via the backend SMTP relay
   * @param {string} to       Recipient email
   * @param {string} subject  Email subject
   * @param {string} body     Plain text body (html also accepted)
   * @param {boolean} isHtml  If true, sends as HTML email
   */
  async send(to, subject, body, isHtml = false) {
    try {
      ERPToast.show('Sending...', `Email to ${to}`, 'info', 2000);
      const res = await fetch(ERPEmailConfig.API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from:    `${ERPEmailConfig.FROM_NAME} <${ERPEmailConfig.FROM_EMAIL}>`,
          to,
          subject,
          [isHtml ? 'html' : 'text']: body,
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      ERPToast.show('Email Sent ✅', `Delivered to ${to}`, 'success', 4000);
      return { success: true, messageId: data.messageId };
    } catch (err) {
      ERPToast.show('Email Failed', err.message || 'Could not reach email server.', 'error', 5000);
      return { success: false, error: err.message };
    }
  },

  /**
   * Send bulk notification to a list of recipients
   * @param {Array} recipients  [{ name, email }]
   * @param {string} subject
   * @param {Function} bodyFn   (recipient) => body string
   */
  async sendBulk(recipients, subject, bodyFn) {
    let sent = 0, failed = 0;
    for (const r of recipients) {
      const result = await this.send(r.email, subject, bodyFn(r));
      result.success ? sent++ : failed++;
    }
    ERPToast.show(
      'Bulk Send Complete',
      `${sent} sent · ${failed} failed out of ${recipients.length}`,
      sent > 0 ? 'success' : 'error',
      5000
    );
    return { sent, failed };
  },

  /**
   * Pre-built templates
   */
  templates: {
    feeReminder: (student) => ({
      subject: `Fee Payment Reminder — ${student.course}`,
      body: `Dear ${student.name},\n\nThis is a reminder that your fee balance of ₹${Number(student.fee - student.paid).toLocaleString('en-IN')} is outstanding for ${student.course}.\n\nPlease log in to your student portal to make a payment:\nhttps://whitebanger.com/erp/student-fees.html\n\nFor queries, contact us at accounts@whitebanger.com or +91 97283 20132.\n\nRegards,\nWhite Banger Tech Pvt Ltd`
    }),
    examNotice: (student, exam) => ({
      subject: `Exam Notice: ${exam.title}`,
      body: `Dear ${student.name},\n\nYour upcoming exam details:\n\n📝 Exam:     ${exam.title}\n📅 Date:     ${new Date(exam.date).toLocaleDateString('en-IN')}\n⏱ Duration: ${exam.duration} minutes\n📊 Marks:    ${exam.totalMarks}\n\nLog in to take the exam:\nhttps://whitebanger.com/erp/student-exams.html\n\nBest of luck!\nWhite Banger Team`
    }),
    admissionFollowup: (lead) => ({
      subject: `Following up on your ${lead.course} enquiry`,
      body: `Hi ${lead.name},\n\nThank you for your interest in the ${lead.course} course at White Banger Tech!\n\nWe have new batches starting soon with early bird discounts. Reply to this email or call us at +91 97283 20132 to know more.\n\nWarm regards,\n${lead.counselor}\nWhite Banger Tech Pvt Ltd`
    }),
  }
};
