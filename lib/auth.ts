"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { User } from "@/types/recipe";

// Mock user data - in a real app, this would be stored in a database
const USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    image: "https://avatar.iran.liara.run/public/17",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    image: "https://avatar.iran.liara.run/public/56",
  },
];

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function login({ email, password }: LoginData) {
  // In a real app, you would validate credentials against a database
  const user = USERS.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Set a cookie to simulate authentication
  (
    await // Set a cookie to simulate authentication
    cookies()
  ).set("userId", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  return { success: true };
}

export async function register({ name, email, password }: RegisterData) {
  // In a real app, you would create a new user in the database
  // For this demo, we'll just simulate success

  // Check if user already exists
  if (USERS.some((u) => u.email === email)) {
    throw new Error("User already exists");
  }

  // Create a new user ID
  const id = String(USERS.length + 1);

  // Add user to our mock database
  USERS.push({
    id,
    name,
    email,
    password,
    image: "/placeholder.svg?height=40&width=40",
  });

  // Set a cookie to simulate authentication
  (
    await // Set a cookie to simulate authentication
    cookies()
  ).set("userId", id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  return { success: true };
}

export async function logout() {
  await (await cookies()).delete("userId");
  redirect("/");
}

// export async function getCurrentUser(): Promise<User | null> {
//   const userId = cookies().get("userId")?.value

//   if (!userId) {
//     return null
//   }

//   const user = USERS.find((u) => u.id === userId)

//   if (!user) {
//     return null
//   }

//   return {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     image: user.image,
//   }
// }

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return null;
  }

  // Mock user data - replace with your actual user fetching logic
  const user: User = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
    image: "/placeholder-avatar.png",
  };

  return user;
}
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return user;
}
