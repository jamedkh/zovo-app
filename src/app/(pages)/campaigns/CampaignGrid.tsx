"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Copy,
  Eye,
  Facebook,
  Instagram,
  MoreVertical,
  Pencil,
  Trash2
} from "lucide-react";
import { TiktokLogo } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Campaign {
  id: number;
  name: string;
  date: string;
  tags: string[];
  img: string;
}

interface CampaignGridProps {
  data: Campaign[];
  loadMore: () => void;
  hasMore: boolean;
  selectedCards: number[];
  onSelectCard: (id: number) => void;
}

export function CampaignGrid({
  data,
  loadMore,
  hasMore,
  selectedCards,
  onSelectCard
}: CampaignGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4 ">
      {data.map((campaign) => (
        <div
          key={campaign.id}
          className={cn(
            "dark:bg-card/40 border rounded-[10px] p-6 hover:bg-accent/5 dark:hover:bg-card/60 transition-colors relative bg-white",
            selectedCards.includes(campaign.id) && "border-blue-500"
          )}
        >
          {/* Checkbox */}
          <div className="absolute top-2 left-2">
            <Checkbox
              checked={selectedCards.includes(campaign.id)}
              onCheckedChange={() => onSelectCard(campaign.id)}
              className="h-5 w-5 rounded-md"
            />
          </div>

          {/* Avatar and Name */}
          <Link href={`/campaigns/${campaign.id}`} className="group">
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-lg font-semibold group-hover:text-primary">
                {campaign.name}
              </h3>
              <p className="text-sm text-muted-foreground">{campaign.date}</p>
              <Badge variant="secondary" className="mt-2">
                {campaign.tags.join(", ")}
              </Badge>
            </div>
          </Link>

          {/* Actions Dropdown */}
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-2">
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}

      {/*
       Load More Button 
       */}
      {hasMore && (
        <div className="col-span-full flex justify-center mt-6">
          <Button onClick={loadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
