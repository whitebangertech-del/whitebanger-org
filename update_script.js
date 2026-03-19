const fs = require('fs');

const enTranslations = {
  "int_hero_badge": "✅ Internship for IT Skill Students",
  "int_hero_title": "Launch Your Career<br>with <span class=\"wb-ih-highlight\">AI Internship</span>",
  "int_hero_desc": "Industry-oriented training with expert mentors. Build your successful internship programs on real-world testing using cutting-edge technology.",
  "int_tag_1": "Office Automation with AI",
  "int_tag_2": "Advanced Excel with AI",
  "int_tag_3": "Prompt Engineering with AI",
  "int_tag_4": "Data Science with AI",
  "int_tag_5": "Accounting with AI",
  "int_tag_6": "Generative AI in Marketing",
  "int_hero_btn": "Explore Courses &rarr;",
  "int_grid_sub": "🚀 Advance IT Skill Center",
  "int_grid_title": "Choose Your <span class=\"wb-highlight\">Specialization</span>",
  "int_dur_45": "45 Days",
  "int_pill_ai": "🚀 AI Advanced",
  "int_pill_mode": "🌐 Offline / Online",
  "int_btn_reg": "Register Now &rarr;",
  "int_c1_title": "OFFICE AUTOMATION WITH AI",
  "int_c1_name": "Office Automation with AI",
  "int_c1_desc": "Learn MS Office tools like Word, Excel, PowerPoint along with AI tools to boost your productivity.",
  "int_c2_title": "ADVANCED EXCEL WITH AI",
  "int_c2_name": "Advanced Excel with AI",
  "int_c2_desc": "Master Advanced Excel including data models, pivot tables, and analysis using AI driven methods.",
  "int_c3_title": "PROMPT ENGINEERING",
  "int_c3_name": "Prompt Engineering",
  "int_c3_desc": "Learn how to design effective prompts for AI models like ChatGPT, Midjourney, and more.",
  "int_c4_title": "DATA SCIENCE",
  "int_c4_name": "Data Science",
  "int_c4_desc": "Dive deep into Data Science programs ranging from analytics to machine learning real-world projects.",
  "int_c5_title": "ACCOUNTING WITH AI",
  "int_c5_name": "Accounting with AI",
  "int_c5_desc": "Learn Tally GST and AI powered accounting practices for modern businesses.",
  "int_c6_title": "GENERATIVE AI",
  "int_c6_name": "Generative AI",
  "int_c6_desc": "Understand and build applications using Generative AI models for text, code, and image generation.",
  "int_c7_title": "DIGITAL MARKETING WITH AI",
  "int_c7_name": "AI Powered Digital Marketing",
  "int_c7_desc": "Learn SEO, social media marketing, and ad automation using AI tools.",
  "int_frm_head": "Internship Application",
  "int_frm_sub": "Please fill out all the fields below to register for the internship program.",
  "int_frm_l1": "1. Full Name *",
  "int_frm_l2": "2. Father's Name *",
  "int_frm_l3": "3. Email ID *",
  "int_frm_l4": "4. Mobile Number *",
  "int_frm_l5": "5. College Name *",
  "int_frm_l6": "6. Qualification *",
  "int_frm_sel_qual": "Select Qualification",
  "int_frm_l7": "7. University Roll No *",
  "int_frm_l8": "8. Selected Course *",
  "int_frm_sel_crs": "Select an Internship Program",
  "int_frm_btn": "Submit Application &rarr;"
};

