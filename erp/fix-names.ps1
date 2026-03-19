$files = Get-ChildItem -Filter '*.html' | Select-Object -ExpandProperty FullName
foreach ($f in $files) {
    $c = Get-Content $f -Raw -Encoding UTF8
    # Rename ERP branding
    $c = $c -replace 'White Banger ERP', 'Dashboard'
    $c = $c -replace '<span>ERP System</span>', '<span>Management System</span>'
    $c = $c -replace 'ERP System', 'Management System'
    $c = $c -replace '<span>ERP</span>', '<span>Dashboard</span>'
    # Remove emojis from explicit text nodes / card titles
    $c = $c -replace 'Admin Dashboard 🎓', 'Admin Dashboard'
    $c = $c -replace 'Welcome Back 👋', 'Welcome Back'
    $c = $c -replace '🚀 Quick Demo Login', 'Quick Demo Login'
    $c = $c -replace 'Quick Demo Login', 'Demo Login'
    # Strip leading emoji + space pattern from card/section titles
    $emojiPattern = '[^\u0000-\u007F\u00A0-\u024F\u1E00-\u1EFF\u2C60-\u2C7F\uA720-\uA7FF] '
    $c = [System.Text.RegularExpressions.Regex]::Replace($c, $emojiPattern, '')
    # Strip standalone emojis with no space after (in content attrs etc)
    $emojiPattern2 = '[^\u0000-\u007F\u00A0-\u024F\u1E00-\u1EFF\u2C60-\u2C7F\uA720-\uA7FF](?=[<\s])'
    $c = [System.Text.RegularExpressions.Regex]::Replace($c, $emojiPattern2, '')
    Set-Content $f $c -Encoding UTF8 -NoNewline
}
Write-Host 'HTML files updated.'
