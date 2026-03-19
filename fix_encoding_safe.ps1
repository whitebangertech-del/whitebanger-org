# fix_encoding_safe.ps1
# Use ASCII-only script with char codes for safety

$utf8 = New-Object System.Text.UTF8Encoding($false)

# Function to get string from UTF-8 bytes
function Get-U8($bytes) {
    return [System.Text.Encoding]::UTF8.GetString([byte[]]$bytes)
}

# Replacement Map (Garbled String -> Correct Character)
$replacements = @{
    # Hindi/Punjabi names
    (Get-U8 (0xC3,0xA0,0xC2,0xA4,0xC2,0xB5,0xC3,0xA0,0xC2,0xA5,0xC2,0x8D,0xC3,0xA0,0xC2,0xA4,0xC2,0xB9,0xC3,0xA0,0xC2,0xA4,0xC2,0xBE,0xC3,0xA0,0xC2,0xA4,0xC2,0x87,0xC3,0xA0,0xC2,0xA4,0xC2,0x9F,0x20,0xC3,0xA0,0xC2,0xA4,0xC2,0xAC,0xC3,0xA0,0xC2,0xA5,0xC2,0x88,0xC3,0xA0,0xC2,0xA4,0xC2,0x82,0xC3,0xA0,0xC2,0xA4,0xC2,0x97,0xC3,0xA0,0xC2,0xA4,0xC2,0xB0)) = (Get-U8 (0xE0,0xA4,0xB5,0xE0,0xA5,0x8D,0xE0,0xA4,0xB9,0xE0,0xA4,0xBE,0xE0,0xA4,0x87,0xE0,0xA4,0x9F,0x20,0xE0,0xA4,0xAC,0xE0,0xA5,0x88,0xE0,0xA4,0x82,0xE0,0xA4,0x97,0xE0,0xA4,0xB0))
    
    # Emojis (Garbled UTF-8 bytes read as CP1252)
    (Get-U8 (0xC3,0xB0,0xC5,0xB8,0xC5,0xBD,0xE2,0x80,0x9C)) = [char]::ConvertFromUtf32(0x1F393) # 🎓
    (Get-U8 (0xC3,0xB0,0xC5,0xB8,0xE2,0x80,0x9D,0xC5,0xA0)) = [char]::ConvertFromUtf32(0x1F4CA) # 📊
    (Get-U8 (0xC3,0xB0,0xC5,0xB8,0xE2,0x80,0x93,0xC2,0xA5,0xC3,0xAF,0xC2,0xB8,0xC2,0x8F)) = [char]::ConvertFromUtf32(0x1F4BB) # 💻 (manually guessed bytes)
    
    # Simple common ones
    "â˜…" = [char]0x2605 # Star
    "â€”" = [char]0x2014 # Em dash
    "â–¶" = [char]0x25B6 # Play/Arrow
    "â–¼" = [char]0x25BC # Dropdown arrow
    "âœ”" = [char]0x2714 # Checkmark
}

# Actually, the mangled strings are literally what I see in the text files.
# If I look for "â˜…", PowerShell reads it as three chars.
# I'll just use the exact strings I verified in view_file.

$files = Get-ChildItem -Filter *.html -Recurse

