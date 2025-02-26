import Link from "next/link";
import Image from "next/image";
import { Search, User, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser, logout } from "@/lib/auth";

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Logo"
            width={40}
            height={40}
          />
          <span className="font-bold text-xl">TasteTribe</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-amber-600">
            Home
          </Link>
          <Link
            href="/recipes"
            className="text-sm font-medium hover:text-amber-600"
          >
            Recipes
          </Link>
          <Link
            href="/search"
            className="text-sm font-medium hover:text-amber-600"
          >
            Search
          </Link>
          {user && (
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-amber-600"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.image || "/placeholder.svg?height=32&width=32"}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={logout}>
                    <button className="flex items-center gap-2 w-full">
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link href="/auth/login">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
