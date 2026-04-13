# Deployment Guide - Lease Your Car

This guide covers sharing your code on GitHub and deploying your application online.

---

## 📌 Part 1: Set Up GitHub Repository

### Step 1: Create a GitHub Account
- Go to [github.com](https://github.com) and sign up if you don't have an account

### Step 2: Create a New Repository
1. Click the **+** icon (top-right) → **New repository**
2. Name it: `lease-your-car`
3. Add description: "A full-stack car rental platform with real-time chat and ratings"
4. Choose **Public** (so others can see it)
5. **Skip** "Initialize with README" (we already have one)
6. Click **Create repository**

### Step 3: Push Code to GitHub

**Using Git Bash/Terminal:**

```bash
# Navigate to your project folder
cd "C:\Users\dadiv\OneDrive\Documents\Desktop\Lease-your-Car"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Lease Your Car application"

# Connect to GitHub (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/lease-your-car.git

# Push to GitHub
git branch -M main
git push -u origin main
```

After pushing, your code will be at: `https://github.com/YOUR_USERNAME/lease-your-car`

---

## 🚀 Part 2: Deploy the Application

### Option 1: **Railway.app** (Recommended for Beginners - Free Tier)

#### Backend Deployment:

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your `lease-your-car` repository
5. Click **Backend** folder
6. Add environment variables:
   - `PORT=5000`
   - `DB_USER=postgres`
   - `DB_HOST=(your postgres database URL from Railway)`
   - `DB_PASSWORD=your_password`
   - `DB_DATABASE=lease_your_car`
   - `DB_PORT=5432`
   - `JWT_SECRET=your-secret-key`
   - `FRONTEND_URL=https://your-frontend-url.vercel.app`

7. Railway will give you a URL like: `https://lease-your-car-api.up.railway.app`

#### Frontend Deployment:

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **Add New** → **Project**
4. Select your GitHub repository
5. Configure:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - Add environment variable:
     - `REACT_APP_API_URL=https://lease-your-car-api.up.railway.app`

6. Click **Deploy**
7. Your frontend URL will be: `https://your-app-name.vercel.app`

#### Database Setup on Railway:

1. In your Railway project, click **+ New**
2. Select **PostgreSQL**
3. Railway creates a database automatically
4. Copy the connection details and add them to your backend environment variables

---

### Option 2: **Heroku** (Alternative - Free tier limited)

**Backend:**
1. Go to [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Run:
```bash
heroku login
heroku create lease-your-car-api
heroku config:set DB_HOST=your_db_host DB_USER=postgres DB_PASSWORD=xxx JWT_SECRET=xxx
git push heroku main
```

4. Your backend URL: `https://lease-your-car-api.herokuapp.com`

---

### Option 3: **Render.com** (Free tier available)

**Backend & Database:**
1. Go to [render.com](https://render.com)
2. Click **New +** → **Web Service**
3. Select your GitHub repository
4. Configure:
   - **Name:** lease-your-car-api
   - **Environment:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `node server.js`
5. Add environment variables (same as above)
6. Click **Create Web Service**

---

## 🔗 Quick Share Links

After deployment, share these links:

```
GitHub Repository:
https://github.com/YOUR_USERNAME/lease-your-car

Live Application:
https://your-app-name.vercel.app

API Backend:
https://lease-your-car-api.up.railway.app
```

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] `.env` file is in `.gitignore` (never push secrets!)
- [ ] `.env.example` file exists with placeholder values
- [ ] Backend `server.js` reads from environment variables
- [ ] Frontend API calls use `process.env.REACT_APP_API_URL`
- [ ] CORS is configured for production URL
- [ ] Database migrations are ready

---

## 🆘 Troubleshooting

**"Database connection failed"**
- Check if database credentials are correct in environment variables
- Ensure your database is running and accessible

**"CORS error when frontend tries to reach backend"**
- Update `CORS_ORIGIN` in backend to match your Vercel/frontend URL
- In `server.js`, change: `origin: process.env.FRONTEND_URL`

**"Environment variables not loading"**
- Restart your deployment after adding env vars
- Check if `.env` file is NOT committed to git

---

## 📚 Resources

- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Express.js Deployment](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production)
