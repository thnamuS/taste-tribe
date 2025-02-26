import { Suspense } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RecipeCard } from "@/components/recipe-card"
import { searchRecipes } from "@/lib/recipes"

interface SearchPageProps {
  searchParams: { q?: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Recipes</h1>

      <div className="max-w-xl mx-auto mb-8">
        <form className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              name="q"
              placeholder="Search recipes..."
              defaultValue={query}
              className="pl-8 rounded-lg"
            />
          </div>
          <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
            Search
          </Button>
        </form>
      </div>

      <Suspense fallback={<p className="text-center py-8">Loading recipes...</p>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  )
}

async function SearchResults({ query }: { query: string }) {
  const recipes = await searchRecipes(query)

  if (!query) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Enter a search term to find recipes</p>
      </div>
    )
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-medium mb-2">No recipes found for "{query}"</p>
        <p className="text-muted-foreground">Try a different search term or browse our categories</p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-4">
        Found {recipes.length} results for "{query}"
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

