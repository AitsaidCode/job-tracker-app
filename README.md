# Job Tracker Pro 🚀

A highly-scalable, premium web application designed to help professionals track job applications and easily identify which CV/Resume was used for each role.

## ✨ Features
- **Premium Glassmorphism UI**: Rebuilt from the ground up with a stunning dark-themed glass UI, vibrant gradients, and fluid micro-animations using `framer-motion`.
- **CV Attachments (Base64)**: Upload your actual PDF or Word document when applying! The backend supports large payloads up to 10MB to securely store encoded files.
- **Instant Downloads**: Retrieve your attached CV securely with a single click right from the application card.
- **Smart Filtering & Search**: Find any application instantly by company, position, or quickly toggle by CV Type (Developer, AMOA, IT Ops, Healthcare).
- **Embedded Database**: Runs seamlessly out of the box using `mongodb-memory-server`, meaning zero external database setup is required for local testing!

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Tailwind CSS v4, Framer Motion, Lucide React
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB (In-memory configured for instant zero-config deployments)

---

## 🚀 Running Locally

### Prerequisites
- Node.js installed on your machine.

### 1. Start the Backend
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd job-tracker/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server (runs on `http://localhost:5001`!):
   ```bash
   node server.js
   ```

### 2. Start the Frontend
1. Open a **new terminal** and navigate to the frontend directory:
   ```bash
   cd job-tracker/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

## 📈 Scalability Ready
The codebase is structured to easily drop the `mongodb-memory-server` and replace the `MONGODB_URI` environment variable with a production cluster (like Supabase Postgres via Prisma or MongoDB Atlas). It is currently configured to run zero-setup for immediate usability!
