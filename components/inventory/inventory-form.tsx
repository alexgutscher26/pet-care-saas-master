"use client";

import * as React from "react";
import { type ChangeEvent, type DragEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ImagePlus,
  Trash2,
  Save,
  PackageCheck,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const platforms = [
  { 
    id: "ebay", 
    name: "eBay", 
    fields: ["category", "condition"],
    tags: ["vintage", "retro", "collectible", "rare", "authentic", "designer", "luxury", "bundle"]
  },
  {
    id: "mercari",
    name: "Mercari",
    fields: ["category", "condition", "brand"],
    tags: ["nwt", "bundle", "vintage", "rare", "authentic", "designer", "custom", "handmade"]
  },
  {
    id: "poshmark",
    name: "Poshmark",
    fields: ["category", "brand", "size"],
    tags: ["nwt", "nwot", "boutique", "bundle", "authentic", "rare", "vintage", "designer"]
  },
  {
    id: "etsy",
    name: "Etsy",
    fields: ["category", "materials", "shipping"],
    tags: ["handmade", "vintage", "custom", "personalized", "unique", "craft", "artisan", "supplies"]
  },
  {
    id: "depop",
    name: "Depop",
    fields: ["category", "condition", "style"],
    tags: ["vintage", "y2k", "retro", "streetwear", "rare", "designer", "trendy", "sustainable"]
  },
  {
    id: "facebook",
    name: "Facebook Marketplace",
    fields: ["category", "condition", "location"],
    tags: ["local", "pickup", "delivery", "bundle", "furniture", "electronics", "homemade", "moving"]
  },
  {
    id: "amazon",
    name: "Amazon",
    fields: ["category", "brand", "upc"],
    tags: ["new", "authentic", "warranty", "prime", "bundle", "genuine", "official", "sealed"]
  },
  {
    id: "vinted",
    name: "Vinted",
    fields: ["category", "brand", "size"],
    tags: ["vintage", "preloved", "designer", "streetwear", "sustainable", "bundle", "rare", "trendy"]
  }
];

const conditions = [
  "New with tags",
  "New without tags",
  "Like new",
  "Good",
  "Fair",
  "Poor",
];

const categories = [
  "Clothing",
  "Shoes",
  "Accessories",
  "Electronics",
  "Home & Garden",
  "Toys & Games",
  "Sports & Outdoors",
  "Other",
];

const suggestedHashtags = [
  "vintage",
  "rare",
  "limited",
  "handmade",
  "custom",
  "designer",
  "trendy",
  "popular",
  "exclusive",
  "authentic",
  "collectible",
  "bundle",
  "nwt",
  "seasonal",
  "luxury"
];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  sku: z.string().min(1, "SKU is required"),
  costPrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Cost price must be a valid number",
  }),
  sellingPrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Selling price must be a valid number",
  }),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  condition: z.string().min(1, "Condition is required"),
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
  tags: z.array(z.string()),
  status: z.enum(["Draft", "Listed", "Sold"]),
});

export type FormData = z.infer<typeof formSchema>;

