import os

replacements = {
    "à¤µà¥ à¤¹à¤¾à¤‡à¤Ÿ à¤¬à¥ˆà¤‚à¤—à¤°": "व्हाइट बैंगर",
    "à¨µà© à¨¹à¤¾à¨ˆà¨Ÿ à¨¬à©ˆà¨‚à¤—à¤°": "ਵ੍ਹਾਈਟ ਬੈਂਗਰ",
    "ðŸŽ“": "🎓",
    "ðŸ“Š": "📊",
    "ðŸ–¥ï¸ ": "💻",
    "ðŸ“ˆ": "📈",
    "ðŸ“¢": "📢",
    "ðŸŽ¨": "🎨",
    "ðŸ“·": "📊",
    "ðŸ“°": "📸",
    "ðŸ’¡": "💡",
    "â˜…": "★",
    "â€”": "—",
    "â–¶": "▶",
    "â–¼": "▼",
    "âœ”": "✔",
    "ðŸ’»": "💻",
    "ðŸ …": "🏅",
    "ðŸ“œ": "📜",
    "ðŸŽ": "🎁",
    "â†’": "→",
    "â”€â”€": "──",
    "ðŸ–¥": "🖥️"
}

def fix_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html") or file.endswith(".js") or file.endswith(".css"):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                    
                    modified = False
                    for key, val in replacements.items():
                        if key in content:
                            content = content.replace(key, val)
                            modified = True
                    
                    if modified:
                        with open(file_path, "w", encoding="utf-8", newline="") as f:
                            f.write(content)
                        print(f"Fixed: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    # Target the project directory (current directory)
    project_dir = os.path.dirname(os.path.abspath(__file__))
    fix_files(project_dir)
