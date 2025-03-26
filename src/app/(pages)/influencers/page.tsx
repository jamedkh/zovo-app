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
import React, { useEffect, useState } from "react";
import InfluencerDrawer from "./InfluencerDrawer";
// import { Separator } from "@/components/ui/separator";
import { InDataTable } from "@/components/InDataTable";
import { Influencer, inColumns } from "./inColumns";
import InfluencerData from "./InfluencerData.json";
import { Toggle } from "@/components/ui/toggle";
import { Filter, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InGrid } from "./inGrid";
import { InfluencerTopCharts } from "@/components/InfluencerTopCharts";
import InfluencerFilters from "./InfluencerFilters";

export default function Influencers() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const data: Influencer[] = InfluencerData;

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
    <ContentLayout title="Influencers">
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
              <BreadcrumbPage>Influencers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* 
      page header 
      <section className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl mb-3">Influencers List</h1>
          <p className="text-xs text-muted-foreground">
            All Influencers goes here
          </p>
        </div>

        <InfluencerDrawer />
      </section>
      */}

      {/* 
      campaign table data 
      <InDataTable columns={inColumns} data={data} />
      */}

      {/* View Toggle */}
      <div className="flex justify-end items-center mb-4">
        <div className="flex items-center gap-2 mr-2">
          <InfluencerFilters />

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

        <InfluencerDrawer />
      </div>

      {/* View mobile */}
      <div
        id="campaign-floating-bar"
        className={`flex justify-between items-center fixed w-[90%] bottom-6 lg:hidden z-30 backdrop-blur-md bg-muted/15 left-[50%] translate-x-[-50%] rounded-lg border p-1 transition-all duration-300 ${
          showFloatingBar
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full"
        }`}
      >
        <div className="flex items-center gap-2 mr-2">
          <InfluencerFilters />

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

        <InfluencerDrawer />
      </div>

      <div className="mb-4">
        <InfluencerTopCharts />
      </div>

      {/* Content */}
      {view === "grid" ? (
        <InGrid
          data={visibleData}
          hasMore={hasMore}
          selectedCards={selectedCards}
          onSelectCard={handleSelectCard}
          loadMore={loadMore}
        />
      ) : (
        <InDataTable columns={inColumns} data={data} />
      )}
    </ContentLayout>
  );
}
