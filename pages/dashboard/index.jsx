"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getQuote } from "inspirational-quotes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Award, BookOpen } from "lucide-react";
import { GetLessons } from "@/hooks/getLessons";
import Nav from "@/components/nav";
import { useDetails } from "@/hooks/details"; // Import your custom hook

export default function Dashboard() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const router = useRouter();
  const { userData, error } = useDetails(); // Get user data from the hook
  const lessonData = GetLessons();

  useEffect(() => {
    console.log("User Data:", userData);
    console.log("Lessons Data:", lessonData);
  }, [userData, lessonData]);

  // If no userData or lessons, return loading state
  if (!userData || !lessonData.length) {
    return (
      <>
        <div className="flex flex-col h-screen justify-center items-center space-y-4">
          <iframe
            className="w-80 h-80"
            src="https://lottie.host/embed/3a413810-edc2-47a9-a0d2-8daabf77a5ee/dFb7ldPI3O.json"
          ></iframe>

          <div className="text-center">
            <p className="text-lg font-medium">
              {'"'}
              {getQuote().text}
              {'"'}
            </p>
            <p className="text-sm text-muted-foreground">
              - {getQuote().author}
            </p>
          </div>
        </div>
      </>
    );
  }

  // Helper function to calculate lesson progress based on user's completed sections and lesson sections
  const calculateLessonProgress = (lesson) => {
    const userProgress = userData.inProgress || [];

    // Get the sections completed by the user for the current lesson
    const completedSections = userProgress.filter(
      (progress) => progress.lessonnum === lesson.Number && progress.finished
    ).length;

    // Get the total number of sections for the current lesson
    const totalSections = lesson.Sections?.length || 1;

    // Calculate the progress as a percentage
    const progressPercentage = (completedSections / totalSections) * 100;

    return progressPercentage;
  };

  // Prepare lessons data with progress information
  const lessons = lessonData.map((lesson) => {
    const progress = calculateLessonProgress(lesson);
    console.log(`Progress for lesson ${lesson.name}: ${progress}%`); // Debugging
    return {
      id: lesson.Number,
      title: lesson.name,
      description: lesson.Desc,
      progress, // Compute the progress based on user data and lesson sections
      category: lesson.paramname,
      imgUrl: lesson.imgurl,
      cardImg: lesson.cardimg,
    };
  });

  const totalProgress =
    userData.completed.length > 0
      ? (userData.completed.length / lessons.length) * 100
      : 0;

  const nextLesson = () => {
    setCurrentLessonIndex((prevIndex) => (prevIndex + 1) % lessons.length);
  };

  const prevLesson = () => {
    setCurrentLessonIndex(
      (prevIndex) => (prevIndex - 1 + lessons.length) % lessons.length
    );
  };

  const startLesson = (lessonId) => {
    router.push(`/lesson/${lessonId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:leading-[1.1]">
                  Your ASL Learning Journey
                </h1>
                <p className="mt-4 text-muted-foreground md:text-xl">
                  Track your progress, access lessons, and achieve your language
                  goals.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Overall Completion</CardTitle>
                    <CardDescription>
                      Your journey through all ASL lessons
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={totalProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {totalProgress.toFixed(0)}% Complete
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Available Lessons
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our curated lessons to enhance your ASL skills
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {lessons
                .slice(currentLessonIndex, currentLessonIndex + 3)
                .map((lesson) => (
                  <Card key={lesson.id} className="flex flex-col h-full">
                    <CardHeader>
                      <CardTitle>{lesson.title}</CardTitle>
                      <CardDescription>{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="aspect-video relative mb-4">
                        <Image
                          src={lesson.cardImg}
                          alt={`Image for ${lesson.title}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <Progress value={lesson.progress} className="w-full" />
                      <p className="text-sm text-muted-foreground mt-2">
                        {lesson.progress.toFixed(0)}% Complete
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button onClick={() => startLesson(lesson.id)}>
                        {lesson.progress > 0 ? "Continue" : "Start"}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push(`/lesson/${lesson.id}`)}
                      >
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">Go to lesson</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon" onClick={prevLesson}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous lessons</span>
              </Button>
              <Button variant="outline" size="icon" onClick={nextLesson}>
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next lessons</span>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Enhance Your Learning
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Take your ASL skills to the next level with these additional
                features
              </p>
            </div>
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <BookOpen className="h-6 w-6" />
                    <span>Quick Practice</span>
                  </CardTitle>
                  <CardDescription>
                    Brush up on your skills with a quick session
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link href="/quick-practice">Start Quick Practice</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <Award className="h-6 w-6" />
                    <span>Achievements</span>
                  </CardTitle>
                  <CardDescription>
                    View your learning milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/achievements">View Achievements</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 SignLingo. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
