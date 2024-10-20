"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { HandMetal, Search } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { config } from "@/config/firebase";
import Nav from "@/components/nav";

// Initialize Firebase (make sure to replace with your actual config)
const firebaseConfig = config;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newSign, setNewSign] = useState({
    word: "",
    description: "",
    videoUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for dictionary items
  const dictionaryItems = [
    {
      word: "Hello",
      description: "A common greeting",
      videoUrl: "https://example.com/hello.mp4",
    },
    {
      word: "Thank you",
      description: "Express gratitude",
      videoUrl: "https://example.com/thankyou.mp4",
    },
    {
      word: "Please",
      description: "Used when making a request",
      videoUrl: "https://example.com/please.mp4",
    },
    // Add more items as needed
  ];

  const filteredItems = dictionaryItems.filter((item) =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "pendingSigns"), {
        ...newSign,
        status: "pending",
        submittedAt: new Date(),
      });
      alert("Sign submitted successfully for verification!");
      setNewSign({ word: "", description: "", videoUrl: "" });
    } catch (error) {
      console.error("Error submitting sign: ", error);
      alert("Error submitting sign. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-2xl font-bold"
          >
            <HandMetal className="mr-2 h-6 w-6" />
            <span className="sr-only">SignLingo</span>
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            ASL Dictionary
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Explore and learn ASL signs
          </p>
        </header>

        <div className="mb-8">
          <div className="flex max-w-sm mx-auto">
            <Input
              type="search"
              placeholder="Search signs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mr-2"
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.word}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>
                <video
                  src={item.videoUrl}
                  controls
                  className="w-full rounded-md"
                >
                  Your browser does not support the video tag.
                </video>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Submit a New Sign</h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
              <Label htmlFor="word">Word or Phrase</Label>
              <Input
                id="word"
                value={newSign.word}
                onChange={(e) =>
                  setNewSign({ ...newSign, word: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newSign.description}
                onChange={(e) =>
                  setNewSign({ ...newSign, description: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                type="url"
                value={newSign.videoUrl}
                onChange={(e) =>
                  setNewSign({ ...newSign, videoUrl: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Sign for Verification"}
            </Button>
          </form>
        </section>
      </div>
    </>
  );
}
