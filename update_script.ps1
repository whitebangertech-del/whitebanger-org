$ErrorActionPreference = "Stop"
$html1Path = "$PSScriptRoot\internship.html"
$html2Path = "$PSScriptRoot\internship-form.html"

function Replace-Text {
    param([string]$path, [string]$find, [string]$replace)
    $content = [System.IO.File]::ReadAllText($path)
    $content = $content.Replace($find, $replace)
    [System.IO.File]::WriteAllText($path, $content)
}

# internship.html
Replace-Text $html1Path '<div class="wb-ih-badge">✅ Internship for IT Skill Students</div>' '<div class="wb-ih-badge" data-i18n="int_hero_badge">✅ Internship for IT Skill Students</div>'
Replace-Text $html1Path '<h1 class="wb-ih-title">Launch Your Career<br>with <span class="wb-ih-highlight">AI Internship</span></h1>' '<h1 class="wb-ih-title" data-i18n="int_hero_title">Launch Your Career<br>with <span class="wb-ih-highlight">AI Internship</span></h1>'
Replace-Text $html1Path '<p class="wb-ih-desc">Industry-oriented training with expert mentors. Build your successful internship programs on real-world testing using cutting-edge technology.</p>' '<p class="wb-ih-desc" data-i18n="int_hero_desc">Industry-oriented training with expert mentors. Build your successful internship programs on real-world testing using cutting-edge technology.</p>'
Replace-Text $html1Path '<span>Office Automation with AI</span>' '<span data-i18n="int_tag_1">Office Automation with AI</span>'
Replace-Text $html1Path '<span>Advanced Excel with AI</span>' '<span data-i18n="int_tag_2">Advanced Excel with AI</span>'
Replace-Text $html1Path '<span>Prompt Engineering with AI</span>' '<span data-i18n="int_tag_3">Prompt Engineering with AI</span>'
Replace-Text $html1Path '<span>Data Science with AI</span>' '<span data-i18n="int_tag_4">Data Science with AI</span>'
Replace-Text $html1Path '<span>Accounting with AI</span>' '<span data-i18n="int_tag_5">Accounting with AI</span>'
Replace-Text $html1Path '<span>Generative AI in Marketing</span>' '<span data-i18n="int_tag_6">Generative AI in Marketing</span>'
Replace-Text $html1Path 'Explore Courses &rarr;' '<span data-i18n="int_hero_btn">Explore Courses &rarr;</span>'
Replace-Text $html1Path '<span class="wb-ig-subtitle">🚀 Advance IT Skill Center</span>' '<span class="wb-ig-subtitle" data-i18n="int_grid_sub">🚀 Advance IT Skill Center</span>'
Replace-Text $html1Path '<h2 class="wb-section-title" style="margin-top: 10px; margin-bottom: 0;">Choose Your <span class="wb-highlight">Specialization</span></h2>' '<h2 class="wb-section-title" style="margin-top: 10px; margin-bottom: 0;" data-i18n="int_grid_title">Choose Your <span class="wb-highlight">Specialization</span></h2>'

# Grid Cards Global Replacements
$content = [System.IO.File]::ReadAllText($html1Path)
$content = $content -replace '<span class="wb-ic-duration">45 Days</span>', '<span class="wb-ic-duration" data-i18n="int_dur_45">45 Days</span>'
$content = $content -replace '<span>🚀 AI Advanced</span>', '<span data-i18n="int_pill_ai">🚀 AI Advanced</span>'
$content = $content -replace '<span>🌐 Offline / Online</span>', '<span data-i18n="int_pill_mode">🌐 Offline / Online</span>'
$content = $content -replace 'Register Now &rarr;', '<span data-i18n="int_btn_reg">Register Now &rarr;</span>'
[System.IO.File]::WriteAllText($html1Path, $content)

