import React, { useState } from "react";
import CampaignData from "./CampaignData.json";
import { Button } from "@/components/ui/button";
import { Calendar, MoreVertical, Copy, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface Campaign {
  category: "Projects" | "Internal" | "Reminder";
  status: "onhold" | "inprogress" | "pending" | "completed";
}

interface CampaignListProps {
  data: Campaign[];
}

const statusConfig = {
  onhold: {
    label: "Onhold",
    className: "bg-yellow-500/10 text-yellow-500 dark:bg-yellow-500/20"
  },
  inprogress: {
    label: "In Progress",
    className: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20"
  },
  pending: {
    label: "Pending",
    className: "bg-orange-500/10 text-orange-500 dark:bg-orange-500/20"
  },
  completed: {
    label: "Completed",
    className: "bg-green-500/10 text-green-500 dark:bg-green-500/20"
  }
};

const categoryConfig = {
  Projects: "bg-emerald-500 hover:bg-emerald-600",
  Internal: "bg-red-500 hover:bg-red-600",
  Reminder: "bg-blue-500 hover:bg-blue-600"
};

export function CampaignList({ data }: CampaignListProps) {
  const [visibleCount, setVisibleCount] = useState(5);
  const [view, setView] = useState("list");
  const visibleData = CampaignData.slice(0, visibleCount);
  const hasMore = visibleCount < CampaignData.length;

  const loadMore = () => setVisibleCount((prev) => prev + 5);

  return (
    <div className="">
      <div className={view === "grid" ? "grid grid-cols-2 gap-4" : "space-y-2"}>
        {visibleData.map((campaign, index) => (
          <div
            key={index}
            className="p-4 rounded-xs flex items-center justify-between bg-white dark:bg-card/40 dark:hover:bg-card/60 hover:bg-accent/5 border shadow-none transition-colors relative max-sm:flex-col max-sm:gap-6"
          >
            <div>
              <Link
                href={`/campaigns/${campaign.id}`}
                className="max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-4 group"
              >
                <div className="flex">
                  <h3 className="font-semibold text-lg">{campaign.name}</h3>{" "}
                  <Badge
                    variant="outline"
                    className={cn`ml-2 text-white px-3 mt-1 py-0 leading-[0] font-normal h-5 hidden md:inline-flex text-[10px] ${
                      categoryConfig[
                        campaign.category as keyof typeof categoryConfig
                      ]
                    }`}
                  >
                    {campaign.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {campaign.startDate} -{" "}
                  {campaign.endDate}
                </p>
              </Link>
            </div>

            <div className="flex items-center md:justify-end gap-4 max-sm:flex-col">
              <div className="flex space-x-2">
                <Badge
                  variant="outline"
                  className={
                    statusConfig[campaign.status as keyof typeof statusConfig]
                      .className
                  }
                >
                  {campaign.status}
                </Badge>
                {/* 
                {campaign.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs font-semibold rounded bg-gray-200"
                  >
                    {tag}
                  </span>
                ))} 
                 */}
              </div>

              <div className="flex -space-x-2">
                <TooltipProvider>
                  {campaign.team.map((member, i) => (
                    <Tooltip key={i}>
                      <TooltipTrigger asChild>
                        <Avatar className="border-2 border-background w-8 h-8 hover:translate-y-[-8px] transition-transform duration-500">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>{member.name}</TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>

              <div className="max-sm:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xs p-2">
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="hidden max-sm:flex w-full justify-between pt-2 flex-wrap items-center border-t">
              <Button
                variant="ghost"
                className=" flex-col rounded-xs h-auto text-xs hidden"
              >
                <Copy />
                Copy ID
              </Button>

              <Button
                variant="ghost"
                className="flex flex-col rounded-xs h-auto text-xs "
              >
                <Eye />
                View
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <Button
                variant="ghost"
                className="flex flex-col rounded-xs h-auto text-xs "
              >
                <Edit />
                Edit
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <Button
                variant="ghost"
                className=" flex-col rounded-xs h-auto text-xs hidden"
              >
                <Copy />
                Duplicate
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col rounded-xs h-auto text-xs"
              >
                <Trash2 />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-4">
          <Button onClick={loadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
