@echo off
title JobAI - Start Backend + Tunnel

echo ============================================
echo   JobAI - Backend + Public Tunnel Launcher
echo ============================================
echo.

REM -- Extract ngrok if missing
if not exist "%USERPROFILE%\ngrok\ngrok.exe" (
    echo Extracting ngrok...
    powershell -Command "Expand-Archive -Path '%USERPROFILE%\ngrok.zip' -DestinationPath '%USERPROFILE%\ngrok' -Force"
)

REM -- Set Java 17 and Maven paths
set JAVA_HOME=%USERPROFILE%\msjdk17\jdk-17.0.14+7
set MVN=%USERPROFILE%\maven\apache-maven-3.9.9\bin\mvn.cmd
set PATH=%JAVA_HOME%\bin;%PATH%

REM -- Authenticate ngrok (safe to run multiple times)
"%USERPROFILE%\ngrok\ngrok.exe" config add-authtoken 3GdOukbKj1QF13DG2umWOU7wl1P_7mcim1biNFfK2uDhhroHt

REM -- Start Spring Boot in a new window
echo Starting Spring Boot backend...
start "Spring Boot Backend" cmd /k "set JAVA_HOME=%USERPROFILE%\msjdk17\jdk-17.0.14+7 && set PATH=%JAVA_HOME%\bin;%PATH% && cd /d %~dp0backend && %MVN% spring-boot:run"

REM -- Wait for backend to start
echo Waiting 15 seconds for backend to start...
timeout /t 15 /nobreak >nul

REM -- Start ngrok tunnel in a new window
echo Starting ngrok tunnel on port 8080...
start "ngrok Tunnel" cmd /k "%USERPROFILE%\ngrok\ngrok.exe http 8080"

echo.
echo ============================================
echo  Tunnel is starting in a new window!
echo.
echo  NEXT STEPS:
echo  1. Copy the https://xxxx.ngrok-free.app URL
echo     from the ngrok window
echo  2. Go to: https://vercel.com/satyam7782s-projects/frontend/settings/environment-variables
echo  3. Set VITE_API_URL = https://xxxx.ngrok-free.app
echo  4. Redeploy on Vercel (Deployments > Redeploy)
echo ============================================
echo.
pause
