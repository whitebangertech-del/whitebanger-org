# Bypass SSL Certificate errors for Hostinger FTPS
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }

$sourceDir = (Get-Item .).FullName

Write-Host "Optimizing CSS & JS files..." -ForegroundColor Yellow
$css = [IO.File]::ReadAllText("$sourceDir\wb-style.css")
$css = [regex]::Replace($css, '(?s)/\*.*?\*/', '')
$css = $css -replace '[\r\n]+', ''
$css = [regex]::Replace($css, '\s+', ' ')
$css = $css -replace '\s*{\s*', '{'
$css = $css -replace '\s*}\s*', '}'
$css = $css -replace '\s*:\s*', ':'
$css = $css -replace '\s*;\s*', ';'
$css = $css -replace '\s*,\s*', ','
[IO.File]::WriteAllText("$sourceDir\wb-style.min.css", $css, [System.Text.Encoding]::UTF8)

Function Minify-JS($file, $outFile) {
    if (-not (Test-Path $file)) { return }
    $lines = Get-Content $file
    $minified = ""
    $inBlockComment = $false
    foreach ($line in $lines) {
        $line = $line.Trim()
        if ($line.StartsWith("/*")) { $inBlockComment = $true }
        if ($inBlockComment) {
            if ($line.EndsWith("*/") -or $line.Contains("*/")) {
                $inBlockComment = $false
                $line = $line.Substring($line.IndexOf("*/") + 2).Trim()
            } else { continue }
        }
        if ($line.StartsWith("//")) { continue }
        if ($line -match '^.+?//') { 
            if (-not ($line -match 'https?://')) {
                $line = $line.Substring(0, $line.IndexOf('//')).Trim()
            }
        }
        if ($line -ne "") { $minified += $line + "`n" }
    }
    $minified = [regex]::Replace($minified, '(?s)/\*.*?\*/', '')
    [IO.File]::WriteAllText($outFile, $minified, [System.Text.Encoding]::UTF8)
}

Minify-JS "$sourceDir\wb-script.js" "$sourceDir\wb-script.min.js"
Minify-JS "$sourceDir\wb-translations.js" "$sourceDir\wb-translations.min.js"
Write-Host "Optimization Complete!" -ForegroundColor Green

$pwdFile = "$sourceDir\.ftp-password"
if (-not (Test-Path $pwdFile)) {
    Write-Host "ERROR: Please create '.ftp-password' file in the root folder with your Hostinger FTP password inside." -ForegroundColor Red
    exit 1
}
$Password = (Get-Content $pwdFile).Trim()

$server = "195.179.239.83"
$user = "u862614094.whitebangerorg"
$remotePath = "" 

Write-Host "Verifying connection to ftp://$server as $user..." -ForegroundColor Yellow

try {
    $testReq = [System.Net.FtpWebRequest]::Create("ftp://$server/")
    $testReq.Credentials = New-Object System.Net.NetworkCredential($user, $Password)
    $testReq.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
    $testReq.EnableSsl = $true
    $testRes = $testReq.GetResponse()
    $testRes.Close()
    Write-Host "[OK] Authentication Successful! (Using FTPS)" -ForegroundColor Green
} catch {
    Write-Host "[FAIL] Authentication Failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please double-check your FTP username and password." -ForegroundColor Yellow
    exit 1
}

function Create-FtpDirectory([string]$dirUrl) {
    try {
        $req = [System.Net.FtpWebRequest]::Create($dirUrl)
        $req.Credentials = New-Object System.Net.NetworkCredential($user, $Password)
        $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
        $req.EnableSsl = $true
        $res = $req.GetResponse()
        $res.Close()
    } catch {}
}

$files = Get-ChildItem -Path $sourceDir -Recurse -File | Where-Object { 
    $rel = $_.FullName.Substring($sourceDir.Length + 1).Replace('\', '/')
    $rel -notmatch '^_agents/' -and 
    $_.Name -ne "deploy.ps1" -and
    $_.Name -ne ".ftp-password"
}

Write-Host "Found $($files.Count) files to upload."

$createdDirs = @{}

foreach ($file in $files) {
    $relPath = $file.FullName.Substring($sourceDir.Length + 1).Replace('\', '/')
    $remoteFileUrl = "ftp://$server/$remotePath$relPath"
    
    $dirName = [System.IO.Path]::GetDirectoryName($relPath).Replace('\', '/')
    if ($dirName -ne "" -and -not $createdDirs.ContainsKey($dirName)) {
        $currentPath = ""
        foreach ($part in ($dirName -split '/')) {
            if ($part) {
                $currentPath += "$part/"
                $dirUrl = "ftp://$server/$remotePath$currentPath"
                Create-FtpDirectory $dirUrl
            }
        }
        $createdDirs[$dirName] = $true
    }

    try {
        $req = [System.Net.FtpWebRequest]::Create($remoteFileUrl)
        $req.Credentials = New-Object System.Net.NetworkCredential($user, $Password)
        $req.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $req.EnableSsl = $true
        $req.UseBinary = $true
        $req.KeepAlive = $false
        
        $content = [System.IO.File]::ReadAllBytes($file.FullName)
        $stream = $req.GetRequestStream()
        $stream.Write($content, 0, $content.Length)
        $stream.Close()
        
        Write-Host "Uploaded: $relPath" -ForegroundColor Green
    } catch {
        Write-Host "Failed: $relPath - $($_.Exception.Message)" -ForegroundColor Red
    }
}
Write-Host "Deployment Completed successfully!" -ForegroundColor Cyan
