import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getBudgetCoachAnalysis, chatWithCoach } from "../controllers/budgetCoachController.js";

const budgetCoachRouter = express.Router();

// GET  /api/budget-coach       — initial analysis + suggestions
budgetCoachRouter.get("/", authMiddleware, getBudgetCoachAnalysis);

// POST /api/budget-coach/chat  — user sends a message
budgetCoachRouter.post("/chat", authMiddleware, chatWithCoach);

export default budgetCoachRouter;