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

}