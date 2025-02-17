import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExerciseTracker from "./components/ExerciseTracker"; 
import Login from "./pages/login/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import WelcomePage from './pages/welcome/welcomePage';
import NextPage from './pages/welcome/NextPage';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise" element={<ExerciseTracker />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/welcomePage" element={<WelcomePage />} />
          <Route path="/nextpage" element={<NextPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
