import incomeModel from "../models/incomeModel.js";
import XLSX from "xlsx";
import getDateRange from "../utils/dateFilter.js";
import path from "path";
import os from "os";

// ─── Add income ──────────────────────────────────────────────────────────────
export async function addIncome(req, res) {
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

    const newIncome = new incomeModel({
      userId,
      description,
      amount: Number(amount),
      category,
      date: new Date(date),
    });

    await newIncome.save();

    return res.status(201).json({ success: true, message: "Income added successfully!" });
  } catch (error) {
    console.error("Add income error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Get all income ───────────────────────────────────────────────────────────
export async function getAllIncome(req, res) {
  const userId = req.user._id;

  try {
    const incomes = await incomeModel.find({ userId }).sort({ date: -1 });
    return res.json({ success: true, data: incomes });
  } catch (error) {
    console.error("Get all income error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Update income ────────────────────────────────────────────────────────────
export async function updateIncome(req, res) {
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

    const updatedIncome = await incomeModel.findOneAndUpdate(
      { _id: id, userId },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ success: false, message: "Income not found." });
    }

    return res.json({ success: true, message: "Income updated successfully.", data: updatedIncome });
  } catch (error) {
    console.error("Update income error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Delete income ────────────────────────────────────────────────────────────
export async function deleteIncome(req, res) {
  try {
    const income = await incomeModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!income) {
      return res.status(404).json({ success: false, message: "Income not found." });
    }

    return res.json({ success: true, message: "Income deleted successfully.", data: income });
  } catch (error) {
    console.error("Delete income error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Download income Excel ────────────────────────────────────────────────────
export async function downloadIncomeExcel(req, res) {
  const userId = req.user._id;

  try {
    const incomes = await incomeModel.find({ userId }).sort({ date: -1 });

    const plainData = incomes.map((inc) => ({
      Description: inc.description,
      Amount: inc.amount,
      Category: inc.category,
      Date: new Date(inc.date).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(plainData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Income");

    // FIX: use OS temp directory instead of root
    const filePath = path.join(os.tmpdir(), `income_${userId}_${Date.now()}.xlsx`);
    XLSX.writeFile(workbook, filePath);

    return res.download(filePath);
  } catch (error) {
    console.error("Download income excel error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Income overview ──────────────────────────────────────────────────────────
export async function getIncomeOverview(req, res) {
  try {
    const userId = req.user._id;
    const { range = "monthly" } = req.query;
    const { start, end } = getDateRange(range);

    const incomes = await incomeModel
      .find({ userId, date: { $gte: start, $lte: end } })
      .sort({ date: -1 });

    const totalIncome = incomes.reduce((acc, cur) => acc + cur.amount, 0);
    const averageIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;

    return res.json({
      success: true,
      data: {
        totalIncome,
        averageIncome,
        numberOfTransactions: incomes.length,
        recentTransactions: incomes.slice(0, 9),
        range,
      },
    });
  } catch (error) {
    console.error("Get income overview error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}