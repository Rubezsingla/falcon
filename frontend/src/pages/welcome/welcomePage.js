import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import './Welcome.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/diet-chart')}>Diet Chart</button>
        <button onClick={() => navigate('/challenge/room1')}>Challenge a Friend</button> {/* Navigate to challenge page */}
        <button onClick={() => navigate('/login')}>Logout</button>
      </nav>

      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Welcome Box */}
      <div className="welcome-box">
        <h1>FLEX IT OUT</h1>
        <h2>Welcome, Fitness Warrior!</h2>
        <p className="tagline">"Push your limits. Achieve greatness."</p>
      </div>
    </div>
  );
};

export default WelcomePage;
