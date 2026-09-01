@echo off
echo ========================================
echo   Netflex - Installation
echo ========================================
echo.

echo [1/4] Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Root installation failed!
    pause
    exit /b 1
)
echo Done.
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
echo Done.
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
echo Done.
echo.

echo [4/4] Verifying installation...
if exist "server\node_modules" (
    echo [OK] Server node_modules found
) else (
    echo [ERROR] Server node_modules missing
)

if exist "client\node_modules" (
    echo [OK] Client node_modules found
) else (
    echo [ERROR] Client node_modules missing
)

echo.
echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run 'start-dev.bat' to start servers
echo 2. Open http://localhost:3000
echo.
pause
