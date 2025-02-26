"use server";

import { getCurrentUser, requireAuth } from "@/lib/auth";
import type { Recipe, RecipeFormData } from "@/types/recipe";

// Mock recipe data - in a real app, this would be stored in a database
const RECIPES: Recipe[] = [
  {
    id: "1",
    title: "Classic Spaghetti Carbonara",
    description:
      "A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2021%2F02%2F14%2Fdining%2Fcarbonara-horizontal%2Fcarbonara-horizontal-threeByTwoMediumAt2X-v2.jpg&f=1&nofb=1&ipt=c73e210732981ac7cb23497e825b4327bce487510ac16896d8b89c0978e299b2&ipo=images",
    ingredients: [
      "350g spaghetti",
      "150g pancetta or guanciale, diced",
      "3 large eggs",
      "50g pecorino cheese, grated",
      "50g parmesan, grated",
      "Freshly ground black pepper",
      "Salt to taste",
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package instructions.",
      "While pasta cooks, heat a large skillet over medium heat and cook pancetta until crispy, about 5-7 minutes.",
      "In a bowl, whisk together eggs, grated cheeses, and black pepper.",
      "Drain pasta, reserving 1/2 cup of pasta water.",
      "Working quickly, add hot pasta to the skillet with pancetta, then remove from heat.",
      "Pour egg mixture over pasta and toss quickly to coat, adding pasta water as needed to create a creamy sauce.",
      "Serve immediately with extra grated cheese and black pepper.",
    ],
    cookingTime: 25,
    rating: 4.8,
    ratingCount: 124,
    author: {
      id: "1",
      name: "John Doe",
      image: "https://avatar.iran.liara.run/public/1",
    },
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-15T10:30:00Z",
    category: "quick",
    views: 1234,
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Homemade Marghrita Pizza",
    description:
      "A simple yet delicious pizza with fresh tomatoes, mozzarella, and basil.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.instructables.com%2FORIG%2FFTZ%2FFYUI%2FGDLH4IM7%2FFTZFYUIGDLH4IM7.jpg%3Fframe%3D1&f=1&nofb=1&ipt=212e0562a584b1ed52445f7291037b600ac9edc7124f15d3094992f5cfb5670d&ipo=images",
    ingredients: [
      "500g pizza dough",
      "200g canned San Marzano tomatoes, crushed",
      "200g fresh mozzarella, sliced",
      "Fresh basil leaves",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Preheat oven to 475°F (245°C) with a pizza stone if available.",
      "Roll out pizza dough on a floured surface to desired thickness.",
      "Spread crushed tomatoes evenly over the dough, leaving a small border for the crust.",
      "Arrange mozzarella slices over the tomatoes.",
      "Bake for 10-12 minutes until crust is golden and cheese is bubbly.",
      "Remove from oven, top with fresh basil leaves, drizzle with olive oil, and season with salt and pepper.",
      "Slice and serve immediately.",
    ],
    cookingTime: 20,
    rating: 4.6,
    ratingCount: 98,
    author: {
      id: "2",
      name: "Jane Smith",
      image: "https://avatar.iran.liara.run/public/2",
    },
    createdAt: "2023-06-20T14:15:00Z",
    updatedAt: "2023-06-20T14:15:00Z",
    category: "Italian",
    views: 987,
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "Chocolate Chip Cookies",
    description:
      "Soft and chewy chocolate chip cookies that are perfect for any occasion.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fthequotablekitchen.com%2Fwp-content%2Fuploads%2F2012%2F05%2FIMG_0732.jpg&f=1&nofb=1&ipt=781e72938b9919fd389a9b88104edd3e32f2f43d1b7d706901698412ce139a29&ipo=images",
    ingredients: [
      "225g unsalted butter, softened",
      "200g brown sugar",
      "100g granulated sugar",
      "2 large eggs",
      "1 tsp vanilla extract",
      "300g all-purpose flour",
      "1 tsp baking soda",
      "1/2 tsp salt",
      "300g chocolate chips",
    ],
    instructions: [
      "Preheat oven to 350°F (175°C) and line baking sheets with parchment paper.",
      "In a large bowl, cream together butter and both sugars until light and fluffy.",
      "Beat in eggs one at a time, then stir in vanilla.",
      "In a separate bowl, combine flour, baking soda, and salt.",
      "Gradually add dry ingredients to the wet mixture and mix until just combined.",
      "Fold in chocolate chips.",
      "Drop rounded tablespoons of dough onto prepared baking sheets.",
      "Bake for 10-12 minutes until edges are golden but centers are still soft.",
      "Allow cookies to cool on baking sheet for 5 minutes before transferring to a wire rack.",
    ],
    cookingTime: 25,
    rating: 4.9,
    ratingCount: 156,
    author: {
      id: "1",
      name: "John Doe",
      image: "https://avatar.iran.liara.run/public/27",
    },
    createdAt: "2023-04-10T09:45:00Z",
    updatedAt: "2023-04-10T09:45:00Z",
    category: "Dessert",
    views: 567,
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Chicken Noodle Soup",
    description:
      "A classic chicken noodle soup recipe with carrots, celery, and egg noodles.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Fpalatablepastime.com%2Fwp-content%2Fuploads%2F2019%2F01%2Fhomemade-chicken-noodle-soup-sq.jpg%3Fssl%3D1&f=1&nofb=1&ipt=13eee9885171b467c5f63cde560d64d840df9c824e3cedd15c07b30a39fb0011&ipo=images",
    ingredients: [
      "1 tbsp olive oil",
      "1 medium onion, chopped",
      "2 cloves garlic, minced",
      "2 medium carrots, sliced",
      "2 stalks celery, sliced",
      "1 tsp dried thyme",
      "6 cups chicken broth",
      "2 cups shredded cooked chicken",
      "200g egg noodles",
    ],
    instructions: [
      "In a large pot, heat olive oil over medium heat.",
      "Add onion, garlic, carrots, and celery, cooking until softened.",
      "Stir in thyme and cook until fragrant.",
      "Pour in chicken broth and bring to a boil.",
      "Add shredded chicken and egg noodles, cooking until noodles are tender.",
      "Season with salt and pepper to taste.",
      "Serve hot with fresh parsley.",
    ],
    cookingTime: 30,
    rating: 4.5,
    ratingCount: 82,
    author: {
      id: "2",
      name: "Jane Smith",
      image: "https://avatar.iran.liara.run/public/4",
    },
    createdAt: "2023-03-05T12:00:00Z",
    updatedAt: "2023-03-05T12:00:00Z",
    category: "Soup",
    views: 890,
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "5",
    title: "Creamy Chicken Alfredo",
    description:
      "A rich and creamy pasta dish with tender chicken, parmesan cheese, and a luscious Alfredo sauce.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-yEiAW-nNrh0%2FXi3Vwhe5VrI%2FAAAAAAAAKj8%2FzWnxsfhQDDgn8l607JZOws52t0OYHNLYwCEwYBhgL%2Fs1600%2Fbest%252Band%252Beasy%252Bchicken%252Balfredo%252Bin%252Ba%252Bpan.jpg&f=1&nofb=1&ipt=05e17fc6634f6458a36c6f321eec772eb8d05e5832ba434dd07a4068de20a976&ipo=images",
    ingredients: [
      "400g fettuccine",
      "2 chicken breasts, sliced",
      "3 tbsp butter",
      "2 cloves garlic, minced",
      "1 cup heavy cream",
      "1 cup parmesan cheese, grated",
      "Salt and pepper to taste",
      "Fresh parsley for garnish",
    ],
    instructions: [
      "Cook fettuccine according to package instructions and set aside.",
      "Season chicken with salt and pepper, then cook in a skillet over medium heat until golden brown. Remove and set aside.",
      "In the same skillet, melt butter and sauté garlic until fragrant.",
      "Pour in heavy cream and simmer for 2 minutes, then add parmesan cheese and stir until melted.",
      "Return chicken to the skillet, add cooked pasta, and toss until well coated.",
      "Serve immediately with fresh parsley and extra parmesan.",
    ],
    cookingTime: 30,
    rating: 4.7,
    ratingCount: 98,
    author: {
      id: "2",
      name: "Jane Smith",
      image: "https://avatar.iran.liara.run/public/5",
    },
    createdAt: "2023-06-20T12:15:00Z",
    updatedAt: "2023-06-20T12:15:00Z",
    category: "Italian",
    views: 1450,
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "6",
    title: "Classic Margherita Pizza",
    description:
      "A simple yet delicious pizza topped with fresh tomatoes, mozzarella, and basil.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.temptingtreat.com%2Fwp-content%2Fuploads%2F2020%2F11%2FF-3.jpg&f=1&nofb=1&ipt=4712bf758e396a9465577ecf73b7b7f5d83824f39102fb70a0b36e1966495659&ipo=images",
    ingredients: [
      "250g pizza dough",
      "200g canned San Marzano tomatoes",
      "150g fresh mozzarella cheese",
      "Fresh basil leaves",
      "1 tbsp olive oil",
      "Salt to taste",
    ],
    instructions: [
      "Preheat oven to 220°C (425°F).",
      "Roll out the pizza dough on a floured surface.",
      "Spread crushed San Marzano tomatoes evenly over the dough.",
      "Tear fresh mozzarella and distribute over the pizza.",
      "Bake for 10-12 minutes until crust is golden and cheese is bubbly.",
      "Remove from oven, top with fresh basil, drizzle with olive oil, and serve.",
    ],
    cookingTime: 20,
    rating: 4.9,
    ratingCount: 215,
    author: {
      id: "3",
      name: "Mario Rossi",
      image: "https://avatar.iran.liara.run/public/6",
    },
    createdAt: "2023-07-05T08:45:00Z",
    updatedAt: "2023-07-05T08:45:00Z",
    category: "Italian",
    views: 2200,
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "7",
    title: "Spicy Beef Tacos",
    description:
      "A Mexican street-style taco filled with seasoned beef, fresh toppings, and spicy salsa.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnatashaskitchen.com%2Fwp-content%2Fuploads%2F2016%2F06%2FBeef-Tacos-with-Mango-Salsa-7.jpg&f=1&nofb=1&ipt=f72ed333a0b7a37179154d59a69ceb082be015259ab4d9fd37ffac4756518e04&ipo=images",
    ingredients: [
      "500g ground beef",
      "1 small onion, diced",
      "2 cloves garlic, minced",
      "1 tbsp chili powder",
      "1 tsp cumin",
      "1/2 tsp paprika",
      "Salt and pepper to taste",
      "8 small corn tortillas",
      "1 cup shredded lettuce",
      "1/2 cup diced tomatoes",
      "1/2 cup shredded cheddar cheese",
      "Salsa and sour cream for serving",
    ],
    instructions: [
      "Heat a skillet over medium heat and cook ground beef until browned.",
      "Add onion, garlic, chili powder, cumin, paprika, salt, and pepper. Stir and cook for another 5 minutes.",
      "Warm tortillas in a dry pan or oven.",
      "Assemble tacos by filling each tortilla with beef, lettuce, tomatoes, and cheese.",
      "Top with salsa and sour cream before serving.",
    ],
    cookingTime: 25,
    rating: 4.6,
    ratingCount: 182,
    author: {
      id: "4",
      name: "Carlos Ramirez",
      image: "https://avatar.iran.liara.run/public/7",
    },
    createdAt: "2023-08-10T14:20:00Z",
    updatedAt: "2023-08-10T14:20:00Z",
    category: "Mexican",
    views: 1850,
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "8",
    title: "Honey Garlic Salmon",
    description:
      "A sweet and savory glazed salmon fillet, pan-seared to perfection and served with a flavorful honey garlic sauce.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjuliasalbum.com%2Fwp-content%2Fuploads%2F2022%2F08%2FHoney-Garlic-Glazed-Salmon-recipe-5.jpg&f=1&nofb=1&ipt=977f9cc58b8f2a08dab851cd5f52c8ad557169c45340afda71a98445fd8e0d3f&ipo=images",
    ingredients: [
      "4 salmon fillets",
      "3 tbsp honey",
      "2 tbsp soy sauce",
      "3 cloves garlic, minced",
      "1 tbsp lemon juice",
      "1 tbsp olive oil",
      "Salt and pepper to taste",
      "Chopped parsley for garnish",
    ],
    instructions: [
      "Season salmon fillets with salt and pepper.",
      "Heat olive oil in a skillet over medium heat and sear salmon for 3-4 minutes per side until golden brown.",
      "In a small bowl, mix honey, soy sauce, garlic, and lemon juice.",
      "Pour sauce into the skillet and simmer for 2 minutes until slightly thickened.",
      "Spoon sauce over salmon, garnish with parsley, and serve immediately.",
    ],
    cookingTime: 20,
    rating: 4.8,
    ratingCount: 160,
    author: {
      id: "5",
      name: "Emily Johnson",
      image: "https://avatar.iran.liara.run/public/8",
    },
    createdAt: "2023-09-12T11:00:00Z",
    updatedAt: "2023-09-12T11:00:00Z",
    category: "Seafood",
    views: 1900,
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "9",
    title: "Classic Caesar Salad",
    description:
      "A crisp and refreshing salad with romaine lettuce, parmesan cheese, croutons, and a creamy Caesar dressing.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thespruceeats.com%2Fthmb%2FPK-gzCMO2_chv0BfVqmzfBtou3M%3D%2F2500x1656%2Ffilters%3Afill(auto%2C1)%2Fcaesar-salad-2500-56a210635f9b58b7d0c62d64.jpg&f=1&nofb=1&ipt=a1def384acdfd3a58fd59ed323dd3aac1db6dd155c8bf54a5b431712b2ee9468&ipo=images",
    ingredients: [
      "1 head romaine lettuce, chopped",
      "1/2 cup parmesan cheese, grated",
      "1 cup croutons",
      "1/2 cup Caesar dressing",
      "1/2 tsp black pepper",
      "1 tbsp lemon juice",
    ],
    instructions: [
      "In a large bowl, combine romaine lettuce, parmesan cheese, and croutons.",
      "Drizzle Caesar dressing over the salad and toss to coat evenly.",
      "Sprinkle black pepper and lemon juice on top.",
      "Serve immediately with extra parmesan if desired.",
    ],
    cookingTime: 10,
    rating: 4.7,
    ratingCount: 140,
    author: {
      id: "6",
      name: "Sophia Martinez",
      image: "https://avatar.iran.liara.run/public/9",
    },
    createdAt: "2023-10-05T09:30:00Z",
    updatedAt: "2023-10-05T09:30:00Z",
    category: "Salad",
    views: 1200,
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "10",
    title: "Homemade Beef Burger",
    description:
      "A juicy and flavorful homemade beef burger with fresh toppings and a toasted bun.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstaticfanpage.akamaized.net%2Fwp-content%2Fuploads%2Fsites%2F22%2F2021%2F09%2Fbeef-burger-1200x675.jpg&f=1&nofb=1&ipt=adc1b64530d789ee0c848a2f9fd27c59b820dc7972c9e5b46ce40593b62dee1f&ipo=images",
    ingredients: [
      "500g ground beef",
      "1 tsp salt",
      "1/2 tsp black pepper",
      "1/2 tsp garlic powder",
      "4 burger buns",
      "4 slices cheddar cheese",
      "Lettuce, tomato, and onion for topping",
      "1/4 cup mayonnaise",
      "1 tbsp ketchup",
      "1 tsp mustard",
    ],
    instructions: [
      "In a bowl, mix ground beef, salt, black pepper, and garlic powder.",
      "Form into 4 equal patties.",
      "Heat a grill or skillet over medium heat and cook patties for 4-5 minutes per side.",
      "Place a slice of cheese on each patty and let it melt.",
      "Toast burger buns and spread with mayonnaise, ketchup, and mustard.",
      "Assemble burgers with lettuce, tomato, onion, and beef patties.",
      "Serve immediately.",
    ],
    cookingTime: 25,
    rating: 4.6,
    ratingCount: 175,
    author: {
      id: "7",
      name: "David Brown",
      image: `https://avatar.iran.liara.run/public/10`,
    },
    createdAt: "2023-11-18T14:50:00Z",
    updatedAt: "2023-11-18T14:50:00Z",
    category: "American",
    views: 2100,
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "11",
    title: "Spicy Mango Chicken Wrap",
    description:
      "A delicious wrap filled with spicy grilled chicken, fresh mango salsa, and a creamy yogurt sauce.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thetastychilli.com%2Fwp-content%2Fuploads%2F2022%2F05%2Fmango-chicken-wrap-cilantro-1024x692.jpg&f=1&nofb=1&ipt=614e7f3d2736e64348065ec64b3f628c2fdfba19e7b50d738127542d782175e4&ipo=images",
    ingredients: [
      "2 chicken breasts",
      "1 tsp paprika",
      "1/2 tsp cayenne pepper",
      "1/2 tsp garlic powder",
      "Salt and pepper to taste",
      "1 tbsp olive oil",
      "1 ripe mango, diced",
      "1/2 red onion, chopped",
      "1/2 red bell pepper, chopped",
      "1/4 cup fresh cilantro, chopped",
      "1 lime, juiced",
      "1/2 cup Greek yogurt",
      "1 tsp honey",
      "4 whole wheat tortillas",
    ],
    instructions: [
      "Season chicken breasts with paprika, cayenne, garlic powder, salt, and pepper.",
      "Heat olive oil in a pan over medium heat and cook chicken for 5-6 minutes per side until fully cooked.",
      "Let the chicken rest for a few minutes, then slice into strips.",
      "In a bowl, mix mango, red onion, bell pepper, cilantro, and lime juice to make mango salsa.",
      "In a small bowl, combine Greek yogurt and honey to make the sauce.",
      "Warm tortillas and spread with yogurt sauce.",
      "Add chicken strips and top with mango salsa.",
      "Roll the tortillas tightly into wraps and serve.",
    ],
    cookingTime: 30,
    rating: 4.8,
    ratingCount: 120,
    author: {
      id: "9",
      name: "Sophia Green",
      image: "https://avatar.iran.liara.run/public/11",
    },
    createdAt: "2023-12-10T10:30:00Z",
    updatedAt: "2023-12-10T10:30:00Z",
    category: "Exotic",
    views: 1800,
    youtubeLink: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
  },
];

