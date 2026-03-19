// =========================================================
//  WHITE BANGER ERP — SHARED SCRIPT
// =========================================================

// ---- THEME ----
const ERPTheme = {
  init() {
    const saved = localStorage.getItem('erp_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    this.updateToggle(saved);
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('erp_theme', next);
    this.updateToggle(next);
  },
  updateToggle(theme) {
    const btn = document.getElementById('erp-theme-toggle');
    if (!btn) return;
    btn.innerHTML = theme === 'dark'
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .38-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.38.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>';
  }
};

// ---- SIDEBAR ----
const ERPSidebar = {
  init() {
    const toggle = document.getElementById('erp-sidebar-toggle');
    const sidebar = document.querySelector('.erp-sidebar');
    const main = document.querySelector('.erp-main');
    const overlay = document.querySelector('.erp-overlay-drop');
    if (!sidebar) return;
    toggle?.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-open');
        overlay?.classList.toggle('open');
      } else {
        sidebar.classList.toggle('collapsed');
        main?.classList.toggle('sidebar-collapsed');
        localStorage.setItem('erp_sidebar_collapsed', sidebar.classList.contains('collapsed'));
      }
    });
    overlay?.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('open');
    });
    // Restore collapsed state
    if (localStorage.getItem('erp_sidebar_collapsed') === 'true' && window.innerWidth > 768) {
      sidebar.classList.add('collapsed');
      main?.classList.add('sidebar-collapsed');
    }
  }
};

// ---- TOPBAR USER ----
const ERPTopbar = {
  init() {
    const user = ERPAuth.current();
    if (!user) return;
    // Avatar
    const avatarEls = document.querySelectorAll('.erp-topbar-avatar');
    avatarEls.forEach(el => { el.textContent = user.avatar; });
    // User name in sidebar footer
    const sidebarName = document.querySelector('.erp-user-info strong');
    const sidebarRole = document.querySelector('.erp-user-info span');
    if (sidebarName) sidebarName.textContent = user.name;
    if (sidebarRole) sidebarRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    // Sidebar avatar
    const sidebarAvatar = document.querySelector('.erp-sidebar-footer .erp-user-avatar');
    if (sidebarAvatar) sidebarAvatar.textContent = user.avatar;
    // Role badge
    const roleBadge = document.querySelector('.erp-role-badge');
    if (roleBadge) {
      roleBadge.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
      roleBadge.className = `erp-role-badge ${user.role}`;
    }
    // Logout
    document.querySelectorAll('[data-action="logout"]').forEach(el => {
      el.addEventListener('click', () => ERPAuth.logout());
    });
    // Theme toggle
    const themeBtn = document.getElementById('erp-theme-toggle');
    themeBtn?.addEventListener('click', () => ERPTheme.toggle());
  }
};

// ---- TOAST ----
const ERPToast = {
  container: null,
  init() {
    let c = document.querySelector('.erp-toast-container');
    if (!c) { c = document.createElement('div'); c.className = 'erp-toast-container'; document.body.appendChild(c); }
    this.container = c;
  },
  show(title, msg = '', type = 'info', duration = 3500) {
    if (!this.container) this.init();
    const icons = { success: '&#10003;', error: '&#10007;', info: 'i', warning: '!' };
    const iconColors = { success: 'var(--success)', error: 'var(--danger)', info: 'var(--primary)', warning: 'var(--warning)' };
    const t = document.createElement('div');
    t.className = `erp-toast ${type}`;
    t.innerHTML = `<div class="erp-toast-icon" style="background:${iconColors[type]||'var(--primary)'};color:#fff;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700">${icons[type]||'i'}</div>
      <div class="erp-toast-content">
        <div class="erp-toast-title">${title}</div>
        ${msg ? `<div class="erp-toast-msg">${msg}</div>` : ''}
      </div>`;
    this.container.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(40px)'; t.style.transition = 'all 0.3s'; setTimeout(() => t.remove(), 300); }, duration);
  }
};

// ---- MODAL ----
const ERPModal = {
  open(id) {
    const el = document.getElementById(id);
    if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
  },
  close(id) {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
  },
  initClose() {
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const overlay = btn.closest('.erp-modal-overlay');
        if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
      });
    });
    document.querySelectorAll('.erp-modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
      });
    });
  }
};

