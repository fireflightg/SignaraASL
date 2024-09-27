import { Footer } from "@/components/footer";
import { NavbarDemo } from "@/components/sidebaruser";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YPhcuALtZaC
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Component() {
  return (
    <>
      <NavbarDemo />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 grid gap-8 md:gap-12">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-block rounded-lg bg-neutral-950 px-3 py-1 text-sm text-primary-foreground">
              Learn ASL with AI
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Master American Sign Language
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our app uses cutting-edge AI technology to provide real-time
              camera detection and feedback, making it easy for anyone to learn
              and practice American Sign Language.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-background rounded-lg border p-6 space-y-4">
              <div className="bg-neutral-950 rounded-md p-3 flex items-center justify-center">
                <CameraIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Real-Time Detection</h3>
              <p className="text-muted-foreground">
                Our app uses advanced computer vision to recognize and interpret
                your sign language in real-time, providing instant feedback and
                guidance.
              </p>
            </div>
            <div className="bg-background rounded-lg border p-6 space-y-4">
              <div className="bg-neutral-950 rounded-md p-3 flex items-center justify-center">
                <SparkleIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Engaging Lessons</h3>
              <p className="text-muted-foreground">
                Learn at your own pace with our interactive lessons and
                exercises, designed to make the learning process fun and
                rewarding.
              </p>
            </div>
            <div className="bg-background rounded-lg border p-6 space-y-4">
              <div className="bg-neutral-950 rounded-md p-3 flex items-center justify-center">
                <AccessibilityIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Accessible for All</h3>
              <p className="text-muted-foreground">
                Our app is designed with accessibility in mind, ensuring that
                users of all abilities can easily navigate and use the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function AccessibilityIcon(props) {
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
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </svg>
  );
}

function CameraIcon(props) {
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
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function SparkleIcon(props) {
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
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
