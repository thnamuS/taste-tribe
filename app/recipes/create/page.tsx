"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createRecipe } from "@/lib/recipes";

export default function CreateRecipePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const cookingTime = Number.parseInt(formData.get("cookingTime") as string);
    const filteredIngredients = ingredients.filter((i) => i.trim() !== "");
    const filteredInstructions = instructions.filter((i) => i.trim() !== "");

    try {
      const recipeId = await createRecipe({
        title,
        description,
        cookingTime,
        ingredients: filteredIngredients,
        instructions: filteredInstructions,
        category: Array.from(formData.getAll("categories") as string[]).join(
          ","
        ),
      });

      router.push(`/recipes/${recipeId}`);
    } catch (error) {
      console.error("Failed to create recipe:", error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Recipe</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Recipe Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter recipe title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Briefly describe your recipe"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cookingTime">Cooking Time (minutes)</Label>
            <Input
              id="cookingTime"
              name="cookingTime"
              type="number"
              min="1"
              placeholder="30"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Ingredients</Label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeIngredient(index)}
                  disabled={ingredients.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addIngredient}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Ingredient
            </Button>
          </div>

          <div className="space-y-3">
            <Label>Instructions</Label>
            {instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeInstruction(index)}
                  disabled={instructions.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addInstruction}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Step
            </Button>
            <div className="space-y-2 mt-6">
              <Label htmlFor="categories">Categories</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Breakfast",
                  "Lunch",
                  "Dinner",
                  "Dessert",
                  "Vegetarian",
                  "Vegan",
                  "Gluten-Free",
                  "Quick",
                  "Healthy",
                ].map((category) => (
                  <label
                    key={category}
                    className="flex items-center space-x-2 border rounded-md p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="categories"
                      value={category}
                      className="rounded border-gray-300"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-500">Select all that apply</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
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
              {isSubmitting ? "Creating..." : "Create Recipe"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
