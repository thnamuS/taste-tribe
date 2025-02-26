"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { rateRecipe } from "@/lib/recipes";

interface RatingStarsProps {
  recipeId: string;
  userRating?: number;
}

export function RatingStars({ recipeId, userRating }: RatingStarsProps) {
  const [rating, setRating] = useState(userRating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRating(value: number) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setRating(value);

    try {
      await rateRecipe(recipeId, value);
    } catch (error) {
      console.error("Failed to rate recipe:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleRating(value)}
            onMouseEnter={() => setHoveredRating(value)}
            onMouseLeave={() => setHoveredRating(0)}
            className="p-1"
          >
            <Star
              className={`h-6 w-6 ${
                (hoveredRating ? hoveredRating >= value : rating >= value)
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-300"
              } transition-colors`}
            />
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600">
        {rating ? `Your rating: ${rating}/5` : "Click to rate"}
      </p>
    </div>
  );
}