export async function getFeaturedRecipes(): Promise<Recipe[]> {
  // Return the 6 recipes with the most views
  return [...RECIPES].sort((a, b) => b.views - a.views).slice(0, 6);
}
export async function getAllRecipes(): Promise<Recipe[]> {
  // In a real app, you would fetch all recipes from a database
  // For this demo, we'll just return our mock data
  return RECIPES;
}
export async function getRecipeById(id: string): Promise<Recipe | null> {
  // In a real app, you would fetch from a database
  const recipe = RECIPES.find((r) => r.id === id);

  if (!recipe) {
    return null;
  }

  // Check if the current user has rated this recipe
  const currentUser = await getCurrentUser();

  if (currentUser) {
    // This would be fetched from a ratings table in a real app
    // For demo purposes, we'll just simulate a random rating
    recipe.userRating = Math.floor(Math.random() * 5) + 1;
  }

  return recipe;
}

export async function createRecipe(data: RecipeFormData): Promise<string> {
  // Require authentication
  const user = await requireAuth();

  // In a real app, you would save to a database
  // For this demo, we'll just simulate creating a new recipe
  const newRecipe: Recipe = {
    id: String(RECIPES.length + 1),
    title: data.title,
    description: data.description,
    ingredients: data.ingredients,
    instructions: data.instructions,
    cookingTime: data.cookingTime,
    rating: 0,
    ratingCount: 0,
    author: {
      id: user.id,
      name: user.name,
      image: user.image,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: data.category,
    views: 0,
  };

  // Add to our mock database
  RECIPES.push(newRecipe);

  return newRecipe.id;
}

export async function rateRecipe(
  recipeId: string,
  rating: number,
): Promise<void> {
  // Require authentication
  await requireAuth();

  // In a real app, you would update the rating in a database
  // For this demo, we'll just update our mock data
  const recipe = RECIPES.find((r) => r.id === recipeId);

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  // Calculate new rating
  const newRatingCount = recipe.ratingCount + 1;
  const newRating =
    (recipe.rating * recipe.ratingCount + rating) / newRatingCount;

  // Update recipe
  recipe.rating = newRating;
  recipe.ratingCount = newRatingCount;
  recipe.userRating = rating;
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  // In a real app, you would search in a database
  // For this demo, we'll just filter our mock data
  if (!query) {
    return RECIPES;
  }

  const lowercaseQuery = query.toLowerCase();

  return RECIPES.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(lowercaseQuery) ||
      recipe.description.toLowerCase().includes(lowercaseQuery) ||
      recipe.ingredients.some((i) => i.toLowerCase().includes(lowercaseQuery)),
  );
}
