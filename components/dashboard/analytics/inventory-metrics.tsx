"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    category: "Shoes",
    inStock: 120,
    listed: 90,
    sold: 45,
  },
  {
    category: "Clothing",
    inStock: 150,
    listed: 130,
    sold: 80,
  },
  {
    category: "Accessories",
    inStock: 80,
    listed: 60,
    sold: 30,
  },
  {
    category: "Electronics",
    inStock: 45,
    listed: 40,
    sold: 25,
  },
  {
    category: "Home",
    inStock: 65,
    listed: 55,
    sold: 35,
  },
];

export function InventoryMetrics() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="category"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Bar dataKey="inStock" name="In Stock" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
        <Bar dataKey="listed" name="Listed" fill="#22c55e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="sold" name="Sold" fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
