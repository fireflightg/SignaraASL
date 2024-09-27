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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GeneralSettings } from "./general";
import { IntegrationsSettings } from "./integrations";

export default function Dashboard() {
  const router = useRouter();
  const [activePage, setActivePage] = useState("general");

  const menuItems = [
    { name: "General", slug: "general" },
    { name: "Security", slug: "security" },
    { name: "Integrations", slug: "integrations" },
    { name: "Support", slug: "support" },
    { name: "Organizations", slug: "organizations" },
    { name: "Advanced", slug: "advanced" },
  ];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClearData = () => {
    // Implement clear data logic here
    console.log("Clearing user data...");
    setIsDialogOpen(false);
  };

  const handleResetPassword = () => {
    e.preventDefault();
    // Implement password reset logic here
    console.log("Resetting password...");
  };
  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavbarDemo />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            {menuItems.map((item) => (
              <Link
                key={item.slug}
                href={""}
                className={`${
                  activePage === item.slug ? "font-semibold text-primary" : ""
                }`}
                onClick={() => setActivePage(item.slug)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="grid gap-6">
            {activePage === "general" && <GeneralSettings />}
            {activePage === "security" && <SecuritySettings />}
            {activePage === "integrations" && <IntegrationsSettings />}
            {activePage === "support" && <SupportSettings />}
            {activePage === "organizations" && <OrganizationsSettings />}
            {activePage === "advanced" && <AdvancedSettings />}
          </div>
        </div>
      </main>
    </div>
  );

  // function GeneralSettings() {
  //   return (
  //     <>
  //       <Card x-chunk="dashboard-04-chunk-1">
  //         <CardHeader>
  //           <CardTitle>Username</CardTitle>
  //           <CardDescription>
  //             Your display name used for your account. This can be changed in
  //             your profile.
  //           </CardDescription>
  //         </CardHeader>
  //         <CardContent>
  //           <form>
  //             <Input placeholder="username" />
  //           </form>
  //         </CardContent>
  //         <CardFooter className="border-t px-6 py-4">
  //           <Button>Save</Button>
  //         </CardFooter>
  //       </Card>
  //       <Card x-chunk="dashboard-04-chunk-2">
  //         <CardHeader>
  //           <CardTitle>Plugins Directory</CardTitle>
  //           <CardDescription>
  //             The directory within your project, in which your plugins are
  //             located.
  //           </CardDescription>
  //         </CardHeader>
  //         <CardContent>
  //           <form className="flex flex-col gap-4">
  //             <Input
  //               placeholder="Project Name"
  //               defaultValue="/content/plugins"
  //             />
  //             <div className="flex items-center space-x-2">
  //               <Checkbox id="include" defaultChecked />
  //               <label
  //                 htmlFor="include"
  //                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  //               >
  //                 Allow administrators to change the directory.
  //               </label>
  //             </div>
  //           </form>
  //         </CardContent>
  //         <CardFooter className="border-t px-6 py-4">
  //           <Button>Save</Button>
  //         </CardFooter>
  //       </Card>
  //     </>
  //   );
  // }

  function OrganizationsSettings() {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Add Class Code</CardTitle>
            <CardDescription>
              Add to class/organizations for them to track updatea and
              information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This will permanently and you to the class you will need to
                reset your account to leave
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <form onSubmit={saveUsername}>
                <Input
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <CardFooter className="border-t px-6 py-4">
                  <Button type="submit">Save</Button>
                </CardFooter>
              </form>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleClearData}>
                    Yes, clear all my data
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </>
    );
  }

  function SecuritySettings() {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Clear User Data</CardTitle>
            <CardDescription>
              Permanently delete all your account data. This action cannot be
              undone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This will permanently erase all your data, including settings,
                saved information, and preferences.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">Clear All Data</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleClearData}>
                    Yes, clear all my data
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Change your account password. We recommend using a strong, unique
              password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Reset Password</Button>
            </form>
          </CardContent>
        </Card>
      </>
    );
  }
}
