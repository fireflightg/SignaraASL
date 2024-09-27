import { Footer } from "@/components/footer";
import { NavbarDemo } from "@/components/sidebaruser";
import { useRouter } from "next/router";
import { bouncy } from "ldrs";
import { getQuote } from "inspirational-quotes";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Link from "next/link";
import { AlertCircle, CircleUser, Menu, Package2, Search } from "lucide-react";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

import { GetLessons } from "@/hooks/getLessons";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import Webcam from "react-webcam";
import { SignImageData } from "@/config/SignsData";
import hand_landmarker_task from "@/public/model.task";

import { Table } from "lucide-react";
import ProgressBar from "@ramonak/react-progress-bar";
import Image from "next/image";
import { useHistory, useLocation } from "react-router-dom";
import { useDetails, LessonDetails } from "@/hooks/details";
import toast, { Toaster } from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useUser } from "@clerk/clerk-react";

bouncy.register();

// Default values shown

const LessonPage = () => {
  const { userData, error } = useDetails();
  const details = userData;
  const { isSignedIn, user, isLoaded } = useUser();
  const [username, setUsername] = useState("");
  // Initial state for username
  const [lesson, setLesson] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [finishedless, setFinishedless] = useState([]);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [gestureOutput, setGestureOutput] = useState("");
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [runningMode, setRunningMode] = useState("VIDEO");
  const [progress, setProgress] = useState(0);
  const [detectedData, setDetectedData] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const requestRef = useRef();

  useEffect(() => {
    let intervalId;
    if (webcamRunning) {
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * SignImageData.length);
        setCurrentImage(SignImageData[randomIndex]);
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [webcamRunning]);

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
    } else {
      setGestureOutput("");
      setProgress(0);
    }

    requestRef.current = requestAnimationFrame(predictWebcam);
  }, [gestureRecognizer]);

  useEffect(() => {
    async function loadGestureRecognizer() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: hand_landmarker_task,
        },
        numHands: 1,
        runningMode: runningMode,
      });
      setGestureRecognizer(recognizer);
    }
    loadGestureRecognizer();
  }, [runningMode]);

  const enableCam = useCallback(async () => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }
    if (webcamRunning) {
      cancelAnimationFrame(requestRef.current);
      setWebcamRunning(false);
      setCurrentImage(null);
    } else {
      setWebcamRunning(true);
      var startTime = new Date();
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [webcamRunning, gestureRecognizer, predictWebcam]);

  //Import Lesson info

  const router = useRouter();
  const { lessonNumber } = router.query; // Capture the lesson number from the URL

  //console.log("Current Lesson Number:", lessonNumber, typeof lessonNumber);

  const lessons = GetLessons(); // Call the custom hook to fetch lessons

  const [senddata, Setsenddata] = useState({});
  useEffect(() => {
    if (lessons.length > 0 && lessonNumber) {
      const selectedLesson = lessons.find(
        (lesson) => lesson.Number === Number(lessonNumber)
      );
      var setm = {
        lessonnumber: selectedLesson,

        sections: {},
      };

      for (const j in lesson?.Sections) {
        var loc = lesson?.Sections[j];
        setm[loc.name] = false;
      }
      Setsenddata(setm);

      setLesson(selectedLesson);
    }
  }, [lessons, lessonNumber]);

  const [lessonpagenum, setlessonpage] = useState(0);

  useEffect(() => {
    const completedLessons = details?.InProgress?.reduce((acc, item) => {
      if (item.lessonnum === lessonNumber) {
        acc.push(item.name);
      }
      return acc;
    }, []);
    console.log(details?.InProgress);

    setFinishedless(details?.InProgress);
    console.log("Completed Lessons:", completedLessons); // Debugging output
  }, [details, lessonNumber]);

  // const response = GetLessons();

  // useEffect(() => {
  //   async function loadLesson() {
  //     if (!lesson) {
  //       // Check if response and loc are valid
  //       console.log("Loading lesson:", response);
  //       setLesson(response);
  //     }
  //   }

  //   loadLesson();
  // }, [response]); // Ensure 'response' and 'loc' are stable

  // useEffect(() => {
  //     // Fetch the lesson details from an API or local data store
  //     const fetchLesson = async () => {
  //         const response = GetLessons();
  //         //const response = await fetch(`/pages/lessons/${lessonNumber}`);
  //        const data = response;
  //         setLesson(data);
  //     };

  //     if (lessonNumber) {
  //         fetchLesson();
  //     }
  // }, [lessonNumber]);
  const [currentIndex, setIndex] = useState(0);
  const [progressy, setProgressy] = useState(0);

  const expectedGesture = lesson?.Sections[currentIndex]?.word;

  const db = firebase.firestore();

  const [completedSections, setCompletedSections] = useState({});

  // Initialize the gesture recognizer and webcam
  // Similar to your existing code...
  const [timer, setTimer] = useState(5);

  const handleGestureDetected = useCallback(
    (gesture) => {
      if (timer < 0) {
        setTimer(0);
      }

      if (gesture === expectedGesture && timer <= 0) {
        setProgressy((prev) => prev + 1);
        setTimer(5);

        if (progressy >= 4) {
          // Assuming 5 correct gestures completes the section
          const sectionName = lesson?.Sections[currentIndex]?.name;
          setCompletedSections((prev) => ({ ...prev, [sectionName]: true }));
          toast.success("Section completed!");

          updateProgressInFirebase(sectionName, true);
        }
      } else {
        setTimeout(() => {
          setTimer((prev) => prev - 1);
          console.log(timer);
        }, 1000);
      }
    },
    [expectedGesture, progressy, timer]
  );

  useEffect(() => {
    if (gestureOutput) {
      handleGestureDetected(gestureOutput);
    }
  }, [gestureOutput, handleGestureDetected]);

  const updateProgressInFirebase = async (sectionName, completed) => {
    if (!user) return;
    try {
      await db
        .collection("users")
        .doc(user.id)
        .set(
          {
            InProgress: [
              {
                name: sectionName,
                finished: completed,
                lessonnum: lesson?.Number,
              },
            ],
          },
          { merge: true }
        );
      console.log("Progress updated successfully!");
    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Error updating progress: " + error.message);
    }
  };

  if (!lesson) {
    return (
      <>
        <NavbarDemo />

        <div className="  py-52 flex justify-center  align-middle text-center h-full gap-5 ">
          <div>
            <l-bouncy size="45" speed="1.75" color="black" />
            <div class="text-center">
              <p className="text-lg font-medium">
                {'"'}
                {getQuote().text} {'"'}
              </p>
              <p className="text-sm text-muted-foreground">
                - {getQuote().author}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarDemo />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <ul class=" text-center flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {[...new Array(lesson?.Sections?.length).fill(1)].map((_, index) => {
            return (
              <li class="me-2" key={index}>
                <a
                  onClick={() => setIndex(index)}
                  className={
                    index == currentIndex
                      ? "inline-block px-4 py-3 m-5 text-white bg-blue-600 rounded-lg active"
                      : "inline-block px-4 py-3 m-5 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                  }
                  aria-current="page"
                >
                  {finishedless?.every((item) => {
                    item.name === lesson.Sections[index].name
                      ? (lesson.Sections[index].name =
                          lesson.Sections[index].name + " ✅")
                      : "";
                  })}
                  {lesson.Sections[index].name}
                  {console.log(finishedless)}
                </a>
              </li>
            );
          })}
        </ul>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 
            ${lesson?.Sections[currentIndex].isCamera ? "" : "hidden"}`}
        >
          <div>
            <h1 className="text-3xl font-bold mb-4">
              How to Sign{" "}
              {lesson?.Sections[currentIndex].isLetter ? "the Letter" : ""}{" "}
              {"'"}
              {lesson?.Sections[currentIndex].word}
              {"'"} in ASL
            </h1>
            <p className="text-gray-600 mb-6">
              Follow these simple steps to sign{" "}
              {lesson?.Sections[currentIndex].isLetter ? "the letter " : ""}
              {"'"}
              {lesson?.Sections[currentIndex].word}
              {"'"} in American Sign Language:
            </p>
            <ol className="list-decimal pl-6 space-y-4">
              {[
                ...new Array(
                  lesson?.Sections[currentIndex]?.directions.length
                ).fill(1),
              ].map((_, index) => {
                return (
                  <li key={index}>
                    <h3 className="font-semibold mb-2">
                      {lesson?.Sections[currentIndex]?.directions[index].title}
                    </h3>
                    <p>
                      {lesson?.Sections[currentIndex]?.directions[index].desc}
                    </p>
                  </li>
                );
              })}
            </ol>
            <p className="text-gray-600 mt-4">
              Use the camera to display your hand signing{" "}
              {lesson?.Sections[currentIndex].isLetter ? "the letter" : ""}
              {"'"}
              {lesson?.Sections[currentIndex].word}
              {"'"} in ASL.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Try it Yourself</h2>

            <div className="bg-gray-100 rounded-lg p-6 ">
              <div className="relative p-4  w-full text-center">
                {/*countdown > 0 && (
                  <div className="text-6xl absolute bg-black top-0 left-0 w-full h-full flex items-center justify-center font-bold text-white opacity-20 z-50">
                    {countdow}
                  </div>
                )*/}

                <>
                  <Webcam audio={false} ref={webcamRef} />
                  <canvas
                    ref={canvasRef}
                    className="-z-10 absolute top-0 left-0 w-full h-auto"
                  />
                </>
              </div>

              <div className=" bottom-0 left-0 w-full p-4 text-center">
                <button
                  className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                  onClick={enableCam}
                >
                  {webcamRunning ? "Stop" : "Start Lesson"}
                </button>
                <div>
                  <p className=" text-4xl font-semibold w-full text-center text-md ">
                    {/*!gestureOutput ? "No sign shown" : gestureOutput*/}
                    {gestureOutput == lesson?.Sections[currentIndex].word ? (
                      <span className=" text-green-400"> Great Job!! </span>
                    ) : (
                      <span className=" text-red-400"> Nothing Yet </span>
                    )}
                  </p>

                  <p className="">
                    Sign{" "}
                    {lesson?.Sections[currentIndex].isLetter
                      ? "the letter "
                      : ""}
                    {"'"}
                    {lesson?.Sections[currentIndex].word}
                    {"'"} 5 times to continue, You{"'"}ve signed it {progressy}{" "}
                    times
                  </p>
                  {/*<ProgressBar completed={progress} bgColor="#00FF00" />*/}
                </div>
              </div>
            </div>

            {/* <div className="signlang_imagelist-container">
                  <h2 className="gradient__text">Image</h2>
                  <div className="signlang_image-div">
                    {currentImage ? (
                      <Image src={currentImage.url} alt={`Image of sign ${currentImage.id}`} width={100} height={100} />
                    ) : (
                      <h3 className="gradient__text">Click on the Start Button <br /> to practice with Images</h3>
                    )}
                  </div>
                </div> */}
          </div>

          <div className="flex gap-2">
            {/* <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted cursor-pointer hover:bg-muted-foreground hover:text-muted-foreground">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted cursor-pointer hover:bg-muted-foreground hover:text-muted-foreground">
                      <span className="text-sm font-medium">3</span>
                    </div> */}
          </div>
        </div>
      </div>
      <h1>{lesson.title}</h1>
      <p>{lesson.desc}</p>
      {/* Add more lesson details here */}
      <Toaster position="bottom-center" reverseOrder={false} />;
    </>
  );
};

export default LessonPage;
