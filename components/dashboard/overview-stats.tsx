import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, DollarSign, Package, Users } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            <span className={trend.value >= 0 ? "text-green-500" : "text-red-500"}>
              {trend.value >= 0 ? "+" : ""}
              {trend.value}%
            </span>
            <span className="ml-1 text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function OverviewStats() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Revenue"
        value="$45,231.89"
        description="Total revenue across all platforms"
        icon={<DollarSign />}
        trend={{ value: 20.1, label: "from last month" }}
      />
      <StatsCard
        title="Active Listings"
        value="2,345"
        description="Across all marketplaces"
        icon={<Package />}
        trend={{ value: 5.6, label: "from last week" }}
      />
      <StatsCard
        title="Total Sales"
        value="573"
        description="Sales this month"
        icon={<Activity />}
        trend={{ value: -2.3, label: "from last month" }}
      />
      <StatsCard
        title="Active Customers"
        value="948"
        description="Unique buyers this month"
        icon={<Users />}
        trend={{ value: 12.5, label: "from last month" }}
      />
    </div>
  );
}
