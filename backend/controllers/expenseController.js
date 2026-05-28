import expenseModel from "../models/expenseModel.js";
import getDateRange from "../utils/dateFilter.js";
import XLSX from "xlsx";
import path from "path";
import os from "os";

// ─── Add expense ─────────────────────────────────────────────────────────────
export async function addExpense(req, res) {
  const userId = req.user._id;
  const { description, amount, category, date } = req.body;

  try {
    if (!description || !amount || !category || !date) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // FIX: validate amount is a positive number
    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: "Amount must be a positive number." });
    }

    const newExpense = new expenseModel({
      userId,
      description,
      amount: Number(amount),
      category,
      date: new Date(date),
    });

    await newExpense.save();

    return res.status(201).json({ success: true, message: "Expense added successfully!" });
  } catch (error) {
    console.error("Add expense error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Get all expenses ────────────────────────────────────────────────────────
export async function getAllExpense(req, res) {
  const userId = req.user._id;

  try {
    const expenses = await expenseModel.find({ userId }).sort({ date: -1 });
    return res.json({ success: true, data: expenses });
  } catch (error) {
    console.error("Get all expenses error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Update expense ───────────────────────────────────────────────────────────
export async function updateExpense(req, res) {
  const { id } = req.params;
  const userId = req.user._id;

  // FIX: allow updating all fields, not just description + amount
  const { description, amount, category, date } = req.body;

  try {
    if (amount !== undefined && (isNaN(amount) || Number(amount) <= 0)) {
      return res.status(400).json({ success: false, message: "Amount must be a positive number." });
    }

    const updateFields = {};
    if (description !== undefined) updateFields.description = description;
    if (amount !== undefined) updateFields.amount = Number(amount);
    if (category !== undefined) updateFields.category = category;
    if (date !== undefined) updateFields.date = new Date(date);

    const updatedExpense = await expenseModel.findOneAndUpdate(
      { _id: id, userId },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ success: false, message: "Expense not found." });
    }

    return res.json({ success: true, message: "Expense updated successfully.", data: updatedExpense });
  } catch (error) {
    console.error("Update expense error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Delete expense ───────────────────────────────────────────────────────────
export async function deleteExpense(req, res) {
  try {
    const expense = await expenseModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found." });
    }

    return res.json({ success: true, message: "Expense deleted successfully.", data: expense });
  } catch (error) {
    console.error("Delete expense error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Download expense Excel ──────────────────────────────────────────────────
export async function downloadExpenseExcel(req, res) {
  const userId = req.user._id;

  try {
    const expenses = await expenseModel.find({ userId }).sort({ date: -1 });

    const plainData = expenses.map((exp) => ({
      Description: exp.description,
      Amount: exp.amount,
      Category: exp.category,
      Date: new Date(exp.date).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(plainData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    // FIX: use OS temp directory instead of root
    const filePath = path.join(os.tmpdir(), `expense_${userId}_${Date.now()}.xlsx`);
    XLSX.writeFile(workbook, filePath);

    return res.download(filePath);
  } catch (error) {
    console.error("Download expense excel error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Expense overview ────────────────────────────────────────────────────────
export async function getExpenseOverview(req, res) {
  try {
    const userId = req.user._id;
    const { range = "monthly" } = req.query;
    const { start, end } = getDateRange(range);

    const expenses = await expenseModel
      .find({ userId, date: { $gte: start, $lte: end } })
      .sort({ date: -1 });

    const totalExpense = expenses.reduce((acc, cur) => acc + cur.amount, 0);
    const averageExpense = expenses.length > 0 ? totalExpense / expenses.length : 0;

    return res.json({
      success: true,
      data: {
        totalExpense,
        averageExpense,
        numberOfTransactions: expenses.length,
        recentTransactions: expenses.slice(0, 5),
        range,
      },
    });
  } catch (error) {
    console.error("Get expense overview error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}