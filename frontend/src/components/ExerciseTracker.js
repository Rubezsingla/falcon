import React, { useEffect, useRef, useState } from "react";

const ExerciseTracker = () => {
  const videoRef = useRef(null);
  const [squatCount, setSquatCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const animationFrameRef = useRef(null);
  const squatState = useRef("START"); // START, DOWN, UP
  const initialMotion = useRef(0); // Store initial motion
  const cooldown = useRef(false); // Move cooldown ref to component scope

  // ROI (Region of Interest) coordinates (adjust these!)
  const roi = {
    x: 100,
    y: 100,
    width: 300,
    height: 200,
  };

  // Define a standing motion factor
  const standingMotionFactor = 0.2;

  const captureBackground = (video) => {
    const canvas = document.createElement("canvas");
    canvas.width = video.width;
    canvas.height = video.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, video.width, video.height);
    return canvas.toDataURL("image/png");
  };

  const calculateMotion = (video, background) => {
    if (!background) return 0;

    const canvas = document.createElement("canvas");
    canvas.width = video.width;
    canvas.height = video.height;
    const ctx = canvas.getContext("2d");

    // Draw the current video frame
    ctx.drawImage(video, 0, 0, video.width, video.height);
    const currentImageData = ctx.getImageData(roi.x, roi.y, roi.width, roi.height);

    // Draw the background image
    const backgroundCanvas = document.createElement("canvas");
    backgroundCanvas.width = video.width;
    backgroundCanvas.height = video.height;
    const backgroundCtx = backgroundCanvas.getContext("2d");
    const backgroundimageElement = new Image();
    backgroundimageElement.src = background;
    backgroundCtx.drawImage(backgroundimageElement, 0, 0, video.width, video.height);
    const backgroundImageData = backgroundCtx.getImageData(roi.x, roi.y, roi.width, roi.height);

    let motion = 0;
    for (let i = 0; i < currentImageData.data.length; i += 4) {
      const r1 = currentImageData.data[i];
      const g1 = currentImageData.data[i + 1];
      const b1 = currentImageData.data[i + 2];

      const r2 = backgroundImageData.data[i];
      const g2 = backgroundImageData.data[i + 1];
      const b2 = backgroundImageData.data[i + 2];

      const diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
      motion += diff;
    }

    return motion;
  };

  useEffect(() => {
    const setupWebcam = async () => {
      try {
        const video = videoRef.current;
        video.width = 640;
        video.height = 480;

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
          console.log("Webcam stream started successfully.");
        };

        const detectMotion = async () => {

          if (!isPlaying) {
            cancelAnimationFrame(animationFrameRef.current);
            return;
          }

          const motion = calculateMotion(video, backgroundImage);
          console.log("Motion:", motion);

          //Capture the initial Motion
          if (initialMotion.current === 0 && backgroundImage) {
              initialMotion.current = motion;
              console.log("Initial Motion Captured", initialMotion.current);
              return;
          }

          //Define Dynamic Threshold for Squat and Stand
          const downThreshold = initialMotion.current * 0.5; // 50% of initial motion
          const upThreshold = initialMotion.current * standingMotionFactor; // percentage of initial motion

          if (squatState.current === "START" && motion > downThreshold && !cooldown.current) {
            squatState.current = "DOWN";
            console.log("State Transition: START -> DOWN");
          } else if (squatState.current === "DOWN" && motion < upThreshold) {
            setSquatCount((prevCount) => prevCount + 1);
            squatState.current = "START";
            console.log("State Transition: DOWN -> START, Squat counted!");

             // Activate cooldown to prevent immediate recounting
             cooldown.current = true;
             setTimeout(() => {
               cooldown.current = false;
               console.log("Cooldown Ended");
             }, 500); // Cooldown for 500ms (adjust as needed)
          } else {
            console.log("No state transition.");
          }

          console.log("Current Squat State:", squatState.current);
          console.log("Current Squat Count:", squatCount);

          animationFrameRef.current = requestAnimationFrame(detectMotion);
        };

        detectMotion();

      } catch (error) {
        console.error("Error setting up webcam or loading", error);
      }
    };

    if (isPlaying) {
      setupWebcam();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        console.log("Webcam stream stopped.");
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        console.log("Animation frame cancelled on cleanup.");
      }
    };
  }, [isPlaying, backgroundImage]);

  const handleStart = () => {
    const video = videoRef.current;
    if (video) {
      const background = captureBackground(video);

      // Create an Image object and set its onload event
      const img = new Image();
      img.onload = () => {
        console.log("Background image loaded successfully.");
        setBackgroundImage(background);
      };
      img.src = background;
    }
    setSquatCount(0);
    setIsPlaying(true);
    squatState.current = "START";
    initialMotion.current = 0; // Reset initial motion
    console.log("Exercise started.");
  };

  const handleStop = () => {
    setIsPlaying(false);
    console.log("Exercise stopped.");
  };

  return (
    <div>
      <video ref={videoRef} style={{ transform: "scaleX(-1)", width: "800px", height: "600px" }} />
      <div>
        <h2>Squat Count: {squatCount}</h2>
        {!isPlaying ? (
          <button onClick={handleStart}>Play</button>
        ) : (
          <button onClick={handleStop}>Stop</button>
        )}
      </div>
    </div>
  );
};

export default ExerciseTracker;
