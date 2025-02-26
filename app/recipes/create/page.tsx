"use client";
import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Upload, X, ChevronDown } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createRecipe } from "@/lib/recipes";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CreateRecipePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [youtubeUrlError, setYoutubeUrlError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string>("basics");

  function addIngredient() {
    setIngredients([...ingredients, ""]);
  }

  function updateIngredient(index: number, value: string) {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  }

  function removeIngredient(index: number) {
    if (ingredients.length > 1) {
      const updated = [...ingredients];
      updated.splice(index, 1);
      setIngredients(updated);
    }
  }

  function addInstruction() {
    setInstructions([...instructions, ""]);
  }

  function updateInstruction(index: number, value: string) {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  }

  function removeInstruction(index: number) {
    if (instructions.length > 1) {
      const updated = [...instructions];
      updated.splice(index, 1);
      setInstructions(updated);
    }
  }

  function toggleCategory(category: string) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }

  // Function to validate YouTube URL
  function validateYoutubeUrl(url: string) {
    if (!url) {
      setYoutubeUrlError(null);
      return true;
    }

    const pattern =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    if (pattern.test(url)) {
      setYoutubeUrlError(null);
      return true;
    } else {
      setYoutubeUrlError("Please enter a valid YouTube video URL");
      return false;
    }
  }

  function handleYoutubeUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    const url = e.target.value;
    setYoutubeUrl(url);
    // Only validate if there's input
    if (url.trim()) {
      validateYoutubeUrl(url);
    } else {
      setYoutubeUrlError(null);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.includes("image/")) {
      alert("Please upload an image file");
      return;
    }

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate YouTube URL if provided
    if (youtubeUrl && !validateYoutubeUrl(youtubeUrl)) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const cookingTime = Number.parseInt(formData.get("cookingTime") as string);
    const filteredIngredients = ingredients.filter((i) => i.trim() !== "");
    const filteredInstructions = instructions.filter((i) => i.trim() !== "");

    try {
      // If no image is uploaded, use the placeholder image
      let finalImage = imageFile;
      if (!finalImage) {
        finalImage = await getPlaceholderImage();
      }
      if (!finalImage) {
        throw new Error("Failed to load image");
      }

      const recipeId = await createRecipe({
        title,
        description,
        cookingTime,
        ingredients: filteredIngredients,
        instructions: filteredInstructions,
        category: selectedCategories.join(","),
        youtubeUrl: youtubeUrl.trim(),
        image: finalImage,
      });

      router.push(`/recipes/${recipeId}`);
    } catch (error) {
      console.error("Failed to create recipe:", error);
      setIsSubmitting(false);
    }
  }
  async function getPlaceholderImage() {
    try {
      const response = await fetch("/place-holder-image-821784238.png");
      const blob = await response.blob();
      return new File([blob], "placeholder-image.png", { type: "image/png" });
    } catch (error) {
      console.error("Error loading placeholder image:", error);
      return null;
    }
  }
  const categories = [
    { label: "Breakfast", value: "Breakfast" },
    { label: "Lunch", value: "Lunch" },
    { label: "Dinner", value: "Dinner" },
    { label: "Dessert", value: "Dessert" },
    { label: "Vegetarian", value: "Vegetarian" },
    { label: "Vegan", value: "Vegan" },
    { label: "Gluten-Free", value: "Gluten-Free" },
    { label: "Quick", value: "Quick" },
    { label: "Healthy", value: "Healthy" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <Card className="max-w-3xl mx-auto border shadow-lg">
        <CardHeader className="bg-amber-50 border-b">
          <CardTitle className="text-3xl font-bold text-amber-800">
            Create New Recipe
          </CardTitle>
          <CardDescription className="text-amber-700">
            Share your culinary masterpiece with our community
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section Navigation */}
            <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-200">
              <Button
                type="button"
                variant={activeSection === "basics" ? "default" : "outline"}
                onClick={() => setActiveSection("basics")}
                className={
                  activeSection === "basics"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : ""
                }
              >
                1. Basic Info
              </Button>
              <Button
                type="button"
                variant={
                  activeSection === "ingredients" ? "default" : "outline"
                }
                onClick={() => setActiveSection("ingredients")}
                className={
                  activeSection === "ingredients"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : ""
                }
              >
                2. Ingredients
              </Button>
              <Button
                type="button"
                variant={
                  activeSection === "instructions" ? "default" : "outline"
                }
                onClick={() => setActiveSection("instructions")}
                className={
                  activeSection === "instructions"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : ""
                }
              >
                3. Instructions
              </Button>
              <Button
                type="button"
                variant={activeSection === "details" ? "default" : "outline"}
                onClick={() => setActiveSection("details")}
                className={
                  activeSection === "details"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : ""
                }
              >
                4. Additional Details
              </Button>
            </div>

            {/* Basic Info Section */}
            <div className={activeSection === "basics" ? "block" : "hidden"}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg font-medium">
                    Recipe Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter recipe title"
                    required
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-lg font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Briefly describe your recipe"
                    rows={4}
                    required
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-lg font-medium">
                    Recipe Image
                  </Label>
                  <div className="border-2 border-dashed border-amber-300 rounded-lg p-4 hover:bg-amber-50 transition">
                    {!imagePreview ? (
                      <div
                        className="flex flex-col items-center justify-center h-60 cursor-pointer gap-2"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="bg-amber-100 p-4 rounded-full">
                          <Upload className="h-8 w-8 text-amber-600" />
                        </div>
                        <p className="text-md font-medium text-gray-600">
                          Click to upload an image of your recipe
                        </p>
                        <p className="text-xs text-gray-400">
                          JPEG, PNG or GIF (max. 5MB)
                        </p>
                      </div>
                    ) : (
                      <div className="relative h-80 w-full">
                        <Image
                          src={imagePreview}
                          alt="Recipe preview"
                          fill
                          className="object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 rounded-full shadow-lg"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cookingTime" className="text-lg font-medium">
                    Cooking Time (minutes)
                  </Label>
                  <Input
                    id="cookingTime"
                    name="cookingTime"
                    type="number"
                    min="1"
                    placeholder="30"
                    required
                    className="max-w-xs"
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <Button
                    type="button"
                    onClick={() => setActiveSection("ingredients")}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    Next: Add Ingredients
                  </Button>
                </div>
              </div>
            </div>

            {/* Ingredients Section */}
            <div
              className={activeSection === "ingredients" ? "block" : "hidden"}
            >
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-amber-800 flex items-center gap-2">
                  <span className="bg-amber-100 p-1.5 rounded-full">
                    <ChevronDown className="h-5 w-5 text-amber-600" />
                  </span>
                  Ingredients
                </h2>

                <div className="space-y-4">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <span className="text-amber-600 font-semibold min-w-[20px]">
                        {index + 1}.
                      </span>
                      <Input
                        value={ingredient}
                        onChange={(e) =>
                          updateIngredient(index, e.target.value)
                        }
                        placeholder={`e.g. 1 cup flour`}
                        required
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                        disabled={ingredients.length === 1}
                        className="border-amber-300 hover:bg-amber-50"
                      >
                        <Trash2 className="h-4 w-4 text-amber-600" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={addIngredient}
                  className="flex items-center gap-1 border-amber-400 text-amber-700"
                >
                  <Plus className="h-4 w-4" /> Add Ingredient
                </Button>

                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveSection("basics")}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveSection("instructions")}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    Next: Add Instructions
                  </Button>
                </div>
              </div>
            </div>

            {/* Instructions Section */}
            <div
              className={activeSection === "instructions" ? "block" : "hidden"}
            >
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-amber-800 flex items-center gap-2">
                  <span className="bg-amber-100 p-1.5 rounded-full">
                    <ChevronDown className="h-5 w-5 text-amber-600" />
                  </span>
                  Instructions
                </h2>

                <div className="space-y-6">
                  {instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 bg-amber-100 rounded-full h-8 w-8 flex items-center justify-center text-amber-700 font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <Textarea
                          value={instruction}
                          onChange={(e) =>
                            updateInstruction(index, e.target.value)
                          }
                          placeholder={`Describe step ${index + 1}`}
                          required
                          className="resize-none border-amber-200"
                          rows={3}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeInstruction(index)}
                        disabled={instructions.length === 1}
                        className="h-8 w-8 self-start mt-2 border-amber-300 hover:bg-amber-50"
                      >
                        <Trash2 className="h-4 w-4 text-amber-600" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={addInstruction}
                  className="flex items-center gap-1 border-amber-400 text-amber-700"
                >
                  <Plus className="h-4 w-4" /> Add Step
                </Button>

                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveSection("ingredients")}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveSection("details")}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    Next: Additional Details
                  </Button>
                </div>
              </div>
            </div>

            {/* Additional Details Section */}
            <div className={activeSection === "details" ? "block" : "hidden"}>
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-amber-800 flex items-center gap-2">
                  <span className="bg-amber-100 p-1.5 rounded-full">
                    <ChevronDown className="h-5 w-5 text-amber-600" />
                  </span>
                  Additional Details
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="youtubeUrl" className="text-lg font-medium">
                      YouTube Video URL (optional)
                    </Label>
                    <Input
                      id="youtubeUrl"
                      name="youtubeUrl"
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={youtubeUrl}
                      onChange={handleYoutubeUrlChange}
                      className="border-amber-200"
                    />
                    {youtubeUrlError && (
                      <p className="text-sm text-red-500">{youtubeUrlError}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Add a YouTube video demonstrating how to make this recipe
                    </p>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Label className="text-lg font-medium">Categories</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                      {categories.map((category) => (
                        <div
                          key={category.value}
                          className={`
                                                  flex items-center gap-2 rounded-lg border p-3 cursor-pointer
                                                  ${
                                                    selectedCategories.includes(
                                                      category.value,
                                                    )
                                                      ? "bg-amber-50 border-amber-300"
                                                      : "hover:bg-gray-50"
                                                  }
                                                `}
                          onClick={() => toggleCategory(category.value)}
                        >
                          <div className="h-5 w-5 rounded border flex items-center justify-center border-amber-500">
                            {selectedCategories.includes(category.value) && (
                              <div className="h-3 w-3 rounded-sm bg-amber-500"></div>
                            )}
                          </div>
                          <span>{category.label}</span>
                        </div>
                      ))}
                    </div>

                    {selectedCategories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        <p className="text-sm text-gray-500 mr-2">Selected:</p>
                        {selectedCategories.map((cat) => (
                          <Badge
                            key={cat}
                            variant="secondary"
                            className="bg-amber-100 text-amber-800"
                          >
                            {cat}
                            <button
                              type="button"
                              className="ml-1 hover:text-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCategory(cat);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex flex-col gap-4">
                  <h3 className="font-medium">Recipe Summary</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-amber-700">
                        Number of Ingredients:
                      </p>
                      <p>{ingredients.filter((i) => i.trim()).length || 0}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-amber-700">
                        Number of Steps:
                      </p>
                      <p>{instructions.filter((i) => i.trim()).length || 0}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-amber-700">
                        Cooking Time:
                      </p>
                      <p>
                        {(
                          document.getElementById(
                            "cookingTime",
                          ) as HTMLInputElement
                        )?.value || "0"}{" "}
                        minutes
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-amber-700">
                        Categories:
                      </p>
                      <p>{selectedCategories.length || 0} selected</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveSection("instructions")}
                  >
                    Back
                  </Button>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Creating...
                        </div>
                      ) : (
                        "Create Recipe"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
