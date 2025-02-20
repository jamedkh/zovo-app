"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Download,
  Facebook,
  Film,
  Instagram,
  LineChart,
  Settings,
  Youtube,
  Image
} from "lucide-react";
import { CampaignStatistics } from "@/components/CampaignStatistics";
import { CampaignEarningsChart } from "@/components/CampaignEarningsChart";
import { CampaignWithdrawEarnings } from "@/components/CampaignWithdrawEarnings";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignPerformanceChart } from "@/components/CampaignPerformanceChart";
import CampaignOrder from "@/components/CampaignOrder";
import { useParams } from "next/navigation";
import campaignData from "../CampaignData.json";

interface Campaign {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  tags: string[];
  img: string;
}

export default function CampaignDetail() {
  const params = useParams();
  const campaignId = parseInt(params.id as string);

  // Find campaign from local JSON data
  const campaign = campaignData.find((c) => c.id === campaignId) as Campaign;

  // Mock function to get campaign details - replace with actual API call
  const getCampaignTitle = (id: string) => {
    // Replace this with actual data fetching
    return `Campaign #${id}`;
  };

  return (
    <ContentLayout title={campaign?.name || "Campaign Details"}>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 max-sm:flex-col max-sm:items-start max-sm:gap-4">
        <h1 className="text-2xl font-bold">{campaign?.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <CampaignStatistics />

      <div className="flex gap-4 py-3 ">
        <div className="space-y-6 w-full">
          <Card className="p-4 dark:bg-background/40 shadow-none">
            <div className="flex items-center justify-between mb-4 max-sm:flex-col max-sm:items-start max-sm:gap-4">
              <div className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-muted-foreground" />
                <h2 className="font-semibold">Performance Overview</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Dec 1 - Dec 31, 2024
                </Button>
              </div>
            </div>

            <div className="h-[380px] w-full">
              <CampaignPerformanceChart />
            </div>
          </Card>
        </div>
      </div>

      <div className="">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Statistics */}
          <div className="lg:col-span-2">
            <CampaignOrder />
          </div>

          {/* Right Column: Earnings Chart and Withdraw Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tabs for Time Range */}
            <Card className="dark:bg-background/40 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl font-bold  mb-4">
                  Income
                </CardTitle>
                <Tabs defaultValue="week" className="mb-6 w-full">
                  <TabsList className="grid grid-cols-4 w-full h-10">
                    <TabsTrigger value="day">Day</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <CampaignEarningsChart />
              </CardContent>
            </Card>
            <CampaignWithdrawEarnings />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