const hiTranslations = {
  "int_hero_badge": "✅ आईटी कौशल छात्रों के लिए इंटर्नशिप",
  "int_hero_title": "हमारे <span class=\"wb-ih-highlight\">AI इंटर्नशिप</span> के साथ अपना करियर शुरू करें",
  "int_hero_desc": "विशेषज्ञों के साथ उद्योग-उन्मुख प्रशिक्षण। अत्याधुनिक तकनीक का उपयोग करके वास्तविक दुनिया के परीक्षण पर अपने सफल इंटर्नशिप प्रोग्राम बनाएं।",
  "int_tag_1": "AI के साथ ऑफिस ऑटोमेशन",
  "int_tag_2": "AI के साथ उन्नत एक्सेल",
  "int_tag_3": "AI के साथ प्रॉम्प्ट इंजीनियरिंग",
  "int_tag_4": "AI के साथ डेटा साइंस",
  "int_tag_5": "AI के साथ अकाउंटिंग",
  "int_tag_6": "मार्केटिंग में जेनरेटिव AI",
  "int_hero_btn": "कोर्स एक्सप्लोर करें &rarr;",
  "int_grid_sub": "🚀 एडवांस आईटी स्किल सेंटर",
  "int_grid_title": "अपनी <span class=\"wb-highlight\">विशेषज्ञता</span> चुनें",
  "int_dur_45": "45 दिन",
  "int_pill_ai": "🚀 एआई एडवांस",
  "int_pill_mode": "🌐 ऑफलाइन / ऑनलाइन",
  "int_btn_reg": "अभी रजिस्टर करें &rarr;",
  "int_c1_title": "एआई के साथ ऑफिस ऑटोमेशन",
  "int_c1_name": "एआई के साथ ऑफिस ऑटोमेशन",
  "int_c1_desc": "अपनी उत्पादकता बढ़ाने के लिए एआई टूल्स के साथ वर्ड, एक्सेल, पावरपॉइंट जैसे एमएस ऑफिस टूल्स सीखें।",
  "int_c2_title": "एआई के साथ उन्नत एक्सेल",
  "int_c2_name": "एआई के साथ उन्नत एक्सेल",
  "int_c2_desc": "एआई संचालित तरीकों का उपयोग करके डेटा मॉडल, पिवट टेबल और विश्लेषण सहित उन्नत एक्सेल में महारत हासिल करें।",
  "int_c3_title": "प्रॉम्प्ट इंजीनियरिंग",
  "int_c3_name": "प्रॉम्प्ट इंजीनियरिंग",
  "int_c3_desc": "चैटजीपीटी, मिडजर्नी और अन्य जैसे एआई मॉडल के लिए प्रभावी प्रॉम्प्ट डिज़ाइन करना सीखें।",
  "int_c4_title": "डेटा विज्ञान",
  "int_c4_name": "डेटा विज्ञान",
  "int_c4_desc": "एनालिटिक्स से लेकर मशीन लर्निंग वास्तविक दुनिया के प्रोजेक्ट्स तक डेटा साइंस प्रोग्राम में गहराई से गोता लगाएँ।",
  "int_c5_title": "एआई के साथ अकाउंटिंग",
  "int_c5_name": "एआई के साथ अकाउंटिंग",
  "int_c5_desc": "आधुनिक व्यवसायों के लिए टैली जीएसटी और एआई संचालित अकाउंटिंग प्रथाओं को जानें।",
  "int_c6_title": "जेनरेटिव एआई",
  "int_c6_name": "जेनरेटिव एआई",
  "int_c6_desc": "टेक्स्ट, कोड और इमेज जेनरेशन के लिए जेनरेटिव एआई मॉडल का उपयोग करके एप्लिकेशन को समझें और बनाएं।",
  "int_c7_title": "एआई के साथ डिजिटल मार्केटिंग",
  "int_c7_name": "एआई संचालित डिजिटल मार्केटिंग",
  "int_c7_desc": "एआई टूल्स का उपयोग करके एसईओ, सोशल मीडिया मार्केटिंग और विज्ञापन स्वचालन सीखें।",
  "int_frm_head": "इंटर्नशिप आवेदन",
  "int_frm_sub": "इंटर्नशिप कार्यक्रम के लिए पंजीकरण करने के लिए कृपया नीचे दिए गए सभी फ़ील्ड भरें।",
  "int_frm_l1": "1. पूरा नाम *",
  "int_frm_l2": "2. पिता का नाम *",
  "int_frm_l3": "3. ईमेल आईडी *",
  "int_frm_l4": "4. मोबाइल नंबर *",
  "int_frm_l5": "5. कॉलेज का नाम *",
  "int_frm_l6": "6. योग्यता *",
  "int_frm_sel_qual": "योग्यता चुनें",
  "int_frm_l7": "7. विश्वविद्यालय रोल नंबर *",
  "int_frm_l8": "8. चयनित पाठ्यक्रम *",
  "int_frm_sel_crs": "एक इंटर्नशिप प्रोग्राम चुनें",
  "int_frm_btn": "आवेदन सबमिट करें &rarr;"
};

