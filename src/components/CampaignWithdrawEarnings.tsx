import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CampaignWithdrawEarnings() {
  return (
    <Card className="dark:bg-background/40 shadow-none">
      <CardHeader>
        <CardTitle>Withdraw Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Available balance: $140 USD
          </p>
          <Button
            variant={"outline"}
            className="w-full shadow-none border-0 py-6"
          >
            Withdraw
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
