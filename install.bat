@echo off
echo ========================================
echo   Netflix Clone - Installation Script
echo ========================================
echo.

echo [1/4] Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Root installation failed!
    pause
    exit /b 1
)
echo ✓ Root dependencies installed
echo.

echo [2/4] Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Server installation failed!
    cd ..
    pause
    exit /b 1
)
cd ..
echo ✓ Server dependencies installed
echo.

echo [3/4] Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Client installation failed!
    cd ..
    pause
    exit /b 1
)
cd ..
echo ✓ Client dependencies installed
echo.

echo [4/4] Verifying installation...
if exist "node_modules" (
    echo ✓ Root node_modules found
) else (
    echo ✗ Root node_modules missing
)

if exist "server\node_modules" (
    echo ✓ Server node_modules found
) else (
    echo ✗ Server node_modules missing
)

if exist "client\node_modules" (
    echo ✓ Client node_modules found
) else (
    echo ✗ Client node_modules missing
)

echo.
echo ========================================
echo   Installation Complete! 🎉
echo ========================================
echo.
echo Next steps:
echo 1. Run 'start-dev.bat' to start both services
echo 2. Or manually run: npm run dev
echo 3. Open http://localhost:5173 in your browser
echo.
pause
