// =========================================================
//  WHITE BANGER ERP — RAZORPAY INTEGRATION
//  Include this file AFTER erp-script.js
//  Also load: <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
// =========================================================

const ERPRazorpay = {

  // ---- CONFIG ---- Replace with your actual Razorpay Key ID ----
  KEY_ID: 'rzp_test_XXXXXXXX',   // ← paste your Razorpay Key ID here

  /**
   * Open Razorpay checkout
   * @param {Object} opts
   *   amount   - Amount in RUPEES (we convert to paise internally)
   *   name     - Payer display name
   *   email    - Payer email
   *   phone    - Payer phone (10 digits)
   *   desc     - Payment description e.g. "Digital Marketing — Fee Payment"
   *   studentId
   *   onSuccess(response) - called with Razorpay payment_id, order_id, signature
   *   onFailure(err)      - called on modal close / failure
   */
  pay(opts = {}) {
    if (typeof Razorpay === 'undefined') {
      ERPToast.show('Error', 'Razorpay SDK not loaded. Check your internet connection.', 'error');
      return;
    }
    const options = {
      key:          this.KEY_ID,
      amount:       Math.round((opts.amount || 0) * 100),   // paise
      currency:     'INR',
      name:         'White Banger Tech Pvt Ltd',
      description:  opts.desc || 'Fee Payment',
      image:        '',   // optional: URL to your logo PNG
      prefill: {
        name:    opts.name  || '',
        email:   opts.email || '',
        contact: opts.phone || '',
      },
      notes: {
        student_id:  opts.studentId || '',
        description: opts.desc || '',
      },
      theme: { color: '#1a56db' },
      modal: {
        ondismiss: () => {
          ERPToast.show('Cancelled', 'Payment window closed.', 'warning');
          if (opts.onFailure) opts.onFailure({ reason: 'dismissed' });
        }
      },
      handler: (response) => {
        // response = { razorpay_payment_id, razorpay_order_id, razorpay_signature }
        ERPToast.show(
          'Payment Successful! 🎉',
          `Payment ID: ${response.razorpay_payment_id}`,
          'success',
          6000
        );
        if (opts.onSuccess) opts.onSuccess(response);
      }
    };
    const rzp = new Razorpay(options);
    rzp.on('payment.failed', (resp) => {
      ERPToast.show('Payment Failed', resp.error.description || 'Transaction declined.', 'error');
      if (opts.onFailure) opts.onFailure(resp.error);
    });
    rzp.open();
  },

  /**
   * Generate a receipt HTML string for a completed payment
   */
  receiptHTML(paymentId, amount, name, course, date) {
    return `
      <div style="border:2px solid var(--success);border-radius:12px;padding:24px;text-align:center;margin-top:16px">
        <div style="font-size:40px;margin-bottom:8px">🧾</div>
        <div style="font-size:18px;font-weight:800;color:var(--success);margin-bottom:4px">Payment Received</div>
        <div style="font-size:28px;font-weight:900;color:var(--primary);margin-bottom:8px">₹${Number(amount).toLocaleString('en-IN')}</div>
        <div style="font-size:13px;color:var(--text-muted)">
          <div><strong>${name}</strong> · ${course}</div>
          <div style="margin-top:4px">Payment ID: <code style="font-size:11px">${paymentId}</code></div>
          <div style="margin-top:2px">Date: ${date}</div>
        </div>
      </div>`;
  }
};
