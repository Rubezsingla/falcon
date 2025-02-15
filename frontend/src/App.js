import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExerciseTracker from "./components/ExerciseTracker"; // Import the ExerciseTracker component
// import Dashboard from "./pages/Dashboard";
import Login from "./pages/login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise" element={<ExerciseTracker />} /> {/* Add new route for Exercise Tracker */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
