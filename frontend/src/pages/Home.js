import { useEffect, useState } from "react";
import axios from "axios";

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
    </div>
  );
}
