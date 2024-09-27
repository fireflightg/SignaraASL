/**
 * v0 by Vercel.
 * @see https://v0.dev/t/H2NDkyMgn7z
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { NavbarDemo } from "@/components/sidebaruser";
import { Footer } from "@/components/footer";

export default function Component() {
  return (
    <>
      <NavbarDemo />
      <div className="flex flex-col min-h-dvh">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-neutral-950">
          <div className="container px-4 md:px-6 space-y-6 text-center text-primary-foreground">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Support Our Cause
              </h1>
              <p className="max-w-[700px] mx-auto text-lg md:text-xl">
                Your donation can make a real difference in the lives of those
                in need. Join us in our mission to create a better future.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Donate Now
            </Link>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Choose Your Donation
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Select from our pre-set donation options or enter a custom
                  amount.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-center justify-center space-y-4 bg-muted rounded-lg p-6">
                <HeartIcon className="size-8 text-primary" />
                <h3 className="text-lg font-bold">$5</h3>
                <p className="text-muted-foreground text-center">
                  helps cover the basic operational costs of our website, Every
                  bit helps in keeping our platform running smoothly for
                  everyone who needs it.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 bg-muted rounded-lg p-6">
                <GiftIcon className="size-8 text-primary" />
                <h3 className="text-lg font-bold">$10</h3>
                <p className="text-muted-foreground text-center">
                  you are helping to enhance the accuracy and speed of our AI
                  technology. This level of support directly improves the user
                  experience.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 bg-muted rounded-lg p-6">
                <WalletIcon className="size-8 text-primary" />
                <h3 className="text-lg font-bold">$50</h3>
                <p className="text-muted-foreground text-center">
                  will go towards developing new features and expanding our
                  site. This includes adding support for more complex signs and
                  phrases.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 bg-muted rounded-lg p-6">
                <DollarSignIcon className="size-8 text-primary" />
                <h3 className="text-lg font-bold">$100</h3>
                <p className="text-muted-foreground text-center">
                  {" "}
                  this supports refinement and our mobile app integration. helps
                  organize large-scale ASL events with institutions to spread
                  the importance of ASL.
                </p>
              </div>
            </div>
            <div className="w-full max-w-md mx-auto">
              <form className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Donation Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter an amount"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message (optional)</Label>
                  <Textarea id="message" placeholder="Add a message" />
                </div>
                <Button type="submit" className="w-full">
                  Submit Donation
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function GiftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}
