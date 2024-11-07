"use client";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HandMetal, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useClerk } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useDetails } from "@/hooks/details";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Nav() {
  const [isSignedin, SetisSignedin] = useState(false);
  const { signOut } = useClerk();
  const { userData, error } = useDetails();
  const details = userData;

  useEffect(() => {
    console.log("hol up", details);
  }, [details]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about", label: "About" },
    { href: "/dictionary", label: "Dictionary" },
    { href: "/translator", label: "Translator" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav className="w-full py-4 bg-background">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center z-50" aria-label="Home">
          <HandMetal className="h-8 w-8 text-primary" />
        </Link>
        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
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
                        <User className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <span className="sr-only">User profile</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 space-y-4 w-64">
                <SignedIn>
                  <p className=" align-middle text-center">
                    Welcome back {details?.username}
                  </p>
                  <Button
                    onClick={() => signOut()}
                    variant="outline"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </SignedIn>
                <SignedOut>
                  <div className="flex flex-col space-y-2">
                    <Button asChild className="w-full">
                      <Link href="/sign-in">Sign In</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </div>
                </SignedOut>
              </PopoverContent>
            </Popover>
          </li>
        </ul>
        <div className="md:hidden flex items-center z-50">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">
              {isMenuOpen ? "Close menu" : "Open menu"}
            </span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background z-40 md:hidden"
          >
            <div className="container flex flex-col items-center justify-center h-full space-y-8">
              <Button variant="ghost" size="icon" className="rounded-full mb-8">
                {/* <User className="h-10 w-10" /> */}
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
                      <User className="h-10 w-10" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <span className="sr-only">User profile</span>
              </Button>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xl font-medium text-foreground"
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              ))}
              <SignedIn>
                <p className=" align-middle text-center">
                  Welcome back {details?.username}
                </p>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="w-full"
                >
                  Sign Out
                </Button>
              </SignedIn>
              <SignedOut>
                <div className="flex flex-col space-y-2">
                  <Button asChild className="w-full">
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              </SignedOut>
              <Card className="w-full max-w-sm mt-8">
                <CardHeader className="p-4">
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
