import os, re

erp_dir = r'c:\Users\priii\.gemini\antigravity\scratch\digital-marketing-agency\erp'

# Explicit string replacements (ordered, case-sensitive)
replacements = [
    # Branding
    ('White Banger ERP', 'Dashboard'),
    ('<span>ERP System</span>', '<span>Management System</span>'),
    ('>ERP System<', '>Management System<'),
    ('<span>ERP</span>', '<span>Dashboard</span>'),
    # Page/login text
    ('Welcome Back \U0001f44b', 'Welcome Back'),
    ('Admin Dashboard \U0001f393', 'Admin Dashboard'),
    # Demo login
    ('\U0001f680 Quick Demo Login', 'Demo Login'),
    ('Quick Demo Login', 'Demo Login'),
    # Card titles (emoji + space stripped by regex below, but explicit ones too)
]

# Emoji ranges for regex stripping
EMOJI_RE = re.compile(
    "[\U00002600-\U000027BF"
    "\U0001F300-\U0001F5FF"
    "\U0001F600-\U0001F64F"
    "\U0001F680-\U0001F6FF"
    "\U0001F700-\U0001F77F"
    "\U0001F780-\U0001F7FF"
    "\U0001F800-\U0001F8FF"
    "\U0001F900-\U0001F9FF"
    "\U0001FA00-\U0001FA6F"
    "\U0001FA70-\U0001FAFF"
    "\U00002702-\U000027B0"
    "\uFE0F"
    "\u200D"
    "]+",
    flags=re.UNICODE
)

def strip_emojis(text):
    # Remove emoji, also clean up double spaces left behind
    cleaned = EMOJI_RE.sub('', text)
    # Clean up lines like "> emoji text" where emoji is gone -> "> text"
    cleaned = re.sub(r'(?<=[>])(\s*)(?=\S)', r'\1', cleaned)
    # Remove orphan spaces at start of text nodes
    cleaned = re.sub(r'>([ ]+)([A-Za-z0-9])', lambda m: '>' + m.group(2), cleaned)
    return cleaned

html_files = [f for f in os.listdir(erp_dir) if f.endswith('.html')]

for fname in html_files:
    fpath = os.path.join(erp_dir, fname)
    with open(fpath, 'r', encoding='utf-8') as fp:
        content = fp.read()
    
    # First apply explicit replacements
    for old, new in replacements:
        content = content.replace(old, new)
    
    # Then strip all remaining emojis
    content = strip_emojis(content)
    
    with open(fpath, 'w', encoding='utf-8') as fp:
        fp.write(content)
    print(f'Updated: {fname}')

print('All HTML files processed.')
