import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Star,
  User,
  ChefHat,
  Book,
  Apple,
  Share2,
  Printer,
  ThumbsUp,
  Lightbulb,
} from "lucide-react";
import { ProTipAnimation } from "@/components/pro-tip-animation";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/rating-stars";
import { getRecipeById } from "@/lib/recipes";
import { getCurrentUser } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFeaturedRecipes } from "@/lib/recipes";
import { RecipeCard } from "@/components/recipe-card";
interface RecipePageProps {
  params: {
    id: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeById(params.id);
  const currentUser = await getCurrentUser();

  if (!recipe) {
    notFound();
  }
  const featuredRecipes = await getFeaturedRecipes();
  const relatedRecipes = featuredRecipes
    .filter((r) => r.id !== params.id)
    .slice(0, 4);
  if (!recipe) {
    notFound();
  }
  const isAuthor = currentUser?.id === recipe.author.id;
  const youtubeVideoId = recipe.youtubeLink
    ? extractYoutubeVideoId(recipe.youtubeLink)
    : null;

  function extractYoutubeVideoId(
    url: string | null | undefined,
  ): string | null {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  // Mock categories for the recipe
  const categories = ["Dinner", "Italian", "Pasta"];

  // Calculate serving size visually
  const servingSize = 4;
  const difficulty = "Intermediate";

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-4 text-muted-foreground">
        <ul className="flex gap-2">
          <li>
            <Link href="/" className="hover:text-amber-600">
              Home
            </Link>{" "}
            /
          </li>
          <li>
            <Link href="/recipes" className="hover:text-amber-600">
              Recipes
            </Link>{" "}
            /
          </li>
          <li className="text-amber-600 font-medium truncate">
            {recipe.title}
          </li>
        </ul>
      </div>

      {/* Hero section */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-8">
        <div className="md:col-span-2">
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-md">
            <Image
              src={recipe.image || "/placeholder.svg?height=400&width=800"}
              alt={recipe.title}
              fill
              className="object-cover"
              priority
            />
            {categories.length > 0 && (
              <div className="absolute top-4 left-4 flex gap-2">
                {categories.map((category, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-amber-50/90 text-amber-700"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            )}

            {/* Add a gradient overlay at the bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Recipe highlights */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex justify-between items-center">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-amber-800 flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-amber-600" />
                  {recipe.cookingTime} mins
                </div>
                <div className="flex gap-2">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-amber-800 flex items-center">
                    <User className="h-4 w-4 mr-1 text-amber-600" />
                    {servingSize} servings
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-amber-800 flex items-center">
                    <Star
                      className="h-4 w-4 mr-1 text-amber-600"
                      fill="currentColor"
                    />
                    {recipe.rating.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>

            {/* Recipe freshness badge - conditional based on published date */}
            {new Date().getTime() -
              new Date(recipe.createdAt || Date.now()).getTime() <
              7 * 24 * 60 * 60 * 1000 && (
              <div className="absolute top-4 right-4">
                <div className="bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  NEW RECIPE
                </div>
              </div>
            )}

            {/* Visual cue for recipe difficulty */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <div className="bg-amber-100/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                <div className="tooltip" data-tip={`${difficulty} difficulty`}>
                  {difficulty.toLowerCase() === "beginner" && (
                    <ChefHat className="h-6 w-6 text-green-600" />
                  )}
                  {difficulty.toLowerCase() === "intermediate" && (
                    <ChefHat className="h-6 w-6 text-amber-600" />
                  )}
                  {difficulty.toLowerCase() === "advanced" && (
                    <ChefHat className="h-6 w-6 text-red-600" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 mb-8">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-amber-800">
                Recipe Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Recipe story/background */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Book className="h-5 w-5 text-amber-700" />
                    </div>
                    <h3 className="font-medium">Story Behind the Dish</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {recipe.description ||
                      `This ${recipe.title} recipe has been perfected over time, combining traditional techniques with modern flavors. Every bite tells a story of culinary heritage and innovation.`}
                  </p>
                </div>

                {/* Nutrition facts */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Apple className="h-5 w-5 text-amber-700" />
                    </div>
                    <h3 className="font-medium">Nutrition Facts</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Calories:</span>
                      <span className="font-medium">320 kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Protein:</span>
                      <span className="font-medium">12g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carbs:</span>
                      <span className="font-medium">45g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fat:</span>
                      <span className="font-medium">9g</span>
                    </div>
                  </div>
                </div>

                {/* Cooking tips */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Lightbulb className="h-5 w-5 text-amber-700" />
                    </div>
                    <h3 className="font-medium">Chef Tips</h3>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1.5">
                    <li className="flex items-start gap-1.5">
                      <div className="rounded-full bg-amber-200 h-1.5 w-1.5 mt-1.5"></div>
                      <span>
                        Prep all ingredients in advance for smoother cooking
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <div className="rounded-full bg-amber-200 h-1.5 w-1.5 mt-1.5"></div>
                      <span>
                        Let meat rest for 5 minutes before serving for juicier
                        results
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <div className="rounded-full bg-amber-200 h-1.5 w-1.5 mt-1.5"></div>
                      <span>
                        Taste and adjust seasoning before final serving
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="md:col-span-1 h-fit">
          <CardContent className="p-6 space-y-5">
            <div>
              <h1 className="text-3xl font-bold mb-2 leading-tight">
                {recipe.title}
              </h1>
              <p className="text-muted-foreground line-clamp-3">
                {recipe.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={recipe.author.image || undefined}
                  alt={recipe.author.name}
                />
                <AvatarFallback>{recipe.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  By{" "}
                  <Link
                    href={`/profile/${recipe.author.id}`}
                    className="text-amber-600 hover:underline"
                  >
                    {recipe.author.name}
                  </Link>
                </p>
                <p className="text-xs text-muted-foreground">
                  Published on {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <Clock className="h-5 w-5 mx-auto text-amber-600 mb-1" />
                <p className="text-xs text-muted-foreground">Cooking Time</p>
                <p className="font-medium">{recipe.cookingTime} min</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <ChefHat className="h-5 w-5 mx-auto text-amber-600 mb-1" />
                <p className="text-xs text-muted-foreground">Difficulty</p>
                <p className="font-medium">{difficulty}</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <User className="h-5 w-5 mx-auto text-amber-600 mb-1" />
                <p className="text-xs text-muted-foreground">Servings</p>
                <p className="font-medium">{servingSize} people</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <Star className="h-5 w-5 mx-auto text-amber-600 mb-1" />
                <p className="text-xs text-muted-foreground">Rating</p>
                <p className="font-medium">
                  {recipe.rating.toFixed(1)} ({recipe.ratingCount})
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 gap-1 bg-amber-600 hover:bg-amber-700">
                <ThumbsUp className="h-4 w-4" /> Save Recipe
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Printer className="h-4 w-4" />
              </Button>
            </div>

            {currentUser ? (
              <div>
                <h3 className="text-sm font-medium mb-2">Rate this recipe:</h3>
                <RatingStars
                  recipeId={recipe.id}
                  userRating={recipe.userRating}
                />
              </div>
            ) : (
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  Sign in to save and rate this recipe
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/auth/login">Sign in</Link>
                </Button>
              </div>
            )}

            {isAuthor && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Recipe Management</h3>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={`/recipes/${recipe.id}/edit`}>Edit</Link>
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      Delete
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main content */}
      <Tabs defaultValue="ingredients" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 w-full md:w-1/2">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="video">Video Tutorial</TabsTrigger>
        </TabsList>

        <TabsContent value="ingredients" className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ChefHat className="mr-2 h-5 w-5 text-amber-600" />
              Ingredients
              <Badge
                variant="secondary"
                className="ml-2 bg-amber-50 text-amber-700"
              >
                {recipe.ingredients.length} Items
              </Badge>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollArea className="h-[400px] pr-4">
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 p-2 hover:bg-amber-50 rounded-md transition-colors"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-600">
                        <span className="h-3 w-3 rounded-full bg-white border border-amber-600"></span>
                      </div>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <div className="hidden md:block">
                <div className="bg-amber-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Pro Tip</h3>
                  <p className="text-sm text-muted-foreground">
                    For best results, make sure all ingredients are at room
                    temperature before starting. This ensures even cooking and
                    better texture in your final dish. but Not for any cold
                    beverages or frozen ingredients.
                  </p>
                </div>
                <ProTipAnimation />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="instructions" className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-6">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex">
                  <div className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-semibold">
                    {index + 1}
                  </div>
                  <div className="p-2">
                    <p className="text-gray-700">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </TabsContent>

        <TabsContent value="video">
          {youtubeVideoId ? (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Video Tutorial</h2>
              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded-lg shadow-md"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title={`${recipe.title} video tutorial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">No Video Available</h2>
              <p className="text-muted-foreground">
                This recipe does t have a video tutorial yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Related recipes section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {relatedRecipes.map((relatedRecipe) => (
            <RecipeCard key={relatedRecipe.id} recipe={relatedRecipe} />
          ))}
          {relatedRecipes.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-8">
              No related recipes found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
