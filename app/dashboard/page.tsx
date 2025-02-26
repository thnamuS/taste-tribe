import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecipeCard } from "@/components/recipe-card";
import { requireAuth } from "@/lib/auth";
import { getFeaturedRecipes } from "@/lib/recipes";

export default async function DashboardPage() {
  const user = await requireAuth();
  const recipes = await getFeaturedRecipes();

  // In a real app, you would fetch user's recipes
  // For this demo, we'll filter our mock data
  const userRecipes = recipes.filter((recipe) => recipe.author.id === user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild className="bg-amber-600 hover:bg-amber-700">
          <Link href="/recipes/create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Create Recipe
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>My Recipes</CardTitle>
            <CardDescription>Recipes you have created</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userRecipes.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Ratings</CardTitle>
            <CardDescription>Ratings received on your recipes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {userRecipes.reduce((sum, recipe) => sum + recipe.ratingCount, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Rating</CardTitle>
            <CardDescription>Average rating of your recipes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {userRecipes.reduce((sum, recipe) => sum + recipe.ratingCount, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">My Recipes</h2>
        {userRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <h3 className="text-lg font-medium mb-2">
              You have not created any recipes yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Share your culinary creations with the world!
            </p>
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link href="/recipes/create">Create Your First Recipe</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
