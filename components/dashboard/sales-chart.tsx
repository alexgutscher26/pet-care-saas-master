import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Label } from "recharts";

interface DataPoint {
  day: string;
  sales: number;
}

interface CustomizedLabelProps {
  x?: number;
  y?: number;
  value?: number;
}

const data: DataPoint[] = [
  { day: "Mon", sales: 31 },
  { day: "Tue", sales: 40 },
  { day: "Wed", sales: 28 },
  { day: "Thu", sales: 51 },
  { day: "Fri", sales: 42 },
  { day: "Sat", sales: 109 },
  { day: "Sun", sales: 100 },
];

const CustomizedLabel = ({ x, y, value }: CustomizedLabelProps) => {
  if (typeof x === 'undefined' || typeof y === 'undefined' || typeof value === 'undefined') {
    return null;
  }
  
  return (
    <g>
      <rect
        x={x - 15}
        y={y - 25}
        width="30"
        height="20"
        rx="4"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <text 
        x={x} 
        y={y - 12}
        fill="#ffffff"
        fontSize={11}
        fontWeight="500"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

export function SalesChart() {
  return (
    <Card className="col-span-4 bg-white rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-gray-600">Sales Performance</CardTitle>
        <Select defaultValue="thisMonth">
          <SelectTrigger className="w-[120px] text-sm">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thisWeek">This Week</SelectItem>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 30, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E8EAFF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#E8EAFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#E5E7EB" 
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="day"
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickCount={7}
                domain={[0, 120]}
                ticks={[0, 20, 40, 60, 80, 100, 120]}
                dx={-10}
              />
              <Area
                type="natural"
                dataKey="sales"
                stroke="#4338CA"
                strokeWidth={2}
                fill="url(#salesGradient)"
                fillOpacity={1}
                label={<CustomizedLabel />}
                dot={{ 
                  fill: "#4338CA",
                  strokeWidth: 0,
                  r: 4,
                  strokeOpacity: 0
                }}
                activeDot={{ 
                  r: 6, 
                  fill: "#4338CA",
                  stroke: "#E8EAFF",
                  strokeWidth: 3
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