// ---- CHART HELPERS (Chart.js) ----
const ERPCharts = {
  defaults() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      color: isDark ? '#94a3b8' : '#6b7280',
      gridColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
      font: { family: 'Inter', size: 12 }
    };
  },
  bar(ctx, labels, data, label = '', color = '#1a56db') {
    const d = this.defaults();
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label, data, backgroundColor: color + 'cc', borderColor: color, borderWidth: 2, borderRadius: 6 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: !!label, labels: { color: d.color, font: d.font } } },
        scales: {
          x: { grid: { color: d.gridColor }, ticks: { color: d.color, font: d.font } },
          y: { grid: { color: d.gridColor }, ticks: { color: d.color, font: d.font } }
        }
      }
    });
  },
  doughnut(ctx, labels, data, colors) {
    const d = this.defaults();
    return new Chart(ctx, {
      type: 'doughnut',
      data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 6 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '68%',
        plugins: { legend: { position: 'bottom', labels: { color: d.color, font: d.font, padding: 14, boxWidth: 12, usePointStyle: true } } }
      }
    });
  },
  line(ctx, labels, data, label = '', color = '#1a56db') {
    const d = this.defaults();
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{ label, data, borderColor: color, backgroundColor: color + '1a', fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: color }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: d.gridColor }, ticks: { color: d.color, font: d.font } },
          y: { grid: { color: d.gridColor }, ticks: { color: d.color, font: d.font } }
        }
      }
    });
  }
};

// ---- TABLE HELPERS ----
const ERPTable = {
  renderRows(tbodyId, rows) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    tbody.innerHTML = rows.join('');
  },
  avatarBg(initials) {
    const colors = ['#1a56db','#10b981','#f59e0b','#8b5cf6','#ef4444','#06b6d4','#ec4899'];
    let hash = 0;
    for (const c of initials) hash += c.charCodeAt(0);
    return colors[hash % colors.length];
  },
  statusBadge(status) {
    const map = {
      active: 'success', inactive: 'danger', pending: 'warning', present: 'success',
      absent: 'danger', late: 'warning', paid: 'success', overdue: 'danger', partial: 'warning'
    };
    return `<span class="erp-badge erp-badge-${map[status]||'gray'}">${status.charAt(0).toUpperCase()+status.slice(1)}</span>`;
  },
  fmtCurrency(n) { return '₹' + Number(n).toLocaleString('en-IN'); },
  fmtDate(d)     { return d ? new Date(d).toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'}) : '-'; },
  fmtPercent(n)  { return n + '%'; },
  progressBar(pct, color='blue') {
    return `<div class="erp-progress" style="width:100px"><div class="erp-progress-bar ${color}" style="width:${pct}%"></div></div> <span style="font-size:12px;color:var(--text-muted)">${pct}%</span>`;
  }
};

// ---- CSV EXPORT ----
const ERPExport = {
  toCSV(data, filename = 'export.csv') {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(r => Object.values(r).map(v => `"${v}"`).join(','));
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    ERPToast.show('Export Ready', `${filename} downloaded.`, 'success');
  }
};

// ---- CERTIFICATE QR ----
const ERPCertificate = {
  generate(student, course, date, certId) {
    const canvas = document.getElementById('cert-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 800; canvas.height = 560;
    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 800, 560);
    grad.addColorStop(0, '#0d1b3e'); grad.addColorStop(1, '#1a56db');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 800, 560);
    // Border
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 760, 520);
    ctx.strokeStyle = 'rgba(251,181,14,0.5)';  ctx.lineWidth = 1;
    ctx.strokeRect(28, 28, 744, 504);
    // Brand
    ctx.fillStyle = '#FBB50E'; ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('WHITE BANGER TECH PVT LTD', 400, 80);
    // Title
    ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '300 22px Inter, sans-serif';
    ctx.fillText('Certificate of Completion', 400, 130);
    // Student
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 38px Inter, sans-serif';
    ctx.fillText(student, 400, 210);
    // Underline
    ctx.fillStyle = '#FBB50E'; ctx.fillRect(200, 225, 400, 3);
    // Course
    ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.font = '500 18px Inter, sans-serif';
    ctx.fillText('has successfully completed the course', 400, 270);
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 26px Inter, sans-serif';
    ctx.fillText(course, 400, 310);
    // Date
    ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = '400 14px Inter, sans-serif';
    ctx.fillText(`Date of Completion: ${date}`, 400, 360);
    // Cert ID
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '400 11px Inter, sans-serif';
    ctx.fillText(`Certificate ID: ${certId}`, 400, 510);
    // Signature line
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(100, 440); ctx.lineTo(300, 440); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(500, 440); ctx.lineTo(700, 440); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '400 11px Inter, sans-serif';
    ctx.fillText('Principal Signature', 200, 460);
    ctx.fillText('Course Director', 600, 460);
    // Download
    const dl = document.getElementById('cert-download');
    if (dl) {
      dl.href = canvas.toDataURL('image/png');
      dl.download = `Certificate_${certId}.png`;
    }
  }
};

