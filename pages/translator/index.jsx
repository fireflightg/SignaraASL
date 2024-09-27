import React, { useState, useRef, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import Webcam from "react-webcam";
import { SignImageData } from "@/config/SignsData";
import hand_landmarker_task from "@/public/model.task";

import { Table } from "lucide-react";
import ProgressBar from "@ramonak/react-progress-bar";
import Image from "next/image";
import { NavbarDemo } from "@/components/sidebaruser";
import { Textarea } from "flowbite-react";

let startTime = "";

// const Detect = () => {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [webcamRunning, setWebcamRunning] = useState(false);
//   const [gestureOutput, setGestureOutput] = useState("");
//   const [gestureRecognizer, setGestureRecognizer] = useState(null);
//   const [runningMode, setRunningMode] = useState("IMAGE");
//   const [progress, setProgress] = useState(0);
//   const [detectedData, setDetectedData] = useState([]);
//   const [currentImage, setCurrentImage] = useState(null);
//   const requestRef = useRef();

//   useEffect(() => {
//     let intervalId;
//     if (webcamRunning) {
//       intervalId = setInterval(() => {
//         const randomIndex = Math.floor(Math.random() * SignImageData.length);
//         const randomImage = SignImageData[randomIndex];
//         setCurrentImage(randomImage);
//       }, 5000);
//     }
//     return () => clearInterval(intervalId);
//   }, [webcamRunning]);

//   const predictWebcam = useCallback(() => {
//     if (runningMode === "IMAGE") {
//       setRunningMode("VIDEO");
//       gestureRecognizer.setOptions({ runningMode: "VIDEO" });
//     }

//     let nowInMs = Date.now();
//     const results = gestureRecognizer.recognizeForVideo(
//       webcamRef.current.video,
//       nowInMs
//     );

//     const canvasCtx = canvasRef.current.getContext("2d");
//     canvasCtx.save();
//     canvasCtx.clearRect(
//       0,
//       0,
//       canvasRef.current.width,
//       canvasRef.current.height
//     );

//     const videoWidth = webcamRef.current.video.videoWidth;
//     const videoHeight = webcamRef.current.video.videoHeight;

//     // Set video width
//     webcamRef.current.video.width = videoWidth;
//     webcamRef.current.video.height = videoHeight;

//     // Set canvas height and width
//     canvasRef.current.width = videoWidth;
//     canvasRef.current.height = videoHeight;

//     // Draw the results on the canvas, if any.
//     if (results.landmarks) {
//       for (const landmarks of results.landmarks) {
//         drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
//           color: "#00FF00",
//           lineWidth: 5,
//         });
//         drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
//       }
//     }

//     if (results.gestures.length > 0) {
//       setDetectedData((prevData) => [
//         ...prevData,
//         {
//           SignDetected: results.gestures[0][0].categoryName,
//         },
//       ]);

//       setGestureOutput(results.gestures[0][0].categoryName);
//       setProgress(Math.round(parseFloat(results.gestures[0][0].score) * 100));
//     } else {
//       setGestureOutput("");
//       setProgress("");
//     }

//     if (webcamRunning) {
//       requestRef.current = requestAnimationFrame(predictWebcam);
//     }
//   }, [webcamRunning, runningMode, gestureRecognizer]);

//   const enableCam = useCallback(() => {
//     if (!gestureRecognizer) {
//       alert("Please wait for gestureRecognizer to load");
//       return;
//     }

//     if (webcamRunning) {
//       setWebcamRunning(false);
//       cancelAnimationFrame(requestRef.current);
//       setCurrentImage(null);
//     } else {
//       setWebcamRunning(true);
//       startTime = new Date();
//       requestRef.current = requestAnimationFrame(predictWebcam);
//     }
//   }, [webcamRunning, gestureRecognizer, predictWebcam]);

//   useEffect(() => {
//     async function loadGestureRecognizer() {

//       const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
//       );
//       const recognizer = await GestureRecognizer.createFromOptions(vision, {
//         baseOptions: {
//        modelAssetPath: hand_landmarker_task

//         },
//         numHands: 2,
//         runningMode: runningMode,
//       });
//       setGestureRecognizer(recognizer);
//     }
//     loadGestureRecognizer();
//   }, [runningMode]);

//   return (
//     <>
//       <div className=" signlang_detection-container">
//         <div style={{ position: "relative" }}>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             className="signlang_webcam"
//           />
//           <canvas ref={canvasRef} className="signlang_canvas" />
//           <div className="signlang_data-container">
//             <button onClick={enableCam}>
//               {webcamRunning ? "Stop" : "Start"}
//             </button>
//             <div className="signlang_data">
//               <p className="gesture_output">{gestureOutput}</p>
//               {progress ?   <ProgressBar completed={progress} className="z-50 text-black bg-red-50" /> : null}
//             </div>
//           </div>
//         </div>
//         <div className="signlang_imagelist-container">
//           <h2 className="gradient__text">Image</h2>
//           <div className="signlang_image-div">
//             {currentImage ? (
//               <Image src="/A.png" alt="yurr" width={100} height={100}/>
//             ) : (
//               <h3 className="gradient__text">
//                 Click on the Start Button <br /> to practice with Images
//               </h3>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Detect;

const Detect = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
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
        numHands: 2,
        runningMode: runningMode,
      });
      setGestureRecognizer(recognizer);
    }
    loadGestureRecognizer();
  }, [runningMode]);

  const enableCam = useCallback(() => {
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
      startTime = new Date();
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [webcamRunning, gestureRecognizer, predictWebcam]);

  return (
    <>
      <NavbarDemo />

      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <ul class=" text-center flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li class="me-2">
            <a
              href="#"
              class="inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active"
              aria-current="page"
            >
              Tab 1
            </a>
          </li>
          <li class="me-2">
            <a
              href="#"
              class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              Tab 2
            </a>
          </li>
          <li class="me-2">
            <a
              href="#"
              class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              Tab 3
            </a>
          </li>
          <li class="me-2">
            <a
              href="#"
              class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              Tab 4
            </a>
          </li>
          <li>
            <a class="inline-block px-4 py-3 text-gray-400 cursor-not-allowed dark:text-gray-500">
              Tab 5
            </a>
          </li>
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <h1 className="text-3xl font-bold mb-4">
            Type out sentences using sign language
          </h1>
          <Textarea placeholder="Type your message here." />

          <div>
            <h2 className="text-2xl font-bold mb-4">Try it Yourself</h2>

            <div className="bg-gray-100 rounded-lg p-6">
              <div className="p-4 w-full text-center">
                <Webcam audio={false} ref={webcamRef} />
                <canvas
                  ref={canvasRef}
                  className=" -z-10 absolute top-0 left-0 w-full h-auto"
                />
                <div className=" bottom-0 left-0 w-full p-4 text-center">
                  <button
                    className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                    onClick={enableCam}
                  >
                    {webcamRunning ? "Stop" : "Start Lesson"}
                  </button>
                  <div className=" absolute">
                    <p className="gesture_output">{gestureOutput}</p>
                    {<ProgressBar completed={progress} bgColor="#00FF00" />}
                  </div>
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
    </>
  );
};

export default Detect;
