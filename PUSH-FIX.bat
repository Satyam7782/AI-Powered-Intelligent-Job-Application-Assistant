@echo off
echo ================================================
echo   FIXING RAILWAY DEPLOYMENT - PLEASE WAIT
echo ================================================
echo.

cd /d "C:\Users\VICTUS\.gemini\antigravity\scratch\job-assistant"

echo Step 1: Staging all changes...
git add .

echo Step 2: Committing...
git commit -m "fix: JDBC URL, CORS, health endpoint for Railway deployment"

echo Step 3: Pushing to GitHub...
git push origin main

echo.
echo ================================================
echo   DONE! Railway will auto-redeploy in ~3 min
echo   Check: https://railway.app
echo ================================================
echo.
pause
