# 🌍 Global Chat App

A real-time global messaging platform where users can post messages, see local weather/location, respond to daily questions, comment on posts, and view trending content — all built using Vue.js and Express with a SQLite backend.

---

## Features

-  User authentication (Sign up, Log in, Delete account)
-  Profile icon & username display
-  Global message board with geolocation + weather tagging
-  Like / Dislike functionality
-  Daily Question with public responses
-  Trending section based on message content
-  Responsive UI built with Vue 3
-  Light/Dark Mode Toggle
-  Comment system with threaded replies

---

## Tech

- **Frontend**: Vue.js, (Vite)
- **Backend**: Node.js, Express
- **Database**: SQLite
- **APIs**: OpenWeatherMap, HTML5 Geolocation
- **Version Control**: Git & GitHub

---

## Folder Structure

3390Project3/
├── controller/ # Express server (server.js)
├── model/ # SQLite logic (db.js)
├── view/
│ └── global-chat-app/
│ ├── src/
│ │ ├── components/
│ │ │ ├── App.vue
│ │ │ ├── MessageCard.vue
│ │ │ ├── LoginForm.vue
│ │ │ └── DailyQuestion.vue
│ │ └── main.js
│ └── index.html
├── README.md
└── .gitignore

---
```bash
## How to Run Locally

## 1. Clone the repo

git clone https://github.com/30percentother/3390Project3.git
cd 3390Project3

## 2. Sync With Latest Stable Version
git fetch origin
git reset --hard origin/main

## 3. Install Dependencies
npm install
npm run install-client
This installs server dependencies (at root) and Vue frontend dependencies (in view/global-chat-app).

## Run the App
To launch both the backend and frontend simultaneously:
npm start

Backend runs at: http://localhost:3000
Frontend opens in browser via Vite on http://localhost:5173

## Environment Notes
Node.js 18+ recommended
Ensure ports 3000 (API) and 5173 (Vite) are free
If you reinstall or delete node_modules, rerun install steps
If Vite isn't installed, run npm install -g vite inside view/global-chat-app

