import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0.01 },
    category: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      default: "income",
      enum: ["income"],
    },
  },
  { timestamps: true }
);

const incomeModel = mongoose.model("Income", incomeSchema);
export default incomeModel;