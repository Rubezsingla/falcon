import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import './Welcome.css';
const openExerciseApp = () => {
    window.open("http://localhost:3001", "_blank"); // Replace with actual deployed URL
  };

function WelcomePage() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

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

export default WelcomePage;
