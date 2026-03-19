/**
 * Form Service - Supabase Integration
 * Handles all form submissions and connects to Supabase database
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Submit contact/inquiry form
 * @param {Object} formData - Form data object
 * @returns {Promise<Object>} Response object
 */
export async function submitInquiryForm(formData) {
  try {
    const { data, error } = await supabase
      .from('crm_leads')
      .insert([
        {
          id: `LEAD-${Date.now()}`,
          name: formData.name || `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone || formData.contact,
          course: formData.course || formData.courseSelection || 'General Inquiry',
          source: formData.source || 'website',
          stage: 'new',
          notes: formData.message || formData.address || '',
          follow_up_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ])
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Submit internship application
 * @param {Object} formData - Internship form data
 * @returns {Promise<Object>} Response object
 */
export async function submitInternshipForm(formData) {
  try {
    const { data, error } = await supabase
      .from('crm_leads')
      .insert([
        {
          id: `INTERN-${Date.now()}`,
          name: formData.fullName,
          email: formData.email,
          phone: formData.mobile,
          course: formData.selectedCourse,
          source: 'internship_application',
          stage: 'new',
          notes: `Internship Application\nFather: ${formData.fatherName}\nCollege: ${formData.collegeName}\nQualification: ${formData.qualification}\nRoll No: ${formData.universityRollNo}`,
          follow_up_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ])
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error submitting internship application:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Verify certificate by certificate number
 * @param {string} certificateNumber - Certificate number to verify
 * @returns {Promise<Object>} Certificate data or error
 */
export async function verifyCertificate(certificateNumber) {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('certificate_number', certificateNumber.toUpperCase())
      .eq('status', 'active')
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return {
        success: false,
        message: 'Certificate not found or invalid'
      };
    }

    return {
      success: true,
      certificate: data
    };
  } catch (error) {
    console.error('Error verifying certificate:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Submit payment record
 * @param {Object} paymentData - Payment information
 * @returns {Promise<Object>} Response object
 */
export async function submitPayment(paymentData) {
  try {
    const transactionId = `TXN${Date.now()}`;

    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          student_id: paymentData.studentId,
          amount: parseFloat(paymentData.amount),
          payment_type: paymentData.paymentType || 'tuition_fee',
          payment_method: paymentData.paymentMethod,
          transaction_id: transactionId,
          status: 'completed',
          payment_date: new Date().toISOString().split('T')[0],
          notes: paymentData.notes || ''
        }
      ])
      .select();

    if (error) throw error;

    return {
      success: true,
      data,
      transactionId
    };
  } catch (error) {
    console.error('Error submitting payment:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get student fee details
 * @param {string} studentId - Student ID
 * @returns {Promise<Object>} Fee details
 */
export async function getStudentFees(studentId) {
  try {
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('fee, paid')
      .eq('id', studentId)
      .maybeSingle();

    if (studentError) throw studentError;

    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('amount, payment_date, payment_type, status')
      .eq('student_id', studentId)
      .eq('status', 'completed')
      .order('payment_date', { ascending: false });

    if (paymentsError) throw paymentsError;

    const totalPaid = payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
    const totalFee = student?.fee || 0;
    const remaining = totalFee - totalPaid;

    return {
      success: true,
      totalFee,
      totalPaid,
      remaining,
      payments: payments || []
    };
  } catch (error) {
    console.error('Error fetching student fees:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Submit exam result
 * @param {Object} resultData - Exam result data
 * @returns {Promise<Object>} Response object
 */
export async function submitExamResult(resultData) {
  try {
    const { data, error } = await supabase
      .from('exam_results')
      .insert([
        {
          student_id: resultData.studentId,
          exam_id: resultData.examId,
          marks_obtained: parseInt(resultData.marksObtained),
          total_marks: parseInt(resultData.totalMarks),
          percentage: parseFloat(resultData.percentage),
          grade: resultData.grade,
          rank: parseInt(resultData.rank) || null,
          remarks: resultData.remarks || ''
        }
      ])
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error submitting exam result:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Add new enquiry/admission
 * @param {Object} enquiryData - Enquiry data
 * @returns {Promise<Object>} Response object
 */
export async function submitEnquiry(enquiryData) {
  try {
    const { data, error } = await supabase
      .from('crm_leads')
      .insert([
        {
          id: `ENQ-${Date.now()}`,
          name: enquiryData.studentName,
          email: enquiryData.email,
          phone: enquiryData.contactNumber,
          course: enquiryData.courseApplying,
          source: enquiryData.source || 'direct',
          stage: 'new',
          notes: `Parent: ${enquiryData.parentName}\nWhatsApp: ${enquiryData.whatsappNumber}\nAddress: ${enquiryData.address}\nPrevious School: ${enquiryData.previousSchool}\nDOB: ${enquiryData.dob}\nGender: ${enquiryData.gender}\nPreferred Mode: ${enquiryData.preferredMode}\nRemarks: ${enquiryData.remarks}`,
          follow_up_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ])
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return { success: false, error: error.message };
  }
}

// Export supabase client for direct use if needed
export { supabase };