interface InventoryFormProps {
  initialData?: FormData;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

export function InventoryForm({ initialData, onSubmit, onCancel }: InventoryFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      sku: "",
      costPrice: "",
      sellingPrice: "",
      brand: "",
      category: "",
      condition: "",
      platforms: [],
      tags: [],
      status: "Draft"
    },
  });

  const [images, setImages] = useState<File[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    initialData?.platforms || []
  );
  const [platformFields, setPlatformFields] = useState<Record<string, { tags: string[] }>>(
    {}
  );
  const [customTags, setCustomTags] = useState<string[]>([]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      const newImages = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const addCustomTag = (tag: string) => {
    const formattedTag = tag.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (formattedTag && !customTags.includes(formattedTag)) {
      setCustomTags((prev) => {
        const newTags = [...prev, formattedTag];
        form.setValue("tags", newTags);
        return newTags;
      });
    }
  };

  const removeCustomTag = (tag: string) => {
    setCustomTags((prev) => {
      const newTags = prev.filter((t) => t !== tag);
      form.setValue("tags", newTags);
      return newTags;
    });
  };

  const togglePlatformTag = (platformId: string, tag: string) => {
    setPlatformFields(prev => {
      const platform = prev[platformId] || { tags: [] };
      const tags = platform.tags || [];
      const newTags = tags.includes(tag) 
        ? tags.filter(t => t !== tag)
        : [...tags, tag];
      
      return {
        ...prev,
        [platformId]: {
          ...platform,
          tags: newTags
        }
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => form.handleSubmit((data) => onSubmit({ ...data, status: "Draft" }))()}
          >
            <Save className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
          <Button
            onClick={() => form.handleSubmit((data) => onSubmit({ ...data, status: "Listed" }))()}
          >
            <PackageCheck className="mr-2 h-4 w-4" />
            List Item
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
              <CardDescription>
                Enter the basic information about your item
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Item name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="SKU or barcode" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your item..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="costPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sellingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selling Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>
                Upload or drag and drop product images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drop images here or click to upload
                </p>
              </div>

              {images.length > 0 && (
                <ScrollArea className="h-[200px] mt-4">
                  <div className="grid grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden"
                      >
                        <Image
                          src={URL.createObjectURL(image)}
                          alt={`Product image ${index + 1}`}
                          width={200}
                          height={200}
                          className="object-cover aspect-square"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categorization</CardTitle>
              <CardDescription>
                Add details to help categorize your item
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => form.setValue("category", value)}
                          defaultValue={form.getValues("category")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category.toLowerCase()}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => form.setValue("condition", value)}
                          defaultValue={form.getValues("condition")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            {conditions.map((condition) => (
                              <SelectItem
                                key={condition}
                                value={condition.toLowerCase()}
                              >
                                {condition}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Brand name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hashtags</CardTitle>
              <CardDescription>
                Add hashtags to help buyers find your item
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <FormLabel>Add Custom Hashtag</FormLabel>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter hashtag (without #)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.currentTarget;
                        const value = input.value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
                        if (value && !customTags.includes(value)) {
                          addCustomTag(value);
                          input.value = '';
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <FormLabel>Suggested Hashtags</FormLabel>
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestedHashtags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addCustomTag(tag)}
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs transition-colors ${
                        customTags.includes(tag)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {customTags.length > 0 && (
                <div>
                  <FormLabel>Your Hashtags</FormLabel>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {customTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer group"
                      >
                        #{tag}
                        <button
                          className="ml-1 opacity-0 group-hover:opacity-100 hover:text-destructive"
                          onClick={() => removeCustomTag(tag)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platforms</CardTitle>
              <CardDescription>
                Select the platforms where you want to list this item and add relevant tags
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {platforms.map((platform) => (
                    <div
                      key={platform.id}
                      className="flex flex-col space-y-4 border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={selectedPlatforms.includes(platform.id)}
                            onCheckedChange={(checked) => {
                              const newPlatforms = checked
                                ? [...selectedPlatforms, platform.id]
                                : selectedPlatforms.filter((p) => p !== platform.id);
                              setSelectedPlatforms(newPlatforms);
                              form.setValue("platforms", newPlatforms);
                            }}
                          />
                          <div>
                            <p className="font-medium">{platform.name}</p>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                              <span>Required fields:</span>
                              {platform.fields.map((field) => (
                                <Badge
                                  key={field}
                                  variant="secondary"
                                >
                                  {field}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {selectedPlatforms.includes(platform.id) && (
                        <div className="space-y-4">
                          <div>
                            <FormLabel>Popular Tags</FormLabel>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {platform.tags.map((tag) => (
                                <button
                                  key={tag}
                                  type="button"
                                  onClick={() => togglePlatformTag(platform.id, tag)}
                                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
                                    platformFields[platform.id]?.tags?.includes(tag)
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                  }`}
                                >
                                  {tag}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <FormLabel>Custom Tags</FormLabel>
                            <div className="flex items-center gap-2 mt-2">
                              <Input
                                placeholder="Add custom tag"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    const input = e.currentTarget;
                                    addCustomTag(input.value);
                                    input.value = '';
                                  }
                                }}
                              />
                            </div>
                            {customTags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {customTags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={() => removeCustomTag(tag)}
                                  >
                                    {tag}
                                    <button
                                      className="ml-1 hover:text-destructive"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeCustomTag(tag);
                                      }}
                                    >
                                      ×
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