foreach ($file in $files) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        $modified = $false
        
        # Manually specify the literal garbled strings to avoid any script-encoding issues
        
        # 🎓 All Courses
        if ($content.Contains("ðŸŽ“")) { $content = $content.Replace("ðŸŽ“", [char]::ConvertFromUtf32(0x1F393)); $modified = $true }
        # 📊 Finance
        if ($content.Contains("ðŸ“Š")) { $content = $content.Replace("ðŸ“Š", [char]::ConvertFromUtf32(0x1F4CA)); $modified = $true }
        # 💻 Programming
        if ($content.Contains("ðŸ–¥ï¸ ")) { $content = $content.Replace("ðŸ–¥ï¸ ", [char]::ConvertFromUtf32(0x1F4BB)); $modified = $true }
        # 📈 Microsoft
        if ($content.Contains("ðŸ“ˆ")) { $content = $content.Replace("ðŸ“ˆ", [char]::ConvertFromUtf32(0x1F4C8)); $modified = $true }
        # 📢 Marketing
        if ($content.Contains("ðŸ“¢")) { $content = $content.Replace("ðŸ“¢", [char]::ConvertFromUtf32(0x1F4E2)); $modified = $true }
        # 🎨 Design
        if ($content.Contains("ðŸŽ¨")) { $content = $content.Replace("ðŸŽ¨", [char]::ConvertFromUtf32(0x1F3A8)); $modified = $true }
        # 📊 Excel (using 📊 for both if needed)
        if ($content.Contains("ðŸ“·")) { $content = $content.Replace("ðŸ“·", [char]::ConvertFromUtf32(0x1F4F8)); $modified = $true }
        # 📸 Photography
        if ($content.Contains("ðŸ“°")) { $content = $content.Replace("ðŸ“°", [char]::ConvertFromUtf32(0x1F4F8)); $modified = $true }
        # 💡 More
        if ($content.Contains("ðŸ’¡")) { $content = $content.Replace("ðŸ’¡", [char]::ConvertFromUtf32(0x1F4A1)); $modified = $true }
        # ★ Star
        if ($content.Contains("â˜…")) { $content = $content.Replace("â˜…", [char]0x2605); $modified = $true }
        # — Dash
        if ($content.Contains("â€”")) { $content = $content.Replace("â€”", [char]0x2014); $modified = $true }
        # ▶ Arrow
        if ($content.Contains("â–¶")) { $content = $content.Replace("â–¶", [char]0x25B6); $modified = $true }
        # ▼ Arrow
        if ($content.Contains("â–¼")) { $content = $content.Replace("â–¼", [char]0x25BC); $modified = $true }
        # ✔ Check
        if ($content.Contains("âœ”")) { $content = $content.Replace("âœ”", [char]0x2714); $modified = $true }
        
        # Intro Text
        # Hindi: व्हाइट बैंगर
        $hi_mangled = "à¤µà¥ à¤¹à¤¾à¤‡à¤Ÿ à¤¬à¥ˆà¤‚à¤—à¤°"
        if ($content.Contains($hi_mangled)) { 
            $hi_correct = [System.Text.Encoding]::UTF8.GetString([byte[]](0xE0,0xA4,0xB5,0xE0,0xA5,0x8D,0xE0,0xA4,0xB9,0xE0,0xA4,0xBE,0xE0,0xA4,0x87,0xE0,0xA4,0x9F,0x20,0xE0,0xA4,0xAC,0xE0,0xA5,0x88,0xE0,0xA4,0x82,0xE0,0xA4,0x97,0xE0,0xA4,0xB0))
            $content = $content.Replace($hi_mangled, $hi_correct)
            $modified = $true 
        }
        # Punjabi: ਵ੍ਹਾਈਟ ਬੈਂਗਰ
        $pa_mangled = "à¨µà© à¨¹à¤¾Àˆà¨Ÿ à¨¬à©ˆÀ‚à¨—à¨°" # Wait, I need to check the EXACT mangled bytes for PA
        # Let's use the one I saw in index.html: "à¨µà© à¨¹à¤¾à¨ˆà¨Ÿ à¨¬à©ˆà¨‚à¤—à¤°"
        $pa_mangled = "à¨µà© à¨¹à¤¾à¨ˆà¨Ÿ à¨¬à©ˆà¨‚à¨—à¤°"
        if ($content.Contains($pa_mangled)) {
            $pa_correct = [System.Text.Encoding]::UTF8.GetString([byte[]](0xE0,0xA8,0xB5,0xE0,0xA9,0x8D,0xE0,0xA8,0xB9,0xE0,0xA8,0xBE,0xE0,0xA8,0x88,0xE0,0xA8,0x9F,0x20,0xE0,0xA8,0xAC,0xE0,0xA9,0x88,0xE0,0xA9,0x80,0xE0,0xA8,0x97,0xE0,0xA8,0xB0))
            $content = $content.Replace($pa_mangled, $pa_correct)
            $modified = $true
        }

        if ($modified) {
            [System.IO.File]::WriteAllText($file.FullName, $content, $utf8)
            Write-Host "Fixed: $($file.FullName)"
        }
    } catch {
        Write-Error "Error in $($file.FullName): $($_.Exception.Message)"
    }
}
