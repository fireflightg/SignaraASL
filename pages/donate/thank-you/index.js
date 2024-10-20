import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="container max-w-screen-md px-4 py-12 md:py-24 lg:py-32 text-center">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-4">
        Thank You for Your Donation!
      </h1>
      <p className="mt-4 max-w-[42rem] mx-auto leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-8">
        Your support helps us continue our mission to make ASL learning
        accessible to everyone.
      </p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
