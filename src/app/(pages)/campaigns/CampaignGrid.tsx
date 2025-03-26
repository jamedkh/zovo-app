"use client";

import { Button } from "@/components/ui/button";

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
  Edit,
  Eye,
  Facebook,
  Instagram,
  MoreVertical,
  Pencil,
  Trash2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Add this utility function at the top of the file
const getRandomCategories = (categories: any[], count: number) => {
  const shuffled = [...categories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, categories.length));
};

// Add this utility function at the top of the file
const getRandomStatus = () => {
  const statuses = ["active", "draft", "completed", "paused"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

export interface Campaign {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  includedCategories?: CategoryType[];
  excludedCategories?: CategoryType[];
}

// Add CategoryType interface
interface CategoryType {
  id: string;
  name: string;
}

// Rename the constant arrays to avoid naming conflicts
const DEFAULT_INCLUDED_CATEGORIES: CategoryType[] = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Fashion" },
  { id: "3", name: "Home & Garden" },
  { id: "6", name: "Stationery" },
  { id: "7", name: "Books" },
  { id: "8", name: "Backpacks" },
  { id: "10", name: "Gifts" },
  { id: "11", name: "Decorations" },
  { id: "12", name: "Winter Wear" }
];

const DEFAULT_EXCLUDED_CATEGORIES: CategoryType[] = [
  { id: "4", name: "Food" },
  { id: "5", name: "Beverages" },
  { id: "9", name: "Toys" },
  { id: "13", name: "Services" },
  { id: "14", name: "Digital Products" }
];

interface CampaignGridProps {
  data: Campaign[];
  loadMore: () => void;
  hasMore: boolean;
  selectedCards: number[];
  onSelectCard: (id: number) => void;
  startDate: Date;
  endDate: Date;
  includedCategories?: CategoryType[];
  excludedCategories?: CategoryType[];
  status?: "active" | "draft" | "completed" | "paused";
  onCopyId?: (id: string) => void;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function CampaignGrid({
  data,
  loadMore,
  hasMore,
  selectedCards,
  onSelectCard,
  startDate,
  endDate,
  includedCategories,
  excludedCategories,
  status,
  onCopyId,
  onView,
  onDelete,
  onEdit
}: CampaignGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "draft":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "paused":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {data.map((campaign) => (
        <Card
          key={campaign.id}
          className={cn(
            "bg-white dark:bg-card/40 dark:hover:bg-card/60 hover:bg-accent/5 border rounded-xs shadow-none transition-colors relative",
            selectedCards.includes(campaign.id) && "border-blue-500"
          )}
        >
          {/* Checkbox */}
          <div className="absolute top-2 left-2 hidden">
            <Checkbox
              checked={selectedCards.includes(campaign.id)}
              onCheckedChange={() => onSelectCard(campaign.id)}
              className="h-5 w-5 rounded-md"
            />
          </div>

          {/* Link */}
          <Link href={`/campaigns/${campaign.id}`} className="group">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold group-hover:text-primary">
                  {campaign.name}
                </CardTitle>

                <CardDescription className="line-clamp-3 md:line-clamp-2">
                  {campaign.description}
                </CardDescription>
              </div>

              {/* 
              <p className="text-sm text-muted-foreground">{campaign.date}</p>
              <Badge variant="secondary" className="mt-2">
                {campaign.tags.join(", ")}
              </Badge> 
              */}
              <div className="max-sm:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="p-2 rounded-xs">
                    <DropdownMenuItem
                      onClick={() => onCopyId?.(campaign.id.toString())}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Campaign ID
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => onView?.(campaign.id.toString())}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onEdit?.(campaign.id.toString())}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete?.(campaign.id.toString())}
                      className="text-red-500"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-1">
                <div className="text-sm text-muted-foreground">
                  Campaign Period
                </div>

                <div className="text-sm">
                  {campaign.startDate} -{""} {campaign.endDate}
                </div>
              </div>

              <Separator />

              {/* Update the categories rendering in CardContent */}
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Categories Included
                </div>
                <div className="flex flex-wrap gap-2">
                  {getRandomCategories(
                    campaign.includedCategories || DEFAULT_INCLUDED_CATEGORIES,
                    3
                  ).map((category) => (
                    <Badge
                      key={category.id}
                      variant="secondary"
                      className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Categories Excluded
                </div>
                <div className="flex flex-wrap gap-2">
                  {getRandomCategories(
                    campaign.excludedCategories || DEFAULT_EXCLUDED_CATEGORIES,
                    3
                  ).map((category) => (
                    <Badge
                      key={category.id}
                      variant="secondary"
                      className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Update the status badge rendering */}
              <div className="pt-2">
                {getRandomCategories(
                  [
                    { status: "active", label: "Active" },
                    { status: "draft", label: "Draft" },
                    { status: "completed", label: "Completed" },
                    { status: "paused", label: "Paused" }
                  ],
                  1
                ).map((statusObj, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={cn("mr-2", getStatusColor(statusObj.status))}
                  >
                    {statusObj.label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Link>

          {/* Actions Dropdown */}
          <div className="hidden max-sm:flex w-full justify-between py-2 flex-wrap items-center border-t">
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
        </Card>
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
