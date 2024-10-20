import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "@clerk/clerk-react";
import Webcam from "react-webcam";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import { getQuote } from "inspirational-quotes";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import toast, { Toaster } from "react-hot-toast";
import { Hand, BookOpen, Users, Brain, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { NavbarDemo } from "@/components/sidebaruser";
import { GetLessons } from "@/hooks/getLessons";
import { useDetails } from "@/hooks/details";
import dynamic from "next/dynamic";
import Nav from "@/components/nav";

const DynamicBouncy = dynamic(
  () => import("ldrs/bouncy").then((mod) => mod.bouncy),
  {
    ssr: false,
  }
);

export default function LessonPage() {
  const router = useRouter();
  const { lessonNumber } = router.query;
  const { isSignedIn, user } = useUser();
  const [lesson, setLesson] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [gestureOutput, setGestureOutput] = useState("");
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(5);
  const [countdown, setCountdown] = useState(3); // Countdown starts from 3
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [score, setScore] = useState(0); // Score ranges from 0 to 5
  const [isGestureCorrect, setIsGestureCorrect] = useState(false); // Added to track gesture correctness

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const requestRef = useRef();

  const lessons = GetLessons();
  const db = firebase.firestore();

  useEffect(() => {
    if (lessons.length > 0 && lessonNumber) {
      const selectedLesson = lessons.find(
        (lesson) => lesson.Number === Number(lessonNumber)
      );
      setLesson(selectedLesson);
    }
  }, [lessons, lessonNumber]);

  const updateProgressInFirebase = async (sectionName, completed) => {
    if (!user) return;

    try {
      const userDoc = await db.collection("users").doc(user.id).get();
      let progressArray = [];
      let completedArray = [];

      if (userDoc.exists) {
        const userData = userDoc.data();
        progressArray = userData.InProgress || [];
        completedArray = userData.Completed || [];
      }

      const existingProgressIndex = progressArray.findIndex(
        (progress) =>
          progress.lessonnum === lesson?.Number &&
          progress.name.replace(" ✓", "") === sectionName
      );

      if (existingProgressIndex >= 0) {
        progressArray[existingProgressIndex].finished = completed;
        progressArray[existingProgressIndex].name = completed
          ? sectionName + " ✓"
          : sectionName;
      } else {
        progressArray.push({
          name: completed ? sectionName + " ✓" : sectionName,
          finished: completed,
          lessonnum: lesson?.Number,
        });
      }

      const allSectionsCompleted = lesson?.Sections.every((section) =>
        progressArray.some(
          (progress) =>
            progress.name === section.name + " ✓" && progress.finished
        )
      );

      if (allSectionsCompleted) {
        if (!completedArray.includes(lesson?.name)) {
          completedArray.push(lesson?.name);
          toast.success(`Lesson "${lesson?.name}" completed!`);
        }
      }

      await db.collection("users").doc(user.id).set(
        {
          InProgress: progressArray,
          Completed: completedArray,
        },
        { merge: true }
      );
      console.log("Progress and completion updated successfully!");
    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Error updating progress: " + error.message);
    }
  };

  const [userProgress, setUserProgress] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchUserProgress = async () => {
        try {
          const doc = await db.collection("users").doc(user.id).get();
          if (doc.exists) {
            const userData = doc.data();
            setUserProgress(userData.InProgress || []);
          }
        } catch (error) {
          console.error("Error fetching user progress:", error);
        }
      };

      fetchUserProgress();
    }
  }, [user]);

  useEffect(() => {
    async function loadGestureRecognizer() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/model.task", // Ensure this path is correct
        },
        numHands: 1,
        runningMode: "VIDEO",
      });
      setGestureRecognizer(recognizer);
      console.log("Gesture recognizer initialized");
    }
    loadGestureRecognizer();
  }, []);

  const predictWebcam = useCallback(async () => {
    if (!webcamRef.current || !gestureRecognizer) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      return;
    }

    if (isCountingDown) {
      requestRef.current = requestAnimationFrame(predictWebcam);
      return;
    }

    const results = await gestureRecognizer.recognizeForVideo(
      webcamRef.current.video,
      Date.now()
    );

    if (results.landmarks) {
      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      results.landmarks.forEach((landmarks) => {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
      });
      canvasCtx.restore();
    }

    if (results.gestures.length > 0) {
      const gesture = results.gestures[0][0];
      const detectedGesture = gesture.categoryName.trim().toLowerCase();
      const expectedGesture = lesson.Sections[currentIndex].word
        .trim()
        .toLowerCase();

      console.log("Detected gesture:", detectedGesture);
      console.log("Expected gesture:", expectedGesture);

      if (detectedGesture === expectedGesture) {
        if (score < 1) {
          setScore((prevScore) =>
            prevScore > 1 ? prevScore + 1 : prevScore * 0 + 1
          );
        } else {
          setScore(1);
        }
        setIsGestureCorrect(true); // Set the correct gesture flag

        const sectionName = lesson.Sections[currentIndex].name;

        updateProgressInFirebase(sectionName, true);
        toast.success("Great job! You've completed the section.");
        setGestureOutput(""); // Reset the gesture output state
      } else {
        setIsGestureCorrect(false); // Gesture wasn't correct
      }
    } else {
      setIsGestureCorrect(false); // No gesture detected
      setGestureOutput("");
    }

    requestRef.current = requestAnimationFrame(predictWebcam);
  }, [
    gestureRecognizer,
    isCountingDown,
    lesson?.Sections,
    currentIndex,
    score,
    updateProgressInFirebase,
  ]);

  const enableCam = useCallback(async () => {
    if (!gestureRecognizer) {
      toast.error("Please wait for gesture recognizer to load");
      return;
    }
    if (webcamRunning) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
      setWebcamRunning(false);
      setIsCountingDown(false);
    } else {
      setWebcamRunning(true);
      setIsCountingDown(true);
      setCountdown(3);
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [webcamRunning, gestureRecognizer, predictWebcam]);

  useEffect(() => {
    let countdownInterval;
    if (isCountingDown && webcamRunning) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownInterval);
            setIsCountingDown(false);
            setCountdown(0);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [isCountingDown, webcamRunning]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col">
        <Nav />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4">
              <DynamicBouncy size={45} speed={1.75} color="black" />
            </div>
            <p className="text-lg font-medium mb-2">
              {'"'}
              {getQuote().text}
              {'"'}
            </p>
            <p className="text-sm text-muted-foreground">
              - {getQuote().author}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Nav />
      <main className="flex-grow container mx-auto px-4 py-12 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Lesson {lessonNumber}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tighter mb-4">
            {lesson?.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">{lesson?.desc}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {lesson?.Sections.map((section, index) => (
              <Card
                key={index}
                className={index === currentIndex ? "border-primary" : ""}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Hand className="mr-2 h-5 w-5" />
                    {section.name}{" "}
                    {userProgress.some(
                      (progress) =>
                        progress.name.replace(" ✓", "") === section.name &&
                        progress.finished
                    ) && "✓"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => {
                      setCurrentIndex(index);
                      if (index !== currentIndex) {
                        setScore(0); // Reset the score only when switching sections
                      }
                    }}
                    variant={index === currentIndex ? "default" : "outline"}
                    className="w-full"
                  >
                    {index === currentIndex ? "Current" : "Start"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Hand className="mr-2 h-6 w-6" />
                Practice Area
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative aspect-video h-fit">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    className="rounded-xl w-full h-full object-cover"
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-fit rounded-xl"
                  />
                  {isCountingDown && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                      <p className="text-white text-6xl font-bold">
                        {countdown}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      Sign {"'"}
                      {lesson?.Sections[currentIndex].word}
                      {"'"} in ASL
                    </h2>
                    <p className="text-lg mb-4">
                      Follow the instructions and practice the sign. You need to
                      perform it correctly once to complete this section.
                    </p>
                    <div className="bg-muted p-4 rounded-lg mb-4">
                      <p className="text-xl font-semibold mb-2">
                        {isGestureCorrect ? (
                          <span className="text-green-600">Good Job!</span>
                        ) : (
                          <span className="text-yellow-600">Not Quite</span>
                        )}
                      </p>
                      <p className="text-muted-foreground">
                        Progress: {score} / 1
                      </p>
                    </div>
                    <Progress
                      value={(score / 1) * 100}
                      className="w-full h-2"
                    />
                  </div>
                  <Button
                    onClick={enableCam}
                    className="w-full mt-4 text-lg py-6"
                    size="lg"
                  >
                    {webcamRunning ? (
                      <>
                        Stop Camera
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    ) : (
                      <>
                        Start Camera
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {lesson?.Sections[currentIndex].isCamera && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter">
                How to Sign{" "}
                {lesson.Sections[currentIndex].isLetter ? "the Letter" : ""}{" "}
                {"'"}
                {lesson.Sections[currentIndex].word}
                {"'"} in ASL
              </h2>
              <ol className="list-decimal pl-6 space-y-4">
                {lesson.Sections[currentIndex].directions.map(
                  (direction, index) => (
                    <li key={index}>
                      <h3 className="text-xl font-semibold mb-2">
                        {direction.title}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {direction.desc}
                      </p>
                    </li>
                  )
                )}
              </ol>
            </div>
          )}
        </div>
      </main>
      {score < 1 && <Toaster position="bottom-center" reverseOrder={false} />}
    </div>
  );
}
