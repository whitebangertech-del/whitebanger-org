# AI Website Assistant - Quick Start

## 🚀 3-Step Integration

### Step 1: Copy Files
Copy the `ai-assistant` folder to your website:
```
your-website/
  ├── ai-assistant/
  │   ├── ai-assistant.js
  │   ├── ai-assistant.css
  │   └── README.md
  └── index.html
```

### Step 2: Add to HTML
Add these lines before closing `</body>`:

```html
<!-- AI Assistant -->
<link rel="stylesheet" href="ai-assistant/ai-assistant.css">
<script src="ai-assistant/ai-assistant.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new AIWebsiteAssistant({
      language: 'hi',    // Hindi
      autoStart: true    // Auto-show popup
    });
  });
</script>
```

### Step 3: Add Section IDs
Make sure your sections have IDs:

```html
<header id="hero">...</header>
<section id="about">...</section>
<section id="services">...</section>
<section id="contact">...</section>
```

**Done!** 🎉

---

## Test Demo

Open `demo.html` in a browser to see it in action.

---

## Configuration

```javascript
new AIWebsiteAssistant({
  language: 'hi',        // 'hi' or 'en'
  autoStart: true,       // Auto-show
  startDelay: 2000,      // 2 seconds
  sectionDelay: 4000,    // 4 seconds/section
  voice: 'female'        // Voice gender
});
```

---

## Features

✅ Hindi/English voice narration
✅ Auto-scrolling & highlighting
✅ Session memory (no re-popup)
✅ Mobile responsive
✅ Zero performance impact
✅ Production-ready

---

## Support

See `README.md` for full documentation.

**Made by White Banger Tech** 🇮🇳
