# Voyage – Next.js Travel Planner

A premium‑styled travel‑planning web app built with **Next.js 15** (App Router) and a rich UI (glassmorphism, HSL‑based dark‑mode, micro‑animations).

## ✨ Features

- Sidebar navigation with theme toggle
- Dashboard with budget circular progress & packing status
- Itinerary, Budget, Packing, and Journal sections
- Persistent state via `localStorage`
- Fully responsive, modern design

## 🚀 Deploy to Vercel

1. **Create a Git repo** (GitHub, GitLab, or Bitbucket) and push this folder.

```bash
git init
git add .
git commit -m "Initial Voyage Next.js release"
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```

2. **Import the repository on Vercel**
   - Go to https://vercel.com/dashboard → **New Project** → **Import Git Repository**.
   - Select the repo you just pushed. Vercel automatically detects a Next.js project; keep the defaults.

3. **Deploy!**
   Vercel will run `npm install && npm run build && npm start`. After the build finishes you’ll get a live URL like `https://voyage‑<random>.vercel.app`.

## 📦 Local Development

```bash
# From the project root
npm install
npm run dev   # http://localhost:3000
```

## 🎨 Customising the Design

All design tokens live in `app/globals.css`. Update the HSL variables to tweak colors, gradients, or switch to a different palette.
