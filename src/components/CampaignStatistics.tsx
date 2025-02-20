import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import DashboardSingleCard from "./dashboard-single-card";

export function CampaignStatistics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Earning */}
      <DashboardSingleCard title="Total Budget" highlight="$140 USD" />

      {/* Days */}
      <DashboardSingleCard title="Region" highlight="South" />

      {/* Weekly */}
      <DashboardSingleCard title="Language" highlight="Urdu" />

      {/* Monthly */}
      <DashboardSingleCard title="Age Bracket" highlight="20-40" />
    </div>
  );
}
