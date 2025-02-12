import React, { useState } from "react";
import CampaignData from "./CampaignData.json";
import { Button } from "@/components/ui/button";
import { List, Grid } from "lucide-react";
import { Campaign } from "./CampaignGrid";

interface CampaignListProps {
  data: Campaign[];
}

export function CampaignList({ data }: CampaignListProps) {
  const [visibleCount, setVisibleCount] = useState(5);
  const [view, setView] = useState("list");
  const visibleData = CampaignData.slice(0, visibleCount);
  const hasMore = visibleCount < CampaignData.length;

  const loadMore = () => setVisibleCount((prev) => prev + 5);

  return (
    <div className="">
      <div className={view === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"}>
        {visibleData.map((campaign, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow rounded-lg flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">{campaign.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                📅 {campaign.date}
              </p>
            </div>
            <div className="flex space-x-2">
              {campaign.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs font-semibold rounded bg-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-4">
          <Button
            onClick={loadMore}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            ✨ Load More
          </Button>
        </div>
      )}
    </div>
  );
}
