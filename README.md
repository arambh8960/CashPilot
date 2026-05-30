<div align="center">

# 💸 CashPilot

### AI-Powered Personal Finance Management Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-6366f1?style=for-the-badge&logo=render)](https://cashpilot-1.onrender.com)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-10b981?style=for-the-badge)](https://github.com/arambh8960/CashPilot)
[![AI Powered](https://img.shields.io/badge/AI-Groq%20%2B%20Llama-f59e0b?style=for-the-badge)](https://groq.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**CashPilot** is a full-stack AI-powered personal finance platform that helps you track income, manage expenses, monitor savings, and receive personalised budgeting insights — all in one place.

[🚀 Live Demo](https://cashpilot-1.onrender.com) &nbsp;·&nbsp; [📸 Screenshots](#screenshots) &nbsp;·&nbsp; [⚙️ Features](#-features) &nbsp;·&nbsp; [🛠️ Installation](#%EF%B8%8F-installation)

</div>

---

## ✨ What Makes CashPilot Different?

Most finance apps just show you numbers. CashPilot goes further — it **talks to you**. The built-in **AI Budget Coach**, powered by **Groq API + Llama**, analyses your real spending data and lets you have a natural conversation about your finances.

Ask it anything:
- *"Where am I overspending this month?"*
- *"How much did I spend on food?"*
- *"How can I save more money?"*

And get personalised, data-driven answers in seconds.

---

## 🚀 Features

### 🔐 Authentication & Security
- Secure registration and login with **JWT Authentication**
- **OTP-based Email Verification** — only verified users can access the platform
- Passwords encrypted with **bcrypt**
- Protected API routes with auth middleware

### 💰 Income & Expense Management
- Add, edit, and delete income and expense transactions
- Categorise transactions (Food, Transport, Shopping, Salary, etc.)
- Filter by **daily, weekly, monthly, yearly** ranges
- Download transaction history as **Excel (.xlsx)**

### 📊 Financial Dashboard & Analytics
- Real-time overview of income, expenses, and net savings
- **Pie chart** for category-wise expense distribution
- Savings rate tracking and trend analysis
- Recent transactions summary

### 🤖 AI Budget Coach *(Unique Feature)*
- Powered by **Groq API + Llama** for ultra-fast AI responses
- **Chat-style interface** — ask questions naturally
- AI analyses your *actual* financial data, not generic advice
- Compares this month vs last month spending
- Suggests a personalised budget for next month
- Supports **Hindi, English, and Hinglish**
- Typing indicator, conversation memory, and smart quick-suggestions

### 🎨 UI/UX
- **Dark / Light Mode**
- Fully **Responsive Design** — works on mobile, tablet, and desktop
- Smooth animations with **Framer Motion**
- Interactive charts with **Recharts**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Tailwind CSS, Recharts, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT, bcrypt |
| **AI Integration** | Groq API (Llama Models) |
| **Email Service** | Nodemailer (Gmail) |
| **File Export** | SheetJS (xlsx) |
| **Deployment** | Render |

---

## ⚙️ Installation

```bash
git clone https://github.com/arambh8960/CashPilot.git
cd CashPilot
```

### Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory:
```env
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES=24h
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
GROQ_API_KEY=your_groq_api_key
```

### Frontend
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `/frontend` directory:
```env
VITE_API_URL=http://localhost:4000
```

### Run
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev
```

Visit `http://localhost:5173` 🚀

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | Register + send OTP |
| POST | `/api/user/verify-otp` | Verify email OTP |
| POST | `/api/user/resend-otp` | Resend OTP |
| POST | `/api/user/login` | Login |
| GET | `/api/user/me` | Get current user |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/income/add` | Add income |
| GET | `/api/income/get` | Get all income |
| PUT | `/api/income/update/:id` | Update income |
| DELETE | `/api/income/delete/:id` | Delete income |
| GET | `/api/income/downloadexcel` | Download as Excel |
| POST | `/api/expense/add` | Add expense |
| GET | `/api/expense/get` | Get all expenses |
| PUT | `/api/expense/update/:id` | Update expense |
| DELETE | `/api/expense/delete/:id` | Delete expense |
| GET | `/api/expense/downloadexcel` | Download as Excel |

### AI Budget Coach
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/budget-coach` | Get AI financial analysis |
| POST | `/api/budget-coach/chat` | Chat with AI coach |

---

## 🎯 Project Goal

To simplify personal finance management by combining expense tracking, financial analytics, and AI-powered budgeting assistance in a single platform — making smart money management accessible to everyone.

---

## 🚀 Deployment

Deployed on **Render** (Full Stack)

🔗 **Live:** [https://cashpilot-1.onrender.com](https://cashpilot-1.onrender.com)

> ⚠️ Free tier on Render spins down after inactivity — first load may take 30–60 seconds.

---

## 👨‍💻 Developer

**Arambh Tiwari**

[![GitHub](https://img.shields.io/badge/GitHub-arambh8960-181717?style=flat&logo=github)](https://github.com/arambh8960)

---

<div align="center">

⭐ **If you found this project helpful, please give it a star!** ⭐

</div>
