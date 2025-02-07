import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface InventoryItem {
  status: string;
  value: number;
  color: string;
}

const inventoryData: InventoryItem[] = [
  { status: "In Stock", value: 75, color: "bg-blue-600" },
  { status: "Low Stock", value: 15, color: "bg-blue-400" },
  { status: "Out of Stock", value: 10, color: "bg-gray-300" },
];

export function InventoryStatus() {
  return (
    <Card className="col-span-2 bg-white rounded-3xl">
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-600">Inventory Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {inventoryData.map((item) => (
          <div key={item.status} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{item.status}</span>
              <span className="font-medium text-gray-700">{item.value}%</span>
            </div>
            <Progress
              value={item.value}
              className={cn("h-2 bg-gray-100", item.color)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
