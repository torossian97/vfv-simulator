import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts";

export function ResultChart({ data }) {
  const chartData = data.map((d) => {
    return {
      name: `Month ${d.month + 1}`,
      month: d.month,
      "Portfolio Value": Math.round(d.portfolioValue),
      "VFV Price": Number(d.price.toFixed(2)),
      "Shares Held": Number(d.shares.toFixed(2)),
      "Average Cost":
        d.shares > 0 ? Number((d.invested / d.shares).toFixed(2)) : null,
      cash: d.cash,
    };
  });

  const [activeTab, setActiveTab] = useState("portfolio");

  const cashOutIndex = chartData.find((d) => d.cash <= 0)?.month ?? null;

  return (
    <div className="w-full">
      <div className="flex space-x-2 border-b mb-4">
        <button
          className={`px-4 py-2 rounded-t-md font-medium transition-colors duration-200 ${
            activeTab === "portfolio"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("portfolio")}
        >
          Portfolio Value
        </button>
        <button
          className={`px-4 py-2 rounded-t-md font-medium transition-colors duration-200 ${
            activeTab === "shares"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("shares")}
        >
          Share Price vs Average Cost
        </button>
      </div>

      {activeTab === "portfolio" && (
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  `$${value.toLocaleString()}`,
                  name,
                ]}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              {cashOutIndex !== null && (
                <ReferenceLine
                  x={`Month ${cashOutIndex + 1}`}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  label="Cash Depleted"
                />
              )}
              <Line
                type="monotone"
                dataKey="Portfolio Value"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === "shares" && (
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "Shares Held") return [value.toFixed(2), name];
                  return [`$${value.toLocaleString()}`, name];
                }}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              {cashOutIndex !== null && (
                <ReferenceLine
                  x={`Month ${cashOutIndex + 1}`}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  label="Cash Depleted"
                />
              )}
              <Line
                type="monotone"
                dataKey="VFV Price"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Average Cost"
                stroke="#f97316"
                strokeDasharray="6 4"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
