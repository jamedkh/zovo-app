"use client";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React, { useState, useEffect } from "react";
import CampaignDrawer from "./CampaignDrawer";
import CampaignData from "./CampaignData.json";
import { Toggle } from "@/components/ui/toggle";
import { LayoutGrid, List } from "lucide-react";
import { CampaignGrid } from "./CampaignGrid";
import { CampaignTopCharts } from "@/components/CampaignTopCharts";
import CampaignFilters from "./CampaignFilters";
import { CampaignList } from "./CampaignList";

export interface Campaign {
  id: number;
  name: string;
  description: string;
  category: "Projects" | "Internal" | "Reminder";
  status: "onhold" | "inprogress" | "pending" | "completed";
  startDate: string;
  endDate: string;
  tags: string[];
  img: string;
  team: {
    name: string;
    initials: string;
    avatar: string;
  }[];
}

export default function Campaigns() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const data = CampaignData as Campaign[];

  const visibleData = data.slice(0, visibleCount);
  const hasMore = visibleCount < data.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const handleSelectCard = (id: number) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show floating bar after scrolling 100px
      const scrollPosition = window.scrollY;
      setShowFloatingBar(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ContentLayout title="Campaigns">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Campaigns</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* View Toggle and Actions */}
      <div className="flex justify-end items-center mb-4">
        <div className="flex items-center gap-2 mr-2">
          <CampaignFilters />

          <Toggle
            pressed={view === "list"}
            onPressedChange={(pressed) => setView(pressed ? "list" : "grid")}
            aria-label="Toggle list view"
          >
            <List className="h-4 w-4" />
          </Toggle>

          <Toggle
            pressed={view === "grid"}
            onPressedChange={(pressed) => setView(pressed ? "grid" : "list")}
            aria-label="Toggle grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Toggle>
        </div>

        <CampaignDrawer />
      </div>

      {/* View Toggle and Actions for mobile */}
      <div
        id="campaign-floating-bar"
        className={`flex justify-between items-center fixed w-[90%] bottom-6 lg:hidden z-30 backdrop-blur-md bg-muted/15 left-[50%] translate-x-[-50%] rounded-lg border p-1 transition-all duration-300 ${
          showFloatingBar
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full"
        }`}
      >
        <div className="flex items-center gap-2 mr-2">
          <CampaignFilters />

          <Toggle
            pressed={view === "list"}
            onPressedChange={(pressed) => setView(pressed ? "list" : "grid")}
            aria-label="Toggle list view"
          >
            <List className="h-4 w-4" />
          </Toggle>

          <Toggle
            pressed={view === "grid"}
            onPressedChange={(pressed) => setView(pressed ? "grid" : "list")}
            aria-label="Toggle grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Toggle>
        </div>

        <CampaignDrawer />
      </div>

      <div className="mb-4">
        <CampaignTopCharts />
      </div>

      {/* Content */}
      {view === "grid" ? (
        <CampaignGrid
          data={visibleData}
          hasMore={hasMore}
          selectedCards={selectedCards}
          onSelectCard={handleSelectCard}
          loadMore={loadMore}
          startDate={new Date()}
          endDate={new Date()}
          includedCategories={[]}
          excludedCategories={[]}
        />
      ) : (
        <CampaignList data={data} />
      )}
    </ContentLayout>
  );
}
