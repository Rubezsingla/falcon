import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const ChallengeFriend = () => {
  const { roomId } = useParams(); // Get roomId from URL params
  const meetingRef = useRef(null);

  useEffect(() => {
    if (!roomId) {
      console.error("Room ID is missing!");
      return;
    }

    const appID = 792978043; // Your Zego app ID
    const serverSecret = "974a18fb33b9a659e846548cca7d36c7"; // Your Zego server secret
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId, // Use dynamic roomId from the URL
      Date.now().toString(),
      "Rubez Singla" // Display name
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: meetingRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
      },
    });

    return () => {
      if (meetingRef.current) {
        meetingRef.current.innerHTML = ""; // Cleanup on unmount
      }
    };
  }, [roomId]); // Dependency array ensures effect runs when roomId changes

  return (
    <div>
      <div ref={meetingRef} /> {/* Zego Cloud video container */}
    </div>
  );
};

export default ChallengeFriend;
