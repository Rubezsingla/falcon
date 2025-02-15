import React, { useEffect, useRef, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs";

const ExerciseTracker = () => {
  const videoRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const [isExerciseInProgress, setIsExerciseInProgress] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);  // Track if the exercise is playing

  useEffect(() => {
    let net; // PoseNet model

    const setupWebcam = async () => {
      try {
        const video = videoRef.current;
        video.width = 640;
        video.height = 480;

        // Request access to the webcam
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = stream;
        video.play();

        // Load the PoseNet model
        net = await posenet.load();

        // Function to detect poses
        const detectPose = async () => {
          if (!isPlaying) return; // Stop detection if not playing

          const pose = await net.estimateSinglePose(video, {
            flipHorizontal: false,
          });
          countExercise(pose);
          requestAnimationFrame(detectPose);
        };

        detectPose();
      } catch (error) {
        console.error("Error setting up webcam or loading PoseNet", error);
      }
    };

    if (isPlaying) {
      setupWebcam();
    }

    return () => {
      if (isPlaying) {
        // Cleanup webcam when stopped
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    };
  }, [isPlaying]);

  const countExercise = (pose) => {
    // Find the left and right knee keypoints
    const leftKnee = pose.keypoints.find((point) => point.part === "leftKnee");
    const rightKnee = pose.keypoints.find((point) => point.part === "rightKnee");

    // Check if both knees are detected
    if (leftKnee && rightKnee) {
      const leftKneeY = leftKnee.position.y;
      const rightKneeY = rightKnee.position.y;

      // Adjust the knee thresholds for squat positions
      const kneeThresholdDown = 250; // Threshold for down position
      const kneeThresholdUp = 300;  // Threshold for up position

      // Detect if knees are near each other during the "down" phase
      if (
        leftKneeY < kneeThresholdDown &&
        rightKneeY < kneeThresholdDown &&
        !isExerciseInProgress
      ) {
        setIsExerciseInProgress(true);
      }

      // If the knees go back up, count as completed squat
      if (
        leftKneeY > kneeThresholdUp &&
        rightKneeY > kneeThresholdUp &&
        isExerciseInProgress
      ) {
        setIsExerciseInProgress(false);
        setCounter((prevCount) => prevCount + 1);  // Increment squat count
      }
    }
  };

  const handleStart = () => {
    setCounter(0); // Reset counter when starting
    setIsExerciseInProgress(false);
    setIsPlaying(true); // Start detecting poses
  };

  const handleStop = () => {
    setIsPlaying(false); // Stop detecting poses
  };

  return (
    <div>
      <video ref={videoRef} style={{ transform: "scaleX(-1)" }} />
      <div>
        <h2>Squats Count: {counter}</h2>

        {!isPlaying ? (
          <button onClick={handleStart}>Play</button>  /* Play button */
        ) : (
          <button onClick={handleStop}>Stop</button>  /* Stop button */
        )}
      </div>
    </div>
  );
};

export default ExerciseTracker;
