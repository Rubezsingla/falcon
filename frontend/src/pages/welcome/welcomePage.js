import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function WelcomePage() {
  const navigate = useNavigate();

  // Function to generate a random room ID
  const generateRoomId = () => {
    // You can customize this ID generation logic as needed
    return 'room-' + Math.random().toString(36).substr(2, 9);
  };

  const handleChallengeFriend = () => {
    // Generate a unique room ID
    const roomId = generateRoomId();
    
    // Navigate to the ChallengeFriend page with the generated room ID
    navigate(`/challenge-friend/${roomId}`);
  };

  return (
    <div className="welcome-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/diet-chart')}>Diet Chart</button>
        <button onClick={handleChallengeFriend}>Challenge a Friend</button>
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
        <button onClick={() => navigate('/exercise')}>Get Started</button>
      </div>
    </div>
  );
}

export default WelcomePage;
