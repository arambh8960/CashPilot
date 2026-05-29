import React from "react";

const FinancialCard = ({
  icon,
  label,
  value,
  additionalContent,
  borderColor = "",
  bgColor = "bg-white",
}) => (
  <div
    className={`${bgColor} dark:bg-[rgba(15,23,42,0.5)] rounded-2xl p-5 lg:-mx-2 lg:p-4 shadow-2xl
     border hover:shadow-2xl border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.04)] transition-all ${borderColor}`}
  >
    <div className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
      {icon}
      {label}
    </div>
    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
    {additionalContent}
  </div>
);

export default FinancialCard;
