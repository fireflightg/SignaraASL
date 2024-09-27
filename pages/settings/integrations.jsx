import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Link from "next/link";
import { AlertCircle, CircleUser, Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { NavbarDemo } from "@/components/sidebaruser";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast, { Toaster } from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/router";
import { useUser } from "@clerk/clerk-react";
import { Badge } from "@/components/ui/badge";

export function IntegrationsSettings() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [username, setUsername] = useState(""); // Initial state for username

  // Function to handle form submission
  //   const saveUsername = async (e) => {
  //     e.preventDefault(); // Prevent the default form submission behavior

  //     const db = firebase.firestore(); // Get Firestore instance

  //     console.log(username);

  //     if (user) {
  //       try {
  //         // Update the username in Firestore under the user's document
  //         await db.collection("users").doc(user.id).set(
  //           {
  //             username: username,
  //           },
  //           { merge: true }
  //         );

  //         console.log("Username updated successfully");

  //         toast.success("Username updated successfully!");
  //       } catch (error) {
  //         console.error("Error updating username:", error);
  //         toast.error("Error updating username: " + error);
  //         // Handle errors here, such as by showing an error message to the user
  //       }
  //     }
  //   };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Username</CardTitle>
          <CardDescription>
            Add unique lessons
            <span>
              <Badge>Beta</Badge>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={saveUsername}>
            <Input placeholder="JSON Data" />

            <CardFooter className="border-t px-6 py-4">
              <Button type="submit">Save</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>
            Connect with Discord
            <span>
              <Badge>Beta</Badge>
            </span>{" "}
          </CardTitle>
          <CardDescription>Enter your discord username below</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Input placeholder="@discord id" defaultValue="/content/plugins" />
            <div className="flex items-center space-x-2">
              <Checkbox id="include" defaultChecked />
              <label
                htmlFor="include"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Allow administrators to change the directory.
              </label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Toaster position="bottom-center" reverseOrder={false} />;
    </>
  );
}
