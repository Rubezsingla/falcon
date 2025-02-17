import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import WelcomePage from './pages/welcome/welcomePage';
import Diet from './pages/diet/Diet';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/welcomePage" element={<WelcomePage />} />
          <Route path="/diet-chart" element={<Diet />} />
          
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}
export default App;