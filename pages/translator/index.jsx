"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import Webcam from "react-webcam";
import hand_landmarker_task from "@/public/model.task";
import { NavbarDemo } from "@/components/sidebaruser";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import Nav from "@/components/nav";


export default function TranslatorPage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [gestureOutput, setGestureOutput] = useState("");
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [progress, setProgress] = useState(0);
  const [translatedText, setTranslatedText] = useState("");
  const requestRef = useRef();

  const predictWebcam = useCallback(async () => {
    if (!webcamRef.current || !gestureRecognizer) return;

    const results = await gestureRecognizer.recognizeForVideo(
      webcamRef.current.video,
      Date.now()
    );

    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    webcamRef.current.video.width = webcamRef.current.video.videoWidth;
    webcamRef.current.video.height = webcamRef.current.video.videoHeight;

    canvasRef.current.width = webcamRef.current.video.width;
    canvasRef.current.height = webcamRef.current.video.height;

    if (results.landmarks) {
      results.landmarks.forEach((landmarks) => {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
      });
    }

    if (results.gestures.length > 0) {
      const gesture = results.gestures[0][0];
      setGestureOutput(gesture.categoryName);
      setProgress(Math.round(parseFloat(gesture.score) * 100));
      setTranslatedText((prev) => prev + gesture.categoryName);
    } else {
      setGestureOutput("");
      setProgress(0);
    }

    requestRef.current = requestAnimationFrame(predictWebcam);
  }, [gestureRecognizer]);

  useEffect(() => {
    async function loadGestureRecognizer() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: hand_landmarker_task,
        },
        numHands: 2,
        runningMode: "VIDEO",
      });
      setGestureRecognizer(recognizer);
    }
    loadGestureRecognizer();
  }, []);

  const enableCam = useCallback(() => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }
    if (webcamRunning) {
      cancelAnimationFrame(requestRef.current);
      setWebcamRunning(false);
    } else {
      setWebcamRunning(true);
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [webcamRunning, gestureRecognizer, predictWebcam]);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              ASL Translator
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Translate American Sign Language to text in real-time using your
              camera.
            </p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
              <Webcam
                audio={false}
                ref={webcamRef}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="flex justify-between items-center">
              <Button onClick={enableCam} className="w-full">
                {webcamRunning ? "Stop Translation" : "Start Translation"}
              </Button>
            </div>
            {webcamRunning && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Detected Sign:</span>
                  <span className="text-sm font-medium">{gestureOutput}</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}
          </div>
          <div className="space-y-4">
            <Textarea
              placeholder="Translated text will appear here..."
              className="min-h-[300px]"
              value={translatedText}
              readOnly
            />
            <Button
              onClick={() => setTranslatedText("")}
              variant="outline"
              className="w-full"
            >
              Clear Text
            </Button>
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose md:text-left">
              Built by{" "}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Signara
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
              . The source code is available on{" "}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
