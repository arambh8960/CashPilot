import React from "react";

const TimeFrameSelector = ({
  timeFrame,
  setTimeFrame,
  options,
  color = "teal",
  style = "default",
}) => {
  const colorClass = {
    teal: "bg-orange-500",
    orange: "bg-orange-500",
    cyan: "bg-orange-500",
  }[color];

  const styleClass = {
    default:
      "flex gap-2 bg-white p-1 -mx-11 lg:-mx-0 md:-mx-0 rounded-xl border border-gray-200",
    minimal: "flex gap-2",
  }[style];

  return (
    <div className={styleClass}>
      {options.map((frame) => (
        <button
          key={frame}
          onClick={() => setTimeFrame(frame)}
          className={`px-2 py-2 text-sm rounded-lg transition-all duration-300 ${
            timeFrame === frame
              ? `${colorClass} text-white shadow-2xl`
              : "text-slate-600 dark:text-slate-300 hover:bg-white/3 dark:hover:bg-white/6"
          }`}
        >
          {frame.charAt(0).toUpperCase() + frame.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TimeFrameSelector;

//it shows the 3 boxes with the details
// like Total Income,Average Income, Transactions
