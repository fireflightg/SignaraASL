import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Github,
  HandMetal,
} from "lucide-react";

export default function FooterASL() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <HandMetal className="h-6 w-6" />
            <span className="text-lg font-semibold">Signara</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://yourwebsite.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Saahib Mohammed
            </a>
            . Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-6 md:px-0">
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline" href="/about">
              About
            </Link>
            <Link
              className="text-sm font-medium hover:underline"
              href="/lessons"
            >
              Lessons
            </Link>
            <Link
              className="text-sm font-medium hover:underline"
              href="/donate"
            >
              Donate
            </Link>
            <Link
              className="text-sm font-medium hover:underline"
              href="/contact"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://youtube.com" target="_blank" rel="noreferrer">
              <Youtube className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
