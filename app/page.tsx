import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RecipeCard } from "@/components/recipe-card"
import { getFeaturedRecipes } from "@/lib/recipes"

export default async function Home() {
  const featuredRecipes = await getFeaturedRecipes()

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl mb-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Discover & Share Amazing Recipes
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Find inspiration for your next meal, share your culinary creations, and connect with food lovers
                worldwide.
              </p>
            </div>
            <div className="w-full max-w-md flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search recipes..." className="pl-8 rounded-lg border-amber-200" />
              </div>
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Recipes</h2>
          <Link href="/recipes" className="text-amber-600 hover:text-amber-700 font-medium">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Categories</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegetarian", "Quick & Easy"].map((category) => (
            <Link
              key={category}
              href={`/recipes/category/${category.toLowerCase().replace(" & ", "-")}`}
              className="bg-amber-100 hover:bg-amber-200 rounded-lg p-4 text-center transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-amber-50 rounded-xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold">Share Your Culinary Creations</h2>
            <p className="text-gray-500 max-w-md">
              Join our community and share your favorite recipes with food enthusiasts around the world.
            </p>
          </div>
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <Link href="/recipes/create">Create Recipe</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