const paTranslations = {
  "int_hero_badge": "✅ ਆਈਟੀ ਸਕਿੱਲ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਇੰਟਰਨਸ਼ਿਪ",
  "int_hero_title": "ਸਾਡੀ <span class=\"wb-ih-highlight\">AI ਇੰਟਰਨਸ਼ਿਪ</span> ਨਾਲ ਆਪਣਾ ਕਰੀਅਰ ਸ਼ੁਰੂ ਕਰੋ",
  "int_hero_desc": "ਮਾਹਰਾਂ ਨਾਲ ਉਦਯੋਗ-ਮੁਖੀ ਸਿਖਲਾਈ। ਆਧੁਨਿਕ ਤਕਨੀਕ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਆਪਣੇ ਸਫਲ ਇੰਟਰਨਸ਼ਿਪ ਪ੍ਰੋਗਰਾਮ ਬਣਾਓ।",
  "int_tag_1": "AI ਨਾਲ ਆਫਿਸ ਆਟੋਮੇਸ਼ਨ",
  "int_tag_2": "AI ਨਾਲ ਐਡਵਾਂਸਡ ਐਕਸਲ",
  "int_tag_3": "AI ਨਾਲ ਪ੍ਰੋਂਪਟ ਇੰਜੀਨੀਅਰਿੰਗ",
  "int_tag_4": "AI ਨਾਲ ਡਾਟਾ ਸਾਇੰਸ",
  "int_tag_5": "AI ਨਾਲ ਅਕਾਊਂਟਿੰਗ",
  "int_tag_6": "ਮਾਰਕੀਟਿੰਗ ਵਿੱਚ ਜਨਰੇਟਿਵ AI",
  "int_hero_btn": "ਕੋਰਸ ਐਕਸਪਲੋਰ ਕਰੋ &rarr;",
  "int_grid_sub": "🚀 ਐਡਵਾਂਸ ਆਈਟੀ ਸਕਿੱਲ ਸੈਂਟਰ",
  "int_grid_title": "ਆਪਣੀ <span class=\"wb-highlight\">ਵਿਸ਼ੇਸ਼ਤਾ</span> ਚੁਣੋ",
  "int_dur_45": "45 ਦਿਨ",
  "int_pill_ai": "🚀 ਏਆਈ ਐਡਵਾਂਸ",
  "int_pill_mode": "🌐 ਔਫਲਾਈਨ / ਔਨਲਾਈਨ",
  "int_btn_reg": "ਹੁਣੇ ਰਜਿਸਟਰ ਕਰੋ &rarr;",
  "int_c1_title": "ਏਆਈ ਨਾਲ ਆਫਿਸ ਆਟੋਮੇਸ਼ਨ",
  "int_c1_name": "ਏਆਈ ਨਾਲ ਆਫਿਸ ਆਟੋਮੇਸ਼ਨ",
  "int_c1_desc": "ਆਪਣੀ ਉਤਪਾਦਕਤਾ ਵਧਾਉਣ ਲਈ ਏਆਈ ਟੂਲਸ ਨਾਲ ਵਰਡ, ਐਕਸਲ, ਪਾਵਰਪੁਆਇੰਟ ਵਰਗੇ ਐਮਐਸ ਆਫਿਸ ਟੂਲ ਸਿੱਖੋ।",
  "int_c2_title": "ਏਆਈ ਨਾਲ ਐਡਵਾਂਸਡ ਐਕਸਲ",
  "int_c2_name": "ਏਆਈ ਨਾਲ ਐਡਵਾਂਸਡ ਐਕਸਲ",
  "int_c2_desc": "ਏਆਈ ਸੰਚਾਲਿਤ ਤਰੀਕਿਆਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਡਾਟਾ ਮਾਡਲ, ਪਿਵਟ ਟੇਬਲ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ ਸਮੇਤ ਐਡਵਾਂਸਡ ਐਕਸਲ ਵਿੱਚ ਮੁਹਾਰਤ ਹਾਸਲ ਕਰੋ।",
  "int_c3_title": "ਪ੍ਰੋਂਪਟ ਇੰਜੀਨੀਅਰਿੰਗ",
  "int_c3_name": "ਪ੍ਰੋਂਪਟ ਇੰਜੀਨੀਅਰਿੰਗ",
  "int_c3_desc": "ਚੈਟਜੀਪੀਟੀ ਵਰਗੇ ਏਆਈ ਮਾਡਲਾਂ ਲਈ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਪ੍ਰੋਂਪਟ ਡਿਜ਼ਾਈਨ ਕਰਨਾ ਸਿੱਖੋ।",
  "int_c4_title": "ਡਾਟਾ ਸਾਇੰਸ",
  "int_c4_name": "ਡਾਟਾ ਸਾਇੰਸ",
  "int_c4_desc": "ਐਨਾਲਿਟਿਕਸ ਤੋਂ ਲੈ ਕੇ ਮਸ਼ੀਨ ਲਰਨਿੰਗ ਅਸਲ ਪ੍ਰੋਜੈਕਟਾਂ ਤੱਕ ਡਾਟਾ ਸਾਇੰਸ ਪ੍ਰੋਗਰਾਮਾਂ ਵਿੱਚ ਡੂੰਘਾਈ ਨਾਲ ਜਾਓ।",
  "int_c5_title": "ਏਆਈ ਨਾਲ ਅਕਾਊਂਟਿੰਗ",
  "int_c5_name": "ਏਆਈ ਨਾਲ ਅਕਾਊਂਟਿੰਗ",
  "int_c5_desc": "ਆਧੁਨਿਕ ਕਾਰੋਬਾਰਾਂ ਲਈ ਟੈਲੀ ਜੀਐਸਟੀ ਅਤੇ ਏਆਈ ਸੰਚਾਲਿਤ ਲੇਖਾਕਾਰੀ ਅਭਿਆਸਾਂ ਨੂੰ ਸਿੱਖੋ।",
  "int_c6_title": "ਜਨਰੇਟਿਵ ਏਆਈ",
  "int_c6_name": "ਜਨਰੇਟਿਵ ਏਆਈ",
  "int_c6_desc": "ਟੈਕਸਟ, ਕੋਡ ਅਤੇ ਚਿੱਤਰ ਬਣਾਉਣ ਲਈ ਜਨਰੇਟਿਵ ਏਆਈ ਮਾਡਲਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਐਪਲੀਕੇਸ਼ਨਾਂ ਨੂੰ ਸਮਝੋ ਅਤੇ ਬਣਾਓ।",
  "int_c7_title": "ਏਆਈ ਨਾਲ ਡਿਜੀਟਲ ਮਾਰਕੀਟਿੰਗ",
  "int_c7_name": "ਏਆਈ ਸੰਚਾਲਿਤ ਡਿਜੀਟਲ ਮਾਰਕੀਟਿੰਗ",
  "int_c7_desc": "ਏਆਈ ਟੂਲਸ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਐਸਈਓ, ਸੋਸ਼ਲ ਮੀਡੀਆ ਮਾਰਕੀਟਿੰਗ ਅਤੇ ਵਿਗਿਆਪਨ ਆਟੋਮੇਸ਼ਨ ਸਿੱਖੋ।",
  "int_frm_head": "ਇੰਟਰਨਸ਼ਿਪ ਐਪਲੀਕੇਸ਼ਨ",
  "int_frm_sub": "ਇੰਟਰਨਸ਼ਿਪ ਪ੍ਰੋਗਰਾਮ ਲਈ ਰਜਿਸਟਰ ਕਰਨ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ ਦਿੱਤੇ ਸਾਰੇ ਖੇਤਰ ਭਰੋ।",
  "int_frm_l1": "1. ਪੂਰਾ ਨਾਮ *",
  "int_frm_l2": "2. ਪਿਤਾ ਦਾ ਨਾਮ *",
  "int_frm_l3": "3. ਈਮੇਲ ਆਈਡੀ *",
  "int_frm_l4": "4. ਮੋਬਾਈਲ ਨੰਬਰ *",
  "int_frm_l5": "5. ਕਾਲਜ ਦਾ ਨਾਮ *",
  "int_frm_l6": "6. ਯੋਗਤਾ *",
  "int_frm_sel_qual": "ਯੋਗਤਾ ਚੁਣੋ",
  "int_frm_l7": "7. ਯੂਨੀਵਰਸਿਟੀ ਰੋਲ ਨੰਬਰ *",
  "int_frm_l8": "8. ਚੁਣਿਆ ਹੋਇਆ ਕੋਰਸ *",
  "int_frm_sel_crs": "ਇੱਕ ਇੰਟਰਨਸ਼ਿਪ ਪ੍ਰੋਗਰਾਮ ਚੁਣੋ",
  "int_frm_btn": "ਐਪਲੀਕੇਸ਼ਨ ਜਮ੍ਹਾਂ ਕਰੋ &rarr;"
};

