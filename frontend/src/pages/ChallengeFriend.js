import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const ChallengeFriend = () => {
  const { roomId } = useParams();
  const meetingRef = useRef(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (!roomId) {
      console.log("Invalid roomId");
      // Redirect to home if roomId is invalid
      navigate('/');
      return; // Exit the effect early
    }

    const myMeeting = async () => {
      const appID = 792978043;
      const serverSecret = "974a18fb33b9a659e846548cca7d36c7";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        "Rubez Singla"
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: meetingRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
        },
      });
    };

    // Only initialize the meeting if roomId is valid
    if (roomId) {
      myMeeting();
    }

    return () => {
      if (meetingRef.current) {
        meetingRef.current.innerHTML = "";
      }
    };
  }, [roomId, navigate]); // Ensure navigate is included as a dependency

  return <div className="room-page"><div ref={meetingRef} /></div>;
};

export default ChallengeFriend;
