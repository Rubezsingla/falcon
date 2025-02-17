import React from 'react';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/nextpage');
    };

    return (
        <div className="welcome-container">
            <video autoPlay loop muted className="background-video">
                <source src="/video.mp4" type="video/mp4" />
            </video>
            <div className="welcome-box">
                <h1>FLEX IT OUT</h1>
                <h2>Welcome, Fitness Warrior!</h2>
                <p className="tagline">"Push your limits. Achieve greatness."</p>
                <button onClick={handleGetStarted}>Get Started</button>
            </div>
        </div>
    );
}

export default WelcomePage;
