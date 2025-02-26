import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Eye, Star, User, Utensils } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  // Format the date to be more readable
  const formattedDate = new Date(recipe.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md group",
        className,
      )}
    >
      <Link
        href={`/recipes/${recipe.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <div className="relative h-52 w-full">
          <Image
            src={recipe.image || "/placeholder.svg?height=208&width=384"}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className="bg-black/70 text-white hover:bg-black/80"
            >
              {recipe.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {recipe.title}
            </h3>
            <div className="flex items-center gap-1 bg-muted/30 px-2 py-1 rounded-full">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium">
                {recipe.rating.toFixed(1)} ({recipe.ratingCount})
              </span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {recipe.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{recipe.cookingTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Utensils className="h-3.5 w-3.5" />
              <span>{recipe.ingredients.length} ingredients</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              <span>{recipe.views.toLocaleString()} views</span>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="px-4 py-3 border-t bg-muted/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {recipe.author.image ? (
            <Image
              src={recipe.author.image}
              alt={recipe.author.name}
              width={20}
              height={20}
              className="rounded-full"
            />
          ) : (
            <User className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-xs text-muted-foreground">
            By {recipe.author.name}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formattedDate}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
