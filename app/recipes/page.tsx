"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Filter,
  Search,
  ChefHat,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Recipe } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/recipe-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { getAllRecipes } from "@/lib/recipes";

// Number of recipes per page
const RECIPES_PER_PAGE = 10;

export default function RecipesPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  // Convert URL parameter formats like "quick-easy" to match your categories format
  const normalizeCategory = (category: string) => {
    if (category === "quick-easy") return "quick";
    return category;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl ? normalizeCategory(categoryFromUrl) : "all",
  );
  const [cookingTime, setCookingTime] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);

  // Update the selected category when the URL parameter changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(normalizeCategory(categoryFromUrl));
    }
  }, [categoryFromUrl]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, cookingTime, sortBy]);

  const filteredRecipes = recipes
    .filter((recipe) => {
      if (
        searchQuery &&
        !recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (selectedCategory !== "all" && recipe.category !== selectedCategory) {
        return false;
      }

      if (cookingTime !== "all") {
        switch (cookingTime) {
          case "quick":
            return recipe.cookingTime < 30;
          case "medium":
            return recipe.cookingTime >= 30 && recipe.cookingTime <= 60;
          case "long":
            return recipe.cookingTime > 60;
          default:
            return true;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.views || 0) - (a.views || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
        default:
          return (
            new Date(b.createdAt || Date.now()).getTime() -
            new Date(a.createdAt || Date.now()).getTime()
          );
      }
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * RECIPES_PER_PAGE,
    currentPage * RECIPES_PER_PAGE,
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-12 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-amber-800 tracking-tight">
              Discover Recipes
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Explore our collection of delicious recipes curated by food
              enthusiasts from around the world
            </p>
          </div>
          <Link href="/recipes/create">
            <Button className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2 shadow-md transition-all duration-300 hover:translate-y-[-2px]">
              <ChefHat className="h-5 w-5" />
              Create Recipe
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-6">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-amber-200"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="h-4 w-4 text-amber-600" />
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Section */}
        <div
          className={`${
            isFilterOpen ? "block" : "hidden"
          } md:block md:w-1/4 space-y-4 sticky top-4 self-start`}
        >
          <div className="bg-amber-50 p-6 rounded-xl shadow-sm border border-amber-100">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="h-5 w-5 text-amber-600" />
              <h2 className="font-semibold text-lg">Filters</h2>
            </div>

            <div className="space-y-6">
              {/* Search Input */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search recipes..."
                    className="pl-9 border-amber-200 focus-visible:ring-amber-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Category
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full bg-white border-amber-200 focus:ring-amber-500">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="quick">Quick & Easy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cooking Time Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Cooking Time
                </label>
                <Select value={cookingTime} onValueChange={setCookingTime}>
                  <SelectTrigger className="w-full bg-white border-amber-200 focus:ring-amber-500">
                    <SelectValue placeholder="Any Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Duration</SelectItem>
                    <SelectItem value="quick">Under 30 minutes</SelectItem>
                    <SelectItem value="medium">30-60 minutes</SelectItem>
                    <SelectItem value="long">Over 60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full bg-white border-amber-200 focus:ring-amber-500">
                    <SelectValue placeholder="Sort recipes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <Badge
                      variant="secondary"
                      className="bg-amber-100 text-amber-800 hover:bg-amber-200"
                    >
                      Search: {searchQuery}
                      <button
                        className="ml-1"
                        onClick={() => setSearchQuery("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedCategory !== "all" && (
                    <Badge
                      variant="secondary"
                      className="bg-amber-100 text-amber-800 hover:bg-amber-200"
                    >
                      {selectedCategory}
                      <button
                        className="ml-1"
                        onClick={() => setSelectedCategory("all")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {cookingTime !== "all" && (
                    <Badge
                      variant="secondary"
                      className="bg-amber-100 text-amber-800 hover:bg-amber-200"
                    >
                      {cookingTime === "quick"
                        ? "< 30 mins"
                        : cookingTime === "medium"
                          ? "30-60 mins"
                          : "> 60 mins"}
                      <button
                        className="ml-1"
                        onClick={() => setCookingTime("all")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full mt-4 border-amber-300 text-amber-800 hover:bg-amber-100"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setCookingTime("all");
                  setSortBy("newest");
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="md:w-3/4">
          {/* Sort & Count Bar */}
          <div className="hidden md:flex justify-between items-center mb-6 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium">Sorting by: </span>
              <Badge
                variant="outline"
                className="border-amber-200 text-amber-800"
              >
                {sortBy === "newest"
                  ? "Newest"
                  : sortBy === "popular"
                    ? "Most Popular"
                    : "Highest Rated"}
              </Badge>
            </div>
            <span className="text-sm text-gray-600">
              Showing {Math.min(paginatedRecipes.length, RECIPES_PER_PAGE)} of{" "}
              {filteredRecipes.length} recipes
            </span>
          </div>

          {loading ? (
            <RecipesGridSkeleton />
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredRecipes.length > 0 ? (
                  paginatedRecipes.map((recipe) => (
                    <motion.div
                      key={recipe.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RecipeCard recipe={recipe} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    className="col-span-full text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-amber-50 rounded-xl p-8 border border-amber-100">
                      <p className="text-amber-800 font-medium mb-4">
                        No recipes found matching your criteria
                      </p>
                      <p className="text-gray-600 text-sm max-w-md mx-auto">
                        Try adjusting your filters or search query to find more
                        recipes
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Pagination Controls */}
          {filteredRecipes.length > RECIPES_PER_PAGE && !loading && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-amber-200 text-amber-700 hover:bg-amber-50"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex gap-1">
                  {/* Show page numbers with ellipsis for many pages */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Always show first and last page
                      if (page === 1 || page === totalPages) return true;
                      // Always show current page and one before/after
                      if (Math.abs(page - currentPage) <= 1) return true;
                      // Don't show other pages
                      return false;
                    })
                    .map((page, index, array) => {
                      // If there's a gap in the shown pages, add an ellipsis
                      if (index > 0 && page - array[index - 1] > 1) {
                        return (
                          <div
                            key={`ellipsis-${page}`}
                            className="flex items-center"
                          >
                            <span className="mx-1 text-gray-500">...</span>
                            <Button
                              key={page}
                              variant={
                                currentPage === page ? "default" : "outline"
                              }
                              className={
                                currentPage === page
                                  ? "bg-amber-600 hover:bg-amber-700 h-8 w-8 p-0"
                                  : "border-amber-200 text-amber-700 hover:bg-amber-50 h-8 w-8 p-0"
                              }
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Button>
                          </div>
                        );
                      }

                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          className={
                            currentPage === page
                              ? "bg-amber-600 hover:bg-amber-700 h-8 w-8 p-0"
                              : "border-amber-200 text-amber-700 hover:bg-amber-50 h-8 w-8 p-0"
                          }
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      );
                    })}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="border-amber-200 text-amber-700 hover:bg-amber-50"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          )}

          {/* Page information */}
          {filteredRecipes.length > 0 && !loading && (
            <div className="text-center text-sm text-gray-500 mt-4">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RecipesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="space-y-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
        >
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
