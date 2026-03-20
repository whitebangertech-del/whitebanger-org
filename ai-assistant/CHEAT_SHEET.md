# AI Website Assistant - Cheat Sheet

## 🚀 Quick Integration

```html
<!-- Before </body> -->
<link rel="stylesheet" href="ai-assistant/ai-assistant.css">
<script src="ai-assistant/ai-assistant.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new AIWebsiteAssistant();
  });
</script>
```

## ⚙️ Common Configurations

### Basic Setup
```javascript
new AIWebsiteAssistant({
  language: 'hi',        // Hindi
  autoStart: true,       // Auto popup
  startDelay: 2000       // 2 seconds
});
```

### Custom Sections
```javascript
new AIWebsiteAssistant({
  sections: [
    {
      name: 'hero',
      selector: '#hero',
      explanation: 'यह मुख्य पेज है'
    },
    {
      name: 'about',
      selector: '#about',
      explanation: 'हमारे बारे में'
    }
  ]
});
```

### Full Config
```javascript
new AIWebsiteAssistant({
  language: 'hi',           // 'hi' or 'en'
  autoStart: true,          // Show popup automatically
  startDelay: 2000,         // Delay before popup (ms)
  sectionDelay: 4000,       // Time per section (ms)
  voice: 'female',          // 'male' or 'female'
  analytics: true           // Track events
});
```

## 🎮 API Methods

```javascript
// Show assistant
aiAssistant.show();

// Hide assistant
aiAssistant.hide();

// Change language
aiAssistant.setLanguage('en');

// Restart tour
aiAssistant.restart();
```

## 🗑️ Reset Memory

```javascript
// Clear tour memory
localStorage.removeItem('ai_assistant_tour_seen');

// View analytics
const events = JSON.parse(
  localStorage.getItem('ai_assistant_events') || '[]'
);
```

## 📝 User Commands

Users can type:
- `go to pricing`
- `explain services`
- `show contact`
- `pricing बताओ`
- `services दिखाओ`

## 🎨 Custom Styling

```css
/* Change primary color */
.ai-btn-primary {
  background: linear-gradient(135deg, #your-color 0%, #your-color-dark 100%);
}

/* Change chat header */
.ai-chat-header {
  background: linear-gradient(135deg, #your-color 0%, #your-color-dark 100%);
}
```

## 🐛 Troubleshooting

**Voice not working?**
```javascript
if ('speechSynthesis' in window) {
  console.log('Supported');
} else {
  console.log('Not supported');
}
```

**Reset everything:**
```javascript
localStorage.clear();
location.reload();
```

**Debug mode:**
```javascript
const assistant = new AIWebsiteAssistant();
console.log('Sections:', assistant.config.sections);
```

## 📦 File Sizes

- CSS: 9.8 KB
- JS: 25 KB
- Total: ~35 KB (~20 KB gzipped)

## ✅ Requirements Met

1. ✅ AI Intro Popup
2. ✅ Voice + Text Guide
3. ✅ Auto Navigation
4. ✅ Section Detection
5. ✅ Smart Explanations
6. ✅ Interactive Controls
7. ✅ Modern Tech Stack
8. ✅ High Performance
9. ✅ Session Memory
10. ✅ Beautiful UI
11. ✅ Advanced Features

## 📖 Documentation

- `README.md` - Full guide
- `QUICK_START.md` - Quick start
- `FEATURES.md` - Feature list
- `demo.html` - Live demo

## 🎯 Quick Test

1. Open `ai-assistant/demo.html`
2. Wait 2 seconds
3. Click "Start Tour"
4. Watch magic happen!

---

**Made by White Banger Tech** 🚀
