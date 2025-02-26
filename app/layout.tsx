import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecipeShare - Discover & Share Amazing Recipes",
  description:
    "Find inspiration for your next meal, share your culinary creations, and connect with food lovers worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <footer className="border-t py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TasteTribe. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
