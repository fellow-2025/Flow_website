@echo off
:: Check if cwebp exists in the current directory or system path
where cwebp >nul 2>nul
if %errorlevel% neq 0 (
    echo cwebp not found! Make sure it is installed and accessible in your PATH.
    exit /b 1
)

:: Loop through all PNG files in the current directory
for %%f in (*.png) do (
    echo Converting %%f to %%~nf.webp
    cwebp "%%f" -o "%%~nf.webp"
)

for %%f in (*.jpg) do (
    echo Converting %%f to %%~nf.webp
    cwebp "%%f" -o "%%~nf.webp"
)

echo Conversion complete!
pause