// ---- EXAM ENGINE ----
const ERPExamEngine = {
  exam: null, current: 0, answers: [], timer: null, timeLeft: 0,
  init(exam) {
    this.exam = exam; this.current = 0;
    this.answers = new Array(exam.questions.length).fill(null);
    this.timeLeft = exam.duration * 60;
    this.render();
    this.startTimer();
  },
  render() {
    const q = this.exam.questions[this.current];
    const total = this.exam.questions.length;
    document.getElementById('exam-q-num').textContent = `Question ${this.current+1} of ${total}`;
    document.getElementById('exam-question').textContent = q.q;
    document.getElementById('exam-progress-bar').style.width = `${((this.current+1)/total)*100}%`;
    const opts = document.getElementById('exam-options'); if (!opts) return;
    opts.innerHTML = q.options.map((opt,i) =>
      `<div class="erp-exam-option${this.answers[this.current]===i?' selected':''}" onclick="ERPExamEngine.select(${i})">
        <div class="erp-exam-option-letter">${String.fromCharCode(65+i)}</div> ${opt}
      </div>`
    ).join('');
    document.getElementById('exam-prev').disabled = this.current === 0;
  },
  select(idx) {
    this.answers[this.current] = idx;
    this.render();
  },
  next() {
    if (this.current < this.exam.questions.length - 1) { this.current++; this.render(); }
  },
  prev() {
    if (this.current > 0) { this.current--; this.render(); }
  },
  startTimer() {
    this.timer = setInterval(() => {
      this.timeLeft--;
      const m = Math.floor(this.timeLeft/60).toString().padStart(2,'0');
      const s = (this.timeLeft%60).toString().padStart(2,'0');
      const el = document.getElementById('exam-timer'); if (el) el.textContent = `${m}:${s}`;
      if (this.timeLeft <= 60) { if (el) el.parentElement.style.background = 'var(--danger)'; }
      if (this.timeLeft <= 0) this.submit();
    }, 1000);
  },
  submit() {
    clearInterval(this.timer);
    let score = 0;
    this.exam.questions.forEach((q,i) => { if (this.answers[i] === q.answer) score++; });
    const total = this.exam.questions.length;
    const pct = Math.round((score/total)*100);
    const pass = pct >= 40;
    // Show results
    document.getElementById('exam-screen').style.display = 'none';
    const res = document.getElementById('result-screen'); if (!res) return;
    res.style.display = 'block';
    res.innerHTML = `
      <div class="erp-exam-card" style="text-align:center">
        <div style="font-size:32px;font-weight:900;margin-bottom:16px;color:${pass?'var(--success)':'var(--danger)'}">${pass?'PASS':'FAIL'}</div>
        <h2 style="font-size:24px;font-weight:800;margin-bottom:8px">${pass?'Congratulations!':'Better Luck Next Time!'}</h2>
        <p style="color:var(--text-muted);margin-bottom:24px">You have ${pass?'passed':'failed'} the ${this.exam.title}</p>
        <div style="display:flex;justify-content:center;gap:24px;flex-wrap:wrap;margin-bottom:24px">
          <div class="erp-place-stat"><div class="erp-place-stat-val" style="color:${pass?'var(--success)':'var(--danger)'}">${pct}%</div><div class="erp-place-stat-lbl">Score</div></div>
          <div class="erp-place-stat"><div class="erp-place-stat-val">${score}/${total}</div><div class="erp-place-stat-lbl">Correct Answers</div></div>
          <div class="erp-place-stat"><div class="erp-place-stat-val"><span class="erp-badge ${pass?'erp-badge-success':'erp-badge-danger'}" style="font-size:14px">${pass?'PASS':'FAIL'}</span></div><div class="erp-place-stat-lbl">Result</div></div>
        </div>
        <a href="student-dashboard.html" class="erp-btn erp-btn-primary">Back to Dashboard</a>
      </div>`;
  }
};

// ---- SHARED INIT ----
document.addEventListener('DOMContentLoaded', () => {
  ERPTheme.init();
  ERPSidebar.init();
  ERPTopbar.init();
  ERPModal.initClose();
  ERPToast.init();
});
