export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image?: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  rating: number;
  ratingCount: number;
  userRating?: number;
  author: {
    id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
  updatedAt: string;
  category: string;
  views: number;
  youtubeLink?: string;
}
export interface RecipeFormData {
  title: string;
  description: string;
  cookingTime: number;
  ingredients: string[];
  instructions: string[];
  image: File;
  category: string;
  youtubeUrl: string;
}
