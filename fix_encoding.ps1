# fix_encoding.ps1

$replacements = @{
    "à¤µà¥ à¤¹à¤¾à¤‡à¤Ÿ à¤¬à¥ˆà¤‚à¤—à¤°" = "व्हाइट बैंगर"
    "à¨µà© à¨¹à¤¾à¨ˆà¨Ÿ à¨¬à©ˆà¨‚à¤—à¤°" = "ਵ੍ਹਾਈਟ ਬੈਂਗਰ"
    "ðŸŽ“" = "🎓"
    "ðŸ“Š" = "📊"
    "ðŸ–¥ï¸ " = "💻"
    "ðŸ“ˆ" = "📈"
    "ðŸ“¢" = "📢"
    "ðŸŽ¨" = "🎨"
    "ðŸ“·" = "📊"
    "ðŸ“°" = "📸"
    "ðŸ’¡" = "💡"
    "â˜…" = "★"
    "â€”" = "—"
    "ðŸŽ" = "🎁"
    "ðŸ“²" = "📱"
    "ðŸ“§" = "📧"
}

$files = Get-ChildItem -Filter *.html -Recurse

foreach ($file in $files) {
    try {
        # Force read as UTF8
        $utf8Encoding = New-Object System.Text.UTF8Encoding($false)
        $content = [System.IO.File]::ReadAllText($file.FullName)
        
        $modified = $false
        foreach ($key in $replacements.Keys) {
            if ($content.Contains($key)) {
                $content = $content.Replace($key, $replacements[$key])
                $modified = $true
            }
        }
        
        if ($modified) {
            [System.IO.File]::WriteAllText($file.FullName, $content, $utf8Encoding)
            Write-Host "Fixed encoding and symbols in $($file.FullName)"
        }
    } catch {
        Write-Error "Failed to process $($file.FullName): $($_.Exception.Message)"
    }
}
