import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/login/Login";
import WelcomePage from "./pages/welcome/welcomePage";
import Diet from "./pages/diet/Diet";
import ChallengeFriend from "./pages/ChallengeFriend";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/welcomePage" element={<WelcomePage />} />
          <Route path="/diet-chart" element={<Diet />} />
          <Route path="/challenge/:roomId" element={<ChallengeFriend />} /> {/* Correct route */}
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
