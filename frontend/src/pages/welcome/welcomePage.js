<<<<<<< HEAD
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
=======
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
>>>>>>> 0c8fac895b0e373977c87a35ed86588e2d5be06c
import './Welcome.css';

<<<<<<< HEAD
const WelcomePage = () => {
  const navigate = useNavigate();
=======
function WelcomePage() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
>>>>>>> 0c8fac895b0e373977c87a35ed86588e2d5be06c

  return (
    <div className="welcome-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/diet-chart')}>Diet Chart</button>
        <button onClick={() => navigate('/challenge/room1')}>Challenge a Friend</button> {/* Navigate to challenge page */}
        <button onClick={() => navigate('/login')}>Logout</button>
      </nav>

<<<<<<< HEAD
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
=======
    return (
        <div className="welcome-container">
            {/* Navigation Bar */}
            <nav className="navbar">
                <button onClick={() => handleNavigation('/')}>Home</button>
                <button onClick={() => handleNavigation('/diet-chart')}>Diet Chart</button>
                <button onClick={() => handleNavigation('/challenge-friend')}>Challenge a Friend</button>
                {user ? (
          <div className="navItems">
            <span className="username">Welcome,  {user.username}</span>
          </div>
        ) : (
          <div className="navItems"> <p>Welcome, Fitness Warrior!</p>
          </div>
        )}
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
                <button onClick={openExerciseApp}>Get Started</button>
            </div>
        </div>
    );
}
>>>>>>> 0c8fac895b0e373977c87a35ed86588e2d5be06c

export default WelcomePage;
