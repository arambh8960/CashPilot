import React from "react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

const GaugeCard = ({
  gauge = {},
  colorInfo = {},
  timeFrameLabel = "",
  highlightNegative = false,
}) => {
  const { name = "Metric", value = 0, max = 100 } = gauge;

  const isNegative = value < 0;
  const absValue = Math.abs(value);

  const chartValue = isNegative ? absValue : value;

  const percentage = Math.min((absValue / max) * 100, 100);

  const gradientStart = isNegative
    ? "#ef4444"
    : colorInfo.gradientStart || "#00C49F";

  const gradientEnd = isNegative
    ? "#dc2626"
    : colorInfo.gradientEnd || "#0088FE";

  const textColor = isNegative
    ? "text-red-600"
    : colorInfo.text || "text-gray-800";

  const percentColor = isNegative
    ? "text-red-500"
    : "text-gray-500";

  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        shadow-lg
        flex
        flex-col
        items-center
        border
        border-gray-100
        min-h-[320px]
        w-full
      "
    >
      {/* Title */}
      <h3
        className={`text-xl font-semibold mb-4 text-center ${textColor}`}
      >
        {name}
      </h3>

      {/* Chart Container */}
      <div
        style={{
          width: "100%",
          height: "260px",
          minHeight: 260,
          minWidth: 0,
        }}
      >
        <ResponsiveContainer width="100%" height={260}>
          <RadialBarChart
            data={[
              {
                ...gauge,
                value: chartValue,
              },
            ]}
            cx="50%"
            cy="60%"
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="100%"
          >
            <PolarAngleAxis
              type="number"
              domain={[0, max]}
              angleAxisId={0}
              tick={false}
              allowDataOverflow
            />

            <RadialBar
              minAngle={15}
              background={{
                fill: "#f3f4f6",
              }}
              dataKey="value"
              cornerRadius={50}
              fill={`url(#${name}Gradient)`}
            />

            {/* Amount */}
            <text
              x="50%"
              y="68%"
              textAnchor="middle"
              dominantBaseline="middle"
              className={`text-2xl font-bold ${textColor}`}
            >
              {isNegative ? "-" : ""}$
              {Math.round(absValue).toLocaleString()}
            </text>

            {/* Percentage */}
            <text
              x="50%"
              y="82%"
              textAnchor="middle"
              dominantBaseline="middle"
              className={`text-sm ${percentColor}`}
            >
              {Math.round(percentage)}%
            </text>

            <defs>
              <linearGradient
                id={`${name}Gradient`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={gradientStart}
                />
                <stop
                  offset="100%"
                  stopColor={gradientEnd}
                />
              </linearGradient>
            </defs>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom */}
      <div className="text-center mt-4">
        {isNegative && highlightNegative && (
          <p className="text-sm text-red-600 font-semibold mb-1">
            Negative savings
          </p>
        )}

        <p className="text-sm text-gray-500">
          {timeFrameLabel} data
        </p>
      </div>
    </div>
  );
};

export default GaugeCard;