import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then((res) => setMessage(res.data))
      .catch((err) => setMessage("Error connecting to backend"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>

      {/* Link to Exercise Tracker */}
      <Link to="/exercise">
        <button style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>
          Start Exercise Tracker
        </button>
      </Link>

      {/* Link to Register Page */}
      <Link to="/register">
        <button type="submit" style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>Register</button>
      </Link>

      {/* Link to Sign In Page */}
      <Link to="/login">
        <button type="submit" style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>Sign In</button>
      </Link>

    </div>
  );
}
