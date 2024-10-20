"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HandMetal } from "lucide-react";
import Nav from "@/components/nav";
import FooterASL from "@/components/footerasl";

// Make sure to replace with your actual Stripe publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function DonatePage() {
  return (
    <>
      <Nav />
      <div className="container max-w-screen-md px-4 py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center">
          <HandMetal className="h-12 w-12 text-primary mb-6" />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Support Our Mission
          </h1>
          <p className="mt-4 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 ">
            Your donation helps us continue to provide free ASL learning
            resources and improve our platform.
          </p>
        </div>
        <Elements stripe={stripePromise}>
          <DonationForm />
        </Elements>
      </div>
      <FooterASL />
    </>
  );
}

function DonationForm() {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !amount) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) * 100 }), // Convert to cents
      });

      if (!response.ok) throw new Error("Failed to create payment intent");

      const data = await response.json();
      setClientSecret(data.clientSecret);

      const result = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/donate/thank-you`,
        },
      });

      if (result.error) {
        console.error(result.error.message);
      } else {
        router.push("/donate/thank-you");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12 max-w-md mx-auto space-y-6">
      <div className="space-y-2">
        <Label htmlFor="amount">Donation Amount ($)</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="1"
          step="0.01"
        />
      </div>
      {clientSecret && <PaymentElement />}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Donate"}
      </Button>
    </form>
  );
}
