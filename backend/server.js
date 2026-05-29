import express from "express";
import cors from "cors";
import "dotenv/config";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import incomeRouter from "./routes/incomeRoute.js";
import expenseRouter from "./routes/expenseRoute.js";
import dashboardRouter from "./routes/dashboardRoute.js";
import budgetCoachRouter from "./routes/budgetCoachRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// ─── Middlewares ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// FIX: rate limit auth routes to prevent brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { success: false, message: "Too many requests, please try again later." },
});

// ─── Database ─────────────────────────────────────────────────────────────────
connectDB();

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/user", authLimiter, userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/budget-coach", budgetCoachRouter);

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running.");
});

// FIX: global error handler — stops stack traces leaking to client
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error." });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});