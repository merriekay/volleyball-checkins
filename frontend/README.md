# 🏐 Volleyball Check-In App

A full-stack web application for tracking athlete mental/emotional check-ins before practice or games. Built with React, Express, and MongoDB.

## 📋 What This App Does

- Athletes submit check-ins with their name, emotion, intensity level, and optional notes
- Coaches view all recent check-ins in real-time
- Data persists in MongoDB Atlas (survives page refresh!)
- Demonstrates full-stack data flow: Frontend → Backend → Database

---

## 🚀 Quick Start

### Prerequisites

Make sure you have these installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas account** (free) - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download here](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd volleyball-checkin
```

### Step 2: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier is fine)
3. Click **Connect** → **Drivers**
4. Copy your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)
5. **Important:** Replace `<password>` with your actual database password

### Step 3: Configure Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Edit `backend/.env`** and add:

```
MONGODB_URI=your_connection_string_here
PORT=3001
```

Replace `your_connection_string_here` with your actual MongoDB connection string from Step 2.

**Example:**

```
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/volleyball?retryWrites=true&w=majority
PORT=3001
```

### Step 4: Configure Frontend

Open a **new terminal window** (keep backend terminal open), then:

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies
npm install
```

### Step 5: Start Both Servers

**Terminal 1 (Backend):**

```bash
cd backend
npm run dev
```

You should see:

```
✅ Connected to MongoDB
🏐 Volleyball Check-In API running on http://localhost:3001
```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev
```

You should see:

```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 6: Open Your Browser

Go to: **http://localhost:5173**

You should see the Volleyball Check-In app! 🎉

---

## 🧪 Testing the App

1. **Submit a check-in:**

   - Enter your name
   - Select an emotion
   - Adjust intensity slider
   - (Optional) Add notes
   - Click "Submit Check-In"

2. **Watch it appear:**

   - Your check-in should appear in the right column
   - Refresh the page - it's still there! (persistence!)

3. **Check MongoDB:**

   - Go to MongoDB Atlas → Browse Collections
   - Look for the `checkins` collection
   - Your check-in data should be there

4. **Delete a check-in:**
   - Click the × button on any check-in card
   - It disappears from UI and MongoDB

---

## 📁 Project Structure

```
volleyball-checkin/
├── backend/                 # Express server + MongoDB
│   ├── models/
│   │   └── CheckIn.js      # Mongoose schema
│   ├── routes/
│   │   └── checkins.js     # API routes (GET, POST, DELETE)
│   ├── server.js           # Main server file
│   ├── .env                # Environment variables (DON'T COMMIT!)
│   └── package.json
│
├── frontend/               # React app
│   ├── src/
│   │   ├── App.jsx        # Main component
│   │   ├── App.css        # Styling
│   │   └── main.jsx       # Entry point
│   └── package.json
│
└── README.md              # This file!
```

---

## 🔧 Troubleshooting

### "Cannot find package 'express'"

**Problem:** Dependencies not installed.

**Fix:**

```bash
cd backend
npm install
```

### "MongoDB connection error"

**Problem:** Wrong connection string or network access.

**Fix:**

1. Check your `.env` file has correct `MONGODB_URI`
2. In MongoDB Atlas: Network Access → Add IP Address → Allow Access from Anywhere (`0.0.0.0/0`)
3. Make sure your password doesn't have special characters (or URL-encode them)

### "CORS error in browser console"

**Problem:** Backend CORS not configured properly.

**Fix:** Make sure `backend/server.js` has:

```javascript
import cors from "cors";
app.use(cors());
```

### "Port 3001 already in use"

**Problem:** Backend already running or another app using that port.

**Fix:**

```bash
# Kill the process on port 3001 (Mac/Linux)
lsof -ti:3001 | xargs kill -9

# Or change the port in backend/.env
PORT=3002
```

Then update `frontend/src/App.jsx`:

```javascript
const API_URL = "http://localhost:3002/api/checkins";
```

### Check-ins don't appear after refresh

**Problem:** Not connected to MongoDB (data only in memory).

**Fix:** Check backend terminal for "✅ Connected to MongoDB" message. If not, verify your `.env` file.

---

## 🎯 Learning Objectives

This app demonstrates:

- ✅ **Full-stack architecture**: React frontend + Express backend + MongoDB database
- ✅ **RESTful API design**: GET, POST, DELETE endpoints
- ✅ **Data persistence**: MongoDB stores data permanently
- ✅ **CRUD operations**: Create (POST), Read (GET), Delete (DELETE)
- ✅ **Real-time updates**: Frontend reflects database changes
- ✅ **Form handling**: React controlled components
- ✅ **State management**: useState and useEffect hooks

---

## 📚 API Endpoints

### GET `/api/checkins`

Returns all check-ins sorted by newest first.

**Response:**

```json
[
  {
    "_id": "673d9a...",
    "athleteName": "Sarah Johnson",
    "emotion": "excited",
    "intensity": 4,
    "notes": "Ready for the game!",
    "createdAt": "2024-11-20T14:30:00.000Z"
  }
]
```

### POST `/api/checkins`

Create a new check-in.

**Request body:**

```json
{
  "athleteName": "Sarah Johnson",
  "emotion": "excited",
  "intensity": 4,
  "notes": "Ready for the game!"
}
```

**Response:** The created check-in with `_id` and timestamps.

### DELETE `/api/checkins/:id`

Delete a check-in by ID.

**Response:**

```json
{
  "message": "Check-in deleted"
}
```

---

## 🔐 Security Notes

**NEVER commit `.env` files to Git!**

Your `.env` file contains sensitive information (MongoDB password). Make sure `.gitignore` includes:

```
backend/.env
backend/node_modules/
frontend/node_modules/
```

---

## 🎨 Customization Ideas

Want to extend this app? Try adding:

- **Filter by emotion**: Show only "stressed" or "anxious" check-ins
- **Date range filter**: View check-ins from last week
- **Edit check-ins**: Allow updating existing check-ins
- **Coach comments**: Let coaches add feedback to check-ins
- **Data visualization**: Charts showing emotion trends over time
- **Authentication**: Require login for coaches
- **Team selection**: Support multiple teams

---

## 🆘 Getting Help

**During class:**

- Ask Prof. Moore or TAs
- Check with classmates (collaboration is encouraged!)

**Outside class:**

- Office hours: Mon/Wed 2:00-3:30 PM
- Email: meredith.moore@drake.edu
- Review [Day 20](https://hackmd.io/@profmoore/Day20-fullstack) and [Day 21](https://hackmd.io/@profmoore/Day21) slides

---

## 📝 Common Commands Reference

```bash
# Start backend (from backend folder)
npm run dev

# Start frontend (from frontend folder)
npm run dev

# Install new package in backend
cd backend
npm install package-name

# Install new package in frontend
cd frontend
npm install package-name

# Check what's running on port 3001
lsof -ti:3001

# View Git status
git status

# Commit changes
git add .
git commit -m "Your commit message"
git push
```

---

**Built with ❤️ for CS195 Full Stack Web Development**
