import { AlertCircle } from "lucide-react";
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
import { Input } from "@/components/ui/input";
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
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import Nav from "@/components/nav";

export default function Settings() {
  const [activePage, setActivePage] = useState("general");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [betaFeaturesEnabled, setBetaFeaturesEnabled] = useState(false);

  const menuItems = [
    { name: "General", slug: "general" },
    { name: "Security", slug: "security" },
    { name: "Integrations", slug: "integrations" },
    { name: "Organizations", slug: "organizations" },
    { name: "Advanced", slug: "advanced" },
  ];

  const handleClearData = () => {
    console.log("Clearing user data...");
    setIsDialogOpen(false);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log("Resetting password...");
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Nav />
      <main className="flex-1 bg-background">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Settings
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Customize your SignLingo experience and manage your account
                  preferences.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl items-start gap-8 sm:mt-20 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr]">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Button
                    key={item.slug}
                    variant={activePage === item.slug ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActivePage(item.slug)}
                  >
                    {item.name}
                  </Button>
                ))}
              </nav>
              <div className="grid gap-8">
                {activePage === "general" && <GeneralSettings />}
                {activePage === "security" && <SecuritySettings />}
                {activePage === "integrations" && <IntegrationsSettings />}
                {activePage === "organizations" && <OrganizationsSettings />}
                {activePage === "advanced" && <AdvancedSettings />}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );

  function GeneralSettings() {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Username</CardTitle>
            <CardDescription className="text-muted-foreground">
              Your display name used for your account. This can be changed in
              your profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Input placeholder="username" className="max-w-sm" />
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Plugins Directory
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              The directory within your project, in which your plugins are
              located.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <Input
                placeholder="Project Name"
                defaultValue="/content/plugins"
                className="max-w-sm"
              />
              <div className="flex items-center space-x-2">
                <Checkbox id="include" />
                <Label
                  htmlFor="include"
                  className="text-sm font-medium leading-none"
                >
                  Allow administrators to change the directory.
                </Label>
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
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
            <CardTitle className="text-2xl font-bold">
              Clear User Data
            </CardTitle>
            <CardDescription className="text-muted-foreground">
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
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription className="text-muted-foreground">
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
                  className="max-w-sm"
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
                  className="max-w-sm"
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
                  className="max-w-sm"
                />
              </div>
              <Button type="submit">Reset Password</Button>
            </form>
          </CardContent>
        </Card>
      </>
    );
  }

  function IntegrationsSettings() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Integrations</CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your connected services and applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>No integrations available at the moment.</p>
        </CardContent>
      </Card>
    );
  }

  function OrganizationsSettings() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Class Code</CardTitle>
          <CardDescription className="text-muted-foreground">
            Add to class/organizations for them to track updates and information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              This will permanently add you to the class. You will need to reset
              your account to leave.
            </AlertDescription>
          </Alert>
          <form className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="class-code">Class Code</Label>
              <Input
                id="class-code"
                placeholder="Enter class code"
                className="max-w-sm"
              />
            </div>
            <Button type="submit">Join Class</Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  function AdvancedSettings() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Advanced Settings
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Configure advanced options for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="beta-features"
              checked={betaFeaturesEnabled}
              onCheckedChange={setBetaFeaturesEnabled}
            />
            <Label htmlFor="beta-features">Enable Beta Features</Label>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Turn on beta features to test new functionality before it{"'"}s
            officially released.
          </p>
        </CardContent>
      </Card>
    );
  }
}
