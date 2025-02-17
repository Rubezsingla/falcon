import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Home from "./pages/Home";
import ExerciseTracker from "./components/ExcerciseTracker";
import Login from "./pages/login/Login";
import WelcomePage from "./pages/welcome/welcomePage";
import DashBoard from "./pages/Dashboard";
import ChallengeFriend from "./pages/ChallengeFriend";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      {/* Wrap the whole app inside Router */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise" element={<ExerciseTracker />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/welcomePage" element={<WelcomePage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/challenge-friend/:roomId" element={<ChallengeFriend />} />

          {/* Redirect invalid routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