function formatReplacements(content, translations) {
  // Regex to simply add data-i18n tags to HTML snippets.
  // Since HTML rewriting is complex via regex, we will manually do targeted string replacements on the specific lines in internship and internship-form
  let res = content;
  
  // Hero
  res = res.replace('<div class="wb-ih-badge">✅ Internship for IT Skill Students</div>', '<div class="wb-ih-badge" data-i18n="int_hero_badge">✅ Internship for IT Skill Students</div>');
  res = res.replace('<h1 class="wb-ih-title">Launch Your Career<br>with <span class="wb-ih-highlight">AI Internship</span></h1>', '<h1 class="wb-ih-title" data-i18n="int_hero_title">Launch Your Career<br>with <span class="wb-ih-highlight">AI Internship</span></h1>');
  res = res.replace('<p class="wb-ih-desc">Industry-oriented training with expert mentors. Build your successful internship programs on real-world testing using cutting-edge technology.</p>', '<p class="wb-ih-desc" data-i18n="int_hero_desc">Industry-oriented training with expert mentors. Build your successful internship programs on real-world testing using cutting-edge technology.</p>');
  res = res.replace('<span>Office Automation with AI</span>', '<span data-i18n="int_tag_1">Office Automation with AI</span>');
  res = res.replace('<span>Advanced Excel with AI</span>', '<span data-i18n="int_tag_2">Advanced Excel with AI</span>');
  res = res.replace('<span>Prompt Engineering with AI</span>', '<span data-i18n="int_tag_3">Prompt Engineering with AI</span>');
  res = res.replace('<span>Data Science with AI</span>', '<span data-i18n="int_tag_4">Data Science with AI</span>');
  res = res.replace('<span>Accounting with AI</span>', '<span data-i18n="int_tag_5">Accounting with AI</span>');
  res = res.replace('<span>Generative AI in Marketing</span>', '<span data-i18n="int_tag_6">Generative AI in Marketing</span>');
  res = res.replace('Explore Courses &rarr;', '<span data-i18n="int_hero_btn">Explore Courses &rarr;</span>');

  // Grid Headers
  res = res.replace('<span class="wb-ig-subtitle">🚀 Advance IT Skill Center</span>', '<span class="wb-ig-subtitle" data-i18n="int_grid_sub">🚀 Advance IT Skill Center</span>');
  res = res.replace('<h2 class="wb-section-title" style="margin-top: 10px; margin-bottom: 0;">Choose Your <span class="wb-highlight">Specialization</span></h2>', '<h2 class="wb-section-title" style="margin-top: 10px; margin-bottom: 0;" data-i18n="int_grid_title">Choose Your <span class="wb-highlight">Specialization</span></h2>');

  // Cards Repeated Strings
  res = res.replace(/<span class="wb-ic-duration">45 Days<\/span>/g, '<span class="wb-ic-duration" data-i18n="int_dur_45">45 Days</span>');
  res = res.replace(/<span>🚀 AI Advanced<\/span>/g, '<span data-i18n="int_pill_ai">🚀 AI Advanced</span>');
  res = res.replace(/<span>🌐 Offline \/ Online<\/span>/g, '<span data-i18n="int_pill_mode">🌐 Offline / Online</span>');
  res = res.replace(/Register Now &rarr;/g, '<span data-i18n="int_btn_reg">Register Now &rarr;</span>');
  
  // Specific Cards (Only matching inner text exactly avoids breaking tags)
  res = res.replace('<div class="wb-ic-overlay-title">OFFICE AUTOMATION WITH AI</div>', '<div class="wb-ic-overlay-title" data-i18n="int_c1_title">OFFICE AUTOMATION WITH AI</div>');
  res = res.replace('<h4 class="wb-ic-name">Office Automation with AI</h4>', '<h4 class="wb-ic-name" data-i18n="int_c1_name">Office Automation with AI</h4>');
  res = res.replace('<p class="wb-ic-desc">Learn MS Office tools like Word, Excel, PowerPoint along with AI tools to boost your productivity.</p>', '<p class="wb-ic-desc" data-i18n="int_c1_desc">Learn MS Office tools like Word, Excel, PowerPoint along with AI tools to boost your productivity.</p>');
  
  res = res.replace('<div class="wb-ic-overlay-title">ADVANCED EXCEL WITH AI</div>', '<div class="wb-ic-overlay-title" data-i18n="int_c2_title">ADVANCED EXCEL WITH AI</div>');
  res = res.replace('<h4 class="wb-ic-name">Advanced Excel with AI</h4>', '<h4 class="wb-ic-name" data-i18n="int_c2_name">Advanced Excel with AI</h4>');
  res = res.replace('<p class="wb-ic-desc">Master Advanced Excel including data models, pivot tables, and analysis using AI driven methods.</p>', '<p class="wb-ic-desc" data-i18n="int_c2_desc">Master Advanced Excel including data models, pivot tables, and analysis using AI driven methods.</p>');
  
  res = res.replace('<div class="wb-ic-overlay-title">PROMPT ENGINEERING</div>', '<div class="wb-ic-overlay-title" data-i18n="int_c3_title">PROMPT ENGINEERING</div>');
  res = res.replace('<h4 class="wb-ic-name">Prompt Engineering</h4>', '<h4 class="wb-ic-name" data-i18n="int_c3_name">Prompt Engineering</h4>');
  res = res.replace('<p class="wb-ic-desc">Learn how to design effective prompts for AI models like ChatGPT, Midjourney, and more.</p>', '<p class="wb-ic-desc" data-i18n="int_c3_desc">Learn how to design effective prompts for AI models like ChatGPT, Midjourney, and more.</p>');

  res = res.replace('<div class="wb-ic-overlay-title">DATA SCIENCE</div>', '<div class="wb-ic-overlay-title" data-i18n="int_c4_title">DATA SCIENCE</div>');
  res = res.replace('<h4 class="wb-ic-name">Data Science</h4>', '<h4 class="wb-ic-name" data-i18n="int_c4_name">Data Science</h4>');
  res = res.replace('<p class="wb-ic-desc">Dive deep into Data Science programs ranging from analytics to machine learning real-world projects.</p>', '<p class="wb-ic-desc" data-i18n="int_c4_desc">Dive deep into Data Science programs ranging from analytics to machine learning real-world projects.</p>');

  res = res.replace('<div class="wb-ic-overlay-title">ACCOUNTING WITH AI</div>', '<div class="wb-ic-overlay-title" data-i18n="int_c5_title">ACCOUNTING WITH AI</div>');
  res = res.replace('<h4 class="wb-ic-name">Accounting with AI</h4>', '<h4 class="wb-ic-name" data-i18n="int_c5_name">Accounting with AI</h4>');
  res = res.replace('<p class="wb-ic-desc">Learn Tally GST and AI powered accounting practices for modern businesses.</p>', '<p class="wb-ic-desc" data-i18n="int_c5_desc">Learn Tally GST and AI powered accounting practices for modern businesses.</p>');

  res = res.replace('<div class="wb-ic-overlay-title">GENERATIVE AI</div>', '<div class="wb-ic-overlay-title" data-i18n="int_c6_title">GENERATIVE AI</div>');
  res = res.replace('<h4 class="wb-ic-name">Generative AI</h4>', '<h4 class="wb-ic-name" data-i18n="int_c6_name">Generative AI</h4>');
  res = res.replace('<p class="wb-ic-desc">Understand and build applications using Generative AI models for text, code, and image generation.</p>', '<p class="wb-ic-desc" data-i18n="int_c6_desc">Understand and build applications using Generative AI models for text, code, and image generation.</p>');

  res = res.replace('<div class="wb-ic-overlay-title">DIGITAL MARKETING WITH AI</div>', '<div class="wb-ic-overlay-title" data-i18n="int_c7_title">DIGITAL MARKETING WITH AI</div>');
  res = res.replace('<h4 class="wb-ic-name">AI Powered Digital Marketing</h4>', '<h4 class="wb-ic-name" data-i18n="int_c7_name">AI Powered Digital Marketing</h4>');
  res = res.replace('<p class="wb-ic-desc">Learn SEO, social media marketing, and ad automation using AI tools.</p>', '<p class="wb-ic-desc" data-i18n="int_c7_desc">Learn SEO, social media marketing, and ad automation using AI tools.</p>');

  // Form replacements
  res = res.replace('<h2>Internship Application</h2>', '<h2 data-i18n="int_frm_head">Internship Application</h2>');
  res = res.replace('<p>Please fill out all the fields below to register for the internship program.</p>', '<p data-i18n="int_frm_sub">Please fill out all the fields below to register for the internship program.</p>');
  res = res.replace('<label>1. Full Name *</label>', '<label data-i18n="int_frm_l1">1. Full Name *</label>');
  res = res.replace('<label>2. Father\'s Name *</label>', '<label data-i18n="int_frm_l2">2. Father\'s Name *</label>');
  res = res.replace('<label>3. Email ID *</label>', '<label data-i18n="int_frm_l3">3. Email ID *</label>');
  res = res.replace('<label>4. Mobile Number *</label>', '<label data-i18n="int_frm_l4">4. Mobile Number *</label>');
  res = res.replace('<label>5. College Name *</label>', '<label data-i18n="int_frm_l5">5. College Name *</label>');
  res = res.replace('<label>6. Qualification *</label>', '<label data-i18n="int_frm_l6">6. Qualification *</label>');
  res = res.replace('<option value="" disabled selected>Select Qualification</option>', '<option value="" disabled selected data-i18n="int_frm_sel_qual">Select Qualification</option>');
  res = res.replace('<label>7. University Roll No *</label>', '<label data-i18n="int_frm_l7">7. University Roll No *</label>');
  res = res.replace('<label>8. Selected Course *</label>', '<label data-i18n="int_frm_l8">8. Selected Course *</label>');
  res = res.replace('<option value="" disabled selected>Select an Internship Program</option>', '<option value="" disabled selected data-i18n="int_frm_sel_crs">Select an Internship Program</option>');
  res = res.replace('Submit Application &rarr;', '<span data-i18n="int_frm_btn">Submit Application &rarr;</span>');

  return res;
}

// 1. Process internship.html
let html1 = fs.readFileSync(__dirname + '/internship.html', 'utf8');
fs.writeFileSync(__dirname + '/internship.html', formatReplacements(html1));

// 2. Process internship-form.html
let html2 = fs.readFileSync(__dirname + '/internship-form.html', 'utf8');
fs.writeFileSync(__dirname + '/internship-form.html', formatReplacements(html2));

// 3. Update wb-translations.js
let transFile = fs.readFileSync(__dirname + '/wb-translations.js', 'utf8');

function injectTranslations(lang, fileContent, newTrans) {
  const marker = '"' + lang + '": {';
  let lines = '';
  // Convert newTrans JSON into formatted string
  for (let key in newTrans) {
    lines += `    "${key}": ${JSON.stringify(newTrans[key])},\n`;
  }
  return fileContent.replace(marker, marker + '\n' + lines);
}

transFile = injectTranslations('en', transFile, enTranslations);
transFile = injectTranslations('hi', transFile, hiTranslations);
transFile = injectTranslations('pa', transFile, paTranslations);

fs.writeFileSync(__dirname + '/wb-translations.js', transFile);
console.log('Script completed successfully.');
