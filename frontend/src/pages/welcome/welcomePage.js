import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function WelcomePage() {
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
                <button onClick={() => handleNavigation('/login')}>Logout</button>
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
                <button onClick={() => handleNavigation('/exercise')}>Get Started</button>
            </div>
        </div>
    );
}

export default WelcomePage;
