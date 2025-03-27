"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Influencer } from "./inColumns";
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

interface InGridProps {
  data: Influencer[];
  loadMore: () => void;
  hasMore: boolean;
  selectedCards: number[];
  onSelectCard: (id: number) => void;
}

export function InGrid({
  data,
  loadMore,
  hasMore,
  selectedCards,
  onSelectCard
}: InGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 ">
      {data.map((influencer) => (
        <div
          key={influencer.id}
          className={cn(
            "dark:bg-card/40 border rounded-[10px] p-6 hover:bg-accent/5 dark:hover:bg-card/60 transition-colors relative bg-white",
            selectedCards.includes(influencer.id) && "border-blue-500"
          )}
        >
          {/* Checkbox */}
          <div className="absolute top-2 left-2">
            <Checkbox
              checked={selectedCards.includes(influencer.id)}
              onCheckedChange={() => onSelectCard(influencer.id)}
              className="h-5 w-5 rounded-md"
            />
          </div>

          {/* Avatar and Name */}
          <Link href={`/influencers/${influencer.id}`} className="group">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-20 w-20">
                <AvatarImage src={influencer.img} />
                <AvatarFallback>{influencer.name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold group-hover:text-primary">
                {influencer.name}
              </h3>
              <p className="text-sm text-muted-foreground">{influencer.city}</p>
              <Badge variant="secondary" className="mt-2">
                {influencer.category}
              </Badge>
            </div>
          </Link>

          {/* Stats */}
          <div className="mt-4 text-center flex justify-center gap-4">
            <div className="flex flex-col text-sm">
              <span className="font-semibold">1.2k</span>
              <span>Posts</span>
            </div>
            <div className="flex flex-col text-sm">
              <span className="font-semibold">5.2k</span>
              <span>Followers</span>
            </div>
          </div>

          {/* Social Handles */}
          <div className="mt-4 py-4 flex justify-between gap-3 border-y ">
            <Facebook />
            <Instagram />
            <TiktokLogo className="h-7 w-7 text-black dark:text-white" />
          </div>

          {/* Actions Dropdown */}
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-2 rounded-xs">
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