# Specific Cards Data
Replace-Text $html1Path '<div class="wb-ic-overlay-title">OFFICE AUTOMATION WITH AI</div>' '<div class="wb-ic-overlay-title" data-i18n="int_c1_title">OFFICE AUTOMATION WITH AI</div>'
Replace-Text $html1Path '<h4 class="wb-ic-name">Office Automation with AI</h4>' '<h4 class="wb-ic-name" data-i18n="int_c1_name">Office Automation with AI</h4>'
Replace-Text $html1Path '<p class="wb-ic-desc">Learn MS Office tools like Word, Excel, PowerPoint along with AI tools to boost your productivity.</p>' '<p class="wb-ic-desc" data-i18n="int_c1_desc">Learn MS Office tools like Word, Excel, PowerPoint along with AI tools to boost your productivity.</p>'
Replace-Text $html1Path '<div class="wb-ic-overlay-title">ADVANCED EXCEL WITH AI</div>' '<div class="wb-ic-overlay-title" data-i18n="int_c2_title">ADVANCED EXCEL WITH AI</div>'
Replace-Text $html1Path '<h4 class="wb-ic-name">Advanced Excel with AI</h4>' '<h4 class="wb-ic-name" data-i18n="int_c2_name">Advanced Excel with AI</h4>'
Replace-Text $html1Path '<p class="wb-ic-desc">Master Advanced Excel including data models, pivot tables, and analysis using AI driven methods.</p>' '<p class="wb-ic-desc" data-i18n="int_c2_desc">Master Advanced Excel including data models, pivot tables, and analysis using AI driven methods.</p>'
Replace-Text $html1Path '<div class="wb-ic-overlay-title">PROMPT ENGINEERING</div>' '<div class="wb-ic-overlay-title" data-i18n="int_c3_title">PROMPT ENGINEERING</div>'
Replace-Text $html1Path '<h4 class="wb-ic-name">Prompt Engineering</h4>' '<h4 class="wb-ic-name" data-i18n="int_c3_name">Prompt Engineering</h4>'
Replace-Text $html1Path '<p class="wb-ic-desc">Learn how to design effective prompts for AI models like ChatGPT, Midjourney, and more.</p>' '<p class="wb-ic-desc" data-i18n="int_c3_desc">Learn how to design effective prompts for AI models like ChatGPT, Midjourney, and more.</p>'
Replace-Text $html1Path '<div class="wb-ic-overlay-title">DATA SCIENCE</div>' '<div class="wb-ic-overlay-title" data-i18n="int_c4_title">DATA SCIENCE</div>'
Replace-Text $html1Path '<h4 class="wb-ic-name">Data Science</h4>' '<h4 class="wb-ic-name" data-i18n="int_c4_name">Data Science</h4>'
Replace-Text $html1Path '<p class="wb-ic-desc">Dive deep into Data Science programs ranging from analytics to machine learning real-world projects.</p>' '<p class="wb-ic-desc" data-i18n="int_c4_desc">Dive deep into Data Science programs ranging from analytics to machine learning real-world projects.</p>'
Replace-Text $html1Path '<div class="wb-ic-overlay-title">ACCOUNTING WITH AI</div>' '<div class="wb-ic-overlay-title" data-i18n="int_c5_title">ACCOUNTING WITH AI</div>'
Replace-Text $html1Path '<h4 class="wb-ic-name">Accounting with AI</h4>' '<h4 class="wb-ic-name" data-i18n="int_c5_name">Accounting with AI</h4>'
Replace-Text $html1Path '<p class="wb-ic-desc">Learn Tally GST and AI powered accounting practices for modern businesses.</p>' '<p class="wb-ic-desc" data-i18n="int_c5_desc">Learn Tally GST and AI powered accounting practices for modern businesses.</p>'
Replace-Text $html1Path '<div class="wb-ic-overlay-title">GENERATIVE AI</div>' '<div class="wb-ic-overlay-title" data-i18n="int_c6_title">GENERATIVE AI</div>'
Replace-Text $html1Path '<h4 class="wb-ic-name">Generative AI</h4>' '<h4 class="wb-ic-name" data-i18n="int_c6_name">Generative AI</h4>'
Replace-Text $html1Path '<p class="wb-ic-desc">Understand and build applications using Generative AI models for text, code, and image generation.</p>' '<p class="wb-ic-desc" data-i18n="int_c6_desc">Understand and build applications using Generative AI models for text, code, and image generation.</p>'
Replace-Text $html1Path '<div class="wb-ic-overlay-title">DIGITAL MARKETING WITH AI</div>' '<div class="wb-ic-overlay-title" data-i18n="int_c7_title">DIGITAL MARKETING WITH AI</div>'
Replace-Text $html1Path '<h4 class="wb-ic-name">AI Powered Digital Marketing</h4>' '<h4 class="wb-ic-name" data-i18n="int_c7_name">AI Powered Digital Marketing</h4>'
Replace-Text $html1Path '<p class="wb-ic-desc">Learn SEO, social media marketing, and ad automation using AI tools.</p>' '<p class="wb-ic-desc" data-i18n="int_c7_desc">Learn SEO, social media marketing, and ad automation using AI tools.</p>'

# internship-form.html
Replace-Text $html2Path '<h2>Internship Application</h2>' '<h2 data-i18n="int_frm_head">Internship Application</h2>'
Replace-Text $html2Path '<p>Please fill out all the fields below to register for the internship program.</p>' '<p data-i18n="int_frm_sub">Please fill out all the fields below to register for the internship program.</p>'
Replace-Text $html2Path '<label>1. Full Name *</label>' '<label data-i18n="int_frm_l1">1. Full Name *</label>'
Replace-Text $html2Path '<label>2. Father''s Name *</label>' '<label data-i18n="int_frm_l2">2. Father''s Name *</label>'
Replace-Text $html2Path '<label>3. Email ID *</label>' '<label data-i18n="int_frm_l3">3. Email ID *</label>'
Replace-Text $html2Path '<label>4. Mobile Number *</label>' '<label data-i18n="int_frm_l4">4. Mobile Number *</label>'
Replace-Text $html2Path '<label>5. College Name *</label>' '<label data-i18n="int_frm_l5">5. College Name *</label>'
Replace-Text $html2Path '<label>6. Qualification *</label>' '<label data-i18n="int_frm_l6">6. Qualification *</label>'
Replace-Text $html2Path '<option value="" disabled selected>Select Qualification</option>' '<option value="" disabled selected data-i18n="int_frm_sel_qual">Select Qualification</option>'
Replace-Text $html2Path '<label>7. University Roll No *</label>' '<label data-i18n="int_frm_l7">7. University Roll No *</label>'
Replace-Text $html2Path '<label>8. Selected Course *</label>' '<label data-i18n="int_frm_l8">8. Selected Course *</label>'
Replace-Text $html2Path '<option value="" disabled selected>Select an Internship Program</option>' '<option value="" disabled selected data-i18n="int_frm_sel_crs">Select an Internship Program</option>'
Replace-Text $html2Path 'Submit Application &rarr;' '<span data-i18n="int_frm_btn">Submit Application &rarr;</span>'

Write-Host "Done!"
