"use client";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleUser, HandMetal, Menu, Package2, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import { useDetails } from "@/hooks/details";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function NavbarDemo() {
  const [isSignedin, SetisSignedin] = useState(false);
  const { signOut } = useClerk();
  const { userData, error } = useDetails();
  const details = userData;

  useEffect(() => {
    console.log("hol up", details);
  }, [details]);

  return (
    <header className="  z-[1005] sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <HandMetal className="h-6 w-6" />
          <span className="sr-only">Signara</span>
        </Link>
        <Link
          href="/dashboard"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/about"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          About
        </Link>
        <Link
          href="/translator"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Translator
        </Link>
        <Link
          href="/donate"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Donate
        </Link>
        <Link
          href="/settings"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Settings
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <HandMetal className="h-6 w-6" />
              <span className="sr-only">Signara</span>
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/translator"
              className="text-muted-foreground hover:text-foreground"
            >
              Lessons
            </Link>
            <Link
              href="/donate"
              className="text-muted-foreground hover:text-foreground"
            >
              Donate
            </Link>
            <Link href="/settings" className="hover:text-foreground">
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search Topics..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <div>
                {details?.hasphoto ? (
                  <Avatar>
                    <AvatarImage
                      src={details?.photoURL}
                      alt={details?.username}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar>
                    <AvatarFallback>
                      {" "}
                      <CircleUser />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>

          {() => {
            if (SignedIn != null) {
              SetisSignedin(true);
            } else {
              SetisSignedin(false);
            }
          }}
          {
            <>
              <SignedIn>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <Link href="/dashboard">
                      {" "}
                      Welcome,{" "}
                      {details?.username != null ? details.username : "User"}
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/support">Support</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <button
                    className="w-full"
                    onClick={() => signOut({ redirectUrl: "/" })}
                  >
                    {" "}
                    <DropdownMenuItem>Logout </DropdownMenuItem>
                  </button>
                </DropdownMenuContent>
              </SignedIn>

              <SignedOut>
                <button onLoad={firebase.auth().signOut()}></button>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Start Learning Today</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/sign-in">Sign in</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/sign-up">Sign up</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/support">Support </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </SignedOut>
            </>
          }
        </DropdownMenu>
      </div>
    </header>
  );
}
