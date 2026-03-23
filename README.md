# 🚀 Job Tracker App
A sleek, modern, and highly interactive application to manage your job hunting pipeline.

![Application Preview](https://job-tracker-app-psi.vercel.app)

## ✨ Features
- **UI/UX Excellence**: Completely built with a Premium Glassmorphism Dark Mode using Tailwind CSS and Framer Motion for micro-interactions.
- **Analytics Dashboard**: Real-time insights covering your Total applications, Interviews, Offers, and Rejections.
- **Drag & Drop Kanban Board**: Seamlessly toggle between a Grid View and an interactive Kanban Board to move applications across stages.
- **Detailed Reading View**: Click on any application to bring up a sophisticated Details Modal, showing Salary, Dates, formatted Notes, and more.
- **CV Management**: Attach the exact PDF/Docx you used for a specific application, and download it later with a single click.

## 🏗️ Architecture
The heavy and slow local Node.js + MongoDB infrastructure has been entirely replaced by a lightning-fast, scalable Serverless architecture:
- **Frontend**: React + Vite (Hosted on Vercel)
- **Backend / Database**: Supabase PostgreSQL (Accessed directly via `@supabase/supabase-js`)
- **Styling & Animation**: Tailwind CSS, Framer Motion, Lucide React

## 🚀 Live Demo
The application is fully deployed and accessible here:
👉 **[Job Tracker Live on Vercel](https://job-tracker-app-psi.vercel.app)**

## 💻 Local Development
If you wish to clone and run the UI locally:

```bash
# Clone the repository
git clone https://github.com/AitsaidCode/job-tracker-app.git
cd job-tracker-app/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

*Note: The frontend is configured to communicate with the live Supabase Database.*
