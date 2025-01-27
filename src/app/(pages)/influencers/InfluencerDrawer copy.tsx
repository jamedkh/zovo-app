"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

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
import {
  // Check,
  ChevronsUpDown,
  CloudUpload,
  Facebook,
  Instagram,
  Paperclip,
  Plus,
  Trash2,
  Youtube
} from "lucide-react";
import { TiktokLogo } from "@phosphor-icons/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import React, { useState } from "react";
import { DateTimePicker } from "@/components/DateTimePicker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { TagsInput } from "@/components/tags-input";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from "@/components//file-upload";
import { formSchema } from "../../../lib/schemas";

import { toast } from "@/components/use-toast";
import { LoadingButton } from "@/components/loading-button";

function InfluencerDrawer() {
  const [files, setFiles] = useState<File[] | null>(null);
  const [popoverOpenIndex, setPopoverOpenIndex] = React.useState<number | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);

  const socialMediaOptions = [
    { value: "facebook", label: "Facebook", icon: <Facebook /> },
    { value: "instagram", label: "Instagram", icon: <Instagram /> },
    { value: "youtube", label: "YouTube", icon: <Youtube /> },
    { value: "tiktok", label: "TikTok", icon: <TiktokLogo /> }
  ];

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true
  };

  // Initialize form with proper default values matching schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      // url: "",
      phone: "",
      // dob: new Date(),
      category: [], // Changed from ["test"] to empty array
      photo: [],
      socialHandles: [{ platform: "", handle: "" }],
      region: "",
      city: "",
      language: "",
      datetime: undefined
    },
    mode: "onChange" // Enable real-time validation
  });

  const { fields, append, remove } = useFieldArray({
    name: "socialHandles",
    control: form.control
  });

  // Debugging helper for form state
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) =>
      console.log("Form updated:", name, value)
    );
    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Submit triggered");

    try {
      setLoading(true);
      console.log("Form data:", data);

      // Validate social handles URLs
      const socialHandlesValid = data.socialHandles.every((handle) => {
        try {
          new URL(handle.handle);
          return true;
        } catch {
          return false;
        }
      });

      if (!socialHandlesValid) {
        throw new Error("All social handles must be valid URLs");
      }

      // Show success toast
      toast({
        title: "Form Submitted Successfully",
        description: (
          <div>
            <p>Form data:</p>
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          </div>
        )
      });
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "There was a problem submitting the form.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }

  // Add this for debugging validation errors
  const onError = (errors: FieldErrors<z.infer<typeof formSchema>>) => {
    console.log("Form validation errors:", errors);
    toast({
      title: "Validation Error",
      description: "Please check the form for errors and try again.",
      variant: "destructive"
    });
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="btn-fill primary">
            <Plus />
            Add New
          </Button>
        </SheetTrigger>

        <SheetContent className="!w-full lg:!max-w-[70%]">
          <SheetHeader>
            <SheetTitle>Add Influencer</SheetTitle>
            <SheetDescription>
              Make changes here. Click save when you are done.
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onError)}
              className="flex flex-col justify-between h-full lg:h-[93%]"
            >
              <ScrollArea className="w-full h-full border-y my-5 py-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="m-3">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-12 gap-4 m-3 py-3">
                  <div className="lg:col-span-6 col-span-12">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="lg:col-span-6 col-span-12">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Phone number"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 m-3">
                  <div className="lg:col-span-4 col-span-12">
                    <FormField
                      control={form.control}
                      name="datetime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <DateTimePicker
                              value={field.value}
                              onChange={field.onChange}
                              granularity="day"
                              placeholder="Select Date"
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
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Region</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Region" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="m@example.com">
                                m@example.com
                              </SelectItem>
                              <SelectItem value="m@google.com">
                                m@google.com
                              </SelectItem>
                              <SelectItem value="m@support.com">
                                m@support.com
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="lg:col-span-4 col-span-12">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Karachi, Lahore, Islamabad etc..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="m@example.com">
                                m@example.com
                              </SelectItem>
                              <SelectItem value="m@google.com">
                                m@google.com
                              </SelectItem>
                              <SelectItem value="m@support.com">
                                m@support.com
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Social Media Handles Section */}
                <fieldset className="p-3 m-3 border rounded-sm">
                  <legend>Social Media Handles</legend>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-12 gap-4 items-center my-3"
                    >
                      <FormField
                        control={form.control}
                        name={`socialHandles.${index}.platform`}
                        render={({ field: platformField }) => (
                          <FormItem className="col-span-5">
                            <FormLabel className="sr-only">Platform</FormLabel>
                            <Popover
                              open={popoverOpenIndex === index}
                              onOpenChange={(isOpen) =>
                                setPopoverOpenIndex(isOpen ? index : null)
                              }
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={`w-full justify-between ${
                                      platformField.value
                                        ? ""
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {socialMediaOptions.find(
                                      (option) =>
                                        option.value === platformField.value
                                    )?.label || "Select Platform"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[27vw] p-0">
                                <Command>
                                  <CommandInput placeholder="Search platform..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No platform found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {socialMediaOptions.map((option) => (
                                        <CommandItem
                                          key={option.value}
                                          onSelect={() => {
                                            platformField.onChange(
                                              option.value
                                            );
                                            setPopoverOpenIndex(null);
                                          }}
                                        >
                                          <span className="mr-2">
                                            {option.icon}
                                          </span>
                                          {option.label}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`socialHandles.${index}.handle`}
                        render={({ field: handleField }) => (
                          <FormItem className="col-span-6">
                            <FormLabel className="sr-only">
                              Handle URL
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter full profile URL (https://...)"
                                {...handleField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="col-span-1 flex justify-center items-center">
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() => remove(index)}
                          disabled={index === 0 && fields.length === 1}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-2 flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => append({ platform: "", handle: "" })}
                    >
                      <Plus className="mr-2" />
                      Add Social Handle
                    </Button>
                  </div>
                </fieldset>

                <div className="m-3">
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              m@google.com
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              m@support.com
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="m-3">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <TagsInput
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Enter your tags"
                          />
                        </FormControl>
                        <FormDescription>
                          Press enter key when complete category name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="m-3">
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Photo</FormLabel>
                        <FormControl>
                          <FileUploader
                            value={field.value} // Bind to react-hook-form's field value
                            onValueChange={(files) => {
                              field.onChange(files); // Update form state with selected files
                              setFiles(files); // Update local state for display (if needed)
                            }}
                            dropzoneOptions={dropZoneConfig}
                            className="relative bg-background rounded-lg p-2"
                          >
                            <FileInput
                              id="fileInput"
                              className="outline-dashed outline-1 outline-slate-500"
                            >
                              <div className="flex items-center justify-center flex-col p-8 w-full">
                                <CloudUpload className="text-gray-500 w-10 h-10" />
                                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG, or GIF
                                </p>
                              </div>
                            </FileInput>
                            <FileUploaderContent>
                              {field.value &&
                                field.value.map((file, i) => (
                                  <FileUploaderItem key={i} index={i}>
                                    <Paperclip className="h-4 w-4 stroke-current" />
                                    <span>{file.name}</span>
                                  </FileUploaderItem>
                                ))}
                            </FileUploaderContent>
                          </FileUploader>
                        </FormControl>
                        <FormDescription>
                          Select a file to upload.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </ScrollArea>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" variant={"outline"}>
                    Close
                  </Button>
                </SheetClose>
                <Button type="submit" className="btn-fill primary">
                  Save changes
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default InfluencerDrawer;
