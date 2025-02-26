import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, Star, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RatingStars } from "@/components/rating-stars"
import { getRecipeById } from "@/lib/recipes"
import { getCurrentUser } from "@/lib/auth"

interface RecipePageProps {
  params: {
    id: string
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeById(params.id)
  const currentUser = await getCurrentUser()

  if (!recipe) {
    notFound()
  }

  const isAuthor = currentUser?.id === recipe.author.id

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden">
            <Image
              src={recipe.image || "/placeholder.svg?height=400&width=800"}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
            <p className="text-gray-600 mb-4">{recipe.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{recipe.cookingTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm text-muted-foreground">
                  {recipe.rating.toFixed(1)} ({recipe.ratingCount} ratings)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4 text-muted-foreground" />
                <Link href={`/profile/${recipe.author.id}`} className="text-sm text-amber-600 hover:text-amber-700">
                  {recipe.author.name}
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Instructions</h2>
            <ol className="list-decimal pl-5 space-y-4">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-amber-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Rate this recipe</h3>
            {currentUser ? (
              <RatingStars recipeId={recipe.id} userRating={recipe.userRating} />
            ) : (
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">Sign in to rate this recipe</p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/auth/login">Sign in</Link>
                </Button>
              </div>
            )}
          </div>

          {isAuthor && (
            <div className="border border-amber-200 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Recipe Actions</h3>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/recipes/${recipe.id}/edit`}>Edit Recipe</Link>
                </Button>
                <Button variant="destructive" className="w-full">
                  Delete Recipe
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

