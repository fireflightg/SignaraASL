import FooterASL from "@/components/footerasl";
import Nav from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HandMetal, ArrowDown, ExternalLink, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Component() {
  return (
    <>
      <Nav />

      <main className="container flex max-w-screen-md flex-col items-center px-5">
        <section className="space-y-6 pb-48 pt-12 lg:py-32">
          <div className="flex w-full max-w-[64rem] flex-col items-center gap-4 text-center">
            <Link
              href="#"
              className="rounded-2xl bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
            >
              Learn ASL Today
            </Link>

            <h1 className="font-heading max-w-md text-3xl sm:text-4xl">
              Master American Sign Language with Real-Time Feedback
            </h1>

            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Learn ASL at your own pace using your camera. Get instant
              feedback, track your progress, and connect with a community of
              learners.
            </p>

            <div className="mt-3 flex space-x-4">
              <Link
                href="/sign-up"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started
              </Link>
              <Link
                href="/about"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <div className="mb-20 grid grid-cols-2 gap-4 text-black">
          <h3 className="col-span-2 flex items-center justify-center text-xl font-medium text-primary">
            <ArrowDown className="text-primary/60" />
            <span className="ml-1">ASL Impact</span>
            <ArrowDown className="text-primary/80" />
          </h3>

          <div className="flex flex-col items-center space-y-1 rounded-md border-2 border-primary/20 bg-primary/10 px-8 py-3">
            <User className="h-8 w-8 text-primary" />
            <p className="text-xs">Deaf Population in US</p>
            <p>~1 million</p>
          </div>
          <div className="flex flex-col items-center space-y-1 rounded-md border-2 border-primary/20 bg-primary/10 px-8 py-3">
            <HandMetal className="h-8 w-8 text-primary" />
            <p className="text-xs">ASL Users</p>
            <p>~500,000</p>
          </div>
          <div className="col-span-2 flex flex-col items-center space-y-1 rounded-md border-2 border-primary/20 bg-primary/10 px-8 py-3">
            <p className="text-sm">
              Approximately 1 in 20 Americans are deaf or hard of hearing.
              Learning ASL can bridge communication gaps and create a more
              inclusive society.
            </p>
          </div>
        </div>

        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <Image
                src="/placeholder.svg?height=310&width=550"
                width={550}
                height={310}
                alt="ASL Learning Platform"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                    Interactive Learning
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Learn ASL in Real-Time
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our cutting-edge platform uses your camera to provide
                    instant feedback on your signing. Practice with AI-powered
                    lessons tailored to your skill level.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/lessons">Start Learning</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/how-it-works">How It Works</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Learn ASL?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                ASL is not just for the deaf community. It{"'"}s a valuable
                skill for everyone.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-2 border-2 border-primary/20 rounded-lg p-4">
                <User className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Inclusivity</h3>
                <p className="text-sm text-muted-foreground">
                  Bridge communication gaps and create a more inclusive society.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-2 border-primary/20 rounded-lg p-4">
                <HandMetal className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Cognitive Benefits</h3>
                <p className="text-sm text-muted-foreground">
                  Enhance your cognitive skills and brain plasticity.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-2 border-primary/20 rounded-lg p-4">
                <ExternalLink className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Career Opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  Open up new career paths in interpretation and education.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Start Your ASL Journey Today
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of learners and become fluent in ASL. Sign up now
                for a free trial.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex flex-col gap-2">
                <Input type="email" placeholder="Enter your email" />
                <Button type="submit">Get Started</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-2">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section> */}
        <section id="open-source" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl">
              Powered by Open Source
            </h2>
            <p className="max-w-[85%] text-sm leading-normal text-muted-foreground">
              SignLingo is built on open-source technologies and is itself open
              source.
              <br />
              Check out our{" "}
              <Link
                href="https://github.com/yourusername/your-repo"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                GitHub repository
              </Link>
              .
            </p>

            <div className="mt-4 flex gap-2 ">
              <Link href="https://vercel.com" target="_blank">
                <Image
                  src="/vercel.svg"
                  alt="Powered by Vercel"
                  height={24}
                  width={120}
                  className=" p-2"
                />
              </Link>
              <Link
                className="flex h-8 items-center gap-2 rounded-sm bg-[#24292e] px-3 text-xs text-white"
                href="https://github.com/yourusername/your-repo"
                target="_blank"
              >
                <svg
                  height="20"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="20"
                  data-view-component="true"
                  className="octicon octicon-mark-github v-align-middle color-fg-default"
                >
                  <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
                <span>View on GitHub</span>
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Have questions or suggestions? Reach out to us at{" "}
              <Link
                className="border-b border-foreground/50"
                href="mailto:support@signlingo.com"
              >
                support@signlingo.com
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <FooterASL />
    </>
  );
}
