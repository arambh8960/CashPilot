
import incomeModel from "../models/incomeModel.js";
import expenseModel from "../models/expenseModel.js";
import groq from "../config/grok.js";

// ─── helpers ──────────────────────────────────────────────────────────────────
function getMonthRange(monthOffset = 0) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + monthOffset;

  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59);

  return { start, end };
}

function groupByCategory(transactions) {
  return transactions.reduce((acc, t) => {
    const cat = t.category || "Other";
    acc[cat] = (acc[cat] || 0) + Number(t.amount || 0);
    return acc;
  }, {});
}

async function getUserFinancialData(userId) {
  const { start: curStart, end: curEnd } = getMonthRange(0);
  const { start: lastStart, end: lastEnd } = getMonthRange(-1);

  const [curIncomes, curExpenses, lastIncomes, lastExpenses] =
    await Promise.all([
      incomeModel
        .find({
          userId,
          date: { $gte: curStart, $lte: curEnd },
        })
        .lean(),

      expenseModel
        .find({
          userId,
          date: { $gte: curStart, $lte: curEnd },
        })
        .lean(),

      incomeModel
        .find({
          userId,
          date: { $gte: lastStart, $lte: lastEnd },
        })
        .lean(),

      expenseModel
        .find({
          userId,
          date: { $gte: lastStart, $lte: lastEnd },
        })
        .lean(),
    ]);

  const sum = (arr) =>
    arr.reduce((s, t) => s + Number(t.amount || 0), 0);

  const curIncome = sum(curIncomes);
  const curExpense = sum(curExpenses);

  const lastIncome = sum(lastIncomes);
  const lastExpense = sum(lastExpenses);

  const formatINR = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const catRows = (obj) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => `${cat}: ${formatINR(amt)}`)
      .join(", ") || "No data";

  return {
    summary: `
Current Month:
Income ${formatINR(curIncome)}
Expenses ${formatINR(curExpense)}
Savings ${formatINR(curIncome - curExpense)}

Savings Rate:
${
  curIncome === 0
    ? 0
    : Math.round(
        ((curIncome - curExpense) / curIncome) * 100
      )
}%


Last Month:
Income ${formatINR(lastIncome)}
Expenses ${formatINR(lastExpense)}
Savings ${formatINR(lastIncome - lastExpense)}

Current Month Expenses by Category:
${catRows(groupByCategory(curExpenses))}

Current Month Income by Category:
${catRows(groupByCategory(curIncomes))}
    `.trim(),

    hasData: curIncome > 0 || curExpense > 0,
  };
}

// ─────────────────────────────────────────────────────────────
// GET /api/budget-coach
// ─────────────────────────────────────────────────────────────
export async function getBudgetCoachAnalysis(req, res) {
  const userId = req.user._id;
  const userName = req.user.name || "there";

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({
      success: false,
      message: "Groq API key not configured.",
    });
  }

  try {
    const { summary, hasData } =
      await getUserFinancialData(userId);

    if (!hasData) {
      return res.status(400).json({
        success: false,
        message:
          "No data found for this month. Please add income and expense entries first.",
      });
    }

    const prompt = `
You are FinBot.

The user's name is ${userName}.

Financial Data:
${summary}

Give a warm 2-3 sentence financial analysis.

Then provide exactly 3 useful follow-up questions.

Return ONLY valid JSON:

{
  "message":"analysis here",
  "suggestions":[
    "question 1",
    "question 2",
    "question 3"
  ]
}
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,
        max_tokens: 500,
      });

    const rawText =
      completion.choices?.[0]?.message?.content || "";

    let parsed;

    try {
      parsed = JSON.parse(
        rawText.replace(/```json|```/g, "").trim()
      );
    } catch {
      return res.status(502).json({
        success: false,
        message:
          "AI returned unexpected response.",
      });
    }

    return res.status(200).json({
      success: true,
      data: parsed,
    });
  } catch (error) {
    console.error(
      "Budget coach error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/budget-coach/chat
// ─────────────────────────────────────────────────────────────
export async function chatWithCoach(req, res) {
  const userId = req.user._id;
  const userName = req.user.name || "there";

  const { message, history = [] } = req.body;

  if (!message?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Message is required.",
    });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({
      success: false,
      message: "Groq API key not configured.",
    });
  }

  try {
    const { summary } =
      await getUserFinancialData(userId);

    const systemContext = `
You are FinBot, a friendly and smart personal finance coach.

User Name:
${userName}

Financial Data:
${summary}

Rules:
- Use the user's financial data
- Give concise answers
- Give actionable advice
- Be encouraging
- If unrelated to finance, politely redirect
- Reply in the same language used by the user
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: systemContext,
          },

          ...history.map((msg) => ({
            role:
              msg.role === "bot"
                ? "assistant"
                : "user",

            content: msg.content,
          })),

          {
            role: "user",
            content: message,
          },
        ],

        temperature: 0.8,
        max_tokens: 400,
      });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Sorry, I couldn't process that.";

    return res.status(200).json({
      success: true,
      data: {
        reply,
      },
    });
  } catch (error) {
    console.error(
      "Chat error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
}

