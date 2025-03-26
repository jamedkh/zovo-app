import { TagInput } from "@/components/tag-input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectTrigger } from "@radix-ui/react-select";
import { Check, ChevronDown, Filter } from "lucide-react";
import React, { useState } from "react";

const pakCities = [
  {
    value: "karachi",
    label: "Karachi"
  },
  {
    value: "lahore",
    label: "Lahore"
  },
  {
    value: "rawalpindi",
    label: "Rawalpindi"
  },
  {
    value: "islamabad",
    label: "Islamabad"
  }
];

function CampaignFilters() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [categoryInclude, setCategoryInclude] = useState<string[]>([]);
  const [categoryExclude, setCategoryExclude] = useState<string[]>([]);
  const [tagInclude, setTagInclude] = useState<string[]>([]);
  const [tagExclude, setTagExclude] = useState<string[]>([]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={"secondary"}
          className="rounded-full w-10 h-10 bg-transparent hover:text-muted-foreground"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="h-[350px] w-full pr-4">
          <div className="grid grid-cols-12 gap-4 m-3 py-3">
            <div className="lg:col-span-3 col-span-12">
              <Label className="block mb-3">Category</Label>
              <Select>
                <SelectTrigger className="w-full dark:bg-zinc-900 py-2 px-5 text-start rounded-full flex justify-between border items-center hover:bg-accent text-sm font-medium">
                  <SelectValue placeholder="Select Category" />
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </SelectTrigger>
                <SelectContent className="rounded-xs">
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
                    <SelectItem value="category3">Category 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-3 col-span-12">
              <Label className="block mb-3">Influencer Region</Label>
              <Select>
                <SelectTrigger className="w-full dark:bg-zinc-900 py-2 px-5 text-start rounded-full flex justify-between border items-center hover:bg-accent text-sm font-medium">
                  <SelectValue placeholder="Select Region" />
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </SelectTrigger>
                <SelectContent className="rounded-xs">
                  <SelectGroup>
                    <SelectLabel>Region</SelectLabel>
                    <SelectItem value="north">North</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                    <SelectItem value="east">East</SelectItem>
                    <SelectItem value="west">West</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-3 col-span-12">
              <Label className="block mb-3">Influencer City</Label>
              <Popover open={open} onOpenChange={setOpen} modal>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between dark:bg-zinc-900 px-5 h-auto"
                  >
                    {value
                      ? pakCities.find((pakCity) => pakCity.value === value)
                          ?.label
                      : "Select City..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[95vw] lg:w-[24vw] p-0"
                  style={{ zIndex: 99999999 }}
                  sideOffset={4}
                >
                  <Command>
                    <CommandInput placeholder="Search City..." />
                    <CommandList>
                      <CommandEmpty>No pakCity found.</CommandEmpty>
                      <CommandGroup>
                        {pakCities.map((pakCity) => (
                          <CommandItem
                            key={pakCity.value}
                            value={pakCity.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === pakCity.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {pakCity.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="lg:col-span-3 col-span-12">
              <Label className="block mb-3">Influencer Language</Label>
              <Select>
                <SelectTrigger className="w-full dark:bg-zinc-900 py-2 px-5 text-start rounded-full flex justify-between border items-center hover:bg-accent text-sm font-medium">
                  <SelectValue placeholder="Select Language" />
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </SelectTrigger>
                <SelectContent className="rounded-xs">
                  <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ur">Urdu</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-6 col-span-12">
              <Label className="block mb-3">Influencer Age Bracket</Label>
              <Select>
                <SelectTrigger className="w-full dark:bg-zinc-900 py-2 px-5 text-start rounded-full flex justify-between border items-center hover:bg-accent text-sm font-medium">
                  <SelectValue placeholder="Select Age Range" />
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </SelectTrigger>
                <SelectContent className="rounded-xs">
                  <SelectGroup>
                    <SelectLabel>Age</SelectLabel>
                    <SelectItem value="en">18 - 24</SelectItem>
                    <SelectItem value="ur">25 - 35</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-6 col-span-12">
              <Label className="block mb-3">Budget</Label>
              <Select>
                <SelectTrigger className="w-full dark:bg-zinc-900 py-2 px-5 text-start rounded-full flex justify-between border items-center hover:bg-accent text-sm font-medium">
                  <SelectValue placeholder="Select Budget" />
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </SelectTrigger>
                <SelectContent className="rounded-xs">
                  <SelectGroup>
                    <SelectLabel>Budget</SelectLabel>
                    <SelectItem value="10">10K - 30K</SelectItem>
                    <SelectItem value="31">31K - 50K</SelectItem>
                    <SelectItem value="51">51K - 80K</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-6 col-span-12">
              <fieldset className="p-3 border rounded-sm">
                <legend>Influencer Category</legend>
                <div className="grid grid-cols-12 gap-4">
                  <div className="lg:col-span-6 col-span-12">
                    <TagInput
                      // label="Category Include"
                      placeholder="Add category to include..."
                      tags={categoryInclude}
                      setTags={setCategoryInclude}
                    />
                    <small className="text-muted-foreground">
                      Comma seperated or press Enter key
                    </small>
                  </div>

                  <div className="lg:col-span-6 col-span-12">
                    <TagInput
                      // label="Category Exclude"
                      placeholder="Add category to exclude..."
                      tags={categoryExclude}
                      setTags={setCategoryExclude}
                    />
                    <small className="text-muted-foreground">
                      Comma seperated or press Enter key
                    </small>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="lg:col-span-6 col-span-12">
              <fieldset className="p-3 border rounded-sm">
                <legend>Influencer Affinity Tags</legend>
                <div className="grid grid-cols-12 gap-4">
                  <div className="lg:col-span-6 col-span-12">
                    <TagInput
                      placeholder="Add tag to include..."
                      tags={tagInclude}
                      setTags={setTagInclude}
                    />
                    <small className="text-muted-foreground">
                      Comma seperated or press Enter key
                    </small>
                  </div>

                  <div className="lg:col-span-6 col-span-12">
                    <TagInput
                      placeholder="Add tag to exclude..."
                      tags={tagExclude}
                      setTags={setTagExclude}
                    />
                    <small className="text-muted-foreground">
                      Comma seperated or press Enter key
                    </small>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </ScrollArea>

        <DrawerFooter className="flex justify-end flex-row">
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>

          <Button>Apply</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CampaignFilters;
