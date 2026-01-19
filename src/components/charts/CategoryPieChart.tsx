"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Expanded color palette to handle more categories safely
const COLORS = [
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#8b5cf6", // Violet
  "#f59e0b", // Amber
  "#f43f5e", // Rose
  "#06b6d4", // Cyan
  "#84cc16", // Lime
  "#ec4899", // Pink
];

interface CategoryData {
  name: string;
  value: number;
  [key: string]: any;
}

export default function CategoryPieChart({ data }: { data: CategoryData[] }) {
  if (data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-slate-400 bg-slate-50/50 rounded-lg border-2 border-dashed border-slate-200">
        <span className="text-sm">No expenses yet</span>
      </div>
    );
  }

  return (
    // 1. Flex container ensures the layout adapts vertically
    <div className="h-full w-full flex flex-col items-center justify-between">
      {/* 2. The Chart Area (Takes available space, minimum height ensures visibility) */}
      <div className="flex-1 w-full min-h-[160px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              // Slightly adjusted radii to look good with the new layout
              innerRadius={55}
              outerRadius={75}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number | undefined) => value !== undefined ? `$${value.toFixed(2)}` : '$0.00'}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                padding: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
              }}
              itemStyle={{ color: "#1e293b", fontWeight: 600 }}
            />
            {/* Note: We removed the <Legend /> component from here */}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Custom HTML Legend (Wraps perfectly and handles long text) */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pb-2 mt-2 w-full px-2">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <span
              className="block w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs font-medium text-slate-600">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
