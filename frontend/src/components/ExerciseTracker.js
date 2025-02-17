import React, { useEffect, useRef, useState } from "react";

const ExerciseTracker = () => {
  const videoRef = useRef(null);
  const [squatCount, setSquatCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const animationFrameRef = useRef(null);
  const squatState = useRef("START");
  const initialMotion = useRef(0);
  const cooldown = useRef(false);

  // ROI (Region of Interest) coordinates (adjust these!)
  const roi = {
    x: 100,
    y: 100,
    width: 300,
    height: 200,
  };

  // Threshold Adjustment Factors
  const downThresholdFactor = 1.1;  // increased
  const upThresholdFactor = 0.9;    // Reduced

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
    ctx.drawImage(video, 0, 0, video.width, video.height);
    const currentImageData = ctx.getImageData(roi.x, roi.y, roi.width, roi.height);

    try {
      const backgroundCanvas = document.createElement("canvas");
      backgroundCanvas.width = video.width;
      backgroundCanvas.height = video.height;
      const backgroundCtx = backgroundCanvas.getContext("2d");
      const backgroundimageElement = new Image();

      backgroundimageElement.onload = () => {
        backgroundCtx.drawImage(backgroundimageElement, 0, 0, video.width, video.height);
      };
      backgroundimageElement.src = background;

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
    } catch (error) {
      console.error("Error processing images:", error);
      return 0;
    }
  };

  useEffect(() => {
    let stream;

    const setupWebcam = async () => {
      try {
        const video = videoRef.current;
        video.width = 640;
        video.height = 480;

        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        await new Promise((resolve) => {
          video.onloadedmetadata = () => {
            resolve();
          };
        });
        video.play();
        console.log("Webcam stream started successfully.");

        const detectMotion = () => {
          if (!isPlaying) {
            cancelAnimationFrame(animationFrameRef.current);
            return;
          }

          if (!backgroundImage) {
            animationFrameRef.current = requestAnimationFrame(detectMotion);
            return;
          }

          const motionValue = calculateMotion(video, backgroundImage);
          console.log("Motion:", motionValue);

          // Capture the initial Motion
          if (initialMotion.current === 0) {
            initialMotion.current = motionValue;
            console.log("Initial Motion Captured", initialMotion.current);
            return;
          }

          // Define Dynamic Threshold for Squat and Stand
          const downThreshold = initialMotion.current * downThresholdFactor;
          const upThreshold = initialMotion.current * upThresholdFactor;

          console.log("downThreshold:", downThreshold);
          console.log("upThreshold:", upThreshold);

          if (squatState.current === "START" && motionValue > downThreshold && !cooldown.current) {
            squatState.current = "DOWN";
            console.log("State Transition: START -> DOWN");
          } else if (squatState.current === "DOWN" && motionValue < upThreshold) {
            setSquatCount((prevCount) => prevCount + 1);
            squatState.current = "START";
            console.log("State Transition: DOWN -> START, Squat counted!");

            cooldown.current = true;
            setTimeout(() => {
              cooldown.current = false;
              console.log("Cooldown Ended");
            }, 1000);
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
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      }
    };

    if (isPlaying) {
      setupWebcam();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
        console.log("Webcam stream stopped.");
      }
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
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
      const backgroundImgSrc = captureBackground(video);
      setBackgroundImage(backgroundImgSrc);
      console.log("Background image loaded successfully.");
    }

    setSquatCount(0);
    setIsPlaying(true);
    squatState.current = "START";
    initialMotion.current = 0;
    console.log("Exercise started.");
  };

  const handleStop = () => {
    setIsPlaying(false);
    console.log("Exercise stopped.");
  };

  return (
    <div>
      <video ref={videoRef} style={{ transform: "scaleX(-1)", width: "800px", height: "600px" }} autoPlay muted />
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
