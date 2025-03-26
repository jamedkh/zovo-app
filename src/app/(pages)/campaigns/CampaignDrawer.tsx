"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { CalendarIcon, Plus, Trash2, X } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CampaignFormSchema,
  type CampaignFormValues,
  defaultCampaignValues
} from "@/lib/schemas/campaign";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export function CampaignDrawer() {
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(CampaignFormSchema),
    defaultValues: defaultCampaignValues
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "kpiMetrics"
  });

  React.useEffect(() => {
    if (fields.length === 0) {
      append({ metric: "", target: 0, unit: "" });
    }
  }, [append, fields.length]);

  const [includeCategoryInput, setIncludeCategoryInput] = React.useState("");
  const [excludeCategoryInput, setExcludeCategoryInput] = React.useState("");
  const [includeTagInput, setIncludeTagInput] = React.useState("");
  const [excludeTagInput, setExcludeTagInput] = React.useState("");

  function onSubmit(values: CampaignFormValues) {
    console.log(values);
  }

  const handleTagInput = (
    e: React.KeyboardEvent,
    inputValue: string,
    fieldName:
      | "includeCategories"
      | "excludeCategories"
      | "includeAffinityTags"
      | "excludeAffinityTags",
    setInput: (value: string) => void
  ) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      const value = inputValue.trim();
      if (value) {
        const currentValues = form.getValues(fieldName) || [];
        form.setValue(fieldName, [...currentValues, value]);
        setInput("");
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="btn-fill primary">
          <Plus />
          Add New
        </Button>
      </SheetTrigger>

      <SheetContent className="!w-full lg:!max-w-[70%]">
        <SheetHeader>
          <SheetTitle>Create New Campaign</SheetTitle>
          <SheetDescription>
            Set up your campaign details and requirements.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-4 flex flex-col justify-between h-[97%] lg:h-[93%]"
          >
            <ScrollArea className="w-full h-full border-y my-5 py-3">
              {/* Basic Information */}
              <div className="space-y-4 m-3 pr-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xs">
                          <SelectItem value="branding">Branding</SelectItem>
                          <SelectItem value="awareness">Awareness</SelectItem>
                          <SelectItem value="engagement">Engagement</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Influencer Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="influencerRegion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select region" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xs">
                            <SelectItem value="north">North</SelectItem>
                            <SelectItem value="south">South</SelectItem>
                            <SelectItem value="east">East</SelectItem>
                            <SelectItem value="west">West</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="influencerLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xs">
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="urdu">Urdu</SelectItem>
                            <SelectItem value="punjabi">Punjabi</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="influencerAgeBracket"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age Bracket</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select age bracket" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xs">
                            <SelectItem value="18-24">18-24</SelectItem>
                            <SelectItem value="25-34">25-34</SelectItem>
                            <SelectItem value="35-44">35-44</SelectItem>
                            <SelectItem value="45+">45+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <fieldset className="p-3 border rounded-xs">
                    <legend>Budget</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="budgetRange.min"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="budgetRange.max"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </fieldset>

                  <fieldset className="p-3 border rounded-xs">
                    <legend>Campaign Duration</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="campaignStartDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0 rounded-xs"
                                align="start"
                                style={{
                                  zIndex: 99,
                                  position: "relative",
                                  pointerEvents: "auto"
                                }}
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="campaignEndDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0 rounded-xs"
                                align="start"
                                style={{
                                  zIndex: 99,
                                  position: "relative",
                                  pointerEvents: "auto"
                                }}
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </fieldset>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <fieldset className="p-3 border rounded-xs">
                    <legend>Categories</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Include Categories */}
                      <FormField
                        control={form.control}
                        name="includeCategories"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Include</FormLabel>
                            <FormControl>
                              <div className="flex flex-wrap gap-2">
                                <Input
                                  placeholder="Type and press Enter to add..."
                                  value={includeCategoryInput}
                                  onChange={(e) =>
                                    setIncludeCategoryInput(e.target.value)
                                  }
                                  onKeyDown={(e) =>
                                    handleTagInput(
                                      e,
                                      includeCategoryInput,
                                      "includeCategories",
                                      setIncludeCategoryInput
                                    )
                                  }
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {field.value?.map((category, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="px-3 py-1 flex items-center gap-1"
                                    >
                                      {category}
                                      <X
                                        className="h-3 w-3 cursor-pointer"
                                        onClick={() => {
                                          const newCategories =
                                            field.value?.filter(
                                              (_, i) => i !== index
                                            );
                                          form.setValue(
                                            "includeCategories",
                                            newCategories
                                          );
                                        }}
                                      />
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Exclude Categories */}
                      <FormField
                        control={form.control}
                        name="excludeCategories"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exclude</FormLabel>
                            <FormControl>
                              <div className="flex flex-wrap gap-2">
                                <Input
                                  placeholder="Type and press Enter to add..."
                                  value={excludeCategoryInput}
                                  onChange={(e) =>
                                    setExcludeCategoryInput(e.target.value)
                                  }
                                  onKeyDown={(e) =>
                                    handleTagInput(
                                      e,
                                      excludeCategoryInput,
                                      "excludeCategories",
                                      setExcludeCategoryInput
                                    )
                                  }
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {field.value?.map((category, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="px-3 py-1 flex items-center gap-1"
                                    >
                                      {category}
                                      <X
                                        className="h-3 w-3 cursor-pointer"
                                        onClick={() => {
                                          const newCategories =
                                            field.value?.filter(
                                              (_, i) => i !== index
                                            );
                                          form.setValue(
                                            "excludeCategories",
                                            newCategories
                                          );
                                        }}
                                      />
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </fieldset>

                  {/* Color Preferences */}
                  <fieldset className="p-3 border rounded-xs">
                    <legend>Color Preferences</legend>
                    <FormField
                      control={form.control}
                      name="campaignRequirements.colorPreferences"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-wrap gap-2">
                              <Input
                                placeholder="Add color (press Enter)"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    const value = e.currentTarget.value.trim();
                                    if (value) {
                                      const currentValues = field.value || [];
                                      field.onChange([...currentValues, value]);
                                      e.currentTarget.value = "";
                                    }
                                  }
                                }}
                              />
                              <div className="flex flex-wrap gap-2 mt-2">
                                {field.value?.map((color, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="px-3 py-1 flex items-center gap-1"
                                  >
                                    {color}
                                    <X
                                      className="h-3 w-3 cursor-pointer"
                                      onClick={() => {
                                        const newColors = field.value?.filter(
                                          (_, i) => i !== index
                                        );
                                        form.setValue(
                                          "campaignRequirements.colorPreferences",
                                          newColors
                                        );
                                      }}
                                    />
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>
                </div>

                {/* Tracking Requirements */}
                <fieldset className="p-3 border rounded-xs">
                  <legend>Tracking Requirements</legend>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="trackingRequirements.requireAnalyticsScreenshots"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="!mt-0">
                            Require Analytics Screenshots
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="trackingRequirements.requireInsightsAccess"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="!mt-0">
                            Require Insights Access
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="trackingRequirements.customTrackingParameters"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Tracking Parameters</FormLabel>
                          <FormControl>
                            <div className="flex flex-wrap gap-2">
                              <Input
                                placeholder="Add parameter (press Enter)"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    const value = e.currentTarget.value.trim();
                                    if (value) {
                                      const currentValues = field.value || [];
                                      field.onChange([...currentValues, value]);
                                      e.currentTarget.value = "";
                                    }
                                  }
                                }}
                              />
                              <div className="flex flex-wrap gap-2 mt-2">
                                {field.value?.map((param, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="px-3 py-1 flex items-center gap-1"
                                  >
                                    {param}
                                    <X
                                      className="h-3 w-3 cursor-pointer"
                                      onClick={() => {
                                        const newParams = field.value?.filter(
                                          (_, i) => i !== index
                                        );
                                        form.setValue(
                                          "trackingRequirements.customTrackingParameters",
                                          newParams
                                        );
                                      }}
                                    />
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Preferred Platforms */}
                  <fieldset className="p-3 border rounded-xs">
                    <legend>Preferred Platforms</legend>
                    <FormField
                      control={form.control}
                      name="preferredPlatforms"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {[
                                "Instagram",
                                "YouTube",
                                "TikTok",
                                "Facebook",
                                "Twitter / X",
                                "Linkedin"
                              ].map((platform) => (
                                <FormItem
                                  key={platform}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    checked={field.value?.includes(
                                      platform as
                                        | "Instagram"
                                        | "YouTube"
                                        | "TikTok"
                                        | "Facebook"
                                        | "Twitter"
                                        | "Linkedin"
                                    )}
                                    onCheckedChange={(checked) => {
                                      const currentValues = field.value || [];
                                      checked
                                        ? field.onChange([
                                            ...currentValues,
                                            platform
                                          ])
                                        : field.onChange(
                                            currentValues.filter(
                                              (val) => val !== platform
                                            )
                                          );
                                    }}
                                  />
                                  <FormLabel className="!mt-0">
                                    {platform}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>

                  {/* Content Types */}
                  <fieldset className="p-3 border rounded-xs">
                    <legend>Content Types</legend>
                    <FormField
                      control={form.control}
                      name="contentTypes"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {[
                                "Photo",
                                "Video",
                                "Story",
                                "Reel",
                                "Live",
                                "Blog"
                              ].map((type) => (
                                <FormItem
                                  key={type}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    checked={field.value?.includes(
                                      type as
                                        | "Photo"
                                        | "Video"
                                        | "Story"
                                        | "Reel"
                                        | "Live"
                                        | "Blog"
                                    )}
                                    onCheckedChange={(checked) => {
                                      const currentValues = field.value || [];
                                      checked
                                        ? field.onChange([
                                            ...currentValues,
                                            type
                                          ])
                                        : field.onChange(
                                            currentValues.filter(
                                              (val) => val !== type
                                            )
                                          );
                                    }}
                                  />
                                  <FormLabel className="!mt-0">
                                    {type}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>
                </div>

                {/* KPI Metrics  */}
                <fieldset className="p-3 border rounded-xs">
                  <legend>KPI Metrics</legend>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-12 gap-4 items-end mb-3"
                    >
                      <div className="lg:col-span-5 col-span-12">
                        <FormField
                          control={form.control}
                          name={`kpiMetrics.${index}.metric`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Metric</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="e.g., Views, Engagement"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="lg:col-span-4 col-span-12">
                        <FormField
                          control={form.control}
                          name={`kpiMetrics.${index}.target`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Target</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div
                        className={cn(
                          "col-span-12",
                          index === 0 ? "lg:col-span-3" : "col-span-8"
                        )}
                      >
                        <FormField
                          control={form.control}
                          name={`kpiMetrics.${index}.unit`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="e.g., K, M" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {index !== 0 && (
                        <div className="lg:col-span-1 col-span-4 text-center">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ metric: "", target: 0, unit: "" })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Metric
                  </Button>
                </fieldset>

                {/* // Campaign Requirements  */}
                <fieldset className="p-3 border rounded-xs">
                  <legend>Campaign Requirements</legend>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="campaignRequirements.script"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Script Requirements</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter script requirements..."
                              className="min-h-[100px] rounded-xs"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="campaignRequirements.productShowcase"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Product Showcase Required</FormLabel>
                            <FormDescription>
                              Check if the influencer needs to showcase the
                              product
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </fieldset>

                {/* 
                

                // Additional Notes 
                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional requirements or notes..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 */}
              </div>
            </ScrollArea>

            <SheetFooter className="gap-4 mt-0 sm:space-x-0 pb-2">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit" className="btn-fill primary">
                Create Campaign
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default CampaignDrawer;